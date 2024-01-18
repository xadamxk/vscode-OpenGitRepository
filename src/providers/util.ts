export const Providers = {
  GITHUB: "github.com",
  BITBUCKET: "bitbucket",
  HEPTAPOD: "heptapod.net",
};

export const formatUrl = (url: string): string => {
  return url
    .replace("git@", "https://")
    .replace("git://", "https://")
    .replace(".git", "");
};
