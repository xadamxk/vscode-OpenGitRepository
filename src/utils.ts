import * as vscode from "vscode";
import RegisteredCommands from "./commands";
import { Commands } from "./constants";

export const initializeExtension = (context: vscode.ExtensionContext): void => {
  initializeCommands(context);
  initializeStatusBar(context);
};

const initializeCommands = (context: vscode.ExtensionContext): void => {
  RegisteredCommands.forEach((command) => {
    context.subscriptions.push(command());
  });
};

const initializeStatusBar = (
  context: vscode.ExtensionContext,
  defaultCommand = Commands.OPEN_ORIGIN_REPOSITORY
): void => {
  //
  let myStatusBarItem: vscode.StatusBarItem;
  // // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  myStatusBarItem.command = defaultCommand;
  context.subscriptions.push(myStatusBarItem);

  // register some listener that make sure the status bar item always up-to-date
  // subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
  // subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

  // update status bar item once at start
  // updateStatusBarItem();
  myStatusBarItem.text = "Git Open";
  myStatusBarItem.show();
};
