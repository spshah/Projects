# Claude Code Profile Switcher - Publish Quick Start

**For**: Publishing to VS Code Marketplace  
**Status**: ✅ Ready (all prep work complete)  
**Time Required**: 30-40 minutes  

---

## Pre-Requisites

```bash
# Check you have node and npm
node --version  # Should be 14+
npm --version   # Should be 6+

# Install vsce (one-time)
npm install -g @vscode/vsce
# OR use npx to avoid global install
```

---

## Step 1: Build the Extension (5 mins)

```bash
cd /home/shashi/projects/Projects/vscode-extension/claude-code-profile-switcher/extension

# Install dependencies
npm install

# Create VSIX package
npx @vscode/vsce package --no-dependencies

# Verify output
ls -lh *.vsix
# Should show: claude-code-profile-switcher-1.0.0.vsix (~20-50 KB)
```

---

## Step 2: Setup Marketplace Account (10 mins)

### A. Create Publisher Account

1. Go to: https://marketplace.visualstudio.com
2. Click **"Publish Extensions"**
3. Sign in (GitHub, Microsoft, or email)
4. Create Publisher:
   - **Name**: `sairambkrishnan`
   - Accept terms
   - ✅ Done

### B. Create Personal Access Token (PAT)

1. Go to: https://dev.azure.com
2. Top-right: **User Settings** → **Personal Access Tokens**
3. **New Token**:
   - **Name**: `vsce-publish`
   - **Organization**: All accessible organizations
   - **Expiration**: 1 year (or longer)
   - **Scopes**: 
     - ✅ Marketplace (Manage)
     - ✅ Marketplace (Publish)
4. Click **Create**
5. **⚠️ IMPORTANT**: Copy token immediately (won't show again)

---

## Step 3: Login & Publish (10 mins)

### A. Login to vsce

```bash
npx @vscode/vsce login sairambkrishnan

# When prompted:
# Enter token: [paste your PAT from Step 2.B]
# 
# Expected output:
# The Personal Access Token verification succeeded.
```

### B. Publish Extension

```bash
# From vscode-extension/claude-code-profile-switcher/extension/
npx @vscode/vsce publish

# Expected output:
# Publishing extension 'sairambkrishnan.claude-code-profile-switcher'...
# [=============================] 100%
# Successfully published sairambkrishnan.claude-code-profile-switcher@1.0.0
```

---

## Step 4: Verify (5 mins)

### A. Check Marketplace

Visit: https://marketplace.visualstudio.com/items?itemName=sairambkrishnan.claude-code-profile-switcher

Verify:
- ✅ Extension name displays correctly
- ✅ Icon shows
- ✅ README renders
- ✅ Version shows 1.0.0
- ✅ Publisher is sairambkrishnan

### B. Test Installation

In VS Code:
1. Open **Extensions** (`Ctrl+Shift+X`)
2. Search: `claude-code-profile-switcher`
3. Click **Install**
4. Test features:
   - Status bar shows profile
   - Can switch profiles
   - Commands appear in Command Palette

---

## Troubleshooting

### "vsce: command not found"
```bash
# Use npx instead
npx @vscode/vsce login sairambkrishnan
npx @vscode/vsce publish
```

### "The Personal Access Token verification failed"
- Check PAT is copied correctly (no extra spaces)
- Verify PAT has Marketplace (Publish) scope
- Create new PAT if needed

### "Failed to create package"
```bash
cd vscode-extension/claude-code-profile-switcher/extension
npm install
npx @vscode/vsce package --no-dependencies
```

### "Already published at this version"
- Increment version in package.json: `1.0.0` → `1.0.1`
- Re-run: `npm install && npx @vscode/vsce publish`

---

## Post-Publishing

1. **Monitor**: Check marketplace ratings and reviews
2. **Support**: Monitor GitHub Issues for bug reports
3. **Updates**: Plan v1.0.1 maintenance release (icon optimization)
4. **Growth**: Track download statistics

---

## Command Cheat Sheet

```bash
# All commands from: vscode-extension/claude-code-profile-switcher/extension/

# First time setup
npm install
npx @vscode/vsce login sairambkrishnan

# Build
npx @vscode/vsce package --no-dependencies

# Publish
npx @vscode/vsce publish

# Logout (if needed)
npx @vscode/vsce logout sairambkrishnan
```

---

## Important Notes

⚠️ **PAT Security**
- Keep PAT secure (don't commit to git)
- Don't share PAT with others
- Rotate annually

✅ **Version Management**
- Each publish needs unique version
- Semantic versioning: MAJOR.MINOR.PATCH
- Update in: `extension/package.json`

📝 **Release Notes**
- Add release notes when updating version
- Document changes in commit message
- Consider adding to GitHub Releases

---

## Support

For issues or questions:
1. Check: `MARKETPLACE_READINESS.md` (full guide)
2. Check: VS Code Marketplace FAQ
3. File issue on: GitHub Issues (with error message)

---

**Estimated Total Time**: 30-40 minutes  
**Difficulty**: Low (straightforward steps)  
**Success Rate**: ✅ Very High (all prerequisites met)

---

Generated: June 30, 2026  
For: Claude Code Profile Switcher v1.0.0
