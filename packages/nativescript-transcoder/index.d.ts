import { LogLevel, NativescriptTranscoderCommon, VideoConfig } from './common';
export { Asset, Segment, Track, VideoConfig } from './common';

export declare class NativescriptTranscoder extends NativescriptTranscoderCommon {
  setLogLevel(logLevel: LogLevel): void; // TODO: add this to cleanup logs
  reset(): void;
  addAsset(asset: Asset): void;
  addSegment(segment: Segment): void;
  process(outputPath: string, videoConfig?: VideoConfig): Promise<void>;
}
