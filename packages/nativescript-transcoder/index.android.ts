import { NativescriptTranscoderCommon } from './common';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  transcode(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const parcelFileDescriptor = android.os.ParcelFileDescriptor.open(new java.io.File(inputPath), android.os.ParcelFileDescriptor.MODE_READ_ONLY);
      const high = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroid720pStrategy();

      const listener = new net.ypresto.androidtranscoder.MediaTranscoder.Listener({
        onTranscodeProgress: (progress: number) => {
          console.log('[Transcoder] Progress', progress);
        },
        onTranscodeCompleted: () => {
          console.log('[Transcoder] Completed');
          resolve();
        },
        onTranscodeCanceled: () => {
          console.log('[Transcoder] Cancelled');
          reject('canceled');
        },
        onTranscodeFailed: (exception: any) => {
          console.log('[Transcoder] Failed', exception);
          reject(exception);
        },
      });
      net.ypresto.androidtranscoder.MediaTranscoder.getInstance().transcodeVideo(parcelFileDescriptor.getFileDescriptor(), outputPath, high, listener);
      net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroid720pStrategy();
    });
  }
}
