# docsascode

This extension allows you to interact with [ChatGPT](https://chat.openai.com/) from within the Visual Studio.

:warning: The presented solutions are intended for learning purposes. Hence, don't treat as production-ready.

## Features

This extension employs ChatGPT to generate a Markdown file that contains a description of the current code. It then saves this Markdown file to a location within the [workspace](https://code.visualstudio.com/docs/editor/workspaces).

## Requirements

This extension was tested using `Visual Studio Code=1.82.0` and `Node.js=9.6.7`

See the [package.json](./package.json) file for details.

## Installation

To use this extension, install it from the VSCode marketplace.

Once the installation is finished, you'll need to insert your ChatGPT session token into the extension settings in VSCode. To accomplish this, follow these steps:

1. Open the "Code" menu.
2. Select "Preferences" from the dropdown menu.
3. Choose "Settings" to access the settings panel.
4. In the search bar, type `docsascode` to filter the settings list.
5. Enter your session token in the `API Key` field.

After completing these steps, the extension should be ready to use.

## Obtaining the API Key

To use this extension, you will need to authenticate with a valid API Key from ChatGPT. To get an API Key refer to [OpenAI docs](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)

## Contributing

Feel free to contribute by opening issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.  
