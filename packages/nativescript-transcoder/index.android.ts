/* eslint-disable @typescript-eslint/ban-ts-comment */
import { File, Utils } from '@nativescript/core';
import { NativescriptTranscoderCommon, VideoConfig, VideoResolution } from './common';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<File> {
    return new Promise((resolve, reject) => {
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };
      console.log('setting up transformer pipeline');
      // const audioProcessors = com.google.common.collect.ImmutableList.of();
      const audioProcessors = new com.google.common.collect.ImmutableList.Builder<androidx.media3.common.audio.AudioProcessor>().build();
      console.log('audioProcessors', audioProcessors);
      // const videoEffects = new com.google.common.collect.ImmutableList.Builder<androidx.media3.common.Effect>().build();
      const videoEffects = com.google.common.collect.ImmutableList.of(androidx.media3.effect.Presentation.createForHeight(480));

      // const audioProcessorsList = new java.util.List<androidx.media3.common.audio.AudioProcessor>();
      // const videoEffects = new java.util.List<androidx.media3.common.Effect>();
      console.log('videoEffects', videoEffects);
      // videoEffects.add(androidx.media3.effect.Presentation.createForHeight(480))
      // console.log('videoEffects added', videoEffects);
      const inputMediaItem: androidx.media3.common.MediaItem = androidx.media3.common.MediaItem.fromUri(inputPath);
      const editedMediaItem: androidx.media3.transformer.EditedMediaItem = new androidx.media3.transformer.EditedMediaItem.Builder(inputMediaItem)
        //@ts-ignore
        .setEffects(new androidx.media3.transformer.Effects(/* audioProcessors= */ audioProcessors, /* videoEffects= */ videoEffects))
        .build();
      const listener: androidx.media3.transformer.Transformer.Listener = new androidx.media3.transformer.Transformer.Listener({
        onTransformationCompleted: (inputMediaItem: androidx.media3.common.MediaItem) => {
          console.log('completed');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
        },
        onCompleted: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult) => {
          console.log('completed');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
        },
        //@ts-ignore
        onTransformationError: (inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException) => {
          console.log('error!', exception);
          // return false;
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
          reject(exception);
        },
        onError: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException) => {
          console.log('error', exportException);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
          reject(exportException);
        },
        //@ts-ignore
        onFallbackApplied: (
          inputMediaItem: androidx.media3.common.MediaItem,
          originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
          fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
        ) => {
          console.log('fallback applied');
        },
      });
      const transformer: androidx.media3.transformer.Transformer = new androidx.media3.transformer.Transformer.Builder(this.getAndroidContext())
        .setVideoMimeType(androidx.media3.common.MimeTypes.VIDEO_H264)
        .addListener(listener)
        .build();
      console.log('starting transformer');
      transformer.start(editedMediaItem, outputPath);
      //   const allowedTranscodingResolution = this.getAllowedTranscodingResolution(inputPath);
      //   if (!videoConfig.force && allowedTranscodingResolution.includes(videoConfig.quality)) {
      //     return Promise.reject(
      //       'Transcoding to a higher resolution is not allowed by default. If you want to do this intentionally, pass in { force: true } as part of the vidoeConfig object to bypass this check.'
      //     );
      //   }
      //   const emit = (event: string, data: any) => {
      //     this.notify({ eventName: event, object: this, data });
      //   };
      //   const parcelFileDescriptor = android.os.ParcelFileDescriptor.open(new java.io.File(inputPath), android.os.ParcelFileDescriptor.MODE_READ_ONLY);
      //   emit(NativescriptTranscoderCommon.TRANSCODING_STARTED, {});
      //   const listener = new net.ypresto.androidtranscoder.MediaTranscoder.Listener({
      //     onTranscodeProgress: (progress: number) => {
      //       this.log('[transcode] Progress', progress);
      //       emit(NativescriptTranscoderCommon.TRANSCODING_PROGRESS, { progress });
      //     },
      //     onTranscodeCompleted: () => {
      //       this.log('[transcode] Completed');
      //       emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
      //       resolve(File.fromPath(outputPath));
      //     },
      //     onTranscodeCanceled: () => {
      //       this.log('[transcode] Cancelled');
      //       emit(NativescriptTranscoderCommon.TRANSCODING_CANCELLED, {});
      //       reject('canceled');
      //     },
      //     onTranscodeFailed: (exception: any) => {
      //       this.log('[transcode] Failed', exception);
      //       emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
      //       reject(exception);
      //     },
      //   });
      //   // default to 720p
      //   let strategy = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroidStrategy720P(
      //     net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_BITRATE_AS_IS,
      //     net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_CHANNELS_AS_IS
      //   );
      //   switch (videoConfig.quality) {
      //     case '1080p': {
      //       strategy = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroidStrategy1080P(
      //         net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_BITRATE_AS_IS,
      //         net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_CHANNELS_AS_IS
      //       );
      //       break;
      //     }
      //     case '720p': {
      //       strategy = net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets.createAndroidStrategy720P(
      //         net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_BITRATE_AS_IS,
      //         net.ypresto.androidtranscoder.format.Android16By9FormatStrategy.AUDIO_CHANNELS_AS_IS
      //       );
      //       break;
      //     }
      //   }
      //   const timeline = new net.ypresto.androidtranscoder.engine.TimeLine().addChannel('A', parcelFileDescriptor.getFileDescriptor()).createSegment().output('A').timeLine();
      //   net.ypresto.androidtranscoder.MediaTranscoder.getInstance().transcodeVideo(timeline, outputPath, strategy, listener); //.get();
    });
  }

  // This method is safer than Application.getApplicationContext()
  getAndroidContext(): android.app.Application {
    const ctx =
      java.lang.Class.forName('android.app.AppGlobals').getMethod('getInitialApplication', null).invoke(null, null) ||
      java.lang.Class.forName('android.app.ActivityThread').getMethod('currentApplication', null).invoke(null, null);
    return ctx || Utils.android.getApplicationContext();
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
