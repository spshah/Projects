using System;
using System.ComponentModel.Design;
using Microsoft.VisualStudio.Shell;
using LocalAIBridge.Services;
using LocalAIBridge.Options;
using Task = System.Threading.Tasks.Task;

namespace LocalAIBridge.Commands
{
    internal sealed class LocalAICommand
    {
        public const int CommandId = 0x0100;
        public static readonly Guid CommandSet = new Guid("4b1e4c7d-3f1a-4f8a-9e1d-3b5a7c9d1e2f");

        private readonly AsyncPackage package;
        private readonly ILogger logger;
        private readonly IPromptBuilder promptBuilder;
        private readonly ILLMClient llmClient;

        private LocalAICommand(AsyncPackage package, OleMenuCommandService commandService)
        {
            this.package = package ?? throw new ArgumentNullException(nameof(package));
            commandService = commandService ?? throw new ArgumentNullException(nameof(commandService));

            var menuCommandID = new CommandID(CommandSet, CommandId);
            var menuItem = new MenuCommand(this.Execute, menuCommandID);
            commandService.AddCommand(menuItem);

            // Dependency Injection
            this.logger = new VsOutputLogger(package);
            this.promptBuilder = new LlamaPromptBuilder();
            this.llmClient = new LlamaHttpClient();
        }

        public static LocalAICommand Instance { get; private set; }

        public static async Task InitializeAsync(AsyncPackage package)
        {
            await ThreadHelper.JoinableTaskFactory.SwitchToMainThreadAsync(package.DisposalToken);
            OleMenuCommandService commandService = await package.GetServiceAsync(typeof(IMenuCommandService)) as OleMenuCommandService;
            Instance = new LocalAICommand(package, commandService);
        }

        private async void Execute(object sender, EventArgs e)
        {
            await ThreadHelper.JoinableTaskFactory.RunAsync(async () =>
            {
                try
                {
                    await ThreadHelper.JoinableTaskFactory.SwitchToMainThreadAsync();
                    
                    var dte = await package.GetServiceAsync(typeof(EnvDTE.DTE)) as EnvDTE.DTE;
                    var activeDoc = dte.ActiveDocument;
                    if (activeDoc == null) return;

                    var selection = activeDoc.Selection as EnvDTE.TextSelection;
                    string code = selection.Text;
                    if (string.IsNullOrWhiteSpace(code))
                    {
                        logger.Log("No code selected.");
                        return;
                    }

                    var options = (LocalAIOptionsPage)package.GetDialogPage(typeof(LocalAIOptionsPage));
                    
                    logger.Log($"Sending request to {options.ServerIp}:{options.ServerPort}...");
                    string prompt = promptBuilder.BuildPrompt(code, activeDoc.FullName);
                    
                    string response = await llmClient.QueryAsync(options.ServerIp, options.ServerPort, prompt);
                    
                    logger.Log("--- AI ANALYSIS ---");
                    logger.Log(response);
                }
                catch (Exception ex)
                {
                    logger.Log($"Error: {ex.Message}");
                }
            });
        }
    }
}