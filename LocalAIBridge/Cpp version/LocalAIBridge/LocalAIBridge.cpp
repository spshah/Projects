#include <windows.h>
#include <wininet.h>
#include <iostream>
#include <string>
#include <vector>

#pragma comment(lib, "wininet.lib")

// --- PART 1: THE SERVER RUNNER ---
void RunServer() {
	std::string llamaPath = "D:\\Shashi\\Misc\\llama-b8882-bin-win-vulkan-x64\\llama-server.exe";
	//std::string modelPath = "D:\\Shashi\\Work\\CheckerApp_1\\Misc\\Qwen2.5-Coder-1.5B-Instruct-Q4_K_M.gguf";
	std::string modelPath = "D:\\Shashi\\Misc\\Qwen2.5-Coder-7B-Instruct-Q4_K_M.gguf";
	//std::string args = " -m \"" + modelPath + "\" -ngl 99 -c 4096 -t 4 --port 8080";
	std::string args = " -m \"" + modelPath + "\" -ngl 8 -c 2048 -t 4 --port 8080";
	
	std::string fullCmd = llamaPath + args;

	STARTUPINFOA si = { sizeof(si) };
	PROCESS_INFORMATION pi;
	if (CreateProcessA(NULL, (LPSTR)fullCmd.c_str(), NULL, NULL, FALSE, CREATE_NEW_CONSOLE, NULL, NULL, &si, &pi)) {
		std::cout << "[Server] AI Engine launched.\n";
		CloseHandle(pi.hProcess);
		CloseHandle(pi.hThread);
	}
}

// --- PART 2: THE PARSING & COMMUNICATION ---
void AskAI(std::string codeSnippet) {
	HINTERNET hSession = InternetOpenA("AI_Bridge", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
	HINTERNET hConnect = InternetConnectA(hSession, "127.0.0.1", 8080, NULL, NULL, INTERNET_SERVICE_HTTP, 0, 0);

	if (!hConnect) {
		std::cout << "[Error] Connection failed. Is the server running on port 8080?\n";
		InternetCloseHandle(hSession);
		return;
	}

	HINTERNET hRequest = HttpOpenRequestA(hConnect, "POST", "/completion", NULL, NULL, NULL, 0, 0);

	std::string fullInternalPrompt =
		"<|im_start|>system\nYou are a precise C++ debugger. Analyze the code concisely.<|im_end|>\n"
		"<|im_start|>user\n" + codeSnippet + "<|im_end|>\n"
		"<|im_start|>assistant\n";

	// 2. Escape the WHOLE prompt for JSON protocol safety
	auto jsonEscape = [](std::string str) -> std::string {
		std::string out;
		for (char c : str) {
			switch (c) {
			case '\"': out += "\\\""; break;
			case '\\': out += "\\\\"; break;
			case '\n': out += "\\n";  break;
			case '\r': out += "\\r";  break;
			case '\t': out += "\\t";  break;
			default:
				if (c >= 0 && c < 32) { /* skip other control chars */ }
				else { out += c; }
			}
		}
		return out;
	};

	std::string escapedPrompt = jsonEscape(fullInternalPrompt);

	// 3. Wrap in JSON (No more raw newlines allowed here!)
	std::string jsonPayload = "{\"prompt\": \"" + escapedPrompt + "\", \"n_predict\": 256, \"temperature\": 0.1}";

	if (HttpSendRequestA(hRequest, "Content-Type: application/json", -1, (LPVOID)jsonPayload.c_str(), (DWORD)jsonPayload.length())) {
		char buffer[2048];
		DWORD bytesRead;
		std::string fullResponse;

		// Capture full response into a string for parsing
		while (InternetReadFile(hRequest, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
			buffer[bytesRead] = '\0';
			fullResponse += buffer;
		}

		// Extract "content" value from llama.cpp JSON
		size_t contentStart = fullResponse.find("\"content\":\"");
		if (contentStart != std::string::npos) {
			contentStart += 11;
			size_t contentEnd = fullResponse.find("\",\"tokens\"", contentStart);

			if (contentEnd != std::string::npos) {
				std::string cleanOutput = fullResponse.substr(contentStart, contentEnd - contentStart);

				// Simple unescape for newlines
				size_t pos = 0;
				while ((pos = cleanOutput.find("\\n", pos)) != std::string::npos) {
					cleanOutput.replace(pos, 2, "\n");
					pos += 1;
				}

				std::cout << "\n=== AI ANALYSIS ===\n" << cleanOutput << "\n===================\n";
			}
		}
		else {
			std::cout << "Raw Response: " << fullResponse << "\n";
		}
	}

	InternetCloseHandle(hRequest);
	InternetCloseHandle(hConnect);
	InternetCloseHandle(hSession);
}

// --- PART 3: MAIN WITH ARGV HANDLING ---
int main(int argc, char* argv[]) {
		if (argc > 1) {
			std::string inputCode = argv[1];
			if (!inputCode.empty()) {
				// 1. Silent Check: Is server already up?
				HINTERNET hSession = InternetOpenA("Check", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
				HINTERNET hConnect = InternetConnectA(hSession, "127.0.0.1", 8080, NULL, NULL, INTERNET_SERVICE_HTTP, 0, 0);

				if (!hConnect) {
					std::cout << "[Bridge] Server not detected. Launching AI Engine...\n";
					RunServer();
					// Give the model 3 seconds to load into VRAM/Vulkan before sending the request
					Sleep(3000);
				}
				else {
					InternetCloseHandle(hConnect);
				}
				InternetCloseHandle(hSession);

				// 2. Proceed with Analysis
				std::cout << "Analyzing selection from Visual Studio...\n";
				AskAI(inputCode);

				std::cout << "\n--- Done ---\nPress Enter to close.";
				std::cin.get();
				return 0;
			}
		}

	// Standard Interactive Menu
	int choice;
	while (true) {
		std::cout << "\n1. Start AI Server\n2. Input Code Manually\n3. Exit\nSelection: ";
		if (!(std::cin >> choice)) {
			std::cin.clear();
			std::cin.ignore(1000, '\n');
			continue;
		}

		if (choice == 1) RunServer();
		else if (choice == 2) {
			std::cin.ignore();
			std::cout << "Enter code (Type 'END' on a new line to finish):\n";
			std::string codeBlock, line;
			while (std::getline(std::cin, line) && line != "END") {
				codeBlock += line + "\n";
			}
			if (!codeBlock.empty()) AskAI(codeBlock);
		}
		else if (choice == 3) break;
	}
	return 0;
}