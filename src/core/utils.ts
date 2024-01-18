import * as vscode from "vscode";
import RegisteredCommands from "../commands";
import { Commands, EXTENSION_NAME, STATUSBAR_TOOLTIP } from "../constants";
import {
  StatusBarAlignment,
  StatusBarItem,
  WorkspaceConfiguration,
} from "vscode";
import {
  ExtensionConfiguration,
  determineStatusBarAlignment,
  determineStatusBarIcon,
} from "./configuration";

export const initializeExtension = (context: vscode.ExtensionContext): void => {
  const extensionConfiguration =
    vscode.workspace.getConfiguration(EXTENSION_NAME);
  initializeCommands(context);
  const statusBarItem = initializeStatusBar(context, extensionConfiguration);
  listenForConfigurationChanges(statusBarItem);
};

const initializeCommands = (context: vscode.ExtensionContext): void => {
  RegisteredCommands.forEach((command) => {
    context.subscriptions.push(command());
  });
};

const initializeStatusBar = (
  context: vscode.ExtensionContext,
  extensionConfiguration: WorkspaceConfiguration,
  command = Commands.OPEN_REPOSITORY
): StatusBarItem => {
  const statusBarItem: StatusBarItem = vscode.window.createStatusBarItem(
    determineStatusBarAlignment(
      extensionConfiguration.get(ExtensionConfiguration.StatusBarAlignment)
    ),
    100
  );

  const statusBarIcon = determineStatusBarIcon(
    extensionConfiguration.get(ExtensionConfiguration.StatusBarIcon)
  );
  updateStatusBarItem(statusBarItem, statusBarIcon, STATUSBAR_TOOLTIP, command);
  context.subscriptions.push(statusBarItem);
  return statusBarItem;
};

const listenForConfigurationChanges = (statusBarItem: StatusBarItem): void => {
  // Subscribe to configuration changes
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (
      event.affectsConfiguration(
        `${EXTENSION_NAME}.${ExtensionConfiguration.StatusBarIcon}`
      )
    ) {
      const extensionConfiguration =
        vscode.workspace.getConfiguration(EXTENSION_NAME);

      const statusBarIcon = determineStatusBarIcon(
        extensionConfiguration.get(ExtensionConfiguration.StatusBarIcon)
      );

      updateStatusBarItem(
        statusBarItem,
        statusBarIcon,
        STATUSBAR_TOOLTIP,
        Commands.OPEN_REPOSITORY
      );
    }
  });
};

const updateStatusBarItem = (
  statusBarItem: StatusBarItem,
  text: string,
  tooltip: string,
  command: Commands
) => {
  statusBarItem.text = `$(${text})`;
  statusBarItem.tooltip = tooltip;
  statusBarItem.command = command;
  statusBarItem.show();
};
