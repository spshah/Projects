#include <windows.h>
#include <wininet.h>
#include <iostream>
#include <string>

void AskAI(std::string codeSnippet) {
	HINTERNET hSession = InternetOpenA("AI_Bridge", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
	if (!hSession) return;

	HINTERNET hConnect = InternetConnectA(hSession, "127.0.0.1", 8080, NULL, NULL, INTERNET_SERVICE_HTTP, 0, 0);
	if (!hConnect) {
		std::cerr << "AI Server not running! Start the bridge first." << std::endl;
		return;
	}

	HINTERNET hRequest = HttpOpenRequestA(hConnect, "POST", "/completion", NULL, NULL, NULL, 0, 0);

	// Format the JSON payload (Minimalist approach to avoid JSON libraries)
	// We tell the AI to explain the code and suggest a fix.
	std::string data = "{\"prompt\": \"Analyze this C++ code for bugs: " + codeSnippet + "\", \"n_predict\": 256}";

	if (HttpSendRequestA(hRequest, "Content-Type: application/json", -1, (LPVOID)data.c_str(), (DWORD)data.length())) {
		char buffer[1024];
		DWORD bytesRead;
		std::cout << "\n--- AI Analysis ---\n";
		while (InternetReadFile(hRequest, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
			buffer[bytesRead] = '\0';
			std::cout << buffer; // This will print the raw JSON response containing the fix
		}
	}

	InternetCloseHandle(hRequest);
	InternetCloseHandle(hConnect);
	InternetCloseHandle(hSession);
}

int main() {
	// Example: Use it in a try-catch block
	try {
		// Imagine this code causes a crash
		int* ptr = nullptr;
		*ptr = 42;
	}
	catch (...) {
		std::string myCode = "int* ptr = nullptr; *ptr = 42;";
		AskAI(myCode);
	}
	return 0;
}