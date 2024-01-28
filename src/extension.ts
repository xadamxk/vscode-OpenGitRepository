import * as vscode from "vscode";
import { initializeExtension } from "./core/utils";

/**
 * Entry point of the extension - called when the extension is activated.
 * Refer to activationEvents in package.json for the events that trigger this method.
 */
export function activate(context: vscode.ExtensionContext) {
  initializeExtension(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
