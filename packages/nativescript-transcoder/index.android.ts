import { File } from '@nativescript/core';
import { NativescriptTranscoderCommon, VideoConfig, VideoResolution } from './common';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<File> {
    return new Promise((resolve, reject) => {
      const allowedTranscodingResolution = this.getAllowedTranscodingResolution(inputPath);
      if (!videoConfig.force && allowedTranscodingResolution.includes(videoConfig.quality)) {
        return Promise.reject(
          'Transcoding to a higher resolution is not allowed by default. If you want to do this intentionally, pass in { force: true } as part of the vidoeConfig object to bypass this check.'
        );
      }
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      const parcelFileDescriptor = android.os.ParcelFileDescriptor.open(new java.io.File(inputPath), android.os.ParcelFileDescriptor.MODE_READ_ONLY);
      emit(NativescriptTranscoderCommon.TRANSCODING_STARTED, {});
      const listener = new com.otaliastudios.transcoder.TranscoderListener({
        onTranscodeProgress: (progress: number) => {
          this.log('[transcode] Progress', progress);
          emit(NativescriptTranscoderCommon.TRANSCODING_PROGRESS, { progress });
        },
        onTranscodeCompleted: () => {
          this.log('[transcode] Completed');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
        },
        onTranscodeCanceled: () => {
          this.log('[transcode] Cancelled');
          emit(NativescriptTranscoderCommon.TRANSCODING_CANCELLED, {});
          reject('canceled');
        },
        onTranscodeFailed: (exception: any) => {
          this.log('[transcode] Failed', exception);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
          reject(exception);
        },
      });
      // default to 720p
      let strategy;
      switch (videoConfig.quality) {
        case '1080p': {
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.atMost(1080)
          // .frameRate(24)
          // .bitRate(com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.BITRATE_UNKNOWN)
          // .keyFrameInterval(3)
          // .build();
          strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.exact(1080, 1920)
            .bitRate(1000 * 1000)
            .frameRate(30)
            .keyFrameInterval(3)
            .build();
          break;
        }
        case '720p': {
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.exact(720, 1280)
          //   .bitRate(500 * 1000)
          //   .frameRate(30)
          //   .keyFrameInterval(3)
          //   .build();
          strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategies.for720x1280();
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.atMost(720).build();
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.atMost(720)
          // .frameRate(24)
          // .bitRate(com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.BITRATE_UNKNOWN)
          // .keyFrameInterval(3)
          // .build();
          break;
        }
        case '480p': {
          strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategies.for360x480();
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.atMost(480).build();
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.atMost(480)
          // .frameRate(24)
          // .bitRate(com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.BITRATE_UNKNOWN)
          // .keyFrameInterval(3)
          // .build();
          // strategy = com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.exact(480, 854)
          //   .bitRate(360 * 1000)
          //   .frameRate(30)
          //   .keyFrameInterval(3)
          //   .build();
          break;
        }
      }
      const audiostrategy: com.otaliastudios.transcoder.strategy.DefaultAudioStrategy = com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.builder()
        .channels(com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.CHANNELS_AS_INPUT)
        // .channels(1)
        // .channels(2)
        .sampleRate(com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.SAMPLE_RATE_AS_INPUT)
        // .sampleRate(44100)
        // .sampleRate(30000)
        .bitRate(com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.BITRATE_UNKNOWN)
        // .bitRate(bitRate)
        .build();
      // const timeline = new net.ypresto.androidtranscoder.engine.TimeLine().addChannel('A', parcelFileDescriptor.getFileDescriptor()).createSegment().output('A').timeLine();
      // net.ypresto.androidtranscoder.MediaTranscoder.getInstance().transcodeVideo(timeline, outputPath, strategy, listener); //.get();
      const builder: com.otaliastudios.transcoder.TranscoderOptions.Builder = com.otaliastudios.transcoder.Transcoder.into(outputPath);
      builder.setListener(listener).addDataSource(inputPath).setVideoTrackStrategy(strategy).setAudioTrackStrategy(audiostrategy).transcode();
      //.setAudioTrackStrategy(audiostrategy)
    });
  }

  // utilities
  getVideoResolution(videoPath: string): VideoResolution {
    const metaRetriever = new android.media.MediaMetadataRetriever();
    metaRetriever.setDataSource(videoPath);
    return {
      width: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH),
      height: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT),
    };
  }
}
