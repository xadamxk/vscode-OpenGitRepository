import { simpleGit, SimpleGitOptions } from "simple-git";
import * as vscode from "vscode";

const baseOptions: Partial<SimpleGitOptions> = {
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const buildGitOptions = (path: string): Partial<SimpleGitOptions> => {
  return {
    ...baseOptions,
    baseDir: path,
  };
};

export const getRemoteOrigin = (baseDirectory: string): Promise<string> => {
  return simpleGit(buildGitOptions(baseDirectory))
    .getRemotes(true)
    .then((remotes): string => {
      const remoteOrigin = remotes.find((r) => r.name === "origin");
      return remoteOrigin?.refs.fetch || "";
    });
};

export const getBranchName = (baseDirectory: string): Promise<string> => {
  return simpleGit(buildGitOptions(baseDirectory))
    .branch()
    .then((branchSummary) => {
      return branchSummary.current;
    });
};
