import { Observable } from '@nativescript/core';

export class NativescriptTranscoderCommon extends Observable {
  private _logLevel: LogLevel = 'none';
  setLogLevel(logLevel: LogLevel): void {
    this._logLevel = logLevel;
  }

  log(message: string, value?: any): void {
    if (this._logLevel === 'none') {
      return;
    }
    if (value) {
      console.log(`[TRANSCODER] ${message}`, value);
    } else {
      console.log(`[TRANSCODER] ${message}`);
    }
  }
}

export type LogLevel = 'none' | 'verbose';

export interface VideoConfig {
  quality?: 'low' | 'high';
  frameRate?: number;
  audioChannels?: number;
  audioSampleRate?: number;
  audioBitRate?: number;
}

export interface Asset {
  name: string; // used for referencing the asset later
  path: string;
  type: 'audio' | 'video' | 'videoAudio';
}

export interface Segment {
  // name: string; // used for referencing the asset later
  duration: number;
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
