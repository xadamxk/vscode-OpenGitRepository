import * as vscode from "vscode";
import { Commands, EXTENSION_NAME } from "../constants";
import { getRemoteOriginUrl } from "../core/git";
import { formatUrl } from "../providers/util";

export const openRepositoryCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(Commands.OPEN_REPOSITORY, async () => {
    if (vscode.workspace.workspaceFolders !== undefined) {
      // TODO: use this to get the git directory of the current file
      //    var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
      //    var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
      const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

      const remoteOriginUrl = await getRemoteOriginUrl(folderPath);
      if (remoteOriginUrl) {
        vscode.env.openExternal(vscode.Uri.parse(formatUrl(remoteOriginUrl)));
      } else {
        const message = `${EXTENSION_NAME}: Failed to locate a remote origin within your project.`;
        vscode.window.showErrorMessage(message);
      }
    } else {
      const message = `${EXTENSION_NAME}: No project was found in your workspace, open a folder and try again.`;
      vscode.window.showErrorMessage(message);
    }
  });
};
