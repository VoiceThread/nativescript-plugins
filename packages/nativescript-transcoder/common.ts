import { Observable } from '@nativescript/core';

export class NativescriptTranscoderCommon extends Observable {}

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
  asset: string; // asset name
  filter?: string;
  seek?: number;
  duration?: number;
}
