export interface BaseProvider {
  remoteOriginUrl: string;
  filePath: string;
  currentBranchName: string;
  formatFileUrl(): string;
}
