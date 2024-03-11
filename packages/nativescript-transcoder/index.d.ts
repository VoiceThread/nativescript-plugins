import { File } from '@nativescript/core';
import { LogLevel, NativescriptTranscoderCommon, VideoConfig } from './common';
export { Asset, Segment, Track, VideoConfig, MessageData } from './common';

export declare class NativescriptTranscoder extends NativescriptTranscoderCommon {
  setLogLevel(logLevel: LogLevel): void;
  reset(): void;
  transcode(inputPath: string, outputPath: string, videoConfig?: VideoConfig): Promise<File>;

  // for more advanced use cases (iOS only for now, Android is still WIP)
  addAsset(asset: Asset): void;
  addSegment(segment: Segment): void;
  process(outputPath: string, videoConfig?: VideoConfig): Promise<void>;

  // utilties
  getVideoResolution(videoPath: string): VideoResolution;
  getVideoSize(videoPath: string): number; // in bytes
  getVideoSizeString(videoPath: string): number; // string for display purposes
}
