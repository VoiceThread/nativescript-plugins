import { NativescriptTranscoderCommon, Asset, Segment, Track, VideoConfig } from './common';

const main_queue = dispatch_get_current_queue();

export interface AssetInternal extends Asset {
  avAsset: AVURLAsset | undefined;
  audioTrack: AVAssetTrack | undefined;
  videoTrack: AVAssetTrack | undefined;
  position?: number;
}

const DefaultVideoConfig: VideoConfig = {
  quality: '720p',
  frameRate: 30,
  audioChannels: 2,
  audioSampleRate: 44100, // between 8 and 192
  audioBitRate: 128000, // default to 128 kilobits
};

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  assets: Record<string, AssetInternal> = {};
  segments: Segment[] = [];
  private _videoConfig: VideoConfig;

  addAsset(asset: Asset) {
    if (this.assets[asset.name]) {
      // TODO: maybe error out here?
      return;
    }

    const filePath = NSURL.fileURLWithPath(asset.path);
    const avAsset = AVURLAsset.assetWithURL(filePath);
    const audioTracks = avAsset.tracksWithMediaType(AVMediaTypeAudio);
    const videoTracks = avAsset.tracksWithMediaType(AVMediaTypeVideo);
    this.assets[asset.name] = {
      ...asset,
      avAsset: avAsset,
      audioTrack: audioTracks.count > 0 ? audioTracks.objectAtIndex(0) : undefined,
      videoTrack: videoTracks.count > 0 ? videoTracks.objectAtIndex(0) : undefined,
    };
  }

  addSegment(segment: Segment) {
    const totalTracks = this.segments.reduce((acc, curr) => {
      acc += curr.tracks.length;
      return acc;
    }, 0);
    const tracks = segment.tracks.map((track, index) => {
      // if (!track.id) {
      //   return {
      //     ...track,
      //     id: totalTracks + index + 1,
      //   };
      // }
      return track;
    });
    this.segments.push({ ...segment, tracks: tracks });
  }

  reset() {
    this.assets = {};
    this.segments = [];
  }

  private _composition: AVMutableComposition;
  process(outputPath: string, videoConfig?: VideoConfig): Promise<void> {
    return new Promise(resolve => {
      if (videoConfig) {
        this._videoConfig = {
          ...DefaultVideoConfig,
          ...videoConfig,
        };
      } else {
        this._videoConfig = DefaultVideoConfig;
      }

      console.log('[process] Start');
      // let audioVideoError: NSError;
      if (!this._composition) {
        this._composition = new AVMutableComposition();
      } else {
        for (let trackIndex = 0; trackIndex < this._composition.tracks.count; trackIndex++) {
          const track = this._composition.tracks[trackIndex] as AVCompositionTrack;
          this._composition.removeTrack(track);
          // this._composition.removeTrack(this._composition.tracks[trackIndex] as AVAssetTrack)
        }
      }
      const compositionTrack = this._composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);

      const mix = new AVMutableAudioMix();
      const audioParams = new AVMutableAudioMixInputParameters();

      let outputPosition = CMTimeMake(0, 1000);

      const audioTracks = NSMutableArray.new<AVMutableCompositionTrack>();
      const videoTracks = NSMutableArray.new<AVMutableCompositionTrack>();
      const instructionSegments = NSMutableArray.new<Segment & { fadeOutTrackID?: number; start?: number }>();

      videoTracks.addObject(compositionTrack);

      let firstAssetTrack: AVAssetTrack | undefined = undefined;
      let videoTrackIndex = 0;
      let audioTrackIndex = 0;

      for (let segmentIndex = 0; segmentIndex < this.segments.length; segmentIndex++) {
        console.log(`[process] Adding Segment: ${segmentIndex}`);
        const currentSegment: Segment & { fadeOutTrackID?: number; start?: number } = this.segments[segmentIndex];
        let segmentDuration = CMTimeMake(currentSegment.duration, 1000);
        let trackDuration: CMTime | undefined = undefined; // will be calaculated for each track

        videoTrackIndex = 0;
        audioTrackIndex = 0;
        const segmentTracks = currentSegment.tracks;
        console.log(`[process] Adding Segment Tracks: ${JSON.stringify(segmentTracks)}`);

        // Loop through the tracks in the segment and add each track to the composition
        for (let trackIndex = 0; trackIndex < currentSegment.tracks.length; trackIndex++) {
          console.log(`[process] Adding Tracks: ${trackIndex}`);
          const currentTrack: Track & { trackID?: number } = currentSegment.tracks[trackIndex];
          const filter = currentTrack.filter;
          const asset = this.assets[currentTrack.asset];
          if (asset) {
            // check for tracklevel type first and fallback to asset type
            // 'videoAudio' (default) process both video and audio
            // 'video' will only process the video (no audio)
            // 'audio' will only process the audio (black screen)
            const trackType = currentTrack.type || asset.type;
            const avAsset = asset.avAsset;
            const assetTrack = asset.videoTrack;

            if (!firstAssetTrack) {
              firstAssetTrack = assetTrack;
            }

            console.log('[process] Processing Asset');
            // Start time is the seek requested plus the current position in the track
            // TODO: what is position?
            // const trackStartTime = CMTimeMake(currentTrack.seek + asset.position, 1000);
            const trackStartTime = CMTimeMake((currentTrack.seek || 0) + (asset.position || 0), 1000);

            // The duration of the track (input) will be either what is specified for the track,
            // what is specified for the segement or if nothing else the remaingin time according to
            // the legnth of the track.
            let scaleTime = false;
            if (currentTrack.duration != null) {
              scaleTime = true;
              trackDuration = CMTimeMake(currentTrack.duration, 1000);
            } else {
              trackDuration = CMTimeMake(currentSegment.duration, 1000);
            }

            // TODO: check if NO_DURATION === 0
            if (trackDuration.value === 0) {
              trackDuration = CMTimeSubtract(avAsset.duration, trackStartTime);
            }
            const trackTimeRange = CMTimeRangeMake(trackStartTime, trackDuration);

            // Segment duration may also be the length of the track remaining if not specified
            if (segmentDuration.value === 0) {
              segmentDuration = CMTimeSubtract(avAsset.duration, trackStartTime);
            }

            // Update the position in the track based on the duration
            asset.position = trackStartTime.value + trackDuration.value;
            console.log('------------------------');
            console.log('| Track Details');
            console.log('| Track Duration:', trackDuration.value);
            console.log('| Track Start Time:', trackStartTime.value);
            console.log('| Segment Duration:', segmentDuration.value);
            console.log('------------------------');
            // Insert video track segment
            if (segmentDuration.value > 0 && (trackType === 'video' || trackType === 'videoAudio')) {
              // Determine video track to use.  We only need multiple tracks to create multiple layers for transition effects
              // however we need to force separate instructions and the composition login in IOS will consolidate adjacant
              // segments on the same track so we try to put each consectutive segment on a new track
              let videoTrack: AVMutableCompositionTrack | undefined;
              console.log('[process] Inserting Video Track');
              if (videoTrackIndex >= videoTracks.count) {
                videoTrack = this._composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);
                videoTracks.addObject(videoTrack);
                const transform = assetTrack.preferredTransform;
                videoTrack.preferredTransform = transform;
              } else {
                videoTrack = videoTracks[videoTrackIndex];
              }
              // Add the input asset to the video track
              // TODO: this has a different signature (error is not part of the call)
              const audioVideoSuccess = videoTrack.insertTimeRangeOfTrackAtTimeError(trackTimeRange, asset.videoTrack, outputPosition);
              console.log(`[process] Adding Track: ${videoTrack.trackID}`);
              // TODO: check if this works
              if (!audioVideoSuccess) {
                console.error('[process] Ran into an error while inserting video track');
                return;
              }

              if (scaleTime) {
                console.log('[process] Updating Video Scale');
                const outputRange = CMTimeRangeMake(outputPosition, trackTimeRange.duration);
                videoTrack.scaleTimeRangeToDuration(outputRange, segmentDuration);
              }
              currentTrack.trackID = videoTrack.trackID;

              // Record the filter so we can match up later when we get the layer instructions
              if (filter === 'FadeOut') {
                console.log('[process] Setting FadeOut Filter');
                currentSegment.fadeOutTrackID = videoTrack.trackID;
              }
              ++videoTrackIndex;
            }
            // Insert audio track segment
            if (segmentDuration.value > 0 && filter !== 'Mute' && !scaleTime && (trackType === 'audio' || trackType === 'videoAudio')) {
              // Same approach as video for audio tracks
              let audioTrack: AVMutableCompositionTrack;

              if (audioTrackIndex >= audioTracks.count) {
                audioTrack = this._composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, kCMPersistentTrackID_Invalid);
              } else {
                audioTrack = audioTrack[audioTrackIndex];
              }

              // Add audio asset to the track
              const audioVideoSuccess = audioTrack.insertTimeRangeOfTrackAtTimeError(trackTimeRange, asset.audioTrack, outputPosition);

              if (!audioVideoSuccess) {
                console.error('[process] Ran into an error while inserting audio track');
                return;
              }
              ++audioTrackIndex;
            }
          }
        }

        // Calculate the time range for the segment and use to record duration in segment itself and increment outputPosition
        const outputTimeRange = CMTimeRangeMake(outputPosition, segmentDuration);
        const duration = outputTimeRange.duration.value;
        const start = outputTimeRange.start.value;
        currentSegment.duration = duration;
        currentSegment.start = start;
        outputPosition = CMTimeAdd(outputPosition, outputTimeRange.duration);

        // Keep cross reference of segments to instructions for later processing
        instructionSegments.addObject(currentSegment);
      }

      // Creating the videoComposition from the composition ensures that we have default intructions and layerInstructions
      const videoComposition: AVMutableVideoComposition = AVMutableVideoComposition.videoCompositionWithPropertiesOfAsset(this._composition);

      // TODO: make this configurable
      let trackFrameRate = firstAssetTrack.nominalFrameRate;
      if (trackFrameRate === 0) {
        trackFrameRate = 30;
      }

      if (this._videoConfig.frameRate) {
        trackFrameRate = this._videoConfig.frameRate;
      }

      videoComposition.frameDuration = CMTimeMake(1, trackFrameRate);
      // TODO: make this configurable
      // default to 720p
      let targetSize = CGSizeMake(1280.0, 720.0);
      switch (this._videoConfig.quality) {
        case '1080p': {
          targetSize = CGSizeMake(1920.0, 1080.0);
          break;
        }
        case '720p': {
          targetSize = CGSizeMake(1280.0, 720.0);
          break;
        }
        case '480p': {
          targetSize = CGSizeMake(640.0, 480.0);
          break;
        }
      }
      // const targetSize = this._videoConfig.quality === 'high' ? CGSizeMake(1920.0, 1080.0) : CGSizeMake(1280.0, 720.0);
      const transform = firstAssetTrack.preferredTransform;

      // TODO: make this configurable as orientation - horizontal vs vertical
      const targetVideoAngle = (atan2(transform.b, transform.a) * 180) / Math.PI;
      if (targetVideoAngle === 90 || targetVideoAngle === -90) {
        // flipping the video
        const width = targetSize.width;
        targetSize.width = targetSize.height;
        targetSize.height = width;
      }
      videoComposition.renderSize = targetSize;

      let layeredSegementsIndex = 0;
      for (let instructionIndex = 0; instructionIndex < videoComposition.instructions.count; instructionIndex++) {
        console.log('[process] Looping through composition instruction');
        if (layeredSegementsIndex >= instructionSegments.count) {
          console.log('[process] Composition has extra instructions that are being ignored');
          // TODO: make sure this doesn't short circuit the whole thing
          continue;
        }
        const compositionInstruction = videoComposition.instructions[instructionIndex] as AVMutableVideoCompositionInstruction;
        // Retrieve segment
        const segment = instructionSegments[layeredSegementsIndex];

        const start = segment.start;
        const duration = segment.duration;
        const transitionRange = CMTimeRangeMake(CMTimeMake(start, 1000), CMTimeMake(duration, 1000));

        // Those that have two layersInstructions relate to overlapping segments in the two tracks
        if (compositionInstruction.layerInstructions.count > 0) {
          const layerInstruction1 = compositionInstruction.layerInstructions[0] as AVMutableVideoCompositionLayerInstruction;
          // If we have multiple we need to fade out one of the layers
          if (compositionInstruction.layerInstructions.count === 2) {
            // Determine which layerInstruction to be used for fadeout
            const layerInstruction2 = compositionInstruction.layerInstructions[1] as AVMutableVideoCompositionLayerInstruction;
            if (segment.fadeOutTrackID != null) {
              const fadeOutTrackID = segment.fadeOutTrackID;
              const transitionLayerInstruction = layerInstruction1.trackID === fadeOutTrackID ? layerInstruction1 : layerInstruction2;

              console.log(`[process] Setting FadeOut TrackId ${fadeOutTrackID}`);

              // Add the opacity ramp for the entire time range of the segment
              transitionLayerInstruction.setOpacityRampFromStartOpacityToEndOpacityTimeRange(1.0, 0.0, transitionRange);
            }
          }
          ++layeredSegementsIndex;
        }

        for (let layerInstructionIndex = 0; layerInstructionIndex < compositionInstruction.layerInstructions.count; layerInstructionIndex++) {
          const layerInstruction = compositionInstruction.layerInstructions[0] as AVMutableVideoCompositionLayerInstruction;
          const trackID = layerInstruction.trackID;

          let ir: CMTimeRange;
          layerInstruction.getTransformRampForTimeStartTransformEndTransformTimeRange(transitionRange.start, null, null, null);
          // TODO: ir isn't correct
          // layerInstruction.getTransformRampForTimeStartTransformEndTransformTimeRange(transitionRange.start, null, null, ir)
          //   CMTimeRange ir;
          //   [layerInstruction getTransformRampForTime:transitionRange.start startTransform:NULL endTransform:NULL timeRange:&ir];

          const segmentTracks = segment.tracks;
          // TODO: verify that this is working
          const currentTrack = segmentTracks.find(track => track.id === trackID);

          if (currentTrack == null) {
            console.warn('[process] Cannot find segment track for instruction - layered ignored');
            // TODO: make sure this doesn't short circuit the whole thing
            continue;
          }
          const assetName = currentTrack.asset;
          const asset = this.assets[assetName];
          const assetTrack = asset.videoTrack;
          const transform = assetTrack.preferredTransform;
          let orientation = UIInterfaceOrientation.LandscapeLeft;

          // Determine orientation
          // Portrait
          if (transform.a == 0 && transform.b == 1.0 && transform.c == -1.0 && transform.d == 0) {
            orientation = UIInterfaceOrientation.Portrait;
          }
          // PortraitUpsideDown
          if (transform.a == 0 && transform.b == -1.0 && transform.c == 1.0 && transform.d == 0) {
            orientation = UIInterfaceOrientation.PortraitUpsideDown;
          }
          // LandscapeRight
          if (transform.a == 1.0 && transform.b == 0 && transform.c == 0 && transform.d == 1.0) {
            orientation = UIInterfaceOrientation.LandscapeRight;
          }
          // LandscapeLeft
          if (transform.a == -1.0 && transform.b == 0 && transform.c == 0 && transform.d == -1.0) {
            orientation = UIInterfaceOrientation.LandscapeLeft;
          }

          // Create a preferred transform
          const originalSize = assetTrack.naturalSize;
          let finalTransform: CGAffineTransform;
          switch (orientation) {
            case UIInterfaceOrientation.LandscapeLeft:
              finalTransform = CGAffineTransformMake(-1, 0, 0, -1, originalSize.width, originalSize.height);
              break;
            case UIInterfaceOrientation.LandscapeRight:
              finalTransform = CGAffineTransformMake(1, 0, 0, 1, 0, 0);
              break;
            case UIInterfaceOrientation.Portrait:
              finalTransform = CGAffineTransformMake(0, 1, -1, 0, originalSize.height, 0);
              break;
            case UIInterfaceOrientation.PortraitUpsideDown:
              finalTransform = CGAffineTransformMake(0, -1, 1, 0, 0, originalSize.width);
              break;
            default:
              break;
          }

          // TODO: this moves the video into a corner. still needs some working on
          if (orientation === UIInterfaceOrientation.Portrait || orientation === UIInterfaceOrientation.PortraitUpsideDown) {
            // flipping time :)
            const width = originalSize.width;
            originalSize.width = originalSize.height;
            originalSize.height = width;
          }

          // center oiriginal inside target
          const ratio = Math.min(targetSize.width / originalSize.width, targetSize.height / originalSize.height);
          const transX = (targetSize.width - originalSize.width * ratio) / 2;
          const transY = (targetSize.height - originalSize.height * ratio) / 2;
          let matrix = CGAffineTransformMakeTranslation(transX, transY);
          matrix = CGAffineTransformScale(matrix, ratio, ratio);
          finalTransform = CGAffineTransformConcat(finalTransform, matrix);
          console.log('[process] Setting transform layer instruction');
          layerInstruction.setTransformAtTime(finalTransform, transitionRange.start);
        }
      }

      videoComposition.frameDuration = CMTimeMake(1, this._videoConfig.frameRate);
      const audioChannels = this._videoConfig.audioChannels;
      const audioSampleRate = this._videoConfig.audioSampleRate;
      const audioBitrate = this._videoConfig.audioBitRate;
      const assetExportSession = new NSAVAssetExportSession().initWithAsset(this._composition);
      assetExportSession.outputFileType = AVFileTypeMPEG4;
      assetExportSession.outputURL = this.getURLFromFilePath(outputPath);
      assetExportSession.shouldOptimizeForNetworkUse = false;
      // TODO: need to check if this works
      console.log('[process] Setting Video Settings');
      const videoSettings: any = {
        'AVVideoCodecKey': AVVideoCodecH264,
        'AVVideoWidthKey': targetSize.width,
        'AVVideoHeightKey': targetSize.height,
      };
      assetExportSession.videoSettings = videoSettings as NSDictionary<string, any>;
      assetExportSession.frameRate = this._videoConfig.frameRate;

      // TODO: need to check if this works
      console.log('[process] Setting Audio Settings');
      const audioSettings: any = {
        'AVFormatIDKey': kAudioFormatMPEG4AAC,
        'AVNumberOfChannelsKey': audioChannels,
        'AVSampleRateKey': audioSampleRate,
        'AVEncoderBitRateKey': audioBitrate,
      };
      assetExportSession.audioSettings = audioSettings as NSDictionary<string, any>;
      assetExportSession.timeRange = CMTimeRangeMake(CMTimeMake(0, 1000), outputPosition);
      assetExportSession.videoComposition = videoComposition;
      console.log('[process] Starting Encoding');

      // Start encoding
      dispatch_async(dispatch_get_global_queue(qos_class_t.QOS_CLASS_BACKGROUND, 0), () => {
        assetExportSession.exportAsynchronouslyWithCompletionHandler(() => {
          console.log('[process] Completion Handler');
          this.reset();
          resolve();
        });
      });
      // https://github.com/selsamman/react-native-transcode/blob/master/ios/Transcode/Transcode.m
    });
  }

  getURLFromFilePath(filePath: string): NSURL {
    if (filePath.includes('assets-library://')) {
      return NSURL.URLWithString(filePath); // :[filePath stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    } else if (filePath.includes('file://')) {
      return NSURL.URLWithString(filePath);
    }
    return NSURL.fileURLWithPath(filePath);
  }
}

class NSAVAssetExportSession {
  private _asset: AVAsset;
  timeRange: CMTimeRange;
  private _reader: AVAssetReader;
  private _writer: AVAssetWriter;
  shouldOptimizeForNetworkUse: boolean;
  private _metadata: NSArray<AVMetadataItem>;
  private _videoOutput: AVAssetReaderVideoCompositionOutput;
  private _videoInputSettings: NSDictionary<string, any>;
  videoComposition: AVMutableVideoComposition;
  videoSettings: NSDictionary<string, any>;
  frameRate: number;
  private _videoInput: AVAssetWriterInput;
  private _videoPixelBufferAdaptor;
  private _inputQueue: NSObject;
  outputURL: NSURL;
  outputFileType: string;

  // audio
  private _audioOutput: AVAssetReaderAudioMixOutput;
  private _audioMix: AVAudioMix;
  private _audioInput: AVAssetWriterInput;
  audioSettings: NSDictionary<string, any>;

  private _progress: number;
  private _lastSamplePresentationTime: CMTime;
  private _duration;
  private _error: NSError;
  private _completionHandler: () => void;

  initWithAsset(asset: AVAsset) {
    this._asset = asset;
    this.timeRange = CMTimeRangeMake(kCMTimeZero, kCMTimePositiveInfinity);
    return this;
  }

  exportAsynchronouslyWithCompletionHandler(completionHandler: () => void): void {
    console.log('[exportAsynchronouslyWithCompletionHandler] Start');
    this.cancelExport();
    this._completionHandler = completionHandler;
    if (!this.outputURL) {
      this._error = NSError.errorWithDomainCodeUserInfo(AVFoundationErrorDomain, AVError.ExportFailed, {
        NSLocalizedDescriptionKey: 'Output URL not set',
      } as any);
      completionHandler();
      return;
    }
    console.log('[exportAsynchronouslyWithCompletionHandler] Asset', this._asset);
    this._reader = AVAssetReader.alloc().initWithAssetError(this._asset);
    if (this._reader.error) {
      this._error = this._reader.error;
      completionHandler();
      return;
    }
    console.log('[exportAsynchronouslyWithCompletionHandler] outputURL', this.outputURL);
    console.log('[exportAsynchronouslyWithCompletionHandler] outputFileType', this.outputFileType);
    this._writer = AVAssetWriter.assetWriterWithURLFileTypeError(this.outputURL, this.outputFileType);
    if (this._writer.error) {
      this._error = this._writer.error;
      completionHandler();
      return;
    }
    this._reader.timeRange = this.timeRange;
    this._writer.shouldOptimizeForNetworkUse = this.shouldOptimizeForNetworkUse;
    this._writer.metadata = this._metadata;

    const videoTracks = this._asset.tracksWithMediaType(AVMediaTypeVideo);

    // TODO: find equivalent in NS
    // if (CMTIME_IS_VALID(this.timeRange.duration) && !CMTIME_IS_POSITIVE_INFINITY(this.timeRange.duration))
    if (this.timeRange.duration) {
      this._duration = CMTimeGetSeconds(this.timeRange.duration);
    } else {
      this._duration = CMTimeGetSeconds(this._asset.duration);
    }
    console.log('[exportAsynchronouslyWithCompletionHandler] duration', this._duration);
    // Video output
    console.log('[exportAsynchronouslyWithCompletionHandler] videoTracks', videoTracks);
    if (videoTracks.count > 0) {
      console.log('[exportAsynchronouslyWithCompletionHandler] Setting Video Output');
      this._videoOutput = AVAssetReaderVideoCompositionOutput.assetReaderVideoCompositionOutputWithVideoTracksVideoSettings(videoTracks, this._videoInputSettings);
      this._videoOutput.alwaysCopiesSampleData = false;
      // this check is causing the video to not scale down correctly
      // if (this.videoComposition) {
      //   // TODO: this might be the problem - https://stackoverflow.com/a/67665341/10280206
      //   // this.videoComposition.sourceTrackIDForFrameTiming = kCMPersistentTrackID_Invalid;
      //   console.log('[exportAsynchronouslyWithCompletionHandler] Setting Video Composition');
      //   this._videoOutput.videoComposition = this.videoComposition;
      // } else {
      console.log('[exportAsynchronouslyWithCompletionHandler] Buliding Video Composition');
      this._videoOutput.videoComposition = this.buildDefaultVideoComposition();
      // }

      if (this._reader.canAddOutput(this._videoOutput)) {
        console.log('[exportAsynchronouslyWithCompletionHandler] Adding Video Output to Reader');
        this._reader.addOutput(this._videoOutput);
      }

      // Video input
      this._videoInput = AVAssetWriterInput.assetWriterInputWithMediaTypeOutputSettings(AVMediaTypeVideo, this.videoSettings);
      this._videoInput.expectsMediaDataInRealTime = false;
      if (this._writer.canAddInput(this._videoInput)) {
        console.log('[exportAsynchronouslyWithCompletionHandler] Adding Video Input to Writer');
        this._writer.addInput(this._videoInput);
      }

      const pixelBufferAttributes: any = {
        kCVPixelBufferPixelFormatTypeKey: kCVPixelFormatType_32BGRA,
        kCVPixelBufferWidthKey: this._videoOutput.videoComposition.renderSize.width,
        kCVPixelBufferHeightKey: this._videoOutput.videoComposition.renderSize.height,
        IOSurfaceOpenGLESTextureCompatibility: true,
        IOSurfaceOpenGLESFBOCompatibility: true,
      };
      this._videoPixelBufferAdaptor = AVAssetWriterInputPixelBufferAdaptor.assetWriterInputPixelBufferAdaptorWithAssetWriterInputSourcePixelBufferAttributes(
        this._videoInput,
        pixelBufferAttributes as NSDictionary<any, any>
      );
    }

    // Audio output
    const audioTracks = this._asset.tracksWithMediaType(AVMediaTypeAudio);
    if (audioTracks.count > 0) {
      this._audioOutput = AVAssetReaderAudioMixOutput.assetReaderAudioMixOutputWithAudioTracksAudioSettings(audioTracks, null);
      this._audioOutput.alwaysCopiesSampleData = false;
      this._audioOutput.audioMix = this._audioMix;
      if (this._reader.canAddOutput(this._audioOutput)) {
        console.log('[exportAsynchronouslyWithCompletionHandler] Adding Audio Output to Reader');
        this._reader.addOutput(this._audioOutput);
      }
    } else {
      // Just in case this gets reused
      this._audioOutput = null;
    }

    // Audio input
    if (this._audioOutput) {
      this._audioInput = AVAssetWriterInput.assetWriterInputWithMediaTypeOutputSettings(AVMediaTypeAudio, this.audioSettings);
      this._audioInput.expectsMediaDataInRealTime = false;
      if (this._writer.canAddInput(this._audioInput)) {
        console.log('[exportAsynchronouslyWithCompletionHandler] Adding Audio Input to Writer');
        this._writer.addInput(this._audioInput);
      }
    }

    // NSURL. url.startAccessingSecurityScopedResource();
    this._writer.startWriting();
    this._reader.startReading();
    console.log('[exportAsynchronouslyWithCompletionHandler] Starting Writer Session');
    this._writer.startSessionAtSourceTime(this.timeRange.start);

    let videoCompleted = false;
    let audioCompleted = false;
    // null = DISPATCH_QUEUE_SERIAL
    this._inputQueue = dispatch_queue_create('VideoEncoderInputQueue', null);
    if (videoTracks.count > 0) {
      this._videoInput.requestMediaDataWhenReadyOnQueueUsingBlock(this._inputQueue, () => {
        console.log('[exportAsynchronouslyWithCompletionHandler] Queueing Video Encoding');
        if (!this.encodeReadySamplesFromOutputToInput(this._videoOutput, this._videoInput)) {
          videoCompleted = true;
          console.log('[exportAsynchronouslyWithCompletionHandler] Video Encoding Completed');
          if (audioCompleted) {
            this.finish();
          }
        }
      });
    } else {
      videoCompleted = true;
    }

    if (!this._audioOutput) {
      audioCompleted = true;
    } else {
      this._audioInput.requestMediaDataWhenReadyOnQueueUsingBlock(this._inputQueue, () => {
        console.log('[exportAsynchronouslyWithCompletionHandler] Queueing Audio Encoding');
        if (!this.encodeReadySamplesFromOutputToInput(this._audioOutput, this._audioInput)) {
          audioCompleted = true;
          console.log('[exportAsynchronouslyWithCompletionHandler] Audio Encoding Completed');
          if (videoCompleted) {
            this.finish();
          }
        }
      });
    }
  }
  encodeReadySamplesFromOutputToInput(output: AVAssetReaderOutput, input: AVAssetWriterInput): boolean {
    console.log('[encodeReadySamplesFromOutputToInput] Start');
    console.log('[encodeReadySamplesFromOutputToInput] Input', input);
    console.log('[encodeReadySamplesFromOutputToInput] Output', output);

    while (input.readyForMoreMediaData) {
      // console.log('------------------------');
      const sampleBuffer = output.copyNextSampleBuffer();
      // console.log('| Sample Buffer:', !!sampleBuffer);

      if (sampleBuffer) {
        let handled = false;
        let error = false;
        // console.log('| Reader Status:', this._reader.status);
        // console.log('| Writer Status:', this._writer.status);
        if (this._reader.error) {
          console.log('| Reader error', this._reader.error);
        }
        if (this._writer.error) {
          console.log('| Writer error', this._writer.error);
        }
        if (this._reader.status != AVAssetReaderStatus.Reading || this._writer.status != AVAssetWriterStatus.Writing) {
          handled = true;
          error = true;
        }
        // console.log('| Handled:', handled);
        // console.log('| Error:', error);
        if (!handled && this._videoOutput == output) {
          this._lastSamplePresentationTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer);
          this._lastSamplePresentationTime = CMTimeSubtract(this._lastSamplePresentationTime, this.timeRange.start);

          const progress = this._duration == 0 ? 1 : CMTimeGetSeconds(this._lastSamplePresentationTime) / this._duration;
          console.log('| Progress', progress);
        }

        if (!handled) {
          const appendSampleBuffer = input.appendSampleBuffer(sampleBuffer);
          // console.log('| AppendSampleBuffer:', appendSampleBuffer);
          if (!appendSampleBuffer) {
            error = true;
          }
        }

        // This is automatically managed by NativeScript via toll-free bridging
        // so we don't have to release this manually
        // Calling this runs the risk of causing a crash due to the object being already
        // cleaned up by NativeScript
        // CFRelease(sampleBuffer);
        // console.log('------------------------');
        if (error) {
          return false;
        }
      } else {
        input.markAsFinished();
        console.log('[encodeReadySamplesFromOutputToInput] Done');
        return false;
      }
    }
    return true;
  }

  buildDefaultVideoComposition(): AVMutableVideoComposition {
    const videoComposition = AVMutableVideoComposition.videoComposition();
    const videoTrack = this._asset.tracksWithMediaType(AVMediaTypeVideo).objectAtIndex(0);
    // get the frame rate from videoSettings, if not set then try to get it from the video track,
    // if not set (mainly when asset is AVComposition) then use the default frame rate of 30
    let trackFrameRate = 0;
    if (this.videoSettings) {
      const videoCompressionProperties = this.videoSettings['AVVideoCompressionPropertiesKey'];
      if (videoCompressionProperties) {
        const maxKeyFrameInterval: NSNumber = videoCompressionProperties.objectForKey(AVVideoMaxKeyFrameIntervalKey);
        if (maxKeyFrameInterval) {
          trackFrameRate = maxKeyFrameInterval.floatValue;
        }
      }
    } else {
      trackFrameRate = videoTrack.nominalFrameRate;
    }

    if (trackFrameRate === 0) {
      trackFrameRate = 30;
    }

    if (this.frameRate) {
      trackFrameRate = this.frameRate;
    }

    videoComposition.frameDuration = CMTimeMake(1, trackFrameRate);
    const targetSize = CGSizeMake(this.videoSettings['AVVideoWidthKey'], this.videoSettings['AVVideoHeightKey']);
    const naturalSize = videoTrack.naturalSize;
    let transform = videoTrack.preferredTransform;
    const videoAngleInDegree = (atan2(transform.b, transform.a) * 180) / Math.PI;
    if (videoAngleInDegree === 90 || videoAngleInDegree === -90) {
      // flipping the video
      const width = naturalSize.width;
      naturalSize.width = naturalSize.height;
      naturalSize.height = width;
    }
    videoComposition.renderSize = naturalSize;

    // center inside
    const xRatio = targetSize.width / naturalSize.width;
    const yRatio = targetSize.height / naturalSize.height;
    const ratio = Math.min(xRatio, yRatio);

    const postWidth = naturalSize.width * ratio;
    const postHeight = naturalSize.height * ratio;
    const transx = (targetSize.width - postWidth) / 2;
    const transy = (targetSize.height - postHeight) / 2;

    let matrix = CGAffineTransformMakeTranslation(transx / xRatio, transy / yRatio);
    matrix = CGAffineTransformScale(matrix, ratio / xRatio, ratio / yRatio);
    transform = CGAffineTransformConcat(transform, matrix);

    // Make a "pass through video track" video composition.
    const passThroughInstruction: AVMutableVideoCompositionInstruction = AVMutableVideoCompositionInstruction.videoCompositionInstruction();
    passThroughInstruction.timeRange = CMTimeRangeMake(kCMTimeZero, this._asset.duration);

    const passThroughLayer = AVMutableVideoCompositionLayerInstruction.videoCompositionLayerInstructionWithAssetTrack(videoTrack);
    passThroughLayer.setTransformAtTime(transform, kCMTimeZero);

    passThroughInstruction.layerInstructions = NSArray.arrayWithArray([passThroughLayer]);
    videoComposition.instructions = NSArray.arrayWithArray([passThroughInstruction]);
    // videoComposition.sourceTrackIDForFrameTiming = kCMPersistentTrackID_Invalid;
    return videoComposition;
  }

  cancelExport(): void {
    if (this._inputQueue) {
      dispatch_async(this._inputQueue, () => {
        this._writer.cancelWriting();
        this._reader.cancelReading();
        this.complete(this._completionHandler);
        this.reset();
      });
    }
  }

  finish(): void {
    console.log('----- FINISH -------');
    console.log('-- this._reader', this._reader);
    console.log('-- this._writer', this._writer);
    // Synchronized block to ensure we never cancel the writer before calling finishWritingWithCompletionHandler
    if (this._reader?.status == AVAssetReaderStatus.Cancelled || this._writer?.status == AVAssetWriterStatus.Cancelled) {
      return;
    }

    const completionHandler = this._completionHandler;
    if (this._writer?.status == AVAssetWriterStatus.Failed) {
      this.complete(completionHandler);
    } else {
      // ----------------------------------------------------------------
      // this should be invoked automatically
      if (this._lastSamplePresentationTime.value) {
        this._writer.endSessionAtSourceTime(this._lastSamplePresentationTime);
      }
      this._writer.finishWritingWithCompletionHandler(() => {
        console.log('[finishWritingWithCompletionHandler]');
        this.complete(completionHandler);
      });
    }
    this.reset();
  }

  complete(completionHandler: () => void): void {
    console.log('----- COMPLETE -------');
    console.log('-- this._reader', this._reader);
    console.log('-- this._writer', this._writer);
    if (this._writer?.status == AVAssetWriterStatus.Failed || this._writer?.status == AVAssetWriterStatus.Cancelled) {
      NSFileManager.defaultManager.removeItemAtURLError(this.outputURL);
    }

    if (completionHandler) {
      completionHandler();
    }
  }

  error(): NSError {
    if (this._error) {
      return this._error;
    } else {
      return this._writer.error || this._reader.error;
    }
  }

  reset(): void {
    console.log('------ RESET ------');
    this._error = null;
    this._progress = 0;
    this._reader = null;
    this._videoOutput = null;
    this._audioOutput = null;
    this._writer = null;
    this._videoInput = null;
    this._videoPixelBufferAdaptor = null;
    this._audioInput = null;
    this._inputQueue = null;
    this._metadata = null;
    this.shouldOptimizeForNetworkUse = null;
    this._completionHandler = null;

    this._asset = null;
    this.timeRange = null;
    this._videoInputSettings = null;
    this.videoComposition = null;
    this.videoSettings = null;
    this.outputURL = null;
    this.outputFileType = null;
    this._audioMix = null;
    this.audioSettings = null;
    this._lastSamplePresentationTime = null;
    this._duration = null;
    this.frameRate = null;
  }

  status(): AVAssetExportSessionStatus {
    switch (this._writer.status) {
      default:
      case AVAssetWriterStatus.Unknown:
        return AVAssetExportSessionStatus.Unknown;
      case AVAssetWriterStatus.Writing:
        return AVAssetExportSessionStatus.Exporting;
      case AVAssetWriterStatus.Failed:
        return AVAssetExportSessionStatus.Failed;
      case AVAssetWriterStatus.Completed:
        return AVAssetExportSessionStatus.Completed;
      case AVAssetWriterStatus.Cancelled:
        return AVAssetExportSessionStatus.Cancelled;
    }
  }
}
