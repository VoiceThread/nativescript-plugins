import { File } from '@nativescript/core';
import { LogLevel, NativescriptTranscoderCommon, VideoConfig } from './common';
export { Asset, Segment, Track, VideoConfig, MessageData } from './common';

export declare class NativescriptTranscoder extends NativescriptTranscoderCommon {
  setLogLevel(logLevel: LogLevel): void;
  transcode(inputPath: string, outputPath: string, videoConfig?: VideoConfig): Promise<File>;
  convertAudioToMp4(inputPath: string, outputPath: string): Promise<File>;

  // utilties
  getVideoResolution(videoPath: string): VideoResolution;
  getVideoSize(videoPath: string): number; // in bytes
  getVideoSizeString(videoPath: string): number; // string for display purposes
  getVideoCodec(videoPath: string): string;
  getAudioCodec(videoPath: string): string;
  getVideoDuration(videoPath: string): number;
}
