import * as vscode from "vscode";
import { simpleGit, SimpleGitOptions } from "simple-git";
import { Commands } from "../constants";

export const openRepositoryCommand = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    Commands.OPEN_ORIGIN_REPOSITORY,
    () => {
      if (vscode.workspace.workspaceFolders !== undefined) {
        // let wf = vscode.workspace.workspaceFolders[0].uri.path ;
        // TODO: use this to get the git directory of the current file
        // 				var vscode = require("vscode");
        // var path = require("path");
        // function activate(context) {
        //    var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
        //    var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
        console.log("test");
        console.log(vscode.workspace.workspaceFolders);
        console.log(vscode.window.activeTextEditor?.document.uri.fsPath);
        // }
        const f = vscode.workspace.workspaceFolders[0].uri.fsPath;

        const options: Partial<SimpleGitOptions> = {
          baseDir: f,
          binary: "git",
          maxConcurrentProcesses: 6,
          trimmed: false,
        };
        simpleGit(options)
          .getRemotes(true)
          .then((remotes): void => {
            const remoteOrigin = remotes.find((r) => r.name === "origin");
            if (remoteOrigin) {
              const url = remoteOrigin.refs.fetch
                .replace("git@", "https://")
                .replace("git://", "https://")
                .replace(".git", "");
              vscode.env.openExternal(vscode.Uri.parse(url));
            }
          });
      } else {
        const message =
          "YOUR-EXTENSION: Working folder not found, open a folder an try again";
        vscode.window.showErrorMessage(message);
      }
    }
  );
};
