import * as vscode from "vscode";
import { Commands, EXTENSION_NAME } from "../constants";
import { getBranchName, getRemoteOriginUrl } from "../core/git";
import { GitHubProvider } from "../providers/GitHub";
import { Providers } from "../providers/util";

export const openFileCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    Commands.OPEN_FILE,
    async (cmdArgs: vscode.Uri, multiselection: Array<vscode.Uri>) => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        const workSpaceUri = vscode.workspace.workspaceFolders[0].uri;
        const workSpaceFileSystemPath = workSpaceUri.fsPath;
        const projectPath = workSpaceUri.path;
        const remoteOriginUrl = await getRemoteOriginUrl(
          workSpaceFileSystemPath
        );
        if (remoteOriginUrl) {
          const currentBranchName = await getBranchName(
            workSpaceFileSystemPath
          );
          // Clean this up
          const filePath = cmdArgs.path.replace(projectPath, "");
          if (remoteOriginUrl.includes(Providers.GITHUB)) {
            const url = new GitHubProvider(
              remoteOriginUrl,
              filePath,
              currentBranchName
            ).formatFileUrl();
            vscode.env.openExternal(vscode.Uri.parse(url));
          }
        } else {
          const message = `${EXTENSION_NAME}: Failed to locate a remote origin within your project.`;
          vscode.window.showErrorMessage(message);
        }
      } else {
        const message = `${EXTENSION_NAME}: No project was found in your workspace, open a folder and try again.`;
        vscode.window.showErrorMessage(message);
      }
    }
  );
};
