/// <reference path="android-declarations.d.ts"/>

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export class BuildConfig {
        public static class: java.lang.Class<net.ypresto.androidtranscoder.BuildConfig>;
        public static DEBUG: boolean;
        public static LIBRARY_PACKAGE_NAME: string;
        public static APPLICATION_ID: string;
        public static BUILD_TYPE: string;
        public static FLAVOR: string;
        public static VERSION_CODE: number;
        public static VERSION_NAME: string;
        public constructor();
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export class MediaTranscoder {
        public static class: java.lang.Class<net.ypresto.androidtranscoder.MediaTranscoder>;
        public transcodeVideo(
          param0: string,
          param1: string,
          param2: net.ypresto.androidtranscoder.format.MediaFormatStrategy,
          param3: net.ypresto.androidtranscoder.MediaTranscoder.Listener
        ): java.util.concurrent.Future<java.lang.Void>;
        /** @deprecated */
        public transcodeVideo(param0: java.io.FileDescriptor, param1: string, param2: net.ypresto.androidtranscoder.MediaTranscoder.Listener): java.util.concurrent.Future<java.lang.Void>;
        public transcodeVideo(
          param0: net.ypresto.androidtranscoder.engine.TimeLine,
          param1: string,
          param2: net.ypresto.androidtranscoder.format.MediaFormatStrategy,
          param3: net.ypresto.androidtranscoder.MediaTranscoder.Listener
        ): java.util.concurrent.Future<java.lang.Void>;
        public transcodeVideo(
          param0: java.io.FileDescriptor,
          param1: string,
          param2: net.ypresto.androidtranscoder.format.MediaFormatStrategy,
          param3: net.ypresto.androidtranscoder.MediaTranscoder.Listener
        ): java.util.concurrent.Future<java.lang.Void>;
        public static getInstance(): net.ypresto.androidtranscoder.MediaTranscoder;
      }
      export module MediaTranscoder {
        export class Listener {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.MediaTranscoder.Listener>;
          /**
           * Constructs a new instance of the net.ypresto.androidtranscoder.MediaTranscoder$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onTranscodeProgress(param0: number): void;
            onTranscodeCompleted(): void;
            onTranscodeCanceled(): void;
            onTranscodeFailed(param0: java.lang.Exception): void;
          });
          public constructor();
          public onTranscodeCompleted(): void;
          public onTranscodeProgress(param0: number): void;
          public onTranscodeFailed(param0: java.lang.Exception): void;
          public onTranscodeCanceled(): void;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export class TLog {
        public static class: java.lang.Class<net.ypresto.androidtranscoder.TLog>;
        public static d(param0: string, param1: string, param2: java.lang.Throwable): void;
        public static v(param0: string, param1: string): void;
        public static setLevel(param0: number): void;
        public static w(param0: string, param1: string): void;
        public static d(param0: string, param1: string): void;
        public static wtf(param0: string, param1: string): void;
        public constructor();
        public static e(param0: string, param1: string, param2: java.lang.Throwable): void;
        public static e(param0: string, param1: string): void;
        public static i(param0: string, param1: string, param2: java.lang.Throwable): void;
        public static v(param0: string, param1: string, param2: java.lang.Throwable): void;
        public static i(param0: string, param1: string): void;
        public static w(param0: string, param1: string, param2: java.lang.Throwable): void;
        public static wtf(param0: string, param1: string, param2: java.lang.Throwable): void;
        public static setTags(param0: string): void;
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module compat {
        export class MediaCodecBufferCompatWrapper {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.compat.MediaCodecBufferCompatWrapper>;
          public getOutputBuffer(param0: number): java.nio.ByteBuffer;
          public constructor(param0: globalAndroid.media.MediaCodec);
          public getInputBuffer(param0: number): java.nio.ByteBuffer;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module compat {
        export class MediaCodecListCompat {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.compat.MediaCodecListCompat>;
          public static REGULAR_CODECS: number;
          public static ALL_CODECS: number;
          public getCodecInfos(): androidNative.Array<globalAndroid.media.MediaCodecInfo>;
          public findEncoderForFormat(param0: globalAndroid.media.MediaFormat): string;
          public constructor(param0: number);
          public findDecoderForFormat(param0: globalAndroid.media.MediaFormat): string;
        }
        export module MediaCodecListCompat {
          export class MediaCodecInfoIterator extends java.util.Iterator<globalAndroid.media.MediaCodecInfo> {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.compat.MediaCodecListCompat.MediaCodecInfoIterator>;
            public next(): globalAndroid.media.MediaCodecInfo;
            public hasNext(): boolean;
            public remove(): void;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class AudioChannel {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.AudioChannel>;
          public static BUFFER_INDEX_END_OF_STREAM: number;
          public setEndOfSegment(param0: string): void;
          public finalize(): void;
          public createFromExisting(
            param0: java.util.LinkedHashMap<string, globalAndroid.media.MediaCodec>,
            param1: globalAndroid.media.MediaCodec,
            param2: globalAndroid.media.MediaFormat
          ): net.ypresto.androidtranscoder.engine.AudioChannel;
          public sampleCountToOutputDurationUs(param0: number): number;
          public getDeterminedFormat(): globalAndroid.media.MediaFormat;
          public getBufferDurationUs(param0: string, param1: number): number;
          public sampleCountToInputDurationUs(param0: number): number;
          public constructor(param0: java.util.LinkedHashMap<string, globalAndroid.media.MediaCodec>, param1: globalAndroid.media.MediaCodec, param2: globalAndroid.media.MediaFormat);
          public removeBuffers(param0: string): void;
          public drainDecoderBufferAndQueue(param0: string, param1: number, param2: java.lang.Long, param3: java.lang.Long, param4: number, param5: number): void;
          public feedEncoder(param0: number): java.lang.Long;
          public setMute(param0: string): void;
          public setActualDecodedFormat(param0: globalAndroid.media.MediaFormat): void;
        }
        export module AudioChannel {
          export class AudioBuffer {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.AudioChannel.AudioBuffer>;
          }
          export class RemixResult {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.AudioChannel.RemixResult>;
            public mPresentationTime: number;
            public mDuration: number;
            public mBufferPosition: number;
            public mBufferOverflowPosition: number;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class AudioRemixer {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.AudioRemixer>;
          public constructor();
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class AudioTrackTranscoder extends net.ypresto.androidtranscoder.engine.TrackTranscoder {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.AudioTrackTranscoder>;
          public setupDecoders(
            param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment,
            param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle,
            param2: number,
            param3: number,
            param4: number
          ): void;
          public getDeterminedFormat(): globalAndroid.media.MediaFormat;
          public getOutputPresentationTimeEncodedUs(): number;
          public releaseEncoder(): void;
          public releaseDecoders(): void;
          public getOutputPresentationTimeDecodedUs(): number;
          public isSegmentFinished(): boolean;
          public release(): void;
          public setupEncoder(): void;
          public setOutputPresentationTimeDecodedUs(param0: number): void;
          public stepPipeline(param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment, param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle): boolean;
          public constructor(
            param0: java.util.LinkedHashMap<string, globalAndroid.media.MediaExtractor>,
            param1: globalAndroid.media.MediaFormat,
            param2: net.ypresto.androidtranscoder.engine.QueuedMuxer
          );
        }
        export module AudioTrackTranscoder {
          export class DecoderWrapper {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.AudioTrackTranscoder.DecoderWrapper>;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class InputSurface {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.InputSurface>;
          public swapBuffers(): boolean;
          public getHeight(): number;
          public makeCurrent(): void;
          public makeUnCurrent(): void;
          public getWidth(): number;
          public constructor(param0: globalAndroid.view.Surface);
          public release(): void;
          public getSurface(): globalAndroid.view.Surface;
          public setPresentationTime(param0: number): void;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class InvalidOutputFormatException {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.InvalidOutputFormatException>;
          public constructor(param0: string);
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class MediaFormatValidator {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.MediaFormatValidator>;
          public static validateAudioOutputFormat(param0: globalAndroid.media.MediaFormat): void;
          public constructor();
          public static validateVideoOutputFormat(param0: globalAndroid.media.MediaFormat): void;
          public static validateResolution(param0: number, param1: number): boolean;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class MediaTranscoderEngine {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.MediaTranscoderEngine>;
          public getProgress(): number;
          public constructor();
          public transcodeVideo(param0: net.ypresto.androidtranscoder.engine.TimeLine, param1: string, param2: net.ypresto.androidtranscoder.format.MediaFormatStrategy): void;
          public getProgressCallback(): net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.ProgressCallback;
          public setProgressCallback(param0: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.ProgressCallback): void;
        }
        export module MediaTranscoderEngine {
          export class ProgressCallback {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.ProgressCallback>;
            /**
             * Constructs a new instance of the net.ypresto.androidtranscoder.engine.MediaTranscoderEngine$ProgressCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { onProgress(param0: number): void });
            public constructor();
            public onProgress(param0: number): void;
          }
          export class TranscodeThrottle {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle>;
            public step(): void;
            public departicipate(param0: string): void;
            public log(): void;
            public participate(param0: string): void;
            public constructor(param0: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine);
            public canProceed(param0: string, param1: number, param2: boolean): boolean;
            public startSegment(): void;
            public shouldCancel(): boolean;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class OutputSurface {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.OutputSurface>;
          public signalEndOfInputStream(): void;
          public consumeDuplicateTexture(): boolean;
          public isEndOfInputStream(): boolean;
          public checkGlError(param0: string): void;
          public getSurface(): globalAndroid.view.Surface;
          public getOriginalSourceRect(): globalAndroid.graphics.RectF;
          public getSourceRect(): globalAndroid.graphics.RectF;
          public isDuplicateTexture(): boolean;
          public onFrameAvailable(param0: globalAndroid.graphics.SurfaceTexture): void;
          public setRotation(param0: number): void;
          public setSourceRect(param0: globalAndroid.graphics.RectF): void;
          public constructor();
          public makeCurrent(): void;
          public setSourceRotation(param0: number): void;
          public setOriginalSourceRect(param0: globalAndroid.graphics.RectF): void;
          public setDuplicateTextureReady(): void;
          public updateTexture(): void;
          public getTextureID(): number;
          public constructor(param0: number, param1: number);
          public getAlpha(): number;
          public release(): void;
          public setAlpha(param0: number): void;
          public duplicateTextures(param0: number): void;
          public getSourceRotation(): number;
          public getDestRect(): globalAndroid.graphics.RectF;
          public checkEglError(param0: string): void;
          public getRotation(): number;
          public isExtraTextures(): boolean;
          public isTextureReady(): boolean;
          public clearTextureReady(): void;
          public setDestRect(param0: globalAndroid.graphics.RectF): void;
          public awaitNewImage(): void;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class PassThroughTrackTranscoder extends net.ypresto.androidtranscoder.engine.TrackTranscoder {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.PassThroughTrackTranscoder>;
          public setupDecoders(
            param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment,
            param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle,
            param2: number,
            param3: number,
            param4: number
          ): void;
          public getDeterminedFormat(): globalAndroid.media.MediaFormat;
          public getOutputPresentationTimeEncodedUs(): number;
          public releaseEncoder(): void;
          public releaseDecoders(): void;
          public getOutputPresentationTimeDecodedUs(): number;
          public constructor(
            param0: globalAndroid.media.MediaExtractor,
            param1: number,
            param2: net.ypresto.androidtranscoder.engine.QueuedMuxer,
            param3: net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType
          );
          public isSegmentFinished(): boolean;
          public release(): void;
          public setupEncoder(): void;
          public setOutputPresentationTimeDecodedUs(param0: number): void;
          public stepPipeline(param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment, param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle): boolean;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class QueuedMuxer {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.QueuedMuxer>;
          public setOutputFormat(param0: net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType, param1: globalAndroid.media.MediaFormat): void;
          public writeSampleData(param0: net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType, param1: java.nio.ByteBuffer, param2: globalAndroid.media.MediaCodec.BufferInfo): void;
          public constructor(param0: globalAndroid.media.MediaMuxer, param1: boolean, param2: boolean, param3: net.ypresto.androidtranscoder.engine.QueuedMuxer.Listener);
        }
        export module QueuedMuxer {
          export class Listener {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.QueuedMuxer.Listener>;
            /**
             * Constructs a new instance of the net.ypresto.androidtranscoder.engine.QueuedMuxer$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { onDetermineOutputFormat(): void });
            public constructor();
            public onDetermineOutputFormat(): void;
          }
          export class SampleInfo {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleInfo>;
          }
          export class SampleType {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType>;
            public static VIDEO: net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType;
            public static AUDIO: net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType;
            public static valueOf(param0: string): net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType;
            public static values(): androidNative.Array<net.ypresto.androidtranscoder.engine.QueuedMuxer.SampleType>;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class TextureRender {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TextureRender>;
          public static saveFrame(param0: string, param1: number, param2: number): void;
          public surfaceCreated(): void;
          public checkGlError(param0: string): void;
          public constructor(param0: java.util.List<net.ypresto.androidtranscoder.engine.OutputSurface>, param1: net.ypresto.androidtranscoder.engine.OutputSurface);
          public drawFrame(): void;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class TimeLine {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TimeLine>;
          public getDuration(): java.lang.Long;
          public addImageChannel(param0: string, param1: java.io.FileDescriptor): net.ypresto.androidtranscoder.engine.TimeLine;
          public constructor(param0: number, param1: string);
          public addAudioOnlyChannel(param0: string, param1: java.io.FileDescriptor): net.ypresto.androidtranscoder.engine.TimeLine;
          public getChannels(): java.util.LinkedHashMap<string, net.ypresto.androidtranscoder.engine.TimeLine.InputChannel>;
          public addChannel(param0: string, param1: java.io.FileDescriptor, param2: net.ypresto.androidtranscoder.engine.TimeLine.ChannelType): net.ypresto.androidtranscoder.engine.TimeLine;
          public getSegments(): java.util.List<net.ypresto.androidtranscoder.engine.TimeLine.Segment>;
          public constructor();
          public createSegment(): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
          public addChannel(param0: string, param1: java.io.FileDescriptor): net.ypresto.androidtranscoder.engine.TimeLine;
          public addVideoOnlyChannel(param0: string, param1: java.io.FileDescriptor): net.ypresto.androidtranscoder.engine.TimeLine;
          public constructor(param0: number);
          public prepare(): void;
        }
        export module TimeLine {
          export class ChannelType {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TimeLine.ChannelType>;
            public static VIDEO: net.ypresto.androidtranscoder.engine.TimeLine.ChannelType;
            public static AUDIO: net.ypresto.androidtranscoder.engine.TimeLine.ChannelType;
            public static AUDIO_VIDEO: net.ypresto.androidtranscoder.engine.TimeLine.ChannelType;
            public static IMAGE: net.ypresto.androidtranscoder.engine.TimeLine.ChannelType;
            public static valueOf(param0: string): net.ypresto.androidtranscoder.engine.TimeLine.ChannelType;
            public static values(): androidNative.Array<net.ypresto.androidtranscoder.engine.TimeLine.ChannelType>;
          }
          export class Filter {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TimeLine.Filter>;
            public static OPACITY_UP_RAMP: net.ypresto.androidtranscoder.engine.TimeLine.Filter;
            public static OPACITY_DOWN_RAMP: net.ypresto.androidtranscoder.engine.TimeLine.Filter;
            public static MUTE: net.ypresto.androidtranscoder.engine.TimeLine.Filter;
            public static SUPPRESS: net.ypresto.androidtranscoder.engine.TimeLine.Filter;
            public static values(): androidNative.Array<net.ypresto.androidtranscoder.engine.TimeLine.Filter>;
            public static valueOf(param0: string): net.ypresto.androidtranscoder.engine.TimeLine.Filter;
          }
          export class InputChannel {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TimeLine.InputChannel>;
            public mLengthUs: java.lang.Long;
            public mVideoInputStartTimeUs: java.lang.Long;
            public mAudioInputStartTimeUs: java.lang.Long;
            public mInputEndTimeUs: java.lang.Long;
            public mVideoInputOffsetUs: java.lang.Long;
            public mAudioInputOffsetUs: java.lang.Long;
            public mVideoInputAcutalEndTimeUs: java.lang.Long;
            public mAudioInputAcutalEndTimeUs: java.lang.Long;
            public mVideoFrameLength: number;
            public mSeekShortage: number;
            public mDurationShortage: number;
            public mFilter: net.ypresto.androidtranscoder.engine.TimeLine.Filter;
            public mChannelType: net.ypresto.androidtranscoder.engine.TimeLine.ChannelType;
            public mInputFileDescriptor: java.io.FileDescriptor;
            public mTimeToCut: number;
            public mTimeAlreadyCut: number;
            public mTimeToAdd: number;
            public mTimeAlreadyAdded: number;
            public mFrameWasCut: boolean;
            public mLastBufferPresentationTime: number;
            public mMuteAudio: boolean;
          }
          export class Segment {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TimeLine.Segment>;
            public mOutputStartTimeUs: java.lang.Long;
            public isLastSegment: boolean;
            public seek(param0: string, param1: number): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
            public getDuration(): java.lang.Long;
            public timeScale(param0: number): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
            public output(param0: string): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
            public timeLine(): net.ypresto.androidtranscoder.engine.TimeLine;
            public getChannels(): java.util.LinkedHashMap<string, net.ypresto.androidtranscoder.engine.TimeLine.InputChannel>;
            public output(param0: string, param1: net.ypresto.androidtranscoder.engine.TimeLine.Filter): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
            public filter(param0: net.ypresto.androidtranscoder.engine.TimeLine.Filter): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
            public getAudioChannels(): java.util.LinkedHashMap<string, net.ypresto.androidtranscoder.engine.TimeLine.InputChannel>;
            public duration(param0: number): net.ypresto.androidtranscoder.engine.TimeLine.Segment;
            public getImageChannels(): java.util.LinkedHashMap<string, net.ypresto.androidtranscoder.engine.TimeLine.InputChannel>;
            public getVideoChannels(): java.util.LinkedHashMap<string, net.ypresto.androidtranscoder.engine.TimeLine.InputChannel>;
            public start(param0: java.lang.Long, param1: java.lang.Long, param2: java.lang.Long, param3: java.lang.Long, param4: java.lang.Long): void;
            public getSegmentChannel(param0: string): net.ypresto.androidtranscoder.engine.TimeLine.SegmentChannel;
          }
          export class SegmentChannel {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TimeLine.SegmentChannel>;
            public mChannel: net.ypresto.androidtranscoder.engine.TimeLine.InputChannel;
            public mFilter: net.ypresto.androidtranscoder.engine.TimeLine.Filter;
            public mTimeScale: java.lang.Long;
            public mSeek: java.lang.Long;
            public getAudioSeek(): java.lang.Long;
            public seekRequestedAudio(): void;
            public getVideoSeek(): java.lang.Long;
            public seekRequestedVideo(): void;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class TrackTranscoder {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.TrackTranscoder>;
          /**
           * Constructs a new instance of the net.ypresto.androidtranscoder.engine.TrackTranscoder interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            setupEncoder(): void;
            setupDecoders(
              param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment,
              param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle,
              param2: number,
              param3: number,
              param4: number
            ): void;
            getDeterminedFormat(): globalAndroid.media.MediaFormat;
            stepPipeline(param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment, param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle): boolean;
            getOutputPresentationTimeDecodedUs(): number;
            getOutputPresentationTimeEncodedUs(): number;
            setOutputPresentationTimeDecodedUs(param0: number): void;
            isSegmentFinished(): boolean;
            releaseDecoders(): void;
            releaseEncoder(): void;
            release(): void;
          });
          public constructor();
          public setupDecoders(
            param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment,
            param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle,
            param2: number,
            param3: number,
            param4: number
          ): void;
          public getDeterminedFormat(): globalAndroid.media.MediaFormat;
          public getOutputPresentationTimeEncodedUs(): number;
          public releaseEncoder(): void;
          public releaseDecoders(): void;
          public getOutputPresentationTimeDecodedUs(): number;
          public isSegmentFinished(): boolean;
          public release(): void;
          public setupEncoder(): void;
          public setOutputPresentationTimeDecodedUs(param0: number): void;
          public stepPipeline(param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment, param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle): boolean;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module engine {
        export class VideoTrackTranscoder extends net.ypresto.androidtranscoder.engine.TrackTranscoder {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.VideoTrackTranscoder>;
          public setupDecoders(
            param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment,
            param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle,
            param2: number,
            param3: number,
            param4: number
          ): void;
          public getDeterminedFormat(): globalAndroid.media.MediaFormat;
          public getOutputPresentationTimeEncodedUs(): number;
          public releaseEncoder(): void;
          public releaseDecoders(): void;
          public getOutputPresentationTimeDecodedUs(): number;
          public isSegmentFinished(): boolean;
          public release(): void;
          public setupEncoder(): void;
          public setOutputPresentationTimeDecodedUs(param0: number): void;
          public stepPipeline(param0: net.ypresto.androidtranscoder.engine.TimeLine.Segment, param1: net.ypresto.androidtranscoder.engine.MediaTranscoderEngine.TranscodeThrottle): boolean;
          public constructor(
            param0: java.util.LinkedHashMap<string, globalAndroid.media.MediaExtractor>,
            param1: globalAndroid.media.MediaFormat,
            param2: net.ypresto.androidtranscoder.engine.QueuedMuxer
          );
        }
        export module VideoTrackTranscoder {
          export class CanvasWrapper {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.VideoTrackTranscoder.CanvasWrapper>;
            public start(param0: number, param1: number, param2: number): void;
          }
          export class DecoderWrapper {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.engine.VideoTrackTranscoder.DecoderWrapper>;
            public start(param0: number, param1: number, param2: number): void;
          }
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class Android16By9FormatStrategy extends net.ypresto.androidtranscoder.format.MediaFormatStrategy {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.Android16By9FormatStrategy>;
          public static AUDIO_BITRATE_AS_IS: number;
          public static AUDIO_CHANNELS_AS_IS: number;
          public constructor(param0: number, param1: number, param2: number, param3: number);
          public createAudioOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public createVideoOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public constructor(param0: number, param1: number);
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class Android720pFormatStrategy extends net.ypresto.androidtranscoder.format.MediaFormatStrategy {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.Android720pFormatStrategy>;
          public static AUDIO_BITRATE_AS_IS: number;
          public static AUDIO_CHANNELS_AS_IS: number;
          public static DEFAULT_VIDEO_BITRATE: number;
          public createAudioOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public constructor();
          public constructor(param0: number, param1: number, param2: number);
          public constructor(param0: number);
          public createVideoOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class AndroidFormatStrategy extends net.ypresto.androidtranscoder.format.MediaFormatStrategy {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.AndroidFormatStrategy>;
          public static AUDIO_BITRATE_AS_IS: number;
          public static AUDIO_CHANNELS_AS_IS: number;
          public constructor(param0: number, param1: number, param2: number, param3: number);
          public createAudioOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public createVideoOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public constructor(param0: number, param1: number);
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class ExportPreset960x540Strategy extends net.ypresto.androidtranscoder.format.MediaFormatStrategy {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.ExportPreset960x540Strategy>;
          public createAudioOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public createVideoOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class MediaFormatExtraConstants {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.MediaFormatExtraConstants>;
          public static KEY_PROFILE: string;
          public static KEY_LEVEL: string;
          public static KEY_AVC_SPS: string;
          public static KEY_AVC_PPS: string;
          public static KEY_ROTATION_DEGREES: string;
          public static MIMETYPE_VIDEO_AVC: string;
          public static MIMETYPE_VIDEO_H263: string;
          public static MIMETYPE_VIDEO_VP8: string;
          public static MIMETYPE_AUDIO_AAC: string;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class MediaFormatPresets {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.MediaFormatPresets>;
          /** @deprecated */
          public static getExportPreset960x540(): globalAndroid.media.MediaFormat;
          public static getExportPreset960x540(param0: number, param1: number): globalAndroid.media.MediaFormat;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class MediaFormatStrategy {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.MediaFormatStrategy>;
          /**
           * Constructs a new instance of the net.ypresto.androidtranscoder.format.MediaFormatStrategy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            createVideoOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
            createAudioOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          });
          public constructor();
          public createAudioOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
          public createVideoOutputFormat(param0: globalAndroid.media.MediaFormat, param1: boolean): globalAndroid.media.MediaFormat;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class MediaFormatStrategyPresets {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.MediaFormatStrategyPresets>;
          public static EXPORT_PRESET_960x540: net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroidStrategy1080P(param0: number, param1: number): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroidStrategy720P(param0: number, param1: number): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createExportPreset960x540Strategy(): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroid720pStrategy(param0: number): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroid720pStrategy(param0: number, param1: number, param2: number): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroid720pStrategy(): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroid16x9Strategy1080P(param0: number, param1: number): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
          public static createAndroid16x9Strategy720P(param0: number, param1: number): net.ypresto.androidtranscoder.format.MediaFormatStrategy;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module format {
        export class OutputFormatUnavailableException {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.format.OutputFormatUnavailableException>;
          public constructor(param0: string);
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module utils {
        export class AvcCsdUtils {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.utils.AvcCsdUtils>;
          public static getSpsBuffer(param0: globalAndroid.media.MediaFormat): java.nio.ByteBuffer;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module utils {
        export class AvcSpsUtils {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.utils.AvcSpsUtils>;
          public constructor();
          public static getProfileIdc(param0: java.nio.ByteBuffer): number;
        }
      }
    }
  }
}

declare module net {
  export module ypresto {
    export module androidtranscoder {
      export module utils {
        export class MediaExtractorUtils {
          public static class: java.lang.Class<net.ypresto.androidtranscoder.utils.MediaExtractorUtils>;
          public static getFirstVideoAndAudioTrack(param0: globalAndroid.media.MediaExtractor): net.ypresto.androidtranscoder.utils.MediaExtractorUtils.TrackResult;
        }
        export module MediaExtractorUtils {
          export class TrackResult {
            public static class: java.lang.Class<net.ypresto.androidtranscoder.utils.MediaExtractorUtils.TrackResult>;
            public mVideoTrackIndex: number;
            public mVideoTrackMime: string;
            public mVideoTrackFormat: globalAndroid.media.MediaFormat;
            public mAudioTrackIndex: number;
            public mAudioTrackMime: string;
            public mAudioTrackFormat: globalAndroid.media.MediaFormat;
          }
        }
      }
    }
  }
}

//Generics information:
