import { EventData, File, Observable } from '@nativescript/core';

export class NativescriptTranscoderCommon extends Observable {
  private _logLevel: LogLevel = 'none';
  setLogLevel(logLevel: LogLevel): void {
    this._logLevel = logLevel;
  }

  log = (message: string, value?: any): void => {
    if (this._logLevel === 'none') {
      return;
    }
    if (value) {
      console.log(`[TRANSCODER] ${message}`, value);
    } else {
      console.log(`[TRANSCODER] ${message}`);
    }
  };

  public static TRANSCODING_STARTED = 'transcoding-started';
  public static TRANSCODING_PROGRESS = 'transcoding-progress';
  public static TRANSCODING_COMPLETE = 'transcoding-complete';
  public static TRANSCODING_ERROR = 'transcoding-error';
  public static TRANSCODING_CANCELLED = 'transcoding-cancelled';

  // utilities
  getVideoSize(videoPath: string): number {
    const file = File.fromPath(videoPath);
    return file?.size || 0;
  }
  getVideoSizeString(videoPath: string): string {
    const fileSize = this.getVideoSize(videoPath);
    return this.formatBytes(fileSize);
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}

export type LogLevel = 'none' | 'verbose';

export interface VideoConfig {
  quality?: '480p' | '720p' | '1080p'; // iOS only
  frameRate?: number; // iOS only
  audioChannels?: number; // iOS only
  audioSampleRate?: number; // iOS only
  audioBitRate?: number; // iOS only
}

export interface Asset {
  name: string; // used for referencing the asset later
  path: string;
  type: 'audio' | 'video' | 'videoAudio';
}

export interface Segment {
  // name: string; // used for referencing the asset later
  duration?: number;
  tracks: Track[];
}

export interface Track {
  id?: number;
  type?: 'audio' | 'video' | 'videoAudio';
  asset: string; // asset name
  filter?: 'Mute' | 'FadeOut';
  seek?: number;
  duration?: number;
}

export type MessageData = EventData & { data: { progress?: number } };

export interface VideoResolution {
  width: number;
  height: number;
}
