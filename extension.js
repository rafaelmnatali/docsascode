// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const path = require('path');
const vscode = require('vscode');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Docs As Code" is now active!');

    context.subscriptions.push(
		
        vscode.commands.registerCommand('docsascode.create', async () => {
			// Get the API session token from the extension's configuration
			const config = vscode.workspace.getConfiguration('docsascode');
			const openaiApiKey = config.get('API Key');

			if (!openaiApiKey) {
				vscode.window.showErrorMessage('Please set your OpenAI API key in the extension settings.');
				return;
			}

			const workspaceFolder = vscode.workspace.workspaceFolders[0]; // Assumes the first workspace folder.
			if (workspaceFolder) {
				// Get the active text editor
				const activeTextEditor = vscode.window.activeTextEditor;

				if (activeTextEditor) {
					// Get the text content of the currently open file
					const inputText = activeTextEditor.document.getText();
					// Save the filename from the current open file without the relative path without the extension
					const inputFileName = path.basename(activeTextEditor.document.fileName, path.extname(activeTextEditor.document.fileName));

					// Send the input text to ChatGPT
					vscode.window.showInformationMessage('Waiting for response');
					const response = await sendToChatGPT("explain the following file and output the response as a Markdown code with only 1 section: 1. Description (summary what the code does) no summary or breakdown of the code are required." +inputText.toString());
				
				    // Remove the first and last lines
					const responseLines = response.split('\n').slice(1, -2).join('\n');
					
					// Check if the response is empty
					if (!responseLines) {
						vscode.window.showErrorMessage('No response from ChatGPT.');
						return;
					}

					// Save the modified response to Markdown file in the workspace
					const filePath = vscode.Uri.joinPath(workspaceFolder.uri, inputFileName+'.md');
					vscode.workspace.fs.writeFile(filePath, Buffer.from(responseLines))
					.then(() => {
						vscode.window.showInformationMessage('File written to the workspace.');
					  })
					  .catch((error) => {
						vscode.window.showErrorMessage('Error writing the file: ' + error.message);
					  });
				} else {
						vscode.window.showInformationMessage('No file is currently open in the editor.');
				}
					
			} else { 
					vscode.window.showErrorMessage('No workspace folder found.');
			}	
		})
	)
}

async function sendToChatGPT(text) {
	// Get the API session token from the extension's configuration
	const config = vscode.workspace.getConfiguration('docsascode');
	const openaiApiKey = config.get('API Key');
	
	try {
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				  'Content-Type': 'application/json',
				  'Authorization': `Bearer ${openaiApiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [{"role": "user", "content": text}]
			})
		})
	
		const data = await response.json()
    	return data.choices[0].message.content

	  } catch (error) {
		console.error('Error sending request to ChatGPT:', error);
		return 'An error occurred while connecting to ChatGPT.';
	  }
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
