import { NativescriptTranscoderCommon, VideoConfig } from './common';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      const parcelFileDescriptor = android.os.ParcelFileDescriptor.open(new java.io.File(inputPath), android.os.ParcelFileDescriptor.MODE_READ_ONLY);
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

      // default to 720p
      let strategy = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroidStrategy720P(
        net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_BITRATE_AS_IS,
        net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_CHANNELS_AS_IS
      );
      switch (videoConfig.quality) {
        case '1080p': {
          strategy = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroidStrategy1080P(
            net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_BITRATE_AS_IS,
            net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_CHANNELS_AS_IS
          );
          break;
        }
        case '720p': {
          strategy = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroidStrategy720P(
            net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_BITRATE_AS_IS,
            net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_CHANNELS_AS_IS
          );
          break;
        }
      }
      const timeline = new net.ypresto.androidtranscoder.engine.TimeLine().addChannel('A', parcelFileDescriptor.getFileDescriptor()).createSegment().output('A').timeLine();
      net.ypresto.androidtranscoder.MediaTranscoder.getInstance().transcodeVideo(timeline, outputPath, strategy, listener); //.get();
    });
  }
}
