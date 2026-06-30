# Local AI Bridge for Visual Studio (C++)

**C++ native integration for Visual Studio 2017, 2019, and 2022 — bridge your local development environment with local LLM inference servers.**

A lightweight console application that connects Visual Studio to local llama.cpp inference servers, enabling in-editor code analysis using local LLM models without sending code to the cloud.

## Overview

### Purpose
Local AI Bridge (C++) provides a **code analysis utility** that:
1. **Detects** a running local llama.cpp inference server
2. **Auto-launches** the server if not already running
3. **Sends code snippets** to the local LLM for analysis
4. **Displays results** in the console

This is the Visual Studio equivalent of the VS Code `local-ai-bridge` extension, optimized for Windows native development.

### Key Characteristics
| Aspect | Details |
|--------|---------|
| **Language** | C++ (native Windows, Win32 APIs) |
| **Platform** | Windows 10/11, x86/x64 |
| **IDE Support** | Visual Studio 2017, 2019, 2022 |
| **Deployment** | Console executable (`.exe`) |
| **Communication** | HTTP (WinInet) to localhost:8080 |
| **Privacy** | 100% local (localhost-only) |

## Architecture

```
LocalAIBridge.cpp / Source.cpp
    ↓
    ├─→ SERVER DETECTION
    │   └─→ Check if llama.cpp running on :8080
    │
    ├─→ AUTO-LAUNCH SERVER (if needed)
    │   └─→ CreateProcess() → llama-server.exe
    │
    ├─→ CODE ANALYSIS REQUEST
    │   ├─→ Accept code snippet (argv or interactive)
    │   ├─→ Format prompt with system instructions
    │   ├─→ JSON-escape payload
    │   └─→ POST to /completion endpoint
    │
    └─→ RESPONSE PARSING
        ├─→ Extract "content" field from JSON
        ├─→ Unescape special characters
        └─→ Display to console
```

## Features

### 1. Server Auto-Detection & Launch
- **Silent check**: Attempts HTTP connection to `127.0.0.1:8080`
- **Auto-launch**: If server not found, spawns `llama-server.exe` with model and parameters
- **Configurable paths**: Hardcoded in source (see [Configuration](#configuration))
- **Graceful fallback**: If launch fails, shows error and exits

### 2. Code Analysis
- **Input modes**:
  - **Command-line**: Pass code as argv: `LocalAIBridge.exe "int x = 5;"`
  - **Interactive**: Menu-driven input for multi-line code blocks
- **Prompt templates**: Built-in system instructions for code analysis
- **JSON handling**: Full request/response JSON parsing without external libraries

### 3. Response Processing
- **Streaming**: Reads HTTP response in 2048-byte chunks
- **JSON extraction**: Parses `"content"` field from llama.cpp response
- **Unescape**: Handles `\n`, `\r`, `\t` sequences
- **Display**: Pretty-printed output with section headers

### 4. Configurable Inference
```cpp
// From LocalAIBridge.cpp (lines 16-20):
std::string llamaPath = "D:\\Shashi\\Misc\\llama-b8882-bin-win-vulkan-x64\\llama-server.exe";
std::string modelPath = "D:\\Shashi\\Misc\\Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf";
std::string args = " -m \"" + modelPath + "\" -ngl 0 -c 2048 -t 4 --port 8080";
// -ngl 0 = CPU-only (Vulkan disabled)
// -c 2048 = Context window
// -t 4 = Threads
// --port 8080 = Server port
```

## Building

### Prerequisites
- **Visual Studio**: 2017, 2019, or 2022 (Community, Professional, or Enterprise)
- **C++ Desktop Workload**: Install "Desktop development with C++" workload
- **Windows SDK**: Included with Visual Studio

### Build Steps

#### Option 1: Visual Studio IDE (Recommended)
```bash
cd vs-extension/localaibridge-cpp

# Open solution in Visual Studio
LocalAIBridge.sln

# In Visual Studio:
# 1. Select build configuration: Debug or Release
# 2. Select platform: Win32 (x86) or x64
# 3. Build → Build Solution (F7)
# Output: bin/Debug/ or bin/Release/LocalAIBridge.exe
```

#### Option 2: Command Line (MSBuild)
```bash
cd vs-extension/localaibridge-cpp

# Build Release x64
msbuild LocalAIBridge.sln /p:Configuration=Release /p:Platform=x64

# Build Release x86
msbuild LocalAIBridge.sln /p:Configuration=Release /p:Platform=Win32

# Output: LocalAIBridge/Release/LocalAIBridge.exe
```

#### Option 3: Developer Command Prompt
```cmd
cd vs-extension/localaibridge-cpp

REM Open "Developer Command Prompt for VS 2022" (or your VS version)
msbuild LocalAIBridge.sln /m
```

### Build Configurations

| Config | Usage | Optimization |
|--------|-------|--------------|
| **Debug** | Development/testing | No optimization, full debug symbols |
| **Release** | Production/distribution | Optimized, minimal size |

### Output Locations
- **Debug**: `LocalAIBridge/Debug/LocalAIBridge.exe`
- **Release**: `LocalAIBridge/Release/LocalAIBridge.exe`

## Usage

### Installation

1. **Build the project** (see [Building](#building))
2. **Locate the executable**:
   ```
   vs-extension/localaibridge-cpp/LocalAIBridge/Release/LocalAIBridge.exe
   ```
3. **(Optional) Add to PATH**:
   ```cmd
   setx PATH "%PATH%;C:\path\to\vs-extension\localaibridge-cpp\LocalAIBridge\Release"
   ```

### Running

#### Interactive Mode
```cmd
LocalAIBridge.exe

Output:
    1. Input Code Manually
    2. Exit
    Selection: 1
    
    Enter code (Type 'END' on a new line to finish):
    int* ptr = nullptr;
    *ptr = 42;
    END
    
    === AI ANALYSIS ===
    [Response from LLM...]
    ===================
```

#### Command-Line Mode
```cmd
LocalAIBridge.exe "int x = 5; std::cout << x << std::endl;"

Output:
    Analyzing selection from Visual Studio...
    [Connection attempt...]
    
    === AI ANALYSIS ===
    [Response from LLM...]
    ===================
    
    --- Done ---
    Press Enter to close.
```

### Integration with Visual Studio

#### Option 1: External Tool
1. **Tools → External Tools → Add**:
   - **Title**: `Local AI Analyze`
   - **Command**: `C:\path\to\LocalAIBridge.exe`
   - **Arguments**: `$(ItemPath)` (or clipboard content if needed)
   - **Initial Directory**: `$(SolutionDir)`
   - ✓ **Close on exit**: Checked

2. **Use**: Tools → Local AI Analyze

#### Option 2: Macro (VS 2017/2019)
Create a macro that:
1. Gets selected text from editor
2. Saves to temp file
3. Calls `LocalAIBridge.exe` with temp file path
4. Displays results

#### Option 3: Build Event
Add to `LocalAIBridge.vcxproj` Post-Build Event:
```xml
<PostBuildEvent>
  <Command>echo LocalAIBridge built: $(TargetPath)</Command>
</PostBuildEvent>
```

## Configuration

### Server Connection
Edit `LocalAIBridge.cpp` lines 16-20 to configure:

```cpp
// Server executable and model path
std::string llamaPath = "D:\\Shashi\\Misc\\llama-b8882-bin-win-vulkan-x64\\llama-server.exe";
std::string modelPath = "D:\\Shashi\\Misc\\Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf";

// Server startup arguments
std::string args = " -m \"" + modelPath + "\" -ngl 0 -c 2048 -t 4 --port 8080";
```

### Model Selection
Replace `modelPath` with your preferred GGUF file:
```cpp
// Examples:
// std::string modelPath = "C:\\models\\mistral-7b.gguf";
// std::string modelPath = "C:\\models\\neural-chat-7b.gguf";
// std::string modelPath = "C:\\models\\openchat-3.5.gguf";
```

### Server Parameters
| Parameter | Default | Meaning |
|-----------|---------|---------|
| `-m` | (required) | Model file path |
| `-ngl` | `0` | GPU layers (0=CPU only, 99=all) |
| `-c` | `2048` | Context window size |
| `-t` | `4` | Number of threads |
| `--port` | `8080` | Server port |

For full llama.cpp options, see: https://github.com/ggerganov/llama.cpp#server

### Prompt Customization
Edit the system prompt in `LocalAIBridge.cpp` (lines 46-49):

```cpp
std::string fullInternalPrompt =
    "<|im_start|>system\n"
    "You are a precise C++ debugger. Analyze the code concisely.<|im_end|>\n"
    "<|im_start|>user\n" + codeSnippet + "<|im_end|>\n"
    "<|im_start|>assistant\n";
```

Change `"You are a precise C++ debugger..."` to any instruction you prefer.

## Technical Details

### Dependencies
**External libraries** (all built-in to Windows):
- `windows.h` - Core Windows API
- `wininet.h` - HTTP client (WinInet API)
- Standard C++ library (`iostream`, `string`, `vector`)

**Linked libraries**:
```xml
<AdditionalDependencies>wininet.lib;kernel32.lib;user32.lib;gdi32.lib;winspool.lib;comdlg32.lib;advapi32.lib;shell32.lib;ole32.lib;oleaut32.lib;uuid.lib;odbc32.lib;odbccp32.lib;%(AdditionalDependencies)</AdditionalDependencies>
```

### HTTP Communication
- **Protocol**: HTTP/1.1
- **Method**: POST
- **Endpoint**: `/completion`
- **Content-Type**: `application/json`
- **Payload**: 
  ```json
  {
    "prompt": "<escaped-prompt>",
    "n_predict": 256,
    "temperature": 0.1
  }
  ```

### JSON Handling
**No external JSON library** — uses custom string escaping (lines 52-67):
- Escapes: `"`, `\`, `\n`, `\r`, `\t`, control characters
- Unescape: Converts `\n` back to actual newlines in response

### Memory Management
- **Stack allocation**: Prompt strings, JSON payloads
- **No dynamic allocation**: No pointers except HANDLE (Windows API)
- **String buffers**: 2048-byte response buffer

## Troubleshooting

### "Connection failed. Is the server running on port 8080?"
**Causes**:
1. llama.cpp server not running
2. Server on different port
3. Firewall blocking localhost:8080

**Solutions**:
```bash
# Check if server is running
netstat -ano | findstr :8080

# Start server manually
llama-server -m model.gguf --port 8080

# Verify connectivity
curl http://127.0.0.1:8080/health
```

### Server doesn't auto-launch
**Causes**:
1. Incorrect `llamaPath` in source code
2. Model path not found
3. Insufficient disk/memory space

**Solutions**:
1. Verify paths exist:
   ```cmd
   dir "D:\Shashi\Misc\llama-b8882-bin-win-vulkan-x64\llama-server.exe"
   dir "D:\Shashi\Misc\Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf"
   ```
2. Test manual launch:
   ```cmd
   "D:\Shashi\Misc\llama-b8882-bin-win-vulkan-x64\llama-server.exe" -m "D:\Shashi\Misc\Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf" --port 8080
   ```
3. Check disk space: `dir C:\` (should have >2GB free)

### "Press Enter to close" dialog hangs
**Cause**: Interactive mode waiting for user input

**Solution**: Press `Enter` or provide input

### Slow response or timeout
**Causes**:
1. Model still loading into VRAM (first run)
2. GPU out of memory
3. Model too large for system

**Solutions**:
1. Increase `Sleep(3000)` timeout in `LocalAIBridge.cpp` line 124
2. Reduce `-ngl` parameter (fewer GPU layers)
3. Use smaller model (`-7b` instead of `-70b`)

## Architecture Comparison

### LocalAIBridge-CPP vs Local-AI-Bridge (VS Code)

| Feature | VS (C++) | VS Code (TypeScript) |
|---------|----------|----------------------|
| **Platform** | Windows x86/x64 | Cross-platform |
| **Deployment** | Standalone .exe | VS Code extension (.vsix) |
| **Integration** | External tool | Native VS Code commands |
| **Auto-launch** | ✅ Built-in | ⚠️ Manual |
| **Server detection** | ✅ Yes | ⚠️ Requires manual config |
| **Code duplication** | ⚠️ HTTP client logic | ⚠️ HTTP client logic |

### Future Consolidation
Both projects share:
- HTTP communication with llama.cpp
- JSON request/response handling
- Server auto-detection logic

**Potential shared library**:
```
shared/
├── ai-server-client/   # HTTP + JSON utilities
├── prompt-templates/   # Standard prompts
└── config.json        # Shared configuration
```

This would eliminate duplication but require cross-platform build setup.

## Development

### Project Structure
```
LocalAIBridge.sln
├── LocalAIBridge.vcxproj
│   ├── LocalAIBridge.cpp       # Main implementation (preferred)
│   ├── Source.cpp              # Alternative implementation
│   ├── LocalAIBridge.vcxproj.filters
│   └── LocalAIBridge.vcxproj.user
└── LocalAIBridge.sln (solution file)
```

### Build Artifacts
```
LocalAIBridge/
├── Debug/
│   ├── LocalAIBridge.exe       (debug executable)
│   ├── LocalAIBridge.pdb       (debug symbols)
│   └── *.obj, *.ilk            (build intermediate)
└── Release/
    ├── LocalAIBridge.exe       (optimized executable)
    └── LocalAIBridge.pdb       (release symbols, optional)
```

### Editing & Rebuilding
1. Open `vs-extension/localaibridge-cpp/LocalAIBridge.sln` in Visual Studio
2. Edit `LocalAIBridge.cpp` or `Source.cpp`
3. Press `F7` (Build Solution) or `Ctrl+Shift+B`
4. Output appears in Build Output window
5. Test the new `.exe` from `LocalAIBridge/Debug/` or `Release/`

### Code Style
- **C++**: Modern C++11/14 (Win32 API focused)
- **Naming**: camelCase for variables, UPPERCASE for constants
- **Comments**: Document complex logic, especially JSON handling

## Security Considerations

### Input Validation
- **Command-line args**: Passed directly to `AskAI()` (no validation)
- **Server response**: Basic JSON parsing (no schema validation)
- **File paths**: Hardcoded (no user input)

**Recommendation**: Add input sanitization if accepting user file paths

### API Security
- **HTTP only** (no encryption): Safe for localhost-only communication
- **No authentication**: Assumes local-only server access
- **JSON injection**: Minimal risk (custom escaping handles quotes/newlines)

### Executable Signing
Currently unsigned. To sign:
```cmd
signtool sign /f cert.pfx /p password /t http://timestamp.server LocalAIBridge.exe
```

## License

See `vs-extension/localaibridge-cpp/LICENSE` (if present) or inherit from parent repository.

## Related Projects

- **VS Code Local AI Bridge**: `vscode-extension/local-ai-bridge/`
- **Claude Code Profile Switcher**: `vscode-extension/claude-code-profile-switcher/`
- **llama.cpp**: https://github.com/ggerganov/llama.cpp
- **Ollama**: https://ollama.ai

## Support & Contributing

For issues, suggestions, or contributions:
1. File an issue in the main repository
2. Reference this extension: `vs-extension/localaibridge-cpp`
3. Include: Visual Studio version, model name, error output

## Changelog

### v1.0.0 (Initial Release)
- ✅ Server auto-detection and launch
- ✅ Code analysis via HTTP
- ✅ JSON request/response handling
- ✅ Interactive and command-line modes
- ✅ Prompt customization support
