#include <windows.h>
#include <wininet.h>
#include <iostream>
#include <string>
#include <vector>

#pragma comment(lib, "wininet.lib")

// --- PART 1: THE BRIDGE (UNCHANGED) ---
void RunServer() {
	std::string llamaPath = "D:\\Shashi\\Misc\\llama-b8882-bin-win-vulkan-x64\\llama-server.exe";
	std::string modelPath = "D:\\Shashi\\Work\\CheckerApp_1\\Misc\\Qwen2.5-Coder-1.5B-Instruct-Q4_K_M.gguf";

	std::string args = " -m \"" + modelPath + "\" -ngl 99 -c 4096 -t 4 --port 8080";
	std::string fullCmd = llamaPath + args;

	STARTUPINFOA si = { sizeof(si) };
	PROCESS_INFORMATION pi;

	if (CreateProcessA(NULL, (LPSTR)fullCmd.c_str(), NULL, NULL, FALSE, CREATE_NEW_CONSOLE, NULL, NULL, &si, &pi)) {
		std::cout << "[Server] AI Engine launched in a new window.\n";
		CloseHandle(pi.hProcess);
		CloseHandle(pi.hThread);
	}
	else {
		std::cout << "[Server] Error: " << GetLastError() << "\n";
	}
}

// --- PART 2: THE ASK (UPDATED FOR USER INPUT) ---
void AskAI(std::string codeSnippet) {
	HINTERNET hSession = InternetOpenA("AI_Bridge", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
	if (!hSession) return;

	HINTERNET hConnect = InternetConnectA(hSession, "127.0.0.1", 8080, NULL, NULL, INTERNET_SERVICE_HTTP, 0, 0);
	if (!hConnect) {
		std::cout << "[Client] Connection failed. Ensure Server (Option 1) is running.\n";
		InternetCloseHandle(hSession);
		return;
	}

	HINTERNET hRequest = HttpOpenRequestA(hConnect, "POST", "/completion", NULL, NULL, NULL, 0, 0);

	// Escape double quotes in user input for JSON safety
	size_t start_pos = 0;
	while ((start_pos = codeSnippet.find("\"", start_pos)) != std::string::npos) {
		codeSnippet.replace(start_pos, 1, "\\\"");
		start_pos += 2;
	}

	std::string jsonPayload = "{\"prompt\": \"Analyze this C++ code and suggest a fix: " + codeSnippet + "\", \"n_predict\": 512}";

	if (HttpSendRequestA(hRequest, "Content-Type: application/json", -1, (LPVOID)jsonPayload.c_str(), (DWORD)jsonPayload.length())) {
		char buffer[2048];
		DWORD bytesRead;
		std::cout << "\n=== AI DEBUGGER OUTPUT ===\n";
		while (InternetReadFile(hRequest, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
			buffer[bytesRead] = '\0';
			std::cout << buffer;
		}
		std::cout << "\n==========================\n";
	}

	InternetCloseHandle(hRequest);
	InternetCloseHandle(hConnect);
	InternetCloseHandle(hSession);
}

// --- PART 3: THE INTERFACE ---
int main() {
	int choice;
	while (true) {
		std::cout << "\n1. Start AI Server\n2. Input Code for Analysis\n3. Exit\nSelection: ";
		if (!(std::cin >> choice)) {
			std::cin.clear();
			std::cin.ignore(1000, '\n');
			continue;
		}

		if (choice == 1) {
			RunServer();
		}
		else if (choice == 2) {
			std::cin.ignore(); // Clear newline from previous cin
			std::cout << "\nPaste/Type your code below. Type 'END' on a new line when finished:\n";
			std::cout << "--------------------------------------------------\n";

			std::string codeBlock, line;
			while (std::getline(std::cin, line) && line != "END") {
				codeBlock += line + "\\n"; // Use escaped newline for JSON
			}

			if (!codeBlock.empty()) {
				AskAI(codeBlock);
			}
		}
		else if (choice == 3) break;
	}
	return 0;
}