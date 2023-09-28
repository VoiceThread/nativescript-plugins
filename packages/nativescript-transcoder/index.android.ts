import { NativescriptTranscoderCommon } from './common';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  transcode(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      const parcelFileDescriptor = android.os.ParcelFileDescriptor.open(new java.io.File(inputPath), android.os.ParcelFileDescriptor.MODE_READ_ONLY);
      const high = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroid720pStrategy();
      emit(NativescriptTranscoderCommon.TRANSCODING_STARTED, {});

      const listener = new net.ypresto.androidtranscoder.MediaTranscoder.Listener({
        onTranscodeProgress: (progress: number) => {
          this.log('[Transcoder] Progress', progress);
          emit(NativescriptTranscoderCommon.TRANSCODING_PROGRESS, { progress });
        },
        onTranscodeCompleted: () => {
          this.log('[Transcoder] Completed');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve();
        },
        onTranscodeCanceled: () => {
          this.log('[Transcoder] Cancelled');
          emit(NativescriptTranscoderCommon.TRANSCODING_CANCELLED, {});
          reject('canceled');
        },
        onTranscodeFailed: (exception: any) => {
          this.log('[Transcoder] Failed', exception);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
          reject(exception);
        },
      });
      net.ypresto.androidtranscoder.MediaTranscoder.getInstance().transcodeVideo(parcelFileDescriptor.getFileDescriptor(), outputPath, high, listener);
      net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroid720pStrategy();
    });
  }
}
