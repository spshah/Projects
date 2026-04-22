# 1. Generate a package.json if you haven't yet
npm init -y

# 2. Install the necessary "Modular" dependencies
# axios: for HTTP calls to llama-server
# vscode: the type definitions for the editor
npm install axios
npm install --save-dev typescript @types/vscode @types/node

Install the packager:

DOS
npm install -g @vscode/vsce
Create the package:

DOS
vsce package
