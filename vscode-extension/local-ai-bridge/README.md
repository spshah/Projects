# Local AI Bridge for VS Code

**Enable code analysis using local LLM inference servers directly in VS Code — private, fast, and zero cloud dependencies.**

A lightweight VS Code extension that bridges your code editor with local llama.cpp or Ollama inference servers, providing instant code analysis without sending your code to the cloud.

## Overview

### Purpose
Local AI Bridge transforms VS Code into an AI-powered code analysis tool by:
1. **Capturing** your selected code snippets
2. **Sending** them to a local LLM inference server (llama.cpp, Ollama, etc.)
3. **Displaying** AI-generated analysis, explanations, or suggestions in the editor

### Key Features
- 🔒 **Privacy**: All communication is localhost-only (no cloud)
- ⚡ **Fast**: Local inference means zero network latency
- 📝 **Multi-language**: Works with any code (C++, Python, JavaScript, etc.)
- 🎯 **In-editor**: Results displayed directly in VS Code notifications
- ⚙️ **Configurable**: Custom server URL and model parameters
- 🚀 **Lightweight**: No dependencies beyond VS Code built-ins

## Quick Start

### Prerequisites
1. **Local inference server running**:
   - **llama.cpp**: `./llama-server -m model.gguf --port 8080`
   - **Ollama**: `ollama run mistral` (runs on `127.0.0.1:11434`)
2. **VS Code**: 1.94.0 or later
3. **Network**: Localhost only (no internet required)

### Installation

#### From VS Code Marketplace (When Published)
1. Open VS Code
2. Go to **Extensions** (`Ctrl+Shift+X` on Windows/Linux, `Cmd+Shift+X` on Mac)
3. Search for **"Local AI Bridge"**
4. Click **Install**

#### From VSIX File (Development)
```bash
cd vscode-extension/local-ai-bridge
npm install
npm run compile
vsce package

# Install the generated .vsix
code --install-extension local-ai-bridge-*.vsix
```

### First Use
1. **Configure server URL** (optional, defaults to `http://127.0.0.1:8080/completion`):
   - Open Settings (`Cmd+,`)
   - Search for `localAIDebugger.serverUrl`
   - Update if your server runs on a different port

2. **Analyze code**:
   - Open any source file
   - Select a code snippet
   - Run Command Palette (`Ctrl+Shift+P`)
   - Execute: **Local AI Bridge: Analyze Code**
   - Results appear in notification popup

## Usage

### Basic Workflow

1. **Select code in editor**:
   ```javascript
   // Example: Select these lines
   function buggyFunction(arr) {
     return arr.map(x => x * 2).filter(x => x > 10);
   }
   ```

2. **Open Command Palette**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)

3. **Run command**: Type `Local AI Bridge` and select **Analyze Code**

4. **Review result**: 
   - ✅ AI analysis appears in notification
   - 📋 Output also visible in Output panel (`View → Output → Local AI Bridge`)

### Settings

#### `localAIDebugger.serverUrl`
**Type**: `string`  
**Default**: `http://127.0.0.1:8080/completion`  
**Description**: HTTP endpoint for local inference server

**Examples**:
```json
// llama.cpp on default port
"localAIDebugger.serverUrl": "http://127.0.0.1:8080/completion"

// Ollama on custom port
"localAIDebugger.serverUrl": "http://127.0.0.1:11434/api/generate"

// Custom machine on network (NOT recommended)
"localAIDebugger.serverUrl": "http://192.168.1.100:8080/completion"
```

### Commands

| Command | Keyboard Shortcut | Description |
|---------|------------------|------------|
| **Local AI Bridge: Analyze Code** | None (use Cmd Palette) | Send selected code to local LLM |
| **Local AI Bridge: Open Settings** | None | Jump to extension settings |

## Configuration

### Server Configuration

#### llama.cpp (Recommended)
```bash
# Download and extract llama.cpp
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && make

# Download a GGUF model (e.g., Mistral 7B)
wget https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/resolve/main/mistral-7b-instruct-v0.1.Q4_K_M.gguf

# Start the server
./llama-server -m mistral-7b-instruct-v0.1.Q4_K_M.gguf --port 8080
```

**VS Code setting**:
```json
"localAIDebugger.serverUrl": "http://127.0.0.1:8080/completion"
```

#### Ollama
```bash
# Install Ollama from https://ollama.ai

# Start a model (pulls if not present)
ollama run mistral

# Default endpoint
# http://127.0.0.1:11434/api/generate
```

**VS Code setting**:
```json
"localAIDebugger.serverUrl": "http://127.0.0.1:11434/api/generate"
```

#### Other Servers
Any HTTP server compatible with llama.cpp's `/completion` API endpoint will work:
- **TextGen WebUI**: `http://localhost:5000/api/v1/generate`
- **FastChat**: `http://localhost:8000/v1/completions`
- **LM Studio**: `http://localhost:1234/v1/completions`

### Environment Setup

#### Windows
```cmd
REM Set server URL via environment variable (optional)
set LLAMA_SERVER_URL=http://127.0.0.1:8080/completion

REM Then launch VS Code
code .
```

#### macOS / Linux
```bash
# Set server URL via environment variable (optional)
export LLAMA_SERVER_URL="http://127.0.0.1:8080/completion"

# Then launch VS Code
code .
```

### Prompt Customization

Edit `vscode-extension/local-ai-bridge/src/extension.ts` to customize the analysis prompt:

```typescript
// Lines ~80-90 (find the prompt construction):
const systemPrompt = `You are a code analysis expert. Analyze the following code snippet for:
- Logic errors
- Performance issues  
- Best practices
- Security vulnerabilities
- Suggestions for improvement`;

const userPrompt = `Analyze this code:\n\n${codeSnippet}`;

const payload = {
  prompt: `${systemPrompt}\n\n${userPrompt}`,
  n_predict: 256,
  temperature: 0.7
};
```

Rebuild after changes:
```bash
npm run compile
code --install-extension local-ai-bridge-*.vsix
```

## Architecture

### How It Works

```
┌─────────────────────────────────────────┐
│  VS Code Editor (vscode-extension)      │
│                                         │
│  1. User selects code                   │
│  2. Runs "Analyze" command              │
│  3. Captures selected text              │
└────────────┬────────────────────────────┘
             │
             ├─→ Validate input
             ├─→ Read settings (server URL)
             ├─→ Construct JSON payload
             │
             ↓
┌─────────────────────────────────────────┐
│  HTTP Request (axios library)           │
│  POST to localAIDebugger.serverUrl      │
│                                         │
│  {                                      │
│    "prompt": "<escaped-code>",          │
│    "n_predict": 256,                    │
│    "temperature": 0.7                   │
│  }                                      │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  Local Inference Server (llama.cpp)     │
│                                         │
│  1. Receive request                     │
│  2. Tokenize prompt                     │
│  3. Generate response (256 tokens max)  │
│  4. Return JSON with content            │
└────────────┬────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────┐
│  Response Parsing (extension.ts)        │
│                                         │
│  1. Receive JSON response               │
│  2. Extract "content" field             │
│  3. Unescape special characters         │
│  4. Display in notification/output      │
└─────────────────────────────────────────┘
```

### Components

| Component | Purpose | Technology |
|-----------|---------|-----------|
| `extension.ts` | Main extension logic | TypeScript + VS Code API |
| `aiClient.ts` | HTTP communication | axios (HTTP client) |
| `package.json` | Manifest & dependencies | npm |
| `tsconfig.json` | TypeScript configuration | TypeScript compiler |

## Development

### Setup

```bash
cd vscode-extension/local-ai-bridge

# Install dependencies
npm install

# Compile TypeScript → JavaScript
npm run compile

# (Optional) Watch mode (auto-recompile on save)
npm run watch
```

### Building

```bash
# Compile TypeScript
npm run compile

# (Optional) Lint code
npm run lint

# Package as .vsix for testing
vsce package

# Install locally
code --install-extension local-ai-bridge-*.vsix
```

### Testing Locally

1. **Open development folder in VS Code**:
   ```bash
   cd vscode-extension/local-ai-bridge
   code .
   ```

2. **Start extension in debug mode**:
   - Press `F5` or Debug → Start Debugging
   - New VS Code window opens with extension loaded

3. **Test the extension**:
   - Select code in the debug window
   - Run Command Palette: `Local AI Bridge: Analyze`
   - Check output in debug console

### Project Structure

```
vscode-extension/local-ai-bridge/
├── src/
│   ├── extension.ts          # Main extension entry
│   └── aiClient.ts           # HTTP client for server communication
├── out/                      # Compiled JavaScript (generated)
├── package.json              # Extension manifest
├── package-lock.json         # Dependency lock file
├── tsconfig.json             # TypeScript configuration
├── README.md                 # This file
└── LICENSE.txt               # License information
```

### Debugging

**Debug output**:
```typescript
// In extension.ts, add console logs:
console.log('[Local AI Bridge]', 'Analyzing code...');
```

**View in Debug Console**:
- Launch via `F5`
- Open Debug Console (`Ctrl+Shift+Y`)
- Logs appear in real-time

### Troubleshooting Development

#### "Cannot find module 'axios'"
```bash
npm install axios
npm run compile
```

#### "Extension crashes on activate"
1. Check Debug Console for errors
2. Verify `package.json` has correct `"main"` entry
3. Ensure TypeScript compiled successfully: `npm run compile`

#### "Server connection timeout"
1. Verify server is running: `curl http://127.0.0.1:8080`
2. Check VS Code settings for correct URL
3. Increase timeout in `aiClient.ts` (axios timeout config)

## Comparison with Other Extensions

### vs. Copilot / GitHub Copilot
| Feature | Local AI Bridge | GitHub Copilot |
|---------|-----------------|----------------|
| **Cloud** | ❌ No | ✅ Yes (cloud inference) |
| **Privacy** | ✅ 100% local | ⚠️ Code sent to GitHub |
| **Cost** | Free | $10/month |
| **Model** | Your choice | Closed-source |
| **Offline** | ✅ Yes | ❌ Requires internet |

### vs. Local-AI-Bridge (VS Extension, C++)
| Feature | VS Code | Visual Studio |
|---------|---------|--------------|
| **Integration** | Native VS Code commands | External .exe tool |
| **Platform** | Cross-platform (Linux/Mac/Windows) | Windows only |
| **Build** | npm install & compile | MSBuild/Visual Studio IDE |
| **Auto-launch** | Manual server start | Auto-launches server |
| **Mode** | In-editor notifications | Console window |

### vs. LLMCopilot (Legacy VS Extension, C#)
| Feature | This Extension | LLMCopilot |
|---------|----------------|-----------|
| **Status** | ✅ Active | ⚠️ Legacy (removed) |
| **Platform** | Cross-platform | Windows only (VS) |
| **Language** | TypeScript (Node.js) | C# (VS integrated) |
| **Server** | llama.cpp/Ollama | llama.cpp |

## Security Considerations

### Code Privacy
✅ **All analysis is local:**
- Code never leaves your machine
- Server runs on `127.0.0.1` (localhost only)
- No cloud transmission, no logging

### Input Validation
⚠️ **Minimal validation:**
- Selected code is sent as-is
- Server response is parsed but not validated against schema
- **Recommendation**: Don't send sensitive data (passwords, API keys)

### Server Trust
⚠️ **Only connect to trusted servers:**
- If using network server (not recommended): verify HTTPS cert
- Default `127.0.0.1:8080` is safe (local machine only)
- Public servers: not supported (security risk)

### Extension Trust
✅ **Open-source:**
- Full source code available in repository
- No telemetry or external calls
- Audit before installing

## Performance

### Typical Response Times
- **Code snippet (< 100 tokens)**: 2-5 seconds (CPU models)
- **Code snippet (< 100 tokens)**: 0.5-2 seconds (GPU accelerated)
- **Large snippet (< 500 tokens)**: 10-30 seconds (depends on model)

**Factors affecting speed**:
- Model size (7B vs 70B)
- GPU availability (CUDA, ROCm, Metal)
- System RAM/VRAM
- `n_predict` parameter (max tokens to generate)

### Optimization Tips
1. **Use smaller models**: 7B often better than 70B
2. **Enable GPU**: Compile llama.cpp with CUDA/ROCm
3. **Reduce context**: Lower `-c` parameter in llama.cpp
4. **Cache models in RAM**: Pre-load on startup

## Known Issues & Limitations

### Limitations
1. **Single selection only**: Cannot analyze multiple selections at once
2. **No streaming**: Waits for full response before displaying
3. **Manual server**: Must start inference server manually (no auto-launch in VS Code)
4. **Timeout**: 30-second default timeout (configurable in code)

### Known Issues
- **Long responses**: If LLM generates > 256 tokens, output may be truncated
  - **Fix**: Increase `n_predict` in payload (extension.ts line ~70)
- **Special characters**: Rare models with unusual tokenizers may cause escaping issues
  - **Fix**: Test with standard models (Mistral, Llama, Qwen)
- **Network models**: Cannot connect to remote servers for security
  - **Workaround**: SSH tunnel to local proxy, then update URL

## Roadmap

### Planned Features (v1.1.0+)
- [ ] Multi-selection analysis
- [ ] Response streaming (show results as they generate)
- [ ] Custom prompts per language (C++ prompts different from Python)
- [ ] Result caching to avoid re-analyzing identical code
- [ ] Server health check (verify connectivity on startup)
- [ ] Multiple server support (failover/load balancing)

### Potential Future
- [ ] Ollama model management (UI to pull/remove models)
- [ ] Keyboard shortcut for quick analysis
- [ ] Result history/comparison
- [ ] Integration with other local tools

## Contributing

### Bug Reports
1. Test with latest VS Code version
2. Verify server is running: `curl http://127.0.0.1:8080`
3. Share: Error message, code snippet, server logs

### Feature Requests
- Describe use case
- Reference similar extensions
- Explain why local implementation needed

### Code Contributions
1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Submit PR with description

### Development Setup
```bash
cd vscode-extension/local-ai-bridge
npm install

# Start development mode
npm run watch

# Open in VS Code
code .

# Press F5 to launch debug session
```

## License

MIT License — See `LICENSE.txt` for details.

## Related Projects

- **Claude Code Profile Switcher**: `vscode-extension/claude-code-profile-switcher/`
- **LocalAIBridge (VS, C++)**: `vs-extension/localaibridge-cpp/`
- **llama.cpp**: https://github.com/ggerganov/llama.cpp
- **Ollama**: https://ollama.ai

## Support

### Getting Help
1. **Check troubleshooting section** above
2. **Verify server is running**: `curl http://127.0.0.1:8080/health`
3. **Check VS Code output panel**: View → Output → Local AI Bridge
4. **File issue** with server logs and error message

### Resources
- **llama.cpp Docs**: https://github.com/ggerganov/llama.cpp#api
- **Ollama Docs**: https://ollama.ai/docs
- **VS Code API**: https://code.visualstudio.com/api

## Changelog

### v1.0.0 (Initial Release)
- ✅ Code analysis via local inference servers
- ✅ Support for llama.cpp and Ollama
- ✅ Configurable server URL
- ✅ In-editor notifications
- ✅ Progress indicator
- ✅ Output panel logging
