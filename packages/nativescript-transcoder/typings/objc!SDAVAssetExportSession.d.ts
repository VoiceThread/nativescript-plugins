declare class SDAVAssetExportSession extends NSObject {
  static alloc(): SDAVAssetExportSession; // inherited from NSObject

  static exportSessionWithAsset(asset: AVAsset): any;

  static new(): SDAVAssetExportSession; // inherited from NSObject

  readonly asset: AVAsset;

  audioMix: AVAudioMix;

  audioSettings: NSDictionary<any, any>;

  delegate: SDAVAssetExportSessionDelegate;

  readonly error: NSError;

  metadata: NSArray<any>;

  outputFileType: string;

  outputURL: NSURL;

  readonly progress: number;

  shouldOptimizeForNetworkUse: boolean;

  readonly status: AVAssetExportSessionStatus;

  timeRange: CMTimeRange;

  videoComposition: AVVideoComposition;

  videoInputSettings: NSDictionary<any, any>;

  videoSettings: NSDictionary<any, any>;

  constructor(o: { asset: AVAsset });

  cancelExport(): void;

  exportAsynchronouslyWithCompletionHandler(handler: () => void): void;

  initWithAsset(asset: AVAsset): this;
}

interface SDAVAssetExportSessionDelegate extends NSObjectProtocol {
  exportSessionRenderFrameWithPresentationTimeToBuffer(exportSession: SDAVAssetExportSession, pixelBuffer: any, presentationTime: CMTime, renderBuffer: any): void;
}
declare var SDAVAssetExportSessionDelegate: {
  prototype: SDAVAssetExportSessionDelegate;
};
