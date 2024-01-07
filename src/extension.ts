import * as vscode from "vscode";

/**
 * - Consider using product icon "open-preview" or "repo" by default and allow the user to change it (https://code.visualstudio.com/api/references/icons-in-labels#icon-listing)
 * - Add customizable configuration for everything (https://code.visualstudio.com/api/references/contribution-points#contributes.configuration)
 * - Add keybindings for the commands (https://code.visualstudio.com/api/references/contribution-points#contributes.keybindings)
 * - Add context menu/submenu triggers (https://code.visualstudio.com/api/references/contribution-points#contributes.menus)
 * - Implement a walk through tutorial ()
 * - Consider using workspaceContains to show action button (https://code.visualstudio.com/api/references/activation-events#workspaceContains)
 * -
 * -
 */
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "open-remote-repository" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "open-remote-repository.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from Open Remote Repository!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
