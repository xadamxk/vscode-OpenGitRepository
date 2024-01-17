import { StatusBarAlignment } from "vscode";

/**
 * IconMap
 *
 * Reference: https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
 *
 * Default codicon ID = Identifier
 */
const IconMap = {
  browser: "browser",
  export: "export",
  link: "link",
  external: "link-external",
  globe: "ports-open-browser-icon",
  preview: "open-preview",
  remote: "remote-explorer",
  repo: "repo",
  repoPull: "repo-pull",
  rocket: "rocket",
  signOut: "sign-out",
  sourceControl: "source-control",
};

/**
 * Configuration keys for the extension - must match the keys in package.json
 */
export const ExtensionConfiguration = {
  StatusBarIcon: "statusBar.icon",
  StatusBarAlignment: "statusBar.alignment",
};

/**
 * Determines the status bar icon to use based on the configuration value.
 */
export const determineStatusBarIcon = (statusBarIcon: string | undefined) => {
  if (statusBarIcon && Object.keys(IconMap).includes(statusBarIcon)) {
    return IconMap[statusBarIcon as keyof typeof IconMap];
  }

  return IconMap.globe;
};

/**
 * Determines the status bar alignment to use based on the configuration value.
 * Status bar alignment: https://code.visualstudio.com/api/references/vscode-api#StatusBarAlignment
 */
export const determineStatusBarAlignment = (alignment: string | undefined) => {
  switch (alignment) {
    default:
    case "left":
      return StatusBarAlignment.Left;
    case "right":
      return StatusBarAlignment.Right;
  }
};
