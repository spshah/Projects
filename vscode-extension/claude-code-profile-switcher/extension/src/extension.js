const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');

const IS_WINDOWS = process.platform === 'win32';

// ─── Helpers ─────────────────────────────────────────────────────

function expandTilde(p) {
    if (p === '~') {
        return os.homedir();
    }
    if (p.startsWith('~/') || p.startsWith('~\\')) {
        return path.join(os.homedir(), p.slice(2));
    }
    return p;
}

function resolveConfigDir(profile) {
    return path.resolve(expandTilde(profile.configDir));
}

function getProfiles() {
    const config = vscode.workspace.getConfiguration('claudeProfileSwitcher');
    return config.get('profiles', []);
}

function getSymlinkPath() {
    const config = vscode.workspace.getConfiguration('claudeProfileSwitcher');
    return expandTilde(config.get('symlinkPath', '~/.claude'));
}

// Only plain path characters are allowed through into any generated shell
// snippet (rc file / PowerShell profile). configDir values ultimately come
// from settings.json, which can be poisoned by a workspace; this allow-list
// keeps shell metacharacters from ever reaching an interpolated command.
const SAFE_PATH_PATTERN = /^[\w\-./\\: ~]+$/;

function isSafeConfigDir(configDir) {
    return typeof configDir === 'string' && configDir.length > 0 && SAFE_PATH_PATTERN.test(configDir);
}

function getTerminalEnvKey() {
    if (process.platform === 'win32') return 'windows';
    if (process.platform === 'darwin') return 'osx';
    return 'linux';
}

// ─── Detection ───────────────────────────────────────────────────

function detectActiveProfile(profiles) {
    const symlinkPath = getSymlinkPath();
    try {
        const target = fs.readlinkSync(symlinkPath);
        const resolvedTarget = path.resolve(path.dirname(symlinkPath), target);
        return profiles.find(p => resolveConfigDir(p) === resolvedTarget);
    } catch {
        return undefined;
    }
}

// ─── Window Title ────────────────────────────────────────────────

async function applyWindowTitle(profile) {
    const windowConfig = vscode.workspace.getConfiguration('window');
    const defaultTitle =
        '${dirty}${activeEditorShort}${separator}${rootName}${separator}${profileName}${separator}${appName}';
    const currentTitle = windowConfig.get('title') || defaultTitle;
    const stripped = currentTitle.replace(/^\[.*?\]\s*/, '');
    const newTitle = `[${profile.name}] ${stripped}`;
    await windowConfig.update('title', newTitle, vscode.ConfigurationTarget.Global);
}

// ─── Symlink / Junction Management ──────────────────────────────

// Only ever remove a path that is already a symlink (or, on Windows, a
// directory junction/symlink). A real file or directory sitting at
// symlinkPath is left untouched and surfaced as an error instead — this
// closes off "delete whatever happens to be at this attacker-influenced
// path" as an attack primitive.
function removeExistingLink(symlinkPath) {
    let stat;
    try {
        stat = fs.lstatSync(symlinkPath);
    } catch (err) {
        if (err.code === 'ENOENT') return;
        throw err;
    }
    if (!stat.isSymbolicLink()) {
        throw new Error(
            `${symlinkPath} already exists and is not a symlink managed by this extension. Remove or rename it manually first.`
        );
    }
    // Windows directory symlinks/junctions are reparse points that report as
    // both a symlink and a directory, and must be removed with rmdir, not
    // unlink (unlink throws EPERM on them).
    if (IS_WINDOWS && stat.isDirectory()) {
        fs.rmdirSync(symlinkPath);
    } else {
        fs.unlinkSync(symlinkPath);
    }
}

function createConfigLink(configDir, symlinkPath) {
    removeExistingLink(symlinkPath);
    if (IS_WINDOWS) {
        // Junctions don't require Developer Mode or admin rights, unlike
        // directory symbolic links, so prefer them and only fall back.
        try {
            fs.symlinkSync(configDir, symlinkPath, 'junction');
            return;
        } catch {
            // fall through to symlink attempt below
        }
        fs.symlinkSync(configDir, symlinkPath, 'dir');
    } else {
        fs.symlinkSync(configDir, symlinkPath);
    }
}

function linkErrorMessage(err) {
    if (IS_WINDOWS && (err.code === 'EPERM' || err.code === 'EACCES')) {
        return `Failed to create symlink: ${err.message}. On Windows, enable Developer Mode (Settings > Privacy & security > For developers) or run VS Code as Administrator.`;
    }
    return `Failed to create symlink: ${err.message}`;
}

// ─── Switching Logic ─────────────────────────────────────────────

async function switchToProfile(profile) {
    const symlinkPath = getSymlinkPath();
    const configDir = resolveConfigDir(profile);

    if (!fs.existsSync(configDir)) {
        vscode.window.showErrorMessage(
            `Claude profile directory does not exist: ${configDir}`
        );
        return;
    }

    // 1. Recreate the symlink (or Windows junction)
    try {
        createConfigLink(configDir, symlinkPath);
    } catch (err) {
        vscode.window.showErrorMessage(linkErrorMessage(err));
        return;
    }

    // 2. Set CLAUDE_CONFIG_DIR for integrated terminals on this OS
    const envKey = getTerminalEnvKey();
    const terminalEnvConfig = vscode.workspace.getConfiguration(
        'terminal.integrated.env'
    );
    const currentEnv = terminalEnvConfig.get(envKey) || {};
    await terminalEnvConfig.update(
        envKey,
        { ...currentEnv, CLAUDE_CONFIG_DIR: configDir },
        vscode.ConfigurationTarget.Global
    );

    // 3. Update window title
    await applyWindowTitle(profile);

    // 4. Reload the VS Code window (small delay to flush settings)
    setTimeout(() => {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
    }, 300);
}

// ─── Status Bar ──────────────────────────────────────────────────

let statusBarItem;

function updateStatusBar(profile) {
    const remoteTag = vscode.env.remoteName === 'wsl' ? ' (WSL)' : '';
    if (profile) {
        statusBarItem.text = `$(account) Claude: ${profile.name}`;
        statusBarItem.tooltip = `Active Claude profile: ${profile.name}${remoteTag}\nConfig: ${profile.configDir}\nClick to switch`;
        statusBarItem.backgroundColor = undefined;
    } else {
        statusBarItem.text = `$(warning) Claude: Unknown`;
        statusBarItem.tooltip =
            `Claude profile not detected${remoteTag}. Click to switch.`;
        statusBarItem.backgroundColor = new vscode.ThemeColor(
            'statusBarItem.warningBackground'
        );
    }
}

// ─── Onboarding ─────────────────────────────────────────────────

function sanitizeProfileName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function createProfile() {
    const name = await vscode.window.showInputBox({
        prompt: 'Profile name (e.g., Work, Personal)',
        placeHolder: 'Work',
        validateInput: (value) => {
            if (!value || !value.trim()) {
                return 'Profile name is required';
            }
            const dirName = sanitizeProfileName(value);
            if (!dirName) {
                return 'Name must contain at least one letter or number';
            }
            const configDir = path.join(os.homedir(), `.claude-${dirName}`);
            if (fs.existsSync(configDir)) {
                return `Directory ~/.claude-${dirName} already exists`;
            }
            return null;
        },
    });

    if (!name) {
        return null;
    }

    const dirName = sanitizeProfileName(name);
    const configDir = path.join(os.homedir(), `.claude-${dirName}`);
    const configDirShort = `~/.claude-${dirName}`;
    const defaultClaudeDir = path.join(os.homedir(), '.claude');

    // Check if existing Claude Code authentication exists
    const existingAuthExists = fs.existsSync(defaultClaudeDir) &&
        fs.readdirSync(defaultClaudeDir).length > 0;

    if (existingAuthExists) {
        const choice = await vscode.window.showInformationMessage(
            `Found existing Claude Code authentication. Copy it to "${name}" profile?`,
            'Yes, copy it',
            'No, authenticate separately'
        );

        if (choice === 'Yes, copy it') {
            // Create backup of current ~/.claude
            const backupDir = path.join(os.homedir(), '.claude-backup');
            if (fs.existsSync(defaultClaudeDir)) {
                const backupExists = fs.existsSync(backupDir);
                if (backupExists) {
                    // Remove old backup
                    fs.rmSync(backupDir, { recursive: true });
                }
                // Copy ~/.claude to ~/.claude-backup
                fs.cpSync(defaultClaudeDir, backupDir, { recursive: true });
            }

            // Copy ~/.claude to new profile
            fs.cpSync(defaultClaudeDir, configDir, { recursive: true });
            vscode.window.showInformationMessage(
                `"${name}" profile created with existing authentication. Backup saved to ~/.claude-backup`
            );
            return { name: name.trim(), configDir: configDirShort };
        }
    }

    // Manual authentication flow
    fs.mkdirSync(configDir, { recursive: true });

    const terminal = vscode.window.createTerminal({
        name: `Claude Auth: ${name}`,
        env: { CLAUDE_CONFIG_DIR: configDir },
    });
    terminal.show();
    terminal.sendText(`echo "=== Authenticate your '${name}' Claude profile ==="; echo "Config dir: ${configDir}"; echo "Run: claude auth login"; echo "Then click 'Done' in the notification above."`, true);

    await vscode.window.showInformationMessage(
        `Authenticate your "${name}" profile in the terminal, then click Done.`,
        'Done'
    );

    return { name: name.trim(), configDir: configDirShort };
}

// ─── Shell Integration ───────────────────────────────────────────

const SHELL_ALIAS_MARKER = '# === Claude Code Profile Switcher ===';

function splitProfilesBySafety(profiles) {
    const safe = profiles.filter(p => isSafeConfigDir(p.configDir));
    const unsafeNames = profiles.filter(p => !isSafeConfigDir(p.configDir)).map(p => p.name);
    return { safe, unsafeNames };
}

function warnAboutUnsafeProfiles(unsafeNames) {
    if (unsafeNames.length > 0) {
        vscode.window.showWarningMessage(
            `Skipped shell integration for profile(s) with unsupported characters in configDir: ${unsafeNames.join(', ')}`
        );
    }
}

async function injectBashAliases(profiles) {
    const { safe, unsafeNames } = splitProfilesBySafety(profiles);

    const shell = process.env.SHELL || '/bin/zsh';
    const rcFile = shell.includes('zsh') ? '.zshrc' : shell.includes('bash') ? '.bashrc' : '.profile';
    const rcPath = path.join(os.homedir(), rcFile);

    const aliases = safe.map(p => {
        const alias = sanitizeProfileName(p.name);
        const resolved = resolveConfigDir(p);
        return `alias claude-${alias}="export CLAUDE_CONFIG_DIR=\\"${resolved}\\"; ln -sf \\"${resolved}\\" ~/.claude"`;
    });
    const block = `\n${SHELL_ALIAS_MARKER}\n${aliases.join('\n')}\n`;

    const aliasNames = safe.map(p => `claude-${sanitizeProfileName(p.name)}`).join(', ');
    const aliasPreview = aliases.join('\n');

    try {
        const existing = fs.readFileSync(rcPath, 'utf8');

        if (existing.includes(SHELL_ALIAS_MARKER)) {
            vscode.window.showInformationMessage(
                `Shell aliases already exist in ~/${rcFile} (marker found). Commands: ${aliasNames}`
            );
        } else if (aliases.some(a => existing.includes(a.split('=')[0]))) {
            vscode.window.showInformationMessage(
                `Claude aliases already present in ~/${rcFile}. Commands: ${aliasNames}`
            );
        } else {
            fs.appendFileSync(rcPath, block);
            vscode.window.showInformationMessage(
                `Shell aliases added to ~/${rcFile}. Commands: ${aliasNames}. Run "source ~/${rcFile}" to activate.`
            );
        }
    } catch (err) {
        vscode.window.showWarningMessage(
            `Could not write to ~/${rcFile}: ${err.message}. Add these aliases manually:\n${aliasPreview}`
        );
    }

    warnAboutUnsafeProfiles(unsafeNames);
}

function getPowerShellProfilePath() {
    const documents = path.join(os.homedir(), 'Documents');
    const pwshProfileDir = path.join(documents, 'PowerShell');
    if (fs.existsSync(pwshProfileDir)) {
        return path.join(pwshProfileDir, 'Microsoft.PowerShell_profile.ps1');
    }
    return path.join(documents, 'WindowsPowerShell', 'Microsoft.PowerShell_profile.ps1');
}

async function injectPowerShellFunctions(profiles) {
    const { safe, unsafeNames } = splitProfilesBySafety(profiles);

    const profilePath = getPowerShellProfilePath();
    const aliasNames = safe.map(p => `claude-${sanitizeProfileName(p.name)}`);

    // Bash-style aliases can't take a multi-statement body in PowerShell, so
    // each profile becomes a function. mklink /J (junction) avoids requiring
    // admin rights or Developer Mode.
    const functions = safe.map(p => {
        const alias = sanitizeProfileName(p.name);
        const resolved = resolveConfigDir(p);
        return [
            `function claude-${alias} {`,
            `    $env:CLAUDE_CONFIG_DIR = "${resolved}"`,
            `    cmd /c mklink /J "$env:USERPROFILE\\.claude" "${resolved}" | Out-Null`,
            `}`,
        ].join('\n');
    });
    const block = `\n${SHELL_ALIAS_MARKER}\n${functions.join('\n\n')}\n`;

    try {
        fs.mkdirSync(path.dirname(profilePath), { recursive: true });
        const existing = fs.existsSync(profilePath) ? fs.readFileSync(profilePath, 'utf8') : '';

        if (existing.includes(SHELL_ALIAS_MARKER)) {
            vscode.window.showInformationMessage(
                `PowerShell functions already exist in profile (marker found). Commands: ${aliasNames.join(', ')}`
            );
        } else {
            fs.appendFileSync(profilePath, block);
            vscode.window.showInformationMessage(
                `PowerShell functions added to ${profilePath}. Commands: ${aliasNames.join(', ')}. Restart your terminal to activate.`
            );
        }
    } catch (err) {
        vscode.window.showWarningMessage(
            `Could not write to ${profilePath}: ${err.message}.`
        );
    }

    warnAboutUnsafeProfiles(unsafeNames);
}

async function injectShellIntegration(profiles) {
    if (IS_WINDOWS) {
        await injectPowerShellFunctions(profiles);
    } else {
        await injectBashAliases(profiles);
    }
}

// ─── Onboarding Orchestration ────────────────────────────────────

async function runOnboarding() {
    const createdProfiles = [];

    while (true) {
        const profile = await createProfile();
        if (!profile) {
            break;
        }
        createdProfiles.push(profile);

        const more = await vscode.window.showInformationMessage(
            `Profile "${profile.name}" created. Add another account?`,
            'Yes',
            'No, finish setup'
        );
        if (more !== 'Yes') {
            break;
        }
    }

    if (createdProfiles.length === 0) {
        return;
    }

    // Save profiles to VS Code settings
    const config = vscode.workspace.getConfiguration('claudeProfileSwitcher');
    const existingProfiles = config.get('profiles', []);
    const allProfiles = [...existingProfiles, ...createdProfiles];
    await config.update('profiles', allProfiles, vscode.ConfigurationTarget.Global);

    // Create symlink/junction to first new profile
    const firstProfile = createdProfiles[0];
    const symlinkPath = getSymlinkPath();
    const configDir = resolveConfigDir(firstProfile);
    try {
        createConfigLink(configDir, symlinkPath);
    } catch (err) {
        vscode.window.showErrorMessage(linkErrorMessage(err));
    }

    // Inject shell integration (bash/zsh aliases, or PowerShell functions on Windows)
    await injectShellIntegration(allProfiles);

    // Update UI
    updateStatusBar(firstProfile);
    await applyWindowTitle(firstProfile);

    vscode.window.showInformationMessage(
        `Setup complete! ${createdProfiles.length} profile(s) created. Active: ${firstProfile.name}`
    );
}

// ─── Activation ──────────────────────────────────────────────────

async function activate(context) {
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        100
    );
    statusBarItem.command = 'claudeProfileSwitcher.switchProfile';
    context.subscriptions.push(statusBarItem);

    // Detect current profile, update status bar AND window title
    const profiles = getProfiles();
    const active = detectActiveProfile(profiles);
    updateStatusBar(active);
    statusBarItem.show();

    if (active) {
        applyWindowTitle(active);
    }

    // Auto-detect: no profiles and no symlink → offer onboarding
    if (profiles.length === 0 && !active) {
        const action = await vscode.window.showInformationMessage(
            'No Claude profiles found. Set up multi-account switching?',
            'Get Started',
            'Dismiss'
        );
        if (action === 'Get Started') {
            await runOnboarding();
        }
    }

    // Register the switch command
    const switchCommand = vscode.commands.registerCommand(
        'claudeProfileSwitcher.switchProfile',
        async () => {
            const profiles = getProfiles();
            if (profiles.length === 0) {
                vscode.window.showWarningMessage(
                    'No Claude profiles configured. Add profiles in Settings > Claude Profile Switcher.'
                );
                return;
            }

            const active = detectActiveProfile(profiles);

            const items = profiles.map(p => ({
                label: p.name,
                description: p.configDir,
                detail:
                    active && active.name === p.name
                        ? '$(check) Currently active'
                        : undefined,
            }));

            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select a Claude profile',
                title: 'Switch Claude Profile',
            });

            if (!selected) {
                return;
            }

            const targetProfile = profiles.find(
                p => p.name === selected.label
            );
            if (!targetProfile) {
                return;
            }

            if (active && active.name === targetProfile.name) {
                const confirm = await vscode.window.showInformationMessage(
                    `"${targetProfile.name}" is already active. Re-apply anyway?`,
                    'Yes',
                    'No'
                );
                if (confirm !== 'Yes') {
                    return;
                }
            }

            await switchToProfile(targetProfile);
        }
    );

    context.subscriptions.push(switchCommand);

    // Register the setup command
    const setupCommand = vscode.commands.registerCommand(
        'claudeProfileSwitcher.setupProfiles',
        async () => {
            await runOnboarding();
        }
    );
    context.subscriptions.push(setupCommand);
}

function deactivate() {}

module.exports = { activate, deactivate };
