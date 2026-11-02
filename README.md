# Projects Monorepo

A unified repository hosting multiple IDE extensions for Visual Studio and VS Code, focused on integrating local AI inference capabilities into development workflows.

## Repository Structure

```
projects/
├── vscode-extension/          # VS Code Extensions
│   ├── claude-code-profile-switcher/    # Multi-profile Claude Code switcher
│   └── local-ai-bridge/                 # Local AI inference integration
│
├── vs-extension/              # Visual Studio Extensions
│   └── localaibridge-cpp/     # Local AI Bridge C++ (VS 2017+)
│
├── docs/
│   └── images/                # Shared documentation assets
│
└── .github/workflows/         # CI/CD Workflows (future)
```

## Extensions Overview

### VS Code Extensions

#### 1. Claude Code Profile Switcher
- **Path**: `vscode-extension/claude-code-profile-switcher/`
- **Purpose**: Multi-account management for Claude Code
- **Language**: JavaScript/TypeScript
- **Key Features**:
  - One-click profile switching (work/personal/client accounts)
  - Automatic symlink management (supports Windows junctions, Linux symlinks, WSL)
  - Shell aliases for terminal-based switching
  - Platform-aware (Windows PowerShell, bash/zsh, WSL)
  - Security: User-scoped settings, path validation, workspace-protection
- **Build**: `npm install && npm run compile`
- **Package**: `vsce package`
- **Security Status**: ✅ Audited (includes shell injection prevention, arbitrary-delete protection)

See [vscode-extension/claude-code-profile-switcher/README.md](vscode-extension/claude-code-profile-switcher/extension/README.md) for detailed documentation.

#### 2. Local AI Bridge (VS Code)
- **Path**: `vscode-extension/local-ai-bridge/`
- **Purpose**: Code analysis using local LLM inference servers
- **Language**: TypeScript
- **Key Features**:
  - Integrates with llama.cpp or Ollama servers
  - Privacy-focused (localhost-only communication)
  - Code snippet analysis directly in editor
  - Progress notifications
- **Build**: `npm install && npm run compile`
- **Package**: `vsce package`

See [vscode-extension/local-ai-bridge/README.md](vscode-extension/local-ai-bridge/README.md.txt) for detailed documentation.

### Visual Studio Extensions

#### Local AI Bridge (C++ Version)
- **Path**: `vs-extension/localaibridge-cpp/`
- **Purpose**: C++ native integration for VS 2017+ with local AI inference
- **Language**: C++ (native Windows, Win32 API)
- **Target IDE**: Visual Studio 2017, 2019, 2022 (x86/x64)
- **Key Features**:
  - Launches local llama.cpp inference server
  - Sends code snippets for AI analysis via HTTP
  - Automatic server detection and launch
  - Vulkan acceleration support (configurable)
  - Interactive menu for manual code analysis
- **Build**: Open `vs-extension/localaibridge-cpp/LocalAIBridge.sln` in Visual Studio
- **Output**: `*.exe` console application

See [vs-extension/localaibridge-cpp/README.md](vs-extension/localaibridge-cpp/README.md) for detailed documentation.

## Project Analysis: Can They Be Merged?

### Summary: **Partial Merge Possible (with Caveats)**

**The VS Code extensions (`claude-code-profile-switcher` and `local-ai-bridge`) should NOT be merged — they serve fundamentally different purposes.**

**The VS extensions:** Currently only has `localaibridge-cpp` (LLMCopilot was removed due to untracked source files).

#### Detailed Analysis

| Aspect | claude-code-profile-switcher | local-ai-bridge (VS Code) | localaibridge-cpp (VS) |
|--------|------------------------------|--------------------------|------------------------|
| **Purpose** | Profile management | Code analysis | Code analysis |
| **Dependencies** | Claude Code CLI | llama.cpp/Ollama | llama.cpp (local) |
| **Language** | TypeScript/JavaScript | TypeScript | C++ (Win32) |
| **Platform** | Cross-platform | Cross-platform | Windows only |
| **Scope** | Account/config mgmt | Dev tool integration | Dev tool integration |
| **Shared Code** | None | ❌ Could share inference logic | ❌ Could share inference logic |
| **Users** | Multi-account Claude users | Code analysis needs | VS code analysis needs |

#### Merge Recommendations

1. **✅ DO NOT merge claude-code-profile-switcher with others**
   - It has a distinct, non-overlapping purpose
   - Users may need it without needing code analysis
   - Keeps concerns separate and maintainable

2. **⚠️ local-ai-bridge (VS Code) + localaibridge-cpp (VS) → Potential Consolidation**
   - **Shared Functionality**: Both integrate with local AI inference servers
   - **Recommendation**: Extract common utilities (e.g., server communication, prompt templates) into a **shared library**
   - **Structure Option A (Recommended)**:
     ```
     ai-inference-library/       # Shared: HTTP client, JSON parsing, server detection
     ├── src/
     │   ├── server-client.ts    # Shared inference server communication
     │   ├── prompts.ts          # Shared prompt templates
     │   └── utils.ts            # JSON handling, etc.
     ├── package.json
     └── README.md
     
     vscode-extension/local-ai-bridge/   # Uses ai-inference-library
     vs-extension/localaibridge-cpp/     # Reimplements (C++ - can't consume JS lib)
     ```
   - **Structure Option B (Current)**:
     ```
     # Keep as-is (simple, no dependencies between projects)
     # Trade-off: Some code duplication, full independence
     ```

3. **⚠️ Future: Architectural Unification**
   - Consider consolidating under a single "Local AI Platform"
   - Could support multiple IDEs (VS, VS Code, JetBrains, etc.)
   - Would require significant refactoring

#### Recommendation
**Keep current structure (Option B) for now:**
- ✅ **Pros**: Simple, independent, no cross-platform build complexity
- ❌ **Cons**: Code duplication (HTTP client, server detection)
- **Action**: Document in each project's README that `localaibridge-cpp` is the Visual Studio equivalent of `local-ai-bridge` for VS Code

## Development & Build

### Prerequisites

| Tool | Version | Required For |
|------|---------|--------------|
| Node.js | 14+ | VS Code extensions |
| npm | 6+ | VS Code extensions |
| vsce | Latest | Packaging VS Code extensions |
| Visual Studio | 2017+ | Building/debugging VS extensions (C++) |
| Python | 3.6+ | (Optional) Build scripts |

### Quick Start

1. **Clone and enter dev branch**:
   ```bash
   git clone <repo-url> projects
   cd projects
   git checkout dev
   ```

2. **Build a single extension**:
   ```bash
   # VS Code Extension (example: claude-code-profile-switcher)
   cd vscode-extension/claude-code-profile-switcher/extension
   npm install
   npm run compile
   vsce package  # Creates .vsix file
   
   # OR Visual Studio Extension (C++)
   cd vs-extension/localaibridge-cpp
   # Open LocalAIBridge.sln in Visual Studio and build
   ```

3. **Run/test**:
   - **VS Code**: `code --install-extension <path-to-.vsix>`
   - **VS**: Build and deploy through Visual Studio (F5 or Build > Deploy Solution)

### Full Build Process

#### VS Code Extensions
```bash
cd vscode-extension/<extension-name>/extension

# Install dependencies
npm install

# Compile TypeScript → JavaScript
npm run compile

# (Optional) Run linter
npm run lint

# Package as .vsix
vsce package

# Install locally for testing
code --install-extension <name>-<version>.vsix

# Uninstall after testing
code --uninstall-extension <publisher>.<name>
```

#### Visual Studio C++ Extension
```bash
cd vs-extension/localaibridge-cpp

# Visual Studio IDE: Open LocalAIBridge.sln and build (F7)
# Or MSBuild command line:
msbuild LocalAIBridge.sln /p:Configuration=Release /p:Platform=x64

# Output: bin/Release/LocalAIBridge.exe
```

### Branch Workflow

| Branch | Purpose | Deployment |
|--------|---------|-----------|
| **`master`** | Production-ready code | Direct to marketplace/releases |
| **`dev`** | Active development | Feature branches, testing, pre-release |

**Workflow**:
```
1. Feature work on `dev` or feature branch
2. Test locally
3. Create PR → `dev`
4. After review and testing: merge
5. Tag release on `dev`
6. Fast-forward merge: `dev` → `master`
7. Create GitHub release from `master`
```

## Configuration & Setup

### Environment Variables

**For local development**:
```bash
# Optional: Point to custom llama.cpp server
export LLAMA_SERVER_URL="http://127.0.0.1:8080"

# Optional: Enable debug logging
export DEBUG="*"
```

### Local Testing with Inference Server

To test the AI-integration extensions locally:

1. **Start a local inference server**:
   ```bash
   # Using llama.cpp
   ./llama-server -m model.gguf --port 8080
   
   # OR using Ollama
   ollama run mistral  # Runs on 127.0.0.1:11434 by default
   ```

2. **Update extension settings** (if needed):
   - For `local-ai-bridge` (VS Code): Set `localAIDebugger.serverUrl`
   - For `localaibridge-cpp` (VS): Edit hardcoded URL in `LocalAIBridge.cpp` line 16

3. **Test the extension**:
   - Select code and run the "Analyze" command
   - Watch the inference server logs to verify requests

## CI/CD

CI/CD workflows are defined in `.github/workflows/`. See `.github/workflows/README.md` for details on:
- Automated testing
- Build verification
- Extension packaging
- Release automation

## Security Considerations

### Code Execution & Validation
- **claude-code-profile-switcher**: Shell alias/PowerShell injection prevention via path validation
- **local-ai-bridge**: Validates JSON responses from inference servers
- **localaibridge-cpp**: Uses Win32 APIs directly (no shell interpretation)

### Data Privacy
- **All extensions**: Local-only communication (localhost/127.0.0.1)
- **No cloud transmission**: All inference happens on user's local server
- **Config isolation**: Each profile/instance isolated via filesystem

See individual extension READMEs for detailed security policies.

## Contributing

### Standards
- Code follows project conventions (see individual extension READMEs)
- All tests pass before committing
- Commits use conventional commits format
- Security-sensitive changes require additional review

### Pull Request Process
1. Create feature branch from `dev`
2. Implement changes with tests
3. Submit PR with description
4. Address review comments
5. Maintainer merges to `dev`
6. Periodically fast-forward `dev` → `master` for releases

## License

Each extension is licensed separately:
- **claude-code-profile-switcher**: MIT (see license file)
- **local-ai-bridge**: MIT (see license file)
- **localaibridge-cpp**: (See vs-extension/localaibridge-cpp/LICENSE)

## Related Resources

- **Claude Code**: https://claude.com/claude-code
- **llama.cpp**: https://github.com/ggerganov/llama.cpp
- **Ollama**: https://ollama.ai
- **VS Code Extension API**: https://code.visualstudio.com/api
- **VS Extension Development**: https://docs.microsoft.com/en-us/visualstudio/extensibility/

## Legacy Projects

The repository root also holds older, finished coursework/demo projects from before this became an
extensions monorepo (`Bird_Species_Classification/`, `Chatbot/`, `Inframind-Kirana/`,
`Shashi-Portfolio/`, `side_small_projects/`). They're archival — not under active development and
unrelated to the extensions above.
