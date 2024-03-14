/* eslint-disable @typescript-eslint/ban-ts-comment */
import { File, Utils } from '@nativescript/core';
import { NativescriptTranscoderCommon, VideoConfig, VideoResolution } from './common';
import { clearInterval, setInterval } from '@nativescript/core/timer';

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  /**
   * Transcodes video from inputPath to outoutPath using videoConfig options
   * @param inputPath string
   * @param outputPath string
   * @param videoConfig VideoConfig
   * @returns Promise<File>
   *
   */
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<File> {
    return new Promise((resolve, reject) => {
      if (File.exists(outputPath)) {
        const file = File.fromPath(outputPath);
        file.removeSync();
      }
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

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const listener: androidx.media3.transformer.Transformer.Listener = new androidx.media3.transformer.Transformer.Listener({
        onTransformationCompleted: (inputMediaItem: androidx.media3.common.MediaItem) => {
          that.log('onTransformationCompleted');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        onCompleted: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult) => {
          that.log('onCompleted');
          emit(NativescriptTranscoderCommon.TRANSCODING_COMPLETE, { output: outputPath });
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onTransformationError: (inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException) => {
          that.log('onTransformationError!', exception);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, { error: exception });
          reject(exception);
          clearInterval(progressUpdater);
        },
        onError: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException) => {
          that.log('onError', exportException);
          emit(NativescriptTranscoderCommon.TRANSCODING_ERROR, { error: exportException });
          reject(exportException);
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onFallbackApplied: (
          inputMediaItem: androidx.media3.common.MediaItem,
          originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
          fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
        ) => {
          this.log('onFallbackApplied');
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
        this.log('Progress: ' + progressHolder.progress / 100);
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
  /**
   * Looks for the video resolution metadata and returns a VideoResolution object with width and height
   * @param videoPath string
   * @returns VideoResolution
   */
  getVideoResolution(videoPath: string): VideoResolution {
    const metaRetriever = new android.media.MediaMetadataRetriever();
    metaRetriever.setDataSource(videoPath);
    return {
      width: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH),
      height: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT),
    };
  }
}
