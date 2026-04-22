import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('local-aibridge.analyze', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const code = editor.document.getText(editor.selection);
        if (!code) {
            vscode.window.showInformationMessage("Select code to analyze!");
            return;
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Calling Local AI...",
        }, async () => {
            try {
                const response = await axios.post("http://127.0.0.1:8080/completion", {
                    prompt: `Analyze this code:\n${code}`,
                    n_predict: 256
                });
                vscode.window.showInformationMessage("Analysis Complete! Check Output.");
                console.log(response.data.content);
            } catch (err) {
                vscode.window.showErrorMessage("AI Server not found!");
            }
        });
    });
    context.subscriptions.push(disposable);
}