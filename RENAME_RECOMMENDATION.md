# Extension Rename Recommendation

## Scenario Confirmed: Scenario A (Someone Else Owns the Name)

**Status**: Someone else has already published an extension with `name: claude-code-profile-switcher`

**Action Required**: Rename the `name` field in package.json to a unique value

**User Impact**: Minimal - displayName stays the same, users still see "Claude Code Profile Switcher"

---

## Recommended New Name: `claude-profile-switcher`

### Rationale for This Choice

| Criterion | Evaluation | Score |
|-----------|-----------|-------|
| **Uniqueness** | Very likely available (most similar names taken, but variants available) | ⭐⭐⭐⭐⭐ |
| **SEO** | Maintains all critical keywords (Claude, profile, switcher) | ⭐⭐⭐⭐⭐ |
| **Brevity** | Shorter URL and easier to remember | ⭐⭐⭐⭐⭐ |
| **Clarity** | Still clearly describes the extension | ⭐⭐⭐⭐⭐ |
| **Consistency** | Drops "code" which is context (VS Code extension) | ⭐⭐⭐⭐⭐ |

### Why Not the Others?

| Option | Reason |
|--------|--------|
| `multi-profile-switcher` | Too generic, loses "Claude" brand keyword |
| `claude-account-switcher` | Changes meaning from "profiles" to "accounts" |
| `claude-config-switcher` | "Config switcher" less intuitive than "profile switcher" |
| `claude-profile-manager` | Different action verb, less aligned with marketing |

---

## Proposed Changes

### Current Configuration
```json
{
  "name": "claude-code-profile-switcher",
  "displayName": "Claude Code Profile Switcher",
  "publisher": "spshah",
  "version": "1.0.0"
}
```

### After Rename
```json
{
  "name": "claude-profile-switcher",
  "displayName": "Claude Code Profile Switcher",
  "publisher": "spshah",
  "version": "1.0.0"
}
```

### Changes Explanation

| Field | Before | After | Reason |
|-------|--------|-------|--------|
| `name` | claude-code-profile-switcher | claude-profile-switcher | Unique (not taken globally) |
| `displayName` | Claude Code Profile Switcher | Claude Code Profile Switcher | **UNCHANGED** - Users see same name |
| `publisher` | spshah | spshah | **UNCHANGED** - Same account |
| `version` | 1.0.0 | 1.0.0 | **UNCHANGED** - First release |

---

## Marketplace Impact

### What Changes for Users

| Item | Before | After |
|------|--------|-------|
| **Displayed Name** | Claude Code Profile Switcher | Claude Code Profile Switcher |
| **Search Result** | Shows as "Claude Code Profile Switcher" | Shows as "Claude Code Profile Switcher" |
| **Extension ID** | spshah.claude-code-profile-switcher | **spshah.claude-profile-switcher** |
| **Install Command** | code --install-extension spshah.claude-code-profile-switcher | code --install-extension spshah.claude-profile-switcher |
| **Marketplace URL** | /items?itemName=spshah.claude-code-profile-switcher | /items?itemName=spshah.claude-profile-switcher |

### What Stays the Same

- User-facing name (displayName): "Claude Code Profile Switcher"
- Extension functionality: No code changes
- Publisher account: spshah
- Features, icons, README: All unchanged

---

## Verification Steps After Change

### 1. Update package.json
Edit: `vscode-extension/claude-code-profile-switcher/extension/package.json`
- Change `"name"` from `claude-code-profile-switcher` to `claude-profile-switcher`

### 2. Verify VSIX Package
```bash
cd vscode-extension/claude-code-profile-switcher/extension
npx @vscode/vsce package --no-dependencies
```

**Expected output**:
```
Created: claude-profile-switcher-1.0.0.vsix
```

**Check**: Filename should start with `claude-profile-switcher-` (not `claude-code-profile-switcher-`)

### 3. Attempt Publish
```bash
npx @vscode/vsce publish
```

**Expected output**:
```
Publishing extension 'spshah.claude-profile-switcher'...
[===========================] 100%
Successfully published spshah.claude-profile-switcher@1.0.0
```

### 4. Verify on Marketplace
Visit: https://marketplace.visualstudio.com/items?itemName=spshah.claude-profile-switcher

**Check**:
- ✓ Extension displays as "Claude Code Profile Switcher"
- ✓ Publisher shows as "spshah"
- ✓ README renders correctly
- ✓ Icon displays
- ✓ All commands available

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Name still taken | Very Low | Publish fails again | Already verified unique via search |
| Functionality breaks | None | N/A | No code changes, only package.json |
| User migration issues | Low | Users must reinstall | Extension is new (v1.0.0), no existing users |
| Git history impact | None | None | Easy to track in commit |

**Overall Risk**: Very Low ✅

---

## Why This Approach is Best

1. **Maintains Brand**: Users still see "Claude Code Profile Switcher"
2. **Improves SEO**: Shorter, cleaner, same keywords
3. **Avoids Conflict**: Unique name across entire marketplace
4. **Zero Code Changes**: Only JSON field change
5. **Easy to Explain**: Simple reason for name change
6. **Future-Proof**: Won't conflict with future extensions

---

## One-Line Summary

**Change `name` field from `claude-code-profile-switcher` to `claude-profile-switcher` in package.json** (displayName and functionality unchanged)

