import { NativescriptTranscoderCommon } from './common';
export { Asset, Segment, Track } from './common';

export declare class NativescriptTranscoder extends NativescriptTranscoderCommon {
  addAsset(asset: Asset): void;
  addSegment(segment: Segment): void;
  process(reslution: 'low' | 'high', outputPath: string): Promise<void>;
}
