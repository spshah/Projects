# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-30

### Added
- **Profile switching** - Instantly switch between multiple Claude Code accounts
- **One-click activation** - Status bar item for quick profile switching
- **Guided setup wizard** - Interactive onboarding for creating new profiles
- **Shell integration** - bash/zsh aliases (macOS, Linux, WSL) and PowerShell functions (Windows) for command-line switching
- **Window title indicator** - Shows active profile name in VS Code window title
- **Terminal environment injection** - Automatically sets `CLAUDE_CONFIG_DIR` in VS Code integrated terminal
- **Platform support** - Windows (junctions), macOS (symlinks), Linux (symlinks), WSL (auto-detected)
- **Security hardening** - Path validation, symlink-only deletion, workspace configuration protection

### Security
- User-scoped settings to prevent workspace poisoning
- Path validation against shell injection attacks
- Safe symlink deletion (prevents accidental file deletion)
- Windows junction support without requiring Developer Mode/Admin rights
