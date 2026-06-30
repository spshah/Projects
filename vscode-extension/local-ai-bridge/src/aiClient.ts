import axios from 'axios';
import * as vscode from 'vscode';

export async function askLocalAI(codeSnippet: string): Promise<string> {
    const config = vscode.workspace.getConfiguration('localAIDebugger');
    const url = config.get<string>('serverUrl') || "http://127.0.0.1:8080/completion";

    const payload = {
        prompt: `Analyze this code and suggest a fix:\n\n${codeSnippet}`,
        n_predict: 512
    };

    try {
        const response = await axios.post(url, payload);
        return response.data.content; // llama.cpp response format
    } catch (error) {
        throw new Error(`Connection failed: ${error}`);
    }
}