/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/// <reference path="android-declarations.d.ts"/>

declare module com {
  export module otaliastudios {
    export module transcoder {
      export class Thumbnailer {
        public static class: java.lang.Class<com.otaliastudios.transcoder.Thumbnailer>;
        public thumbnails(options: com.otaliastudios.transcoder.ThumbnailerOptions): java.util.concurrent.Future<java.lang.Void>;
        public thumbnails(builder: any): java.util.concurrent.Future<java.lang.Void>;
      }
      export module Thumbnailer {
        export class Companion {
          public static class: java.lang.Class<com.otaliastudios.transcoder.Thumbnailer.Companion>;
          public getInstance(): com.otaliastudios.transcoder.Thumbnailer;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export class ThumbnailerListener {
        public static class: java.lang.Class<com.otaliastudios.transcoder.ThumbnailerListener>;
        /**
         * Constructs a new instance of the com.otaliastudios.transcoder.ThumbnailerListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          onThumbnail(param0: com.otaliastudios.transcoder.thumbnail.Thumbnail): void;
          onThumbnailsCompleted(param0: java.util.List<com.otaliastudios.transcoder.thumbnail.Thumbnail>): void;
          onThumbnailsCanceled(): void;
          onThumbnailsFailed(param0: java.lang.Throwable): void;
        });
        public constructor();
        public onThumbnail(param0: com.otaliastudios.transcoder.thumbnail.Thumbnail): void;
        public onThumbnailsCompleted(param0: java.util.List<com.otaliastudios.transcoder.thumbnail.Thumbnail>): void;
        public onThumbnailsCanceled(): void;
        public onThumbnailsFailed(param0: java.lang.Throwable): void;
      }
      export module ThumbnailerListener {
        export class DefaultImpls {
          public static class: java.lang.Class<com.otaliastudios.transcoder.ThumbnailerListener.DefaultImpls>;
          public static onThumbnailsCompleted($this: com.otaliastudios.transcoder.ThumbnailerListener, thumbnails: java.util.List<com.otaliastudios.transcoder.thumbnail.Thumbnail>): void;
          public static onThumbnailsCanceled($this: com.otaliastudios.transcoder.ThumbnailerListener): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export class ThumbnailerOptions {
        public static class: java.lang.Class<com.otaliastudios.transcoder.ThumbnailerOptions>;
        public getResizer(): com.otaliastudios.transcoder.resize.Resizer;
        public getListenerHandler(): globalAndroid.os.Handler;
        public getRotation(): number;
        public constructor(
          dataSources: java.util.List<any>,
          resizer: com.otaliastudios.transcoder.resize.Resizer,
          rotation: number,
          thumbnailRequests: java.util.List<any>,
          listener: com.otaliastudios.transcoder.ThumbnailerListener,
          listenerHandler: globalAndroid.os.Handler
        );
        public getListener(): com.otaliastudios.transcoder.ThumbnailerListener;
        public getDataSources(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
        public getThumbnailRequests(): java.util.List<com.otaliastudios.transcoder.thumbnail.ThumbnailRequest>;
      }
      export module ThumbnailerOptions {
        export class Builder {
          public static class: java.lang.Class<com.otaliastudios.transcoder.ThumbnailerOptions.Builder>;
          public thumbnails(): java.util.concurrent.Future<java.lang.Void>;
          public constructor();
          public addDataSource(context: globalAndroid.content.Context, uri: globalAndroid.net.Uri): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public addDataSource(filePath: string): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public build(): com.otaliastudios.transcoder.ThumbnailerOptions;
          public addDataSource(it: com.otaliastudios.transcoder.source.DataSource): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public addDataSource(fileDescriptor: java.io.FileDescriptor): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public addResizer(it: com.otaliastudios.transcoder.resize.Resizer): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public setListener(it: com.otaliastudios.transcoder.ThumbnailerListener): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public addThumbnailRequest(it: com.otaliastudios.transcoder.thumbnail.ThumbnailRequest): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public setRotation(it: number): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
          public setListenerHandler(it: globalAndroid.os.Handler): com.otaliastudios.transcoder.ThumbnailerOptions.Builder;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export class Transcoder {
        public static class: java.lang.Class<com.otaliastudios.transcoder.Transcoder>;
        public static SUCCESS_TRANSCODED: number = 0;
        public static SUCCESS_NOT_NEEDED: number = 1;
        public transcode(options: com.otaliastudios.transcoder.TranscoderOptions): java.util.concurrent.Future<java.lang.Void>;
        public static into(outPath: string): com.otaliastudios.transcoder.TranscoderOptions.Builder;
        public static getInstance(): com.otaliastudios.transcoder.Transcoder;
        public static into(fileDescriptor: java.io.FileDescriptor): com.otaliastudios.transcoder.TranscoderOptions.Builder;
        public static into(dataSink: com.otaliastudios.transcoder.sink.DataSink): com.otaliastudios.transcoder.TranscoderOptions.Builder;
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export class TranscoderListener {
        public static class: java.lang.Class<com.otaliastudios.transcoder.TranscoderListener>;
        /**
         * Constructs a new instance of the com.otaliastudios.transcoder.TranscoderListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          onTranscodeProgress(param0: number): void;
          onTranscodeCompleted(param0: number): void;
          onTranscodeCanceled(): void;
          onTranscodeFailed(param0: java.lang.Throwable): void;
        });
        public constructor();
        public onTranscodeFailed(param0: java.lang.Throwable): void;
        public onTranscodeProgress(param0: number): void;
        public onTranscodeCompleted(param0: number): void;
        public onTranscodeCanceled(): void;
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export class TranscoderOptions {
        public static class: java.lang.Class<com.otaliastudios.transcoder.TranscoderOptions>;
        public getListenerHandler(): globalAndroid.os.Handler;
        public getTimeInterpolator(): com.otaliastudios.transcoder.time.TimeInterpolator;
        public getListener(): com.otaliastudios.transcoder.TranscoderListener;
        public getDataSink(): com.otaliastudios.transcoder.sink.DataSink;
        public getAudioTrackStrategy(): com.otaliastudios.transcoder.strategy.TrackStrategy;
        public getVideoRotation(): number;
        public getAudioStretcher(): com.otaliastudios.transcoder.stretch.AudioStretcher;
        public getValidator(): com.otaliastudios.transcoder.validator.Validator;
        public getAudioDataSources(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
        public getVideoTrackStrategy(): com.otaliastudios.transcoder.strategy.TrackStrategy;
        public getAudioResampler(): com.otaliastudios.transcoder.resample.AudioResampler;
        public getVideoDataSources(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
      }
      export module TranscoderOptions {
        export class Builder {
          public static class: java.lang.Class<com.otaliastudios.transcoder.TranscoderOptions.Builder>;
          public addDataSource(
            type: com.otaliastudios.transcoder.common.TrackType,
            assetFileDescriptor: globalAndroid.content.res.AssetFileDescriptor
          ): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setListenerHandler(listenerHandler: globalAndroid.os.Handler): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setTimeInterpolator(timeInterpolator: com.otaliastudios.transcoder.time.TimeInterpolator): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setSpeed(speedFactor: number): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(type: com.otaliastudios.transcoder.common.TrackType, dataSource: com.otaliastudios.transcoder.source.DataSource): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(inPath: string): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(type: com.otaliastudios.transcoder.common.TrackType, fileDescriptor: java.io.FileDescriptor): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(context: globalAndroid.content.Context, uri: globalAndroid.net.Uri): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(
            type: com.otaliastudios.transcoder.common.TrackType,
            context: globalAndroid.content.Context,
            uri: globalAndroid.net.Uri
          ): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setAudioResampler(audioResampler: com.otaliastudios.transcoder.resample.AudioResampler): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(assetFileDescriptor: globalAndroid.content.res.AssetFileDescriptor): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(type: com.otaliastudios.transcoder.common.TrackType, inPath: string): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(fileDescriptor: java.io.FileDescriptor): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setListener(listener: com.otaliastudios.transcoder.TranscoderListener): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public addDataSource(dataSource: com.otaliastudios.transcoder.source.DataSource): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public transcode(): java.util.concurrent.Future<java.lang.Void>;
          public setAudioTrackStrategy(trackStrategy: com.otaliastudios.transcoder.strategy.TrackStrategy): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setVideoTrackStrategy(trackStrategy: com.otaliastudios.transcoder.strategy.TrackStrategy): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setVideoRotation(rotation: number): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setAudioStretcher(audioStretcher: com.otaliastudios.transcoder.stretch.AudioStretcher): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public setValidator(validator: com.otaliastudios.transcoder.validator.Validator): com.otaliastudios.transcoder.TranscoderOptions.Builder;
          public build(): com.otaliastudios.transcoder.TranscoderOptions;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module common {
        export class ExactSize extends com.otaliastudios.transcoder.common.Size {
          public static class: java.lang.Class<com.otaliastudios.transcoder.common.ExactSize>;
          public getHeight(): number;
          public getWidth(): number;
          public constructor(width: number, height: number);
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module common {
        export class Size {
          public static class: java.lang.Class<com.otaliastudios.transcoder.common.Size>;
          public getMinor(): number;
          public getMajor(): number;
          public constructor(firstSize: number, secondSize: number);
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module common {
        export class TrackStatus {
          public static class: java.lang.Class<com.otaliastudios.transcoder.common.TrackStatus>;
          public static ABSENT: com.otaliastudios.transcoder.common.TrackStatus;
          public static REMOVING: com.otaliastudios.transcoder.common.TrackStatus;
          public static PASS_THROUGH: com.otaliastudios.transcoder.common.TrackStatus;
          public static COMPRESSING: com.otaliastudios.transcoder.common.TrackStatus;
          public static values(): androidNative.Array<com.otaliastudios.transcoder.common.TrackStatus>;
          public isTranscoding(): boolean;
          public static valueOf(name: string): com.otaliastudios.transcoder.common.TrackStatus;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module common {
        export class TrackType {
          public static class: java.lang.Class<com.otaliastudios.transcoder.common.TrackType>;
          public static AUDIO: com.otaliastudios.transcoder.common.TrackType;
          public static VIDEO: com.otaliastudios.transcoder.common.TrackType;
          public static values(): androidNative.Array<com.otaliastudios.transcoder.common.TrackType>;
          public static valueOf(value: string): com.otaliastudios.transcoder.common.TrackType;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export class Codecs {
          public static class: java.lang.Class<com.otaliastudios.transcoder.internal.Codecs>;
          public constructor(
            sources: com.otaliastudios.transcoder.internal.DataSources,
            tracks: com.otaliastudios.transcoder.internal.Tracks,
            current: com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Integer>
          );
          public getOwnsEncoderStart(): com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Boolean>;
          public release(): void;
          public getOwnsEncoderStop(): com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Boolean>;
          public getEncoders(): com.otaliastudios.transcoder.internal.utils.TrackMap<globalAndroid.media.MediaCodec, globalAndroid.view.Surface>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export class DataSources extends com.otaliastudios.transcoder.internal.utils.TrackMap<java.util.List<any>> {
          public static class: java.lang.Class<com.otaliastudios.transcoder.internal.DataSources>;
          public all(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public audioOrNull(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public getOrNull(type: com.otaliastudios.transcoder.common.TrackType): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public has(type: com.otaliastudios.transcoder.common.TrackType): boolean;
          public get(type: com.otaliastudios.transcoder.common.TrackType): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public videoOrNull(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public release(): void;
          public getHasVideo(): boolean;
          public constructor(options: com.otaliastudios.transcoder.TranscoderOptions);
          public getSize(): number;
          public getAudio(): any;
          public iterator(): java.util.Iterator<any>;
          public getVideo(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public getHasAudio(): boolean;
          public getVideo(): any;
          public audioOrNull(): any;
          public iterator(): java.util.Iterator<java.util.List<com.otaliastudios.transcoder.source.DataSource>>;
          public constructor(options: com.otaliastudios.transcoder.ThumbnailerOptions);
          public get(param0: com.otaliastudios.transcoder.common.TrackType): any;
          public videoOrNull(): any;
          public getAudio(): java.util.List<com.otaliastudios.transcoder.source.DataSource>;
          public has(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public getOrNull(param0: com.otaliastudios.transcoder.common.TrackType): any;
        }
        export module DataSources {
          export class WhenMappings {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.DataSources.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export class Segment {
          public static class: java.lang.Class<com.otaliastudios.transcoder.internal.Segment>;
          public getIndex(): number;
          public advance(): boolean;
          public constructor(type: com.otaliastudios.transcoder.common.TrackType, index: number, pipeline: com.otaliastudios.transcoder.internal.pipeline.Pipeline);
          public canAdvance(): boolean;
          public release(): void;
          public getType(): com.otaliastudios.transcoder.common.TrackType;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export class Segments {
          public static class: java.lang.Class<com.otaliastudios.transcoder.internal.Segments>;
          public next(requestedIndex: com.otaliastudios.transcoder.common.TrackType): com.otaliastudios.transcoder.internal.Segment;
          public constructor(
            sources: com.otaliastudios.transcoder.internal.DataSources,
            tracks: com.otaliastudios.transcoder.internal.Tracks,
            factory: com.otaliastudios.transcoder.internal.pipeline.Pipeline
          );
          public getCurrentIndex(): com.otaliastudios.transcoder.internal.utils.MutableTrackMap<java.lang.Integer>;
          public release(): void;
          public hasNext(lastIndex: com.otaliastudios.transcoder.common.TrackType): boolean;
          public hasNext(): boolean;
        }
        export module Segments {
          export class WhenMappings {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.Segments.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export class Timer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.internal.Timer>;
          public getDurationUs(): com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Long>;
          public interpolator(answer$iv: com.otaliastudios.transcoder.common.TrackType, $i$f$getOrPut: number): com.otaliastudios.transcoder.time.TimeInterpolator;
          public getPositionUs(): com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Long>;
          public getProgress(): com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Double>;
          public getTotalDurationUs(): number;
          public constructor(
            interpolator: com.otaliastudios.transcoder.time.TimeInterpolator,
            sources: com.otaliastudios.transcoder.internal.DataSources,
            tracks: com.otaliastudios.transcoder.internal.Tracks,
            current: com.otaliastudios.transcoder.internal.utils.TrackMap<java.lang.Integer>
          );
          public localize(i: com.otaliastudios.transcoder.common.TrackType, any): java.lang.Long;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export class Tracks {
          public static class: java.lang.Class<com.otaliastudios.transcoder.internal.Tracks>;
          public getActive(): com.otaliastudios.transcoder.internal.utils.TrackMap<com.otaliastudios.transcoder.common.TrackStatus>;
          public getAll(): com.otaliastudios.transcoder.internal.utils.TrackMap<com.otaliastudios.transcoder.common.TrackStatus>;
          public getOutputFormats(): com.otaliastudios.transcoder.internal.utils.TrackMap<globalAndroid.media.MediaFormat>;
          public constructor(
            audioStatus: com.otaliastudios.transcoder.internal.utils.TrackMap<com.otaliastudios.transcoder.strategy.TrackStrategy>,
            videoFormat: com.otaliastudios.transcoder.internal.DataSources,
            videoStatus: number,
            any
          );
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export class AudioEngine
            extends com.otaliastudios.transcoder.internal.pipeline.QueuedStep<
              com.otaliastudios.transcoder.internal.codec.DecoderData,
              com.otaliastudios.transcoder.internal.codec.DecoderChannel,
              com.otaliastudios.transcoder.internal.codec.EncoderData,
              com.otaliastudios.transcoder.internal.codec.EncoderChannel
            >
            implements com.otaliastudios.transcoder.internal.codec.DecoderChannel
          {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.AudioEngine>;
            public drain(): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.codec.EncoderData>;
            public constructor();
            public getChannel(): com.otaliastudios.transcoder.internal.audio.AudioEngine;
            public handleSourceFormat(param0: globalAndroid.media.MediaFormat): globalAndroid.view.Surface;
            public enqueueEos(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public enqueue(param0: any): void;
            public release(): void;
            public constructor(
              stretcher: com.otaliastudios.transcoder.stretch.AudioStretcher,
              resampler: com.otaliastudios.transcoder.resample.AudioResampler,
              targetFormat: globalAndroid.media.MediaFormat
            );
            public getChannel(): any;
            public enqueue(this_: com.otaliastudios.transcoder.internal.codec.DecoderData): void;
            public handleRawFormat(rawFormat: globalAndroid.media.MediaFormat): void;
            public handleRawFormat(param0: globalAndroid.media.MediaFormat): void;
            public initialize(param0: any): void;
            public handleSourceFormat(sourceFormat: globalAndroid.media.MediaFormat): globalAndroid.view.Surface;
            public enqueueEos(data: com.otaliastudios.transcoder.internal.codec.DecoderData): void;
          }
          export module AudioEngine {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.AudioEngine.Companion>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export class Chunk {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.Chunk>;
            public equals(other: any): boolean;
            public component1(): java.nio.ShortBuffer;
            public copy(buffer: java.nio.ShortBuffer, timeUs: number, timeStretch: number, release: any): com.otaliastudios.transcoder.internal.audio.Chunk;
            public getTimeStretch(): number;
            public hashCode(): number;
            public toString(): string;
            public component4(): any;
            public component2(): number;
            public constructor(buffer: java.nio.ShortBuffer, timeUs: number, timeStretch: number, release: any);
            public getTimeUs(): number;
            public getBuffer(): java.nio.ShortBuffer;
            public getRelease(): any;
            public component3(): number;
          }
          export module Chunk {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.Chunk.Companion>;
              public getEos(): com.otaliastudios.transcoder.internal.audio.Chunk;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export class ChunkQueue {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.ChunkQueue>;
            public enqueue(buffer: java.nio.ShortBuffer, timeUs: number, timeStretch: number, release: any): void;
            public enqueueEos(): void;
            public constructor(sampleRate: number, channels: number);
            public isEmpty(): boolean;
            public drain(head: any, size: any): any;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export class ShortBuffers {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.ShortBuffers>;
            public acquire(it: string, current: number): java.nio.ShortBuffer;
            public constructor();
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export module remix {
            export class AudioRemixer {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer>;
              /**
               * Constructs a new instance of the com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
               */
              public constructor(implementation: { remix(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer): void; getRemixedSize(param0: number): number; '<clinit>'(): void });
              public constructor();
              public getRemixedSize(param0: number): number;
              public remix(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer): void;
            }
            export module AudioRemixer {
              export class Companion {
                public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer.Companion>;
                public get$nativescript_transcoder_release(inputChannels: number, outputChannels: number): com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer;
              }
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export module remix {
            export class DownMixAudioRemixer extends com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.remix.DownMixAudioRemixer>;
              public constructor();
              public getRemixedSize(inputSize: number): number;
              public getRemixedSize(param0: number): number;
              public remix(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer): void;
              public remix(a: java.nio.ShortBuffer, b: java.nio.ShortBuffer): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export module remix {
            export class PassThroughAudioRemixer extends com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.remix.PassThroughAudioRemixer>;
              public constructor();
              public remix(inputBuffer: java.nio.ShortBuffer, outputBuffer: java.nio.ShortBuffer): void;
              public getRemixedSize(inputSize: number): number;
              public getRemixedSize(param0: number): number;
              public remix(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module audio {
          export module remix {
            export class UpMixAudioRemixer extends com.otaliastudios.transcoder.internal.audio.remix.AudioRemixer {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.audio.remix.UpMixAudioRemixer>;
              public constructor();
              public getRemixedSize(inputSize: number): number;
              public getRemixedSize(param0: number): number;
              public remix(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer): void;
              public remix(i: java.nio.ShortBuffer, this_: java.nio.ShortBuffer): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class Decoder
            extends com.otaliastudios.transcoder.internal.pipeline.QueuedStep<
              com.otaliastudios.transcoder.internal.data.ReaderData,
              com.otaliastudios.transcoder.internal.data.ReaderChannel,
              com.otaliastudios.transcoder.internal.codec.DecoderData,
              com.otaliastudios.transcoder.internal.codec.DecoderChannel
            >
            implements com.otaliastudios.transcoder.internal.data.ReaderChannel
          {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.Decoder>;
            public constructor();
            public enqueueEos(this_: com.otaliastudios.transcoder.internal.data.ReaderData): void;
            public enqueueEos(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public getChannel(): com.otaliastudios.transcoder.internal.codec.Decoder;
            public constructor(this_$iv: globalAndroid.media.MediaFormat, initialValue$iv: boolean);
            public enqueue(param0: any): void;
            public release(): void;
            public getChannel(): any;
            public enqueue(id: com.otaliastudios.transcoder.internal.data.ReaderData): void;
            public initialize(param0: any): void;
            public initialize(this_: com.otaliastudios.transcoder.internal.codec.DecoderChannel): void;
            public buffer(): any;
            public initialize(next: any): void;
            public drain(): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.codec.DecoderData>;
          }
          export module Decoder {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.Decoder.Companion>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class DecoderChannel extends com.otaliastudios.transcoder.internal.pipeline.Channel {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.DecoderChannel>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.codec.DecoderChannel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              handleSourceFormat(param0: globalAndroid.media.MediaFormat): globalAndroid.view.Surface;
              handleRawFormat(param0: globalAndroid.media.MediaFormat): void;
              '<clinit>'(): void;
            });
            public constructor();
            public static Companion: com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public handleSourceFormat(param0: globalAndroid.media.MediaFormat): globalAndroid.view.Surface;
            public handleRawFormat(param0: globalAndroid.media.MediaFormat): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class DecoderData {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.DecoderData>;
            public getBuffer(): java.nio.ByteBuffer;
            public getTimeUs(): number;
            public constructor(buffer: java.nio.ByteBuffer, timeUs: number, release: any);
            public getRelease(): any;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class DecoderDropper {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.DecoderDropper>;
            public output(it: number): java.lang.Long;
            public constructor(continuous: boolean);
            public input(timeUs: number, render: boolean): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class DecoderTimer extends com.otaliastudios.transcoder.internal.pipeline.DataStep<
            com.otaliastudios.transcoder.internal.codec.DecoderData,
            com.otaliastudios.transcoder.internal.codec.DecoderChannel
          > {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.DecoderTimer>;
            public getChannel(): any;
            public constructor();
            public step(
              durationUs: com.otaliastudios.transcoder.internal.pipeline.State.Ok<com.otaliastudios.transcoder.internal.codec.DecoderData>,
              rawDurationUs: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.codec.DecoderData>;
            public initialize(param0: any): void;
            public constructor(track: com.otaliastudios.transcoder.common.TrackType, interpolator: com.otaliastudios.transcoder.time.TimeInterpolator);
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class DecoderTimerData extends com.otaliastudios.transcoder.internal.codec.DecoderData {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.DecoderTimerData>;
            public getRawTimeUs(): number;
            public getTimeStretch(): number;
            public constructor(buffer: java.nio.ByteBuffer, timeUs: number, release: any);
            public constructor(buffer: java.nio.ByteBuffer, rawTimeUs: number, timeUs: number, timeStretch: number, release: any);
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class Encoder
            extends com.otaliastudios.transcoder.internal.pipeline.QueuedStep<
              com.otaliastudios.transcoder.internal.codec.EncoderData,
              com.otaliastudios.transcoder.internal.codec.EncoderChannel,
              com.otaliastudios.transcoder.internal.data.WriterData,
              com.otaliastudios.transcoder.internal.data.WriterChannel
            >
            implements com.otaliastudios.transcoder.internal.codec.EncoderChannel
          {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.Encoder>;
            public drain(): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.data.WriterData>;
            public constructor();
            public enqueueEos(this_: com.otaliastudios.transcoder.internal.codec.EncoderData): void;
            public enqueueEos(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public getChannel(): com.otaliastudios.transcoder.internal.codec.Encoder;
            public enqueue(param0: any): void;
            public release(): void;
            public constructor(this_$iv: globalAndroid.media.MediaCodec, initialValue$iv: globalAndroid.view.Surface, $i$f$observable: boolean, this_$iv: boolean);
            public getChannel(): any;
            public initialize(param0: any): void;
            public buffer(): any;
            public enqueue(buffer: com.otaliastudios.transcoder.internal.codec.EncoderData): void;
            public getSurface(): globalAndroid.view.Surface;
            public constructor(codecs: com.otaliastudios.transcoder.internal.Codecs, type: com.otaliastudios.transcoder.common.TrackType);
          }
          export module Encoder {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.Encoder.Companion>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class EncoderChannel extends com.otaliastudios.transcoder.internal.pipeline.Channel {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.EncoderChannel>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.codec.EncoderChannel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { getSurface(): globalAndroid.view.Surface; buffer(): any; '<clinit>'(): void });
            public constructor();
            public static Companion: com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public buffer(): any;
            public getSurface(): globalAndroid.view.Surface;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module codec {
          export class EncoderData {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.EncoderData>;
            public getBuffer(): java.nio.ByteBuffer;
            public component2(): number;
            public getTimeUs(): number;
            public equals(other: any): boolean;
            public component1(): java.nio.ByteBuffer;
            public hashCode(): number;
            public copy(buffer: java.nio.ByteBuffer, id: number, timeUs: number): com.otaliastudios.transcoder.internal.codec.EncoderData;
            public constructor(buffer: java.nio.ByteBuffer, id: number, timeUs: number);
            public component3(): number;
            public toString(): string;
            public getId(): number;
          }
          export module EncoderData {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.codec.EncoderData.Companion>;
              public getEmpty(): com.otaliastudios.transcoder.internal.codec.EncoderData;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class Bridge extends java.lang.Object {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.Bridge>;
            public constructor(format: globalAndroid.media.MediaFormat);
            public getChannel(): any;
            public initialize(next: com.otaliastudios.transcoder.internal.data.WriterChannel): void;
            public initialize(param0: any): void;
            public getChannel(): com.otaliastudios.transcoder.internal.data.Bridge;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public buffer(): any;
            public step(
              flags: com.otaliastudios.transcoder.internal.pipeline.State.Ok<com.otaliastudios.transcoder.internal.data.ReaderData>,
              result: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.data.WriterData>;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class Reader extends com.otaliastudios.transcoder.internal.pipeline.BaseStep<
            any,
            com.otaliastudios.transcoder.internal.pipeline.Channel,
            com.otaliastudios.transcoder.internal.data.ReaderData,
            com.otaliastudios.transcoder.internal.data.ReaderChannel
          > {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.Reader>;
            public getChannel(): any;
            public step(
              byteBuffer: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>,
              id: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.data.ReaderData>;
            public constructor();
            public getChannel(): com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public constructor(source: com.otaliastudios.transcoder.source.DataSource, track: com.otaliastudios.transcoder.common.TrackType);
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class ReaderChannel extends com.otaliastudios.transcoder.internal.pipeline.Channel {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.ReaderChannel>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.data.ReaderChannel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { buffer(): any; '<clinit>'(): void });
            public constructor();
            public static Companion: com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public buffer(): any;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class ReaderData {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.ReaderData>;
            public copy(chunk: com.otaliastudios.transcoder.source.DataSource.Chunk, id: number): com.otaliastudios.transcoder.internal.data.ReaderData;
            public constructor(chunk: com.otaliastudios.transcoder.source.DataSource.Chunk, id: number);
            public component2(): number;
            public equals(other: any): boolean;
            public getChunk(): com.otaliastudios.transcoder.source.DataSource.Chunk;
            public component1(): com.otaliastudios.transcoder.source.DataSource.Chunk;
            public hashCode(): number;
            public toString(): string;
            public getId(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class ReaderTimer extends com.otaliastudios.transcoder.internal.pipeline.DataStep<
            com.otaliastudios.transcoder.internal.data.ReaderData,
            com.otaliastudios.transcoder.internal.data.ReaderChannel
          > {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.ReaderTimer>;
            public getChannel(): any;
            public constructor();
            public initialize(param0: any): void;
            public constructor(track: com.otaliastudios.transcoder.common.TrackType, interpolator: com.otaliastudios.transcoder.time.TimeInterpolator);
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public release(): void;
            public step(
              state: com.otaliastudios.transcoder.internal.pipeline.State.Ok<com.otaliastudios.transcoder.internal.data.ReaderData>,
              fresh: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.data.ReaderData>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class Seeker extends com.otaliastudios.transcoder.internal.pipeline.BaseStep<
            any,
            com.otaliastudios.transcoder.internal.pipeline.Channel,
            any,
            com.otaliastudios.transcoder.internal.pipeline.Channel
          > {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.Seeker>;
            public getChannel(): any;
            public constructor();
            public constructor(source: com.otaliastudios.transcoder.source.DataSource, positions: java.util.List<java.lang.Long>, seek: any);
            public getChannel(): com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public step(this_: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, state: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class Writer extends java.lang.Object {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.Writer>;
            public getChannel(): any;
            public getChannel(): com.otaliastudios.transcoder.internal.data.Writer;
            public constructor(sink: com.otaliastudios.transcoder.sink.DataSink, track: com.otaliastudios.transcoder.common.TrackType);
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public step(
              timestamp: com.otaliastudios.transcoder.internal.pipeline.State.Ok<com.otaliastudios.transcoder.internal.data.WriterData>,
              flags: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public handleFormat(format: globalAndroid.media.MediaFormat): void;
            public handleFormat(param0: globalAndroid.media.MediaFormat): void;
            public initialize(next: com.otaliastudios.transcoder.internal.pipeline.Channel): void;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class WriterChannel extends com.otaliastudios.transcoder.internal.pipeline.Channel {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.WriterChannel>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.data.WriterChannel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { handleFormat(param0: globalAndroid.media.MediaFormat): void; '<clinit>'(): void });
            public constructor();
            public static Companion: com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public handleFormat(param0: globalAndroid.media.MediaFormat): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module data {
          export class WriterData {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.data.WriterData>;
            public getBuffer(): java.nio.ByteBuffer;
            public equals(other: any): boolean;
            public hashCode(): number;
            public toString(): string;
            public component4(): any;
            public component2(): number;
            public getTimeUs(): number;
            public component1(): java.nio.ByteBuffer;
            public getFlags(): number;
            public constructor(buffer: java.nio.ByteBuffer, timeUs: number, flags: number, release: any);
            public getRelease(): any;
            public copy(buffer: java.nio.ByteBuffer, timeUs: number, flags: number, release: any): com.otaliastudios.transcoder.internal.data.WriterData;
            public component3(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module media {
          export class MediaCodecBuffers {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.media.MediaCodecBuffers>;
            public onOutputBuffersChanged(): void;
            public constructor(mediaCodec: globalAndroid.media.MediaCodec);
            public getOutputBuffer(index: number): java.nio.ByteBuffer;
            public getInputBuffer(index: number): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module media {
          export class MediaFormatConstants {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.media.MediaFormatConstants>;
            public static KEY_PROFILE: string = 'profile';
            public static KEY_LEVEL: string = 'level';
            public static KEY_AVC_SPS: string = 'csd-0';
            public static KEY_AVC_PPS: string = 'csd-1';
            public static KEY_ROTATION_DEGREES: string = 'rotation-degrees';
            public static MIMETYPE_VIDEO_AVC: string = 'video/avc';
            public static MIMETYPE_VIDEO_H263: string = 'video/3gpp';
            public static MIMETYPE_VIDEO_VP8: string = 'video/x-vnd.on2.vp8';
            public static MIMETYPE_AUDIO_AAC: string = 'audio/mp4a-latm';
            public static MIMETYPE_AUDIO_RAW: string = 'audio/raw';
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module media {
          export class MediaFormatProvider {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.media.MediaFormatProvider>;
            public constructor();
            public provideMediaFormat(
              this_: com.otaliastudios.transcoder.source.DataSource,
              source: com.otaliastudios.transcoder.common.TrackType,
              type: globalAndroid.media.MediaFormat
            ): globalAndroid.media.MediaFormat;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export abstract class BaseStep<Input, InputChannel, Output, OutputChannel> extends com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any> {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.BaseStep<any, any, any, any>>;
            public getChannel(): any;
            public constructor();
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public getNext(): any;
            public release(): void;
            public initialize(next: any): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export class Channel {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Channel>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.pipeline.Channel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { '<clinit>'(): void });
            public constructor();
          }
          export module Channel {
            export class Companion extends com.otaliastudios.transcoder.internal.pipeline.Channel {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Channel.Companion>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export abstract class DataStep<D, C> extends com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any> {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.DataStep<any, any>>;
            public channel: any;
            public getChannel(): any;
            public constructor();
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public setChannel(param0: any): void;
            public release(): void;
            public initialize(next: any): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export class Pipeline {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Pipeline>;
            public release(): void;
            public execute(): com.otaliastudios.transcoder.internal.pipeline.State<any>;
          }
          export module Pipeline {
            export class Builder<D, C> extends java.lang.Object {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Pipeline.Builder<any, any>>;
              public constructor();
              public constructor(steps: java.util.List<any>);
              public getSteps$nativescript_transcoder_release(): java.util.List<com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any>>;
              public plus(step: com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any>): com.otaliastudios.transcoder.internal.pipeline.Pipeline.Builder<any, any>;
            }
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Pipeline.Companion>;
              public build$nativescript_transcoder_release(name: string, builder: any): com.otaliastudios.transcoder.internal.pipeline.Pipeline;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export module PipelinesKt {
            // export module  {
            export class WhenMappings {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.PipelinesKt.WhenMappings>;
            }
          }
          // }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export abstract class QueuedStep<Input, InputChannel, Output, OutputChannel> extends com.otaliastudios.transcoder.internal.pipeline.BaseStep<any, any, any, any> {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.QueuedStep<any, any, any, any>>;
            public getChannel(): any;
            public constructor();
            public step(state: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, fresh: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public enqueueEos(param0: any): void;
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public drain(): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public enqueue(param0: any): void;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export abstract class State<T> extends java.lang.Object {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.State<any>>;
          }
          export module State {
            export class Eos<T> extends com.otaliastudios.transcoder.internal.pipeline.State.Ok<any> {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.State.Eos<any>>;
              public constructor(value: any);
              public toString(): string;
            }
            export class Ok<T> extends com.otaliastudios.transcoder.internal.pipeline.State<any> {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>>;
              public getValue(): any;
              public constructor(value: any);
              public toString(): string;
            }
            export class Retry extends com.otaliastudios.transcoder.internal.pipeline.State<any> {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.State.Retry>;
              public static INSTANCE: com.otaliastudios.transcoder.internal.pipeline.State.Retry;
              public toString(): string;
            }
            export class Wait extends com.otaliastudios.transcoder.internal.pipeline.State<any> {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.State.Wait>;
              public static INSTANCE: com.otaliastudios.transcoder.internal.pipeline.State.Wait;
              public toString(): string;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module pipeline {
          export class Step<Input, InputChannel, Output, OutputChannel> extends java.lang.Object {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any>>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.pipeline.Step<any,any,any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              getChannel(): InputChannel;
              initialize(param0: OutputChannel): void;
              step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<Input>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<Output>;
              release(): void;
            });
            public constructor();
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<Input>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<Output>;
            public initialize(param0: OutputChannel): void;
            public release(): void;
            public getChannel(): InputChannel;
          }
          export module Step {
            export class DefaultImpls {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.pipeline.Step.DefaultImpls>;
              public static initialize($this: com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any>, next: com.otaliastudios.transcoder.internal.pipeline.Channel): void;
              public static release($this: com.otaliastudios.transcoder.internal.pipeline.Step<any, any, any, any>): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module thumbnails {
          export class DefaultThumbnailsEngine extends com.otaliastudios.transcoder.internal.thumbnails.ThumbnailsEngine {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.thumbnails.DefaultThumbnailsEngine>;
            public constructor(
              it: com.otaliastudios.transcoder.internal.DataSources,
              item$iv$iv: number,
              $i$f$mapTo: com.otaliastudios.transcoder.resize.Resizer,
              $this$mapTo$iv$iv: java.util.List<any>
            );
            public static thumbnails(options: com.otaliastudios.transcoder.ThumbnailerOptions): void;
            public constructor();
            public thumbnails(completed: any): void;
            public cleanup(): void;
          }
          export module DefaultThumbnailsEngine {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.thumbnails.DefaultThumbnailsEngine.Companion>;
            }
            export class Stub {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.thumbnails.DefaultThumbnailsEngine.Stub>;
              public getPositionUs(): number;
              public getRequest(): com.otaliastudios.transcoder.thumbnail.ThumbnailRequest;
              public getActualLocalizedUs(): number;
              public setActualLocalizedUs(param0: number): void;
              public constructor(request: com.otaliastudios.transcoder.thumbnail.ThumbnailRequest, positionUs: number, localizedUs: number);
              public getLocalizedUs(): number;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module thumbnails {
          export class ThumbnailsDispatcher {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.thumbnails.ThumbnailsDispatcher>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module thumbnails {
          export abstract class ThumbnailsEngine {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.thumbnails.ThumbnailsEngine>;
            public static thumbnails(options: com.otaliastudios.transcoder.ThumbnailerOptions): void;
            public constructor();
            public thumbnails(param0: any): void;
            public cleanup(): void;
          }
          export module ThumbnailsEngine {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.thumbnails.ThumbnailsEngine.Companion>;
              public thumbnails(engine: com.otaliastudios.transcoder.ThumbnailerOptions): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module transcode {
          export class DefaultTranscodeEngine extends com.otaliastudios.transcoder.internal.transcode.TranscodeEngine {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.transcode.DefaultTranscodeEngine>;
            public constructor();
            public validate(): boolean;
            public transcode(videoProgress: any): void;
            public static transcode(options: com.otaliastudios.transcoder.TranscoderOptions): void;
            public cleanup(): void;
            public constructor(
              this_: com.otaliastudios.transcoder.internal.DataSources,
              dataSources: com.otaliastudios.transcoder.sink.DataSink,
              dataSink: com.otaliastudios.transcoder.internal.utils.TrackMap<com.otaliastudios.transcoder.strategy.TrackStrategy>,
              strategies: com.otaliastudios.transcoder.validator.Validator,
              validator: number,
              videoRotation: com.otaliastudios.transcoder.stretch.AudioStretcher,
              audioStretcher: com.otaliastudios.transcoder.resample.AudioResampler,
              audioResampler: com.otaliastudios.transcoder.time.TimeInterpolator
            );
          }
          export module DefaultTranscodeEngine {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.transcode.DefaultTranscodeEngine.Companion>;
            }
            export class WhenMappings {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.transcode.DefaultTranscodeEngine.WhenMappings>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module transcode {
          export class TranscodeDispatcher {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.transcode.TranscodeDispatcher>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module transcode {
          export abstract class TranscodeEngine {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.transcode.TranscodeEngine>;
            public transcode(param0: any): void;
            public constructor();
            public validate(): boolean;
            public cleanup(): void;
            public static transcode(options: com.otaliastudios.transcoder.TranscoderOptions): void;
          }
          export module TranscodeEngine {
            export class Companion {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.transcode.TranscodeEngine.Companion>;
              public transcode(engine: com.otaliastudios.transcoder.TranscoderOptions): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class AvcCsdUtils {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.AvcCsdUtils>;
            public static getSpsBuffer(format: globalAndroid.media.MediaFormat): java.nio.ByteBuffer;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class AvcSpsUtils {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.AvcSpsUtils>;
            public static PROFILE_IDC_BASELINE: number = 66;
            public static PROFILE_IDC_EXTENDED: number = 88;
            public static PROFILE_IDC_MAIN: number = 77;
            public static PROFILE_IDC_HIGH: number = 100;
            public static getProfileIdc(spsBuffer: java.nio.ByteBuffer): number;
            public constructor();
            public static getProfileName(profileIdc: number): string;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class BitRates {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.BitRates>;
            public constructor();
            public static estimateVideoBitRate(width: number, height: number, frameRate: number): number;
            public static estimateAudioBitRate(channels: number, sampleRate: number): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class DefaultTrackMap<T> extends com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any> {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.DefaultTrackMap<any>>;
            public constructor(video: any, audio: any);
            public setAudio(value: any): void;
            public iterator(): java.util.Iterator<any>;
            public get(param0: com.otaliastudios.transcoder.common.TrackType): any;
            public has(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
            public videoOrNull(): any;
            public get(type: com.otaliastudios.transcoder.common.TrackType): any;
            public getAudio(): any;
            public reset(param0: any, param1: any): void;
            public getOrNull(param0: com.otaliastudios.transcoder.common.TrackType): any;
            public getHasVideo(): boolean;
            public audioOrNull(): any;
            public has(type: com.otaliastudios.transcoder.common.TrackType): boolean;
            public getHasAudio(): boolean;
            public setVideo(value: any): void;
            public getSize(): number;
            public set(param0: com.otaliastudios.transcoder.common.TrackType, param1: any): void;
            public setVideo(param0: any): void;
            public getVideo(): any;
            public getOrNull(type: com.otaliastudios.transcoder.common.TrackType): any;
            public setAudio(param0: any): void;
            public set(type: com.otaliastudios.transcoder.common.TrackType, value: any): void;
            public reset(video: any, audio: any): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class EosForcingDataSource extends com.otaliastudios.transcoder.source.DataSource {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.EosForcingDataSource>;
            public getDurationUs(): number;
            public canReadTrack(type: com.otaliastudios.transcoder.common.TrackType): boolean;
            public deinitialize(): void;
            public readTrack(chunk: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
            public getLocation(): androidNative.Array<number>;
            public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
            public releaseTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
            public seekTo(param0: number): number;
            public selectTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
            public isInitialized(): boolean;
            public getPositionUs(): number;
            public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
            public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
            public constructor(source: com.otaliastudios.transcoder.source.DataSource, force: any);
            public initialize(): void;
            public isDrained(): boolean;
            public getTrackFormat(type: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
            public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
            public seekTo(desiredPositionUs: number): number;
            public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
            public getOrientation(): number;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class EosIgnoringDataSink extends com.otaliastudios.transcoder.sink.DataSink {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.EosIgnoringDataSink>;
            public writeTrack(this_: com.otaliastudios.transcoder.common.TrackType, type: java.nio.ByteBuffer, byteBuffer: globalAndroid.media.MediaCodec.BufferInfo): void;
            public setOrientation(orientation: number): void;
            public setLocation(param0: number, param1: number): void;
            public release(): void;
            public stop(): void;
            public setLocation(latitude: number, longitude: number): void;
            public setTrackStatus(type: com.otaliastudios.transcoder.common.TrackType, status: com.otaliastudios.transcoder.common.TrackStatus): void;
            public setTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType, param1: globalAndroid.media.MediaFormat): void;
            public constructor(sink: com.otaliastudios.transcoder.sink.DataSink, ignore: any);
            public setTrackStatus(param0: com.otaliastudios.transcoder.common.TrackType, param1: com.otaliastudios.transcoder.common.TrackStatus): void;
            public setTrackFormat(type: com.otaliastudios.transcoder.common.TrackType, format: globalAndroid.media.MediaFormat): void;
            public setOrientation(param0: number): void;
            public writeTrack(param0: com.otaliastudios.transcoder.common.TrackType, param1: java.nio.ByteBuffer, param2: globalAndroid.media.MediaCodec.BufferInfo): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class ISO6709LocationParser {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.ISO6709LocationParser>;
            public parse(lon: string): androidNative.Array<number>;
            public constructor();
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class Logger {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.Logger>;
            public static LEVEL_VERBOSE: number = 0;
            public static LEVEL_INFO: number = 1;
            public static LEVEL_WARNING: number = 2;
            public static LEVEL_ERROR: number = 3;
            public e(message: string, error: java.lang.Throwable): void;
            public static setLogLevel(logLevel: number): void;
            public w(message: string): void;
            public i(message: string): void;
            public v(message: string): void;
            public i(message: string, error: java.lang.Throwable): void;
            public e(message: string): void;
            public constructor(tag: string);
            public v(message: string, error: java.lang.Throwable): void;
            public w(message: string, error: java.lang.Throwable): void;
          }
          export module Logger {
            export class LogLevel {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.Logger.LogLevel>;
              /**
               * Constructs a new instance of the com.otaliastudios.transcoder.internal.utils.Logger$LogLevel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
               */
              public constructor(implementation: any);
              public constructor();
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class MutableTrackMap<T> extends com.otaliastudios.transcoder.internal.utils.TrackMap<any> {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              set(param0: com.otaliastudios.transcoder.common.TrackType, param1: any): void;
              reset(param0: any, param1: any): void;
              getAudio(): any;
              setAudio(param0: any): void;
              getVideo(): any;
              setVideo(param0: any): void;
              get(param0: com.otaliastudios.transcoder.common.TrackType): any;
              getVideo(): any;
              getAudio(): any;
              has(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
              getHasVideo(): boolean;
              getHasAudio(): boolean;
              getOrNull(param0: com.otaliastudios.transcoder.common.TrackType): any;
              videoOrNull(): any;
              audioOrNull(): any;
              getSize(): number;
              iterator(): java.util.Iterator<any>;
            });
            public constructor();
            public iterator(): java.util.Iterator<any>;
            public get(param0: com.otaliastudios.transcoder.common.TrackType): any;
            public has(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
            public videoOrNull(): any;
            public getAudio(): any;
            public reset(param0: any, param1: any): void;
            public getOrNull(param0: com.otaliastudios.transcoder.common.TrackType): any;
            public getHasVideo(): boolean;
            public audioOrNull(): any;
            public getHasAudio(): boolean;
            public getSize(): number;
            public set(param0: com.otaliastudios.transcoder.common.TrackType, param1: any): void;
            public setVideo(param0: any): void;
            public getVideo(): any;
            public setAudio(param0: any): void;
          }
          export module MutableTrackMap {
            export class DefaultImpls {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.MutableTrackMap.DefaultImpls>;
              public static setVideo($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>, value: any): void;
              public static setAudio($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>, value: any): void;
              public static getOrNull($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>, type: com.otaliastudios.transcoder.common.TrackType): any;
              public static getHasAudio($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): boolean;
              public static getSize($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): number;
              public static getVideo($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): any;
              public static getAudio($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): any;
              public static videoOrNull($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): any;
              public static getHasVideo($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): boolean;
              public static audioOrNull($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): any;
              public static iterator($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>): java.util.Iterator<any>;
              public static reset($this: com.otaliastudios.transcoder.internal.utils.MutableTrackMap<any>, video: any, audio: any): void;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class ThreadPool {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.ThreadPool>;
            public static INSTANCE: com.otaliastudios.transcoder.internal.utils.ThreadPool;
            public static getExecutor(): java.util.concurrent.ThreadPoolExecutor;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module utils {
          export class TrackMap<T> extends java.lang.Object {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.TrackMap<any>>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.utils.TrackMap<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              get(param0: com.otaliastudios.transcoder.common.TrackType): T;
              getVideo(): T;
              getAudio(): T;
              has(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
              getHasVideo(): boolean;
              getHasAudio(): boolean;
              getOrNull(param0: com.otaliastudios.transcoder.common.TrackType): T;
              videoOrNull(): T;
              audioOrNull(): T;
              getSize(): number;
              iterator(): java.util.Iterator<T>;
            });
            public constructor();
            public getOrNull(param0: com.otaliastudios.transcoder.common.TrackType): T;
            public getHasVideo(): boolean;
            public getHasAudio(): boolean;
            public getAudio(): T;
            public getSize(): number;
            public audioOrNull(): T;
            public iterator(): java.util.Iterator<T>;
            public get(param0: com.otaliastudios.transcoder.common.TrackType): T;
            public getVideo(): T;
            public has(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
            public videoOrNull(): T;
          }
          export module TrackMap {
            export class DefaultImpls {
              public static class: java.lang.Class<com.otaliastudios.transcoder.internal.utils.TrackMap.DefaultImpls>;
              public static getHasAudio($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): boolean;
              public static getAudio($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): any;
              public static videoOrNull($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): any;
              public static getVideo($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): any;
              public static getHasVideo($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): boolean;
              public static getOrNull($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>, type: com.otaliastudios.transcoder.common.TrackType): any;
              public static audioOrNull($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): any;
              public static getSize($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): number;
              public static iterator($this: com.otaliastudios.transcoder.internal.utils.TrackMap<any>): java.util.Iterator<any>;
            }
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module video {
          export class FrameDrawer {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.video.FrameDrawer>;
            public setScale(scaleX: number, scaleY: number): void;
            public constructor();
            public drawFrame(): void;
            public setFlipY(flipY: boolean): void;
            public release(): void;
            public getSurface(): globalAndroid.view.Surface;
            public setRotation(rotation: number): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module video {
          export class FrameDropper {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.video.FrameDropper>;
            /**
             * Constructs a new instance of the com.otaliastudios.transcoder.internal.video.FrameDropper interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { shouldRender(param0: number): boolean });
            public constructor();
            public shouldRender(param0: number): boolean;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module video {
          export class VideoPublisher extends com.otaliastudios.transcoder.internal.pipeline.Step<
            java.lang.Long,
            com.otaliastudios.transcoder.internal.pipeline.Channel,
            com.otaliastudios.transcoder.internal.codec.EncoderData,
            com.otaliastudios.transcoder.internal.codec.EncoderChannel
          > {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.video.VideoPublisher>;
            public getChannel(): any;
            public initialize(next: com.otaliastudios.transcoder.internal.codec.EncoderChannel): void;
            public constructor();
            public getChannel(): com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public initialize(param0: any): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public step(
              state: com.otaliastudios.transcoder.internal.pipeline.State.Ok<java.lang.Long>,
              fresh: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<com.otaliastudios.transcoder.internal.codec.EncoderData>;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module video {
          export class VideoRenderer extends java.lang.Object {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.video.VideoRenderer>;
            public getChannel(): any;
            public handleSourceFormat($this$handleSourceFormat_u24lambda_u240: globalAndroid.media.MediaFormat): globalAndroid.view.Surface;
            public handleRawFormat(rawFormat: globalAndroid.media.MediaFormat): void;
            public handleSourceFormat(param0: globalAndroid.media.MediaFormat): globalAndroid.view.Surface;
            public initialize(param0: any): void;
            public handleRawFormat(param0: globalAndroid.media.MediaFormat): void;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public constructor(height: number, flip: number, this_: globalAndroid.media.MediaFormat, sourceRotation: boolean);
            public step(
              state: com.otaliastudios.transcoder.internal.pipeline.State.Ok<com.otaliastudios.transcoder.internal.codec.DecoderData>,
              fresh: boolean
            ): com.otaliastudios.transcoder.internal.pipeline.State<java.lang.Long>;
            public release(): void;
            public initialize(next: com.otaliastudios.transcoder.internal.pipeline.Channel): void;
            public getChannel(): com.otaliastudios.transcoder.internal.video.VideoRenderer;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module internal {
        export module video {
          export class VideoSnapshots extends com.otaliastudios.transcoder.internal.pipeline.BaseStep<
            java.lang.Long,
            com.otaliastudios.transcoder.internal.pipeline.Channel,
            java.lang.Long,
            com.otaliastudios.transcoder.internal.pipeline.Channel
          > {
            public static class: java.lang.Class<com.otaliastudios.transcoder.internal.video.VideoSnapshots>;
            public step(bitmap: com.otaliastudios.transcoder.internal.pipeline.State.Ok<java.lang.Long>, expectedUs: boolean): com.otaliastudios.transcoder.internal.pipeline.State<java.lang.Long>;
            public step(param0: com.otaliastudios.transcoder.internal.pipeline.State.Ok<any>, param1: boolean): com.otaliastudios.transcoder.internal.pipeline.State<any>;
            public constructor();
            public constructor(it: globalAndroid.media.MediaFormat, this_: java.util.List<java.lang.Long>, format: number, requests: any);
            public getChannel(): com.otaliastudios.transcoder.internal.pipeline.Channel.Companion;
            public getChannel(): any;
            public initialize(param0: any): void;
            public release(): void;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resample {
        export class AudioResampler {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resample.AudioResampler>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.resample.AudioResampler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { resample(param0: java.nio.ShortBuffer, param1: number, param2: java.nio.ShortBuffer, param3: number, param4: number): void; '<clinit>'(): void });
          public constructor();
          public static UPSAMPLE: com.otaliastudios.transcoder.resample.AudioResampler;
          public static PASSTHROUGH: com.otaliastudios.transcoder.resample.AudioResampler;
          public static DOWNSAMPLE: com.otaliastudios.transcoder.resample.AudioResampler;
          public resample(param0: java.nio.ShortBuffer, param1: number, param2: java.nio.ShortBuffer, param3: number, param4: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resample {
        export class DefaultAudioResampler extends com.otaliastudios.transcoder.resample.AudioResampler {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resample.DefaultAudioResampler>;
          public resample(inputBuffer: java.nio.ShortBuffer, inputSampleRate: number, outputBuffer: java.nio.ShortBuffer, outputSampleRate: number, channels: number): void;
          public constructor();
          public resample(param0: java.nio.ShortBuffer, param1: number, param2: java.nio.ShortBuffer, param3: number, param4: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resample {
        export class DownsampleAudioResampler extends com.otaliastudios.transcoder.resample.AudioResampler {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resample.DownsampleAudioResampler>;
          public resample(inputBuffer: java.nio.ShortBuffer, inputSampleRate: number, outputBuffer: java.nio.ShortBuffer, outputSampleRate: number, channels: number): void;
          public constructor();
          public resample(param0: java.nio.ShortBuffer, param1: number, param2: java.nio.ShortBuffer, param3: number, param4: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resample {
        export class PassThroughAudioResampler extends com.otaliastudios.transcoder.resample.AudioResampler {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resample.PassThroughAudioResampler>;
          public resample(inputBuffer: java.nio.ShortBuffer, inputSampleRate: number, outputBuffer: java.nio.ShortBuffer, outputSampleRate: number, channels: number): void;
          public constructor();
          public resample(param0: java.nio.ShortBuffer, param1: number, param2: java.nio.ShortBuffer, param3: number, param4: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resample {
        export class UpsampleAudioResampler extends com.otaliastudios.transcoder.resample.AudioResampler {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resample.UpsampleAudioResampler>;
          public resample(inputBuffer: java.nio.ShortBuffer, inputSampleRate: number, outputBuffer: java.nio.ShortBuffer, outputSampleRate: number, channels: number): void;
          public constructor();
          public resample(param0: java.nio.ShortBuffer, param1: number, param2: java.nio.ShortBuffer, param3: number, param4: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class AspectRatioResizer extends com.otaliastudios.transcoder.resize.Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.AspectRatioResizer>;
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public getOutputSize(inputSize: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor(aspectRatio: number);
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class AtMostResizer extends com.otaliastudios.transcoder.resize.Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.AtMostResizer>;
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor(atMost: number);
          public constructor(atMostMinor: number, atMostMajor: number);
          public getOutputSize(outMajor: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class ExactResizer extends com.otaliastudios.transcoder.resize.Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.ExactResizer>;
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor(first: number, second: number);
          public getOutputSize(inputSize: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor(size: com.otaliastudios.transcoder.common.Size);
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class FractionResizer extends com.otaliastudios.transcoder.resize.Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.FractionResizer>;
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor(fraction: number);
          public getOutputSize(inputSize: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class MultiResizer extends com.otaliastudios.transcoder.resize.Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.MultiResizer>;
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor(this_: androidNative.Array<com.otaliastudios.transcoder.resize.Resizer>);
          public constructor();
          public getOutputSize(this_: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public addResizer(resizer: com.otaliastudios.transcoder.resize.Resizer): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class PassThroughResizer extends com.otaliastudios.transcoder.resize.Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.PassThroughResizer>;
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
          public constructor();
          public getOutputSize(inputSize: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module resize {
        export class Resizer {
          public static class: java.lang.Class<com.otaliastudios.transcoder.resize.Resizer>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.resize.Resizer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size });
          public constructor();
          public getOutputSize(param0: com.otaliastudios.transcoder.common.Size): com.otaliastudios.transcoder.common.Size;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module sink {
        export class DataSink {
          public static class: java.lang.Class<com.otaliastudios.transcoder.sink.DataSink>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.sink.DataSink interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            setOrientation(param0: number): void;
            setLocation(param0: number, param1: number): void;
            setTrackStatus(param0: com.otaliastudios.transcoder.common.TrackType, param1: com.otaliastudios.transcoder.common.TrackStatus): void;
            setTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType, param1: globalAndroid.media.MediaFormat): void;
            writeTrack(param0: com.otaliastudios.transcoder.common.TrackType, param1: java.nio.ByteBuffer, param2: globalAndroid.media.MediaCodec.BufferInfo): void;
            stop(): void;
            release(): void;
          });
          public constructor();
          public setTrackStatus(param0: com.otaliastudios.transcoder.common.TrackType, param1: com.otaliastudios.transcoder.common.TrackStatus): void;
          public setLocation(param0: number, param1: number): void;
          public stop(): void;
          public setOrientation(param0: number): void;
          public release(): void;
          public writeTrack(param0: com.otaliastudios.transcoder.common.TrackType, param1: java.nio.ByteBuffer, param2: globalAndroid.media.MediaCodec.BufferInfo): void;
          public setTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType, param1: globalAndroid.media.MediaFormat): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module sink {
        export class DefaultDataSink extends com.otaliastudios.transcoder.sink.DataSink {
          public static class: java.lang.Class<com.otaliastudios.transcoder.sink.DefaultDataSink>;
          public setLocation(param0: number, param1: number): void;
          public setTrackFormat(type: com.otaliastudios.transcoder.common.TrackType, format: globalAndroid.media.MediaFormat): void;
          public constructor(fileDescriptor: java.io.FileDescriptor);
          public setOrientation(param0: number): void;
          public release(): void;
          public setTrackStatus(type: com.otaliastudios.transcoder.common.TrackType, status: com.otaliastudios.transcoder.common.TrackStatus): void;
          public writeTrack(param0: com.otaliastudios.transcoder.common.TrackType, param1: java.nio.ByteBuffer, param2: globalAndroid.media.MediaCodec.BufferInfo): void;
          public setOrientation(rotation: number): void;
          public setTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType, param1: globalAndroid.media.MediaFormat): void;
          public constructor(this_: string, outputFilePath: number);
          public setTrackStatus(param0: com.otaliastudios.transcoder.common.TrackType, param1: com.otaliastudios.transcoder.common.TrackStatus): void;
          public writeTrack(type: com.otaliastudios.transcoder.common.TrackType, byteBuffer: java.nio.ByteBuffer, bufferInfo: globalAndroid.media.MediaCodec.BufferInfo): void;
          public stop(): void;
          public setLocation(latitude: number, longitude: number): void;
          public constructor(outputFilePath: string);
          public constructor(this_: java.io.FileDescriptor, fileDescriptor: number);
        }
        export module DefaultDataSink {
          export class QueuedSample {
            public static class: java.lang.Class<com.otaliastudios.transcoder.sink.DefaultDataSink.QueuedSample>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module sink {
        export class DefaultDataSinkChecks {
          public static class: java.lang.Class<com.otaliastudios.transcoder.sink.DefaultDataSinkChecks>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module sink {
        export class InvalidOutputFormatException {
          public static class: java.lang.Class<com.otaliastudios.transcoder.sink.InvalidOutputFormatException>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module sink {
        export class MultiDataSink extends com.otaliastudios.transcoder.sink.DataSink {
          public static class: java.lang.Class<com.otaliastudios.transcoder.sink.MultiDataSink>;
          public writeTrack(this_: com.otaliastudios.transcoder.common.TrackType, type: java.nio.ByteBuffer, byteBuffer: globalAndroid.media.MediaCodec.BufferInfo): void;
          public setLocation(param0: number, param1: number): void;
          public setTrackFormat(this_: com.otaliastudios.transcoder.common.TrackType, type: globalAndroid.media.MediaFormat): void;
          public setOrientation(param0: number): void;
          public constructor(sink: androidNative.Array<com.otaliastudios.transcoder.sink.DataSink>);
          public setOrientation(this_: number): void;
          public release(): void;
          public setTrackStatus(this_: com.otaliastudios.transcoder.common.TrackType, type: com.otaliastudios.transcoder.common.TrackStatus): void;
          public writeTrack(param0: com.otaliastudios.transcoder.common.TrackType, param1: java.nio.ByteBuffer, param2: globalAndroid.media.MediaCodec.BufferInfo): void;
          public setTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType, param1: globalAndroid.media.MediaFormat): void;
          public setTrackStatus(param0: com.otaliastudios.transcoder.common.TrackType, param1: com.otaliastudios.transcoder.common.TrackStatus): void;
          public setLocation(this_: number, latitude: number): void;
          public stop(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class AssetFileDescriptorDataSource extends com.otaliastudios.transcoder.source.DataSourceWrapper {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.AssetFileDescriptorDataSource>;
          public getDurationUs(): number;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public isInitialized(): boolean;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource);
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public isDrained(): boolean;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public constructor(assetFileDescriptor: globalAndroid.content.res.AssetFileDescriptor);
          public deinitialize(): void;
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class BlankAudioDataSource extends com.otaliastudios.transcoder.source.DataSource {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.BlankAudioDataSource>;
          public selectTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
          public getDurationUs(): number;
          public getTrackFormat(type: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public canReadTrack(type: com.otaliastudios.transcoder.common.TrackType): boolean;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public readTrack(chunk: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public isInitialized(): boolean;
          public releaseTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
          public isDrained(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public constructor(durationUs: number);
          public deinitialize(): void;
          public getOrientation(): number;
          public seekTo(desiredPositionUs: number): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class ClipDataSource extends com.otaliastudios.transcoder.source.DataSourceWrapper {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.ClipDataSource>;
          public getDurationUs(): number;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource, clipStartUs: number);
          public isInitialized(): boolean;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource);
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public isDrained(): boolean;
          public getPositionUs(): number;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource, clipStartUs: number, clipEndUs: number);
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class DataSource {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.DataSource>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.source.DataSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            initialize(): void;
            deinitialize(): void;
            isInitialized(): boolean;
            getOrientation(): number;
            getLocation(): androidNative.Array<number>;
            getDurationUs(): number;
            getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
            selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
            seekTo(param0: number): number;
            canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
            readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
            getPositionUs(): number;
            isDrained(): boolean;
            releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          });
          public constructor();
          public getDurationUs(): number;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public isInitialized(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public isDrained(): boolean;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public getOrientation(): number;
          public initialize(): void;
        }
        export module DataSource {
          export class Chunk {
            public static class: java.lang.Class<com.otaliastudios.transcoder.source.DataSource.Chunk>;
            public buffer: java.nio.ByteBuffer;
            public keyframe: boolean;
            public timeUs: number;
            public render: boolean;
            public constructor();
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class DataSourceWrapper extends com.otaliastudios.transcoder.source.DataSource {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.DataSourceWrapper>;
          public selectTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
          public getDurationUs(): number;
          public getTrackFormat(type: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public canReadTrack(type: com.otaliastudios.transcoder.common.TrackType): boolean;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public readTrack(chunk: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public setSource(source: com.otaliastudios.transcoder.source.DataSource): void;
          public isInitialized(): boolean;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource);
          public releaseTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
          public isDrained(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public getSource(): com.otaliastudios.transcoder.source.DataSource;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public getOrientation(): number;
          public seekTo(desiredPositionUs: number): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export abstract class DefaultDataSource extends com.otaliastudios.transcoder.source.DataSource {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.DefaultDataSource>;
          public selectTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
          public initializeRetriever(param0: globalAndroid.media.MediaMetadataRetriever): void;
          public canReadTrack(type: com.otaliastudios.transcoder.common.TrackType): boolean;
          public getDurationUs(): number;
          public getTrackFormat(type: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public readTrack(chunk: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public isInitialized(): boolean;
          public releaseTrack(type: com.otaliastudios.transcoder.common.TrackType): void;
          public initializeExtractor(param0: globalAndroid.media.MediaExtractor): void;
          public isDrained(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public seekTo(desiredPositionUs: number): number;
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class FileDescriptorDataSource extends com.otaliastudios.transcoder.source.DefaultDataSource {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.FileDescriptorDataSource>;
          public constructor(descriptor: java.io.FileDescriptor, offset: number, length: number);
          public getDurationUs(): number;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public isInitialized(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public isDrained(): boolean;
          public getPositionUs(): number;
          public initializeExtractor(extractor: globalAndroid.media.MediaExtractor): void;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public initializeRetriever(retriever: globalAndroid.media.MediaMetadataRetriever): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public constructor(descriptor: java.io.FileDescriptor);
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class FilePathDataSource extends com.otaliastudios.transcoder.source.DataSourceWrapper {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.FilePathDataSource>;
          public constructor(path: string);
          public getDurationUs(): number;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public isInitialized(): boolean;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource);
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public isDrained(): boolean;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class TrimDataSource extends com.otaliastudios.transcoder.source.DataSourceWrapper {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.TrimDataSource>;
          public getDurationUs(): number;
          public canReadTrack(type: com.otaliastudios.transcoder.common.TrackType): boolean;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource, trimStartUs: number, trimEndUs: number);
          public isInitialized(): boolean;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource);
          public isDrained(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public getPositionUs(): number;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public constructor(source: com.otaliastudios.transcoder.source.DataSource, trimStartUs: number);
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public seekTo(desiredPositionUs: number): number;
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module source {
        export class UriDataSource extends com.otaliastudios.transcoder.source.DefaultDataSource {
          public static class: java.lang.Class<com.otaliastudios.transcoder.source.UriDataSource>;
          public getDurationUs(): number;
          public readTrack(param0: com.otaliastudios.transcoder.source.DataSource.Chunk): void;
          public constructor(context: globalAndroid.content.Context, uri: globalAndroid.net.Uri);
          public isInitialized(): boolean;
          public canReadTrack(param0: com.otaliastudios.transcoder.common.TrackType): boolean;
          public isDrained(): boolean;
          public getPositionUs(): number;
          public initializeExtractor(extractor: globalAndroid.media.MediaExtractor): void;
          public seekTo(param0: number): number;
          public constructor();
          public selectTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public getLocation(): androidNative.Array<number>;
          public releaseTrack(param0: com.otaliastudios.transcoder.common.TrackType): void;
          public initializeRetriever(retriever: globalAndroid.media.MediaMetadataRetriever): void;
          public getTrackFormat(param0: com.otaliastudios.transcoder.common.TrackType): globalAndroid.media.MediaFormat;
          public deinitialize(): void;
          public getOrientation(): number;
          public initialize(): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module strategy {
        export class DefaultAudioStrategy extends com.otaliastudios.transcoder.strategy.TrackStrategy {
          public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultAudioStrategy>;
          public static CHANNELS_AS_INPUT: number = -1;
          public static SAMPLE_RATE_AS_INPUT: number = -1;
          public static BITRATE_UNKNOWN: number = -9223372036854775808;
          public constructor(options: com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Options);
          public createOutputFormat(this_: java.util.List<globalAndroid.media.MediaFormat>, inputFormats: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
          public static builder(): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Builder;
          public createOutputFormat(param0: java.util.List<globalAndroid.media.MediaFormat>, param1: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
        }
        export module DefaultAudioStrategy {
          export class Builder {
            public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Builder>;
            public channels(channels: number): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Builder;
            public constructor();
            public bitRate(bitRate: number): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Builder;
            public sampleRate(sampleRate: number): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Builder;
            public build(): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy;
            public options(): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Options;
            public mimeType(mimeType: string): com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Builder;
          }
          export class Options {
            public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultAudioStrategy.Options>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module strategy {
        export class DefaultVideoStrategies {
          public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultVideoStrategies>;
          public static for360x480(): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy;
          public static for720x1280(): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module strategy {
        export class DefaultVideoStrategy extends com.otaliastudios.transcoder.strategy.TrackStrategy {
          public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultVideoStrategy>;
          public static BITRATE_UNKNOWN: number = -9223372036854775808;
          public static DEFAULT_KEY_FRAME_INTERVAL: number = 3.0;
          public static DEFAULT_FRAME_RATE: number = 30;
          public static fraction(fraction: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
          public createOutputFormat(e: java.util.List<globalAndroid.media.MediaFormat>, outWidth: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
          public static atMost(atMostSize: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
          public static atMost(atMostMinor: number, atMostMajor: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
          public static aspectRatio(aspectRatio: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
          public constructor(options: com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Options);
          public static exact(firstSize: number, secondSize: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
          public createOutputFormat(param0: java.util.List<globalAndroid.media.MediaFormat>, param1: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
        }
        export module DefaultVideoStrategy {
          export class Builder {
            public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder>;
            public options(): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Options;
            public constructor();
            public addResizer(resizer: com.otaliastudios.transcoder.resize.Resizer): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
            public constructor(resizer: com.otaliastudios.transcoder.resize.Resizer);
            public frameRate(frameRate: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
            public build(): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy;
            public bitRate(bitRate: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
            public mimeType(mimeType: string): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
            public keyFrameInterval(keyFrameInterval: number): com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Builder;
          }
          export class Options {
            public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.DefaultVideoStrategy.Options>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module strategy {
        export class PassThroughTrackStrategy extends com.otaliastudios.transcoder.strategy.TrackStrategy {
          public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.PassThroughTrackStrategy>;
          public constructor();
          public createOutputFormat(inputFormats: java.util.List<globalAndroid.media.MediaFormat>, outputFormat: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
          public createOutputFormat(param0: java.util.List<globalAndroid.media.MediaFormat>, param1: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module strategy {
        export class RemoveTrackStrategy extends com.otaliastudios.transcoder.strategy.TrackStrategy {
          public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.RemoveTrackStrategy>;
          public constructor();
          public createOutputFormat(inputFormats: java.util.List<globalAndroid.media.MediaFormat>, outputFormat: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
          public createOutputFormat(param0: java.util.List<globalAndroid.media.MediaFormat>, param1: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module strategy {
        export class TrackStrategy {
          public static class: java.lang.Class<com.otaliastudios.transcoder.strategy.TrackStrategy>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.strategy.TrackStrategy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            createOutputFormat(param0: java.util.List<globalAndroid.media.MediaFormat>, param1: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
          });
          public constructor();
          public createOutputFormat(param0: java.util.List<globalAndroid.media.MediaFormat>, param1: globalAndroid.media.MediaFormat): com.otaliastudios.transcoder.common.TrackStatus;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module stretch {
        export class AudioStretcher {
          public static class: java.lang.Class<com.otaliastudios.transcoder.stretch.AudioStretcher>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.stretch.AudioStretcher interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { stretch(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer, param2: number): void; '<clinit>'(): void });
          public constructor();
          public static CUT: com.otaliastudios.transcoder.stretch.AudioStretcher;
          public static PASSTHROUGH: com.otaliastudios.transcoder.stretch.AudioStretcher;
          public static INSERT: com.otaliastudios.transcoder.stretch.AudioStretcher;
          public stretch(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer, param2: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module stretch {
        export class CutAudioStretcher extends com.otaliastudios.transcoder.stretch.AudioStretcher {
          public static class: java.lang.Class<com.otaliastudios.transcoder.stretch.CutAudioStretcher>;
          public constructor();
          public stretch(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer, param2: number): void;
          public stretch(input: java.nio.ShortBuffer, output: java.nio.ShortBuffer, channels: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module stretch {
        export class DefaultAudioStretcher extends com.otaliastudios.transcoder.stretch.AudioStretcher {
          public static class: java.lang.Class<com.otaliastudios.transcoder.stretch.DefaultAudioStretcher>;
          public constructor();
          public stretch(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer, param2: number): void;
          public stretch(input: java.nio.ShortBuffer, output: java.nio.ShortBuffer, channels: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module stretch {
        export class InsertAudioStretcher extends com.otaliastudios.transcoder.stretch.AudioStretcher {
          public static class: java.lang.Class<com.otaliastudios.transcoder.stretch.InsertAudioStretcher>;
          public constructor();
          public stretch(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer, param2: number): void;
          public stretch(input: java.nio.ShortBuffer, output: java.nio.ShortBuffer, channels: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module stretch {
        export class PassThroughAudioStretcher extends com.otaliastudios.transcoder.stretch.AudioStretcher {
          public static class: java.lang.Class<com.otaliastudios.transcoder.stretch.PassThroughAudioStretcher>;
          public constructor();
          public stretch(param0: java.nio.ShortBuffer, param1: java.nio.ShortBuffer, param2: number): void;
          public stretch(input: java.nio.ShortBuffer, output: java.nio.ShortBuffer, channels: number): void;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module thumbnail {
        export class CoverThumbnailRequest extends com.otaliastudios.transcoder.thumbnail.ThumbnailRequest {
          public static class: java.lang.Class<com.otaliastudios.transcoder.thumbnail.CoverThumbnailRequest>;
          public locate(param0: number): java.util.List<java.lang.Long>;
          public constructor();
          public locate(durationUs: number): java.util.List<java.lang.Long>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module thumbnail {
        export class SingleThumbnailRequest extends com.otaliastudios.transcoder.thumbnail.ThumbnailRequest {
          public static class: java.lang.Class<com.otaliastudios.transcoder.thumbnail.SingleThumbnailRequest>;
          public locate(param0: number): java.util.List<java.lang.Long>;
          public constructor(positionUs: number);
          public locate(this_: number): java.util.List<java.lang.Long>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module thumbnail {
        export class Thumbnail {
          public static class: java.lang.Class<com.otaliastudios.transcoder.thumbnail.Thumbnail>;
          public getRequest(): com.otaliastudios.transcoder.thumbnail.ThumbnailRequest;
          public getPositionUs(): number;
          public constructor(request: com.otaliastudios.transcoder.thumbnail.ThumbnailRequest, positionUs: number, bitmap: globalAndroid.graphics.Bitmap);
          public getBitmap(): globalAndroid.graphics.Bitmap;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module thumbnail {
        export class ThumbnailRequest {
          public static class: java.lang.Class<com.otaliastudios.transcoder.thumbnail.ThumbnailRequest>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.thumbnail.ThumbnailRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { locate(param0: number): java.util.List<java.lang.Long> });
          public constructor();
          public locate(param0: number): java.util.List<java.lang.Long>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module thumbnail {
        export class UniformThumbnailRequest extends com.otaliastudios.transcoder.thumbnail.ThumbnailRequest {
          public static class: java.lang.Class<com.otaliastudios.transcoder.thumbnail.UniformThumbnailRequest>;
          public locate(param0: number): java.util.List<java.lang.Long>;
          public constructor(this_: number);
          public locate(it: number): java.util.List<java.lang.Long>;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module time {
        export class DefaultTimeInterpolator extends com.otaliastudios.transcoder.time.TimeInterpolator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.time.DefaultTimeInterpolator>;
          public constructor();
          public interpolate(param0: com.otaliastudios.transcoder.common.TrackType, param1: number): number;
          public interpolate(type: com.otaliastudios.transcoder.common.TrackType, time: number): number;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module time {
        export class SpeedTimeInterpolator extends com.otaliastudios.transcoder.time.TimeInterpolator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.time.SpeedTimeInterpolator>;
          public constructor(factor: number);
          public interpolate(correctedDelta: com.otaliastudios.transcoder.common.TrackType, this_: number): number;
          public interpolate(param0: com.otaliastudios.transcoder.common.TrackType, param1: number): number;
          public getFactor(): number;
        }
        export module SpeedTimeInterpolator {
          export class TrackData {
            public static class: java.lang.Class<com.otaliastudios.transcoder.time.SpeedTimeInterpolator.TrackData>;
          }
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module time {
        export class TimeInterpolator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.time.TimeInterpolator>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.time.TimeInterpolator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { interpolate(param0: com.otaliastudios.transcoder.common.TrackType, param1: number): number });
          public constructor();
          public interpolate(param0: com.otaliastudios.transcoder.common.TrackType, param1: number): number;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module validator {
        export class DefaultValidator extends com.otaliastudios.transcoder.validator.Validator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.validator.DefaultValidator>;
          public constructor();
          public validate(param0: com.otaliastudios.transcoder.common.TrackStatus, param1: com.otaliastudios.transcoder.common.TrackStatus): boolean;
          public validate(videoStatus: com.otaliastudios.transcoder.common.TrackStatus, audioStatus: com.otaliastudios.transcoder.common.TrackStatus): boolean;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module validator {
        export class Validator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.validator.Validator>;
          /**
           * Constructs a new instance of the com.otaliastudios.transcoder.validator.Validator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { validate(param0: com.otaliastudios.transcoder.common.TrackStatus, param1: com.otaliastudios.transcoder.common.TrackStatus): boolean });
          public constructor();
          public validate(param0: com.otaliastudios.transcoder.common.TrackStatus, param1: com.otaliastudios.transcoder.common.TrackStatus): boolean;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module validator {
        export class WriteAlwaysValidator extends com.otaliastudios.transcoder.validator.Validator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.validator.WriteAlwaysValidator>;
          public constructor();
          public validate(param0: com.otaliastudios.transcoder.common.TrackStatus, param1: com.otaliastudios.transcoder.common.TrackStatus): boolean;
          public validate(videoStatus: com.otaliastudios.transcoder.common.TrackStatus, audioStatus: com.otaliastudios.transcoder.common.TrackStatus): boolean;
        }
      }
    }
  }
}

declare module com {
  export module otaliastudios {
    export module transcoder {
      export module validator {
        export class WriteVideoValidator extends com.otaliastudios.transcoder.validator.Validator {
          public static class: java.lang.Class<com.otaliastudios.transcoder.validator.WriteVideoValidator>;
          public constructor();
          public validate(param0: com.otaliastudios.transcoder.common.TrackStatus, param1: com.otaliastudios.transcoder.common.TrackStatus): boolean;
          public validate(videoStatus: com.otaliastudios.transcoder.common.TrackStatus, audioStatus: com.otaliastudios.transcoder.common.TrackStatus): boolean;
        }
      }
    }
  }
}

//Generics information:
//com.otaliastudios.transcoder.internal.pipeline.BaseStep:4
//com.otaliastudios.transcoder.internal.pipeline.DataStep:2
//com.otaliastudios.transcoder.internal.pipeline.Pipeline.Builder:2
//com.otaliastudios.transcoder.internal.pipeline.QueuedStep:4
//com.otaliastudios.transcoder.internal.pipeline.State:1
//com.otaliastudios.transcoder.internal.pipeline.State.Eos:1
//com.otaliastudios.transcoder.internal.pipeline.State.Ok:1
//com.otaliastudios.transcoder.internal.pipeline.Step:4
//com.otaliastudios.transcoder.internal.utils.DefaultTrackMap:1
//com.otaliastudios.transcoder.internal.utils.MutableTrackMap:1
//com.otaliastudios.transcoder.internal.utils.TrackMap:1
