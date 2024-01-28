import { BaseProvider } from "./BaseProvider";
import { formatUrl } from "./util";

export class BitBucketProvider implements BaseProvider {
  remoteOriginUrl: string;
  filePath: string;
  currentBranchName: string;

  constructor(
    remoteOriginUrl: string,
    filePath: string,
    currentBranchName: string
  ) {
    this.remoteOriginUrl = formatUrl(remoteOriginUrl);
    this.filePath = filePath;
    this.currentBranchName = currentBranchName;
  }

  formatFileUrl(): string {
    return `${this.remoteOriginUrl}/${this.currentBranchName}${this.filePath}`;
  }
}
