import * as vscode from "vscode";
import RegisteredCommands from "../commands";
import { Commands, EXTENSION_NAME, STATUSBAR_TOOLTIP } from "../constants";
import { StatusBarItem, WorkspaceConfiguration } from "vscode";
import {
  ExtensionConfiguration,
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
  command = Commands.OPEN_ORIGIN_REPOSITORY
): StatusBarItem => {
  // TODO: Add configuration for status bar alignment (LEFT, RIGHT)
  const statusBarItem: StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );

  const statusBarIcon = determineStatusBarIcon(
    extensionConfiguration.get(ExtensionConfiguration.statusBarIcon)
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
        `${EXTENSION_NAME}.${ExtensionConfiguration.statusBarIcon}`
      )
    ) {
      const extensionConfiguration =
        vscode.workspace.getConfiguration(EXTENSION_NAME);

      const statusBarIcon = determineStatusBarIcon(
        extensionConfiguration.get(ExtensionConfiguration.statusBarIcon)
      );

      updateStatusBarItem(
        statusBarItem,
        statusBarIcon,
        STATUSBAR_TOOLTIP,
        Commands.OPEN_ORIGIN_REPOSITORY
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
