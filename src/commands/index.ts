import * as vscode from "vscode";

import { openRepositoryCommand } from "./openRepository";
import { openFileCommand } from "./openFile";

const RegisteredCommands: (() => vscode.Disposable)[] = [
  openRepositoryCommand,
  openFileCommand,
];
export default RegisteredCommands;
