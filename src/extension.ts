import * as vscode from "vscode";
import { initializeExtension } from "./utils";

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
  initializeExtension(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
