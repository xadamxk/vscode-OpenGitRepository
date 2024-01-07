import * as vscode from "vscode";

import { openRepositoryCommand } from "./openRepository";

const RegisteredCommands: (() => vscode.Disposable)[] = [openRepositoryCommand];
export default RegisteredCommands;
