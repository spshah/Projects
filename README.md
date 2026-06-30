# Projects Monorepo

A unified repository hosting multiple IDE extensions for Visual Studio and VS Code.

## Repository Structure

```
projects/
├── vscode-extension/          # VS Code Extensions
│   ├── claude-code-profile-switcher/    # Claude Code profile switcher extension
│   └── local-ai-bridge/                 # Local AI Bridge for VS Code
│
├── vs-extension/              # Visual Studio Extensions
│   ├── llmcopilot/                      # LLM Copilot for VS 2019/2022
│   └── localaibridge-cpp/               # Local AI Bridge C++ native code
│
├── docs/
│   └── images/                # Shared documentation assets
│
└── .github/workflows/         # CI/CD Workflows (future)
```

## Extensions

### VS Code Extensions

#### Claude Code Profile Switcher
- **Path**: `vscode-extension/claude-code-profile-switcher/`
- **Description**: Switch between Claude Code configuration profiles with visual indicators
- **Build**: `npm install && npm run compile`
- **Package**: `vsce package`

#### Local AI Bridge
- **Path**: `vscode-extension/local-ai-bridge/`
- **Description**: Communicate between VS Code and local Llama models
- **Build**: `npm install && npm run compile`
- **Package**: `vsce package`

### Visual Studio Extensions

#### LLM Copilot
- **Path**: `vs-extension/llmcopilot/`
- **Description**: LLM-powered copilot for Visual Studio 2019/2022
- **Supported Versions**: VS 2019, VS 2022
- **Build**: Open `LLMCopilot.sln` in Visual Studio

#### Local AI Bridge (C++ Version)
- **Path**: `vs-extension/localaibridge-cpp/`
- **Description**: Local AI Bridge for Visual Studio 2017 (C++ native extension)
- **Build**: Open `LocalAIBridge.sln` in Visual Studio 2017 or later

## Development

### Prerequisites

- **For VS Code Extensions**: Node.js 14+, npm, vsce
- **For VS Extensions**: Visual Studio 2017 or later, .NET Framework

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repo-url> projects
   cd projects
   ```

2. Install dependencies for a specific extension:
   ```bash
   cd vscode-extension/claude-code-profile-switcher
   npm install
   ```

3. Build and test:
   - **VS Code**: `npm run compile`
   - **Visual Studio**: Open `.sln` file in Visual Studio and build

### Branch Workflow

- **`master`**: Production-ready code, deployable branch
- **`dev`**: Development branch for active feature work

### Building Extensions

#### VS Code Extensions
```bash
cd vscode-extension/<extension-name>
npm install
npm run compile
vsce package  # Creates .vsix file
```

#### Visual Studio Extensions
```bash
# Open in Visual Studio and build through the IDE
# Or use MSBuild from command line:
msbuild vs-extension/<extension-name>/<solution.sln>
```

## CI/CD

CI/CD workflows are defined in `.github/workflows/` (see `.github/workflows/README.md` for details).

## Contributing

Please ensure:
- Code follows project conventions
- All tests pass before committing
- Commits are made to the `dev` branch
- PRs target the `dev` branch for integration testing

## License

See individual extension directories for license information.
