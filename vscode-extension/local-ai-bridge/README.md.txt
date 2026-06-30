# Local AI Bridge

A lightweight VS Code extension designed to bridge your local development environment with local LLM inference servers (optimized for **llama.cpp**). It allows you to analyze code snippets directly within the editor without sending data to the cloud.

## Features

* **Code Analysis**: Select any block of code and get instant feedback or fixes from your local model.
* **Progress Notification**: Integrated VS Code progress bar while waiting for AI generation.
* **Privacy-Focused**: All communication happens via `localhost`.

## Prerequisites

1.  **Inference Server**: You must have a local server running (e.g., `llama.cpp` or `Ollama`).
    * Default URL: `http://127.0.0.1:8080/completion`
2.  **Node.js & NPM**: Required for building and packaging the extension.

## Extension Settings

This extension contributes the following settings:

* `localAIDebugger.serverUrl`: The endpoint for your local inference server (default: `http://127.0.0.1:8080/completion`).

## Usage

1.  Open any source file.
2.  Highlight the code snippet you want to analyze.
3.  Open the Command Palette (`Ctrl+Shift+P`).
4.  Run the command: **Local AI Bridge: Analyze**.
5.  Check the developer console or information messages for the AI response.

## Development & Build Commands

### 1. Setup Environment
Install the required dependencies for communication and type safety:
```bash
npm install axios
npm install --save-dev typescript @types/vscode @types/node
```

### 2. Compile TypeScript

Transpile the source code into the out/ folder:
```bash
npm run compile
```

### 3. Packaging

To create a .vsix file for distribution or personal use:

Install the packager globally:
```bash
npm install -g @vscode/vsce
```

Generate the package:
```bash
vsce package
```
## License
This project is licensed under the MIT License - free for personal use and distribution.


