import { File } from '@nativescript/core';
import { LogLevel, NativescriptTranscoderCommon, VideoConfig } from './common';
export { Asset, Segment, Track, VideoConfig, MessageData } from './common';

export declare class NativescriptTranscoder extends NativescriptTranscoderCommon {
  /**
   * Enable/disable debug logging for this plugin
   * @method setLogLevel
   * @param logLevel LogLevel
   **/
  setLogLevel(logLevel: LogLevel): void;

  /**
   * Transcodes video from inputPath to outputPath using videoConfig options
   * @param inputPath string
   * @param outputPath string
   * @param videoConfig VideoConfig
   * @returns Promise<File>
   *
   */
  transcode(inputPath: string, outputPath: string, videoConfig?: VideoConfig): Promise<File>;

  /**
   *  **ANDROID-ONLY** Transcodes the audio input file to an MP4 file with AAC encoding
   * @method convertAudioToMp4
   * @param inputPath
   * @param outputPath
   * @returns Promise<File>
   **/
  convertAudioToMp4(inputPath: string, outputPath: string): Promise<File>;

  /**
   * Merges the mp4 files specified by inputFiles (array of file paths) into an mp4 file at the outputPath.
   *
   * On iOS,  input files must all have audio and video tracks with the same codecs used.
   * @method mergeMp4Files
   * @param inputFiles
   * @param outputPath
   **/
  mergeMp4Files(inputFiles: string[], outputPath: string): Promise<File>;

  // utilities
  /**
   * Looks for the video codec used by the video file at `videoPath`
   * @param videoPath string
   * @returns string
   */
  getVideoCodec(videoPath: string): string;

  /**
   * Looks for the audio codec used by the video file at `videoPath`
   * @param videoPath string
   * @returns string
   */
  getAudioCodec(videoPath: string): string;

  /**
   * Utility to find the duration in milliseconds of the video file at `videoPath`
   * @param videoPath string
   * @returns number (ms)
   */
  getVideoDuration(videoPath: string): number;

  /**
   * Looks for the video resolution metadata and returns a VideoResolution object with width and height
   * @param videoPath string
   * @returns VideoResolution
   */
  getVideoResolution(videoPath: string): VideoResolution;
  getVideoSize(videoPath: string): number; // in bytes
  getVideoSizeString(videoPath: string): number; // string for display purposes
}
