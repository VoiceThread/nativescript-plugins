/* eslint-disable @typescript-eslint/ban-ts-comment */
import { File, Utils } from '@nativescript/core';
import { NativescriptTranscoderCommon, VideoConfig, VideoResolution } from './common';
import { clearInterval, setInterval } from '@nativescript/core/timer';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<File> {
    return new Promise((resolve, reject) => {
      const allowedTranscodingResolution = this.getAllowedTranscodingResolution(inputPath);
      if (!videoConfig.force && !allowedTranscodingResolution.includes(videoConfig.quality)) {
        return reject(
          'Transcoding to a higher resolution is not allowed by default. If you want to do this intentionally, pass in { force: true } as part of the vidoeConfig object to bypass this check.'
        );
      }
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };
      let height: number;
      switch (videoConfig.quality) {
        case '480p':
          height = 480;
          break;
        case '720p':
          height = 720;
          break;
        case '1080p':
          height = 1080;
          break;
      }
      const audioProcessors = new com.google.common.collect.ImmutableList.Builder<androidx.media3.common.audio.AudioProcessor>().build();
      const videoEffects = com.google.common.collect.ImmutableList.of(androidx.media3.effect.Presentation.createForHeight(height));
      const inputMediaItem: androidx.media3.common.MediaItem = androidx.media3.common.MediaItem.fromUri(inputPath);
      const editedMediaItem: androidx.media3.transformer.EditedMediaItem = new androidx.media3.transformer.EditedMediaItem.Builder(inputMediaItem)
        //@ts-ignore
        .setEffects(new androidx.media3.transformer.Effects(/* audioProcessors= */ audioProcessors, /* videoEffects= */ videoEffects))
        .build();

      const listener: androidx.media3.transformer.Transformer.Listener = new androidx.media3.transformer.Transformer.Listener({
        onTransformationCompleted: (inputMediaItem: androidx.media3.common.MediaItem) => {
          // console.log('onTransformationCompleted');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        onCompleted: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult) => {
          // console.log('onCompleted');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onTransformationError: (inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException) => {
          // console.log('onTransformationError!', exception);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
          reject(exception);
          clearInterval(progressUpdater);
        },
        onError: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException) => {
          // console.log('onError', exportException);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, {});
          reject(exportException);
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onFallbackApplied: (
          inputMediaItem: androidx.media3.common.MediaItem,
          originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
          fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
        ) => {
          // console.log('onFallbackApplied');
        },
      });
      const transformer: androidx.media3.transformer.Transformer = new androidx.media3.transformer.Transformer.Builder(this.getAndroidContext())
        .setVideoMimeType(androidx.media3.common.MimeTypes.VIDEO_H264)
        .setAudioMimeType(androidx.media3.common.MimeTypes.AUDIO_AAC)
        .addListener(listener)
        .build();
      transformer.start(editedMediaItem, outputPath);
      const progressHolder: androidx.media3.transformer.ProgressHolder = new androidx.media3.transformer.ProgressHolder();
      const progressUpdater = setInterval(() => {
        transformer.getProgress(progressHolder);
        // console.log('progressHolder', progressHolder.progress / 100);
        emit(NativescriptTranscoderCommon.TRANSCODING_PROGRESS, { progress: progressHolder.progress / 100 });
      }, 200);
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
