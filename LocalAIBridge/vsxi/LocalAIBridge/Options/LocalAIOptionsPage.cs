using Microsoft.VisualStudio.Shell;
using System.ComponentModel;

namespace LocalAIBridge.Options
{
    public class LocalAIOptionsPage : DialogPage
    {
        [Category("Server")]
        [DisplayName("IP Address")]
        [Description("The IP of your Llama.cpp / Ollama server.")]
        public string ServerIp { get; set; } = "127.0.0.1";

        [Category("Server")]
        [DisplayName("Port")]
        public int ServerPort { get; set; } = 8080;

        [Category("Environment")]
        [DisplayName("Executable Path")]
        [Description("Path to the server executable.")]
        public string ExePath { get; set; } = "";

        [Category("Model")]
        [DisplayName("Model Name")]
        public string ModelName { get; set; } = "default";

        [Category("Model")]
        [DisplayName("Model File Path")]
        public string ModelFilePath { get; set; } = "";
    }
}