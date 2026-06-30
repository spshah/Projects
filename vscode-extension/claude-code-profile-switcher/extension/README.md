# Claude Code Profile Switcher

**🟢 Marketplace Ready** | **v1.0.0** | **MIT License**

Switch between multiple Claude Code accounts in VS Code with one click.

If you use Claude Code with more than one account (e.g., work and personal), this extension lets you switch between them instantly — no manual symlink juggling, no terminal commands.

> **Marketplace Status**: This extension is ready for VS Code Marketplace publishing. See the repository's `MARKETPLACE_READINESS.md` for publishing details.

## What It Does

Claude Code stores its configuration in `~/.claude`. This extension manages that directory as a symlink, pointing it at different config directories (like `~/.claude-work` or `~/.claude-personal`) depending on which profile you select.

When you switch profiles, the extension:

1. Repoints the `~/.claude` symlink to the selected profile's config directory
2. Sets `CLAUDE_CONFIG_DIR` for VS Code's integrated terminal
3. Updates the window title to show which profile is active (e.g., `[Work]`)
4. Reloads the VS Code window to apply changes

## Installation

### From the VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X` on Mac, `Ctrl+Shift+X` on Windows/Linux)
3. Search for **"Claude Code Profile Switcher"**
4. Click **Install**

### From a .vsix file

If you have the `.vsix` file directly:

```bash
code --install-extension claude-code-profile-switcher-1.0.0.vsix
```

Or in VS Code: Extensions sidebar → `...` menu → **Install from VSIX...**

## Getting Started

### First-time setup (no existing profiles)

If you don't have Claude Code profiles set up yet:

1. After installing, you'll see a notification: **"No Claude profiles found. Set up multi-account switching?"**
2. Click **Get Started**
3. Enter a name for your first profile (e.g., "Work")
4. A terminal opens with `CLAUDE_CONFIG_DIR` pre-set — run `claude auth login` to authenticate
5. Click **Done** when authentication is complete
6. Choose whether to add another profile or finish setup
7. The extension creates shell aliases and activates your first profile

You can also trigger this manually: `Cmd+Shift+P` → **"Claude: Setup Profiles"**

### If you already have profiles set up

If you already have directories like `~/.claude-work` and `~/.claude-personal`:

1. The extension works out of the box with its default configuration
2. The status bar shows your active profile immediately
3. Click the status bar item or run `Cmd+Shift+P` → **"Claude: Switch Profile"** to switch

### Custom profile configuration

To add, remove, or rename profiles, open VS Code Settings (`Cmd+,`) and search for `claudeProfileSwitcher.profiles`. The setting is a JSON array:

```json
"claudeProfileSwitcher.profiles": [
  {
    "name": "Work",
    "configDir": "~/.claude-work"
  },
  {
    "name": "Personal",
    "configDir": "~/.claude-personal"
  },
  {
    "name": "Client Project",
    "configDir": "~/.claude-client"
  }
]
```

Each profile needs:
- **name**: Display name shown in the status bar and quick pick menu
- **configDir**: Path to the Claude config directory (supports `~` for home directory)

## Usage

### Switching profiles

- **Status bar**: Click the `Claude: <profile>` item in the bottom-left status bar
- **Command Palette**: `Cmd+Shift+P` → **"Claude: Switch Profile"**
- **Shell aliases** (if set up during onboarding): Run `claude-work` or `claude-personal` in any terminal

### Status bar indicator

| State | Display |
|-------|---------|
| Profile active | `$(account) Claude: Work` |
| No profile detected | `$(warning) Claude: Unknown` (yellow warning) |

### Shell aliases

On macOS, Linux, and WSL, onboarding adds aliases to your `.zshrc` or `.bashrc`:

```bash
# === Claude Code Profile Switcher ===
alias claude-work="export CLAUDE_CONFIG_DIR=\"/home/you/.claude-work\"; ln -sf \"/home/you/.claude-work\" ~/.claude"
alias claude-personal="export CLAUDE_CONFIG_DIR=\"/home/you/.claude-personal\"; ln -sf \"/home/you/.claude-personal\" ~/.claude"
```

On native Windows, onboarding adds functions to your PowerShell profile instead (PowerShell aliases can't carry a body):

```powershell
# === Claude Code Profile Switcher ===
function claude-work {
    $env:CLAUDE_CONFIG_DIR = "C:\Users\you\.claude-work"
    cmd /c mklink /J "$env:USERPROFILE\.claude" "C:\Users\you\.claude-work" | Out-Null
}
```

These let you switch profiles from any terminal, not just VS Code.

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `claudeProfileSwitcher.profiles` | Work + Personal | Array of profile objects with `name` and `configDir` |
| `claudeProfileSwitcher.symlinkPath` | `~/.claude` | Path to the symlink that gets repointed on switch |

## Commands

| Command | Description |
|---------|-------------|
| **Claude: Switch Profile** | Open quick pick to select a profile |
| **Claude: Setup Profiles** | Run the guided onboarding wizard |

## How It Works

```
~/.claude → ~/.claude-work/      (symlink, managed by extension)
~/.claude-work/                  (real directory, Work account config)
~/.claude-personal/              (real directory, Personal account config)
```

When you switch to "Personal", the extension removes the `~/.claude` symlink and recreates it pointing to `~/.claude-personal`. New Claude Code sessions pick up the change automatically.

## Requirements

- VS Code 1.94.0 or later
- Claude Code CLI installed
- macOS, Linux, WSL, or Windows 10/11 (native)

### Platform notes

- **macOS / Linux / WSL**: uses a real symlink at `~/.claude`. Shell integration (during onboarding) adds `alias claude-<name>=...` entries to `~/.zshrc` or `~/.bashrc`. When VS Code is connected to WSL via the Remote - WSL extension, the extension host runs inside the Linux filesystem, so this is handled the same as native Linux automatically — no extra configuration needed.
- **Windows (native)**: uses a directory **junction** (`mklink /J` equivalent) instead of a symlink, so switching profiles does **not** require Developer Mode or an elevated/Administrator VS Code process. If junction creation ever fails, the extension falls back to a directory symlink, which does require Developer Mode (Settings > Privacy & security > For developers) or running VS Code as Administrator. Shell integration writes PowerShell functions (not aliases, since PowerShell aliases can't carry a body) to your PowerShell profile (`Documents\PowerShell\Microsoft.PowerShell_profile.ps1` for PowerShell 7+, or `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` for Windows PowerShell 5.1).
- The integrated-terminal environment variable (`CLAUDE_CONFIG_DIR`) is written to `terminal.integrated.env.windows`, `.linux`, or `.osx` depending on the OS the extension host is actually running on.

## Security

- `claudeProfileSwitcher.profiles` and `claudeProfileSwitcher.symlinkPath` are **User-only** settings (`scope: application`). A workspace's `.vscode/settings.json` cannot override them — these settings drive real filesystem changes (deleting/creating a symlink, writing to your shell profile), so they must come only from configuration you control, never from an opened repository.
- The extension will only ever delete a path that is already a symlink/junction it manages. If something else (a real file or directory) exists at the configured symlink path, it reports an error instead of removing it.
- Profile `configDir` values are validated against a plain-path character allow-list before being written into any shell alias or PowerShell function; profiles with unsupported characters are skipped (with a warning) rather than interpolated as-is.

## Troubleshooting

**"Claude: Unknown" in status bar**
- The `~/.claude` symlink doesn't point to any configured profile directory. Run **Claude: Switch Profile** to fix it.

**Profile switch doesn't take effect**
- VS Code reloads after switching. If Claude Code was already running in a terminal, close that terminal and open a new one.

**Shell aliases not working**
- Run `source ~/.zshrc` (or `~/.bashrc`) after setup, or open a new terminal.

**Directory already exists during setup**
- The onboarding wizard won't overwrite existing directories. If `~/.claude-work` already exists, just add it to your profiles in Settings instead.

## License

MIT
