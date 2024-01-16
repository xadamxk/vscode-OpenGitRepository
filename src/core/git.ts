import { simpleGit, SimpleGitOptions } from "simple-git";

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

export const getRemoteOriginUrl = (baseDirectory: string): Promise<string> => {
  return simpleGit(buildGitOptions(baseDirectory))
    .getRemotes(true)
    .then((remotes): string => {
      const remoteOrigin = remotes.find((r) => r.name === "origin");
      return remoteOrigin?.refs.fetch || "";
    });
};
