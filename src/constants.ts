/**
 * Used to identify the extension - must match the name in package.json
 */
export const EXTENSION_NAME = "open-git-repository";

/**
 * Tooltip label for the status bar icon
 */
export const STATUSBAR_TOOLTIP = "Open in Browser";

/**
 * Commands that can be executed by the extension
 */
export const enum Commands {
  OPEN_ORIGIN_REPOSITORY = `${EXTENSION_NAME}.openOriginRepository`,
}
