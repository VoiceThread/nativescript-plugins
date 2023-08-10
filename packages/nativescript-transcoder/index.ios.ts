import { NativescriptTranscoderCommon, Asset, Segment, Track } from './common';

const main_queue = dispatch_get_current_queue();

export interface AssetInternal extends Asset {
  avAsset: AVURLAsset | undefined;
  audioTrack: AVAssetTrack | undefined;
  videoTrack: AVAssetTrack | undefined;
  position?: number;
}

export class NativescriptTranscoder extends NativescriptTranscoderCommon {
  assets: Record<string, AssetInternal> = {};
  segments: Segment[] = [];

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
    const tracks = segment.tracks.map((track, index) => {
      if (!track.id) {
        return {
          ...track,
          id: index + 1,
        };
      }
      return track;
    });
    this.segments.push({ ...segment, tracks: tracks });
  }

  process(resolution: 'low' | 'high', outputPath: string) {
    // let audioVideoError: NSError;
    const composition = new AVMutableComposition();
    const compositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);

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
      console.log('-- Adding Segment', segmentIndex);
      const currentSegment: Segment & { fadeOutTrackID?: number; start?: number } = this.segments[segmentIndex];
      let segmentDuration = CMTimeMake(currentSegment.duration, 1000);
      let trackDuration: CMTime | undefined = undefined; // will be calaculated for each track

      videoTrackIndex = 0;
      audioTrackIndex = 0;
      const segmentTracks = currentSegment.tracks;
      console.log('-- setting segmentTracks', segmentTracks);

      // Loop through the tracks in the segment and add each track to the composition
      for (let trackIndex = 0; trackIndex < currentSegment.tracks.length; trackIndex++) {
        console.log('-- looping through tracks', trackIndex);
        const currentTrack: Track & { trackID?: number } = currentSegment.tracks[trackIndex];
        const filter = currentTrack.filter;
        const asset = this.assets[currentTrack.asset];
        if (asset) {
          const trackType = asset.type;
          const avAsset = asset.avAsset;
          const assetTrack = asset.videoTrack;

          if (!firstAssetTrack) {
            firstAssetTrack = assetTrack;
          }

          console.log('-- processing asset');
          // Start time is the seek requested plus the current position in the track
          // TODO: what is position?
          // const trackStartTime = CMTimeMake(currentTrack.seek + asset.position, 1000);
          const trackStartTime = CMTimeMake((currentTrack.seek || 0) + (asset.position || 0), 1000);

          console.log('-- trackStartTime', trackStartTime);
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

          console.log('-- trackDuration', trackDuration);

          // TODO: check if NO_DURATION === 0
          if (trackDuration.value === 0) {
            trackDuration = CMTimeSubtract(avAsset.duration, trackStartTime);
          }
          const trackTimeRange = CMTimeRangeMake(trackStartTime, trackDuration);

          console.log('-- trackTimeRange', trackTimeRange);

          // Segment duration may also be the length of the track remaining if not specified
          if (segmentDuration.value === 0) {
            segmentDuration = CMTimeSubtract(avAsset.duration, trackStartTime);
          }

          console.log('-- segmentDuration', segmentDuration);
          console.log('-- trackStartTime.value', trackStartTime.value);
          console.log('-- trackDuration.value', trackDuration.value);
          // Update the position in the track based on the duration
          asset.position = trackStartTime.value + trackDuration.value;
          console.log('-- position', asset.position);

          // Insert video track segment
          if (segmentDuration.value > 0 && (trackType === 'video' || trackType === 'videoAudio')) {
            // Determine video track to use.  We only need multiple tracks to create multiple layers for transition effects
            // however we need to force separate instructions and the composition login in IOS will consolidate adjacant
            // segments on the same track so we try to put each consectutive segment on a new track
            let videoTrack: AVMutableCompositionTrack | undefined;
            console.log('-- inserting video track');
            if (videoTrackIndex >= videoTracks.count) {
              videoTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);
              videoTracks.addObject(videoTrack);
              const transform = assetTrack.preferredTransform;
              videoTrack.preferredTransform = transform;
              console.log('-- videoTrackIndex >= videoTracks.count');
            } else {
              videoTrack = videoTracks[videoTrackIndex];

              // Add the input asset to the video track
              // TODO: this has a different signature (error is not part of the call)
              const audioVideoSuccess = videoTrack.insertTimeRangeOfTrackAtTimeError(trackTimeRange, asset.videoTrack, outputPosition);
              console.log(`-- Adding ${videoTrack.trackID}`);

              // TODO: check if this works
              if (!audioVideoSuccess) {
                console.log('--- error');
                return;
              }

              if (scaleTime) {
                const outputRange = CMTimeRangeMake(outputPosition, trackTimeRange.duration);
                videoTrack.scaleTimeRangeToDuration(outputRange, segmentDuration);
                console.log('-- scaling');
              }
              currentTrack.trackID = videoTrack.trackID;

              // Record the filter so we can match up later when we get the layer instructions
              if (filter === 'FadeOut') {
                currentSegment.fadeOutTrackID = videoTrack.trackID;
              }
              ++videoTrackIndex;
            }
          }
          // Insert audio track segment
          if (segmentDuration.value > 0 && filter !== 'Mute' && !scaleTime && (trackType === 'audio' || trackType === 'videoAudio')) {
            // Same approach as video for audio tracks
            let audioTrack: AVMutableCompositionTrack;

            if (audioTrackIndex >= audioTracks.count) {
              audioTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, kCMPersistentTrackID_Invalid);
            } else {
              audioTrack = audioTrack[audioTrackIndex];
            }

            // Add audio asset to the track
            const audioVideoSuccess = audioTrack.insertTimeRangeOfTrackAtTimeError(trackTimeRange, asset.audioTrack, outputPosition);

            if (!audioVideoSuccess) {
              console.log('-- error with audio');
              return;
            }
            ++audioTrackIndex;
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
      const videoComposition: AVMutableVideoComposition = AVMutableVideoComposition.videoCompositionWithPropertiesOfAsset(composition);

      let trackFrameRate = firstAssetTrack.nominalFrameRate;
      if (trackFrameRate === 0) {
        trackFrameRate = 30;
      }

      videoComposition.frameDuration = CMTimeMake(1, trackFrameRate);
      const targetSize = resolution === 'high' ? CGSizeMake(1920.0, 1080.0) : CGSizeMake(1280.0, 720.0);
      const transform = firstAssetTrack.preferredTransform;
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
        console.log('looping through composition instruction');
        if (layeredSegementsIndex >= instructionSegments.count) {
          console.log('composition has extra instructions that are being ignored');
          // TODO: make sure this doesn't short circuit the whole thing
          return;
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
            const layerInstruction2 = compositionInstruction.layerInstructions[2] as AVMutableVideoCompositionLayerInstruction;
            if (segment.fadeOutTrackID != null) {
              const fadeOutTrackID = segment.fadeOutTrackID;
              const transitionLayerInstruction = layerInstruction1.trackID === fadeOutTrackID ? layerInstruction1 : layerInstruction2;
              console.log('FadeOutTrackId', fadeOutTrackID);

              // Add the opacity ramp for the entire time range of the segment
              transitionLayerInstruction.setOpacityRampFromStartOpacityToEndOpacityTimeRange(1.0, 0.0, transitionRange);
            }
          }
        }
        ++layeredSegementsIndex;

        for (let layerInstructionIndex = 0; layerInstructionIndex < compositionInstruction.layerInstructions.count; layerInstructionIndex++) {
          const layerInstruction = compositionInstruction.layerInstructions[0] as AVMutableVideoCompositionLayerInstruction;
          const trackID = layerInstruction.trackID;
          let ir: CMTimeRange;
          // TODO: ir isn't correct
          // layerInstruction.getTransformRampForTimeStartTransformEndTransformTimeRange(transitionRange.start, null, null, ir)
          //   CMTimeRange ir;
          //   [layerInstruction getTransformRampForTime:transitionRange.start startTransform:NULL endTransform:NULL timeRange:&ir];

          const segmentTracks = segment.tracks;
          // TODO: verify that this is working
          const currentTrack = segmentTracks.find(track => track.id === trackID);

          if (currentTrack == null) {
            console.log('Cannot find segment track for instruction - layered ignored');
            // TODO: make sure this doesn't short circuit the whole thing
            return;
          }

          const assetName = currentTrack.asset;
          const asset = this.assets[assetName];
          const assetTrack = asset.videoTrack;
          const transform = assetTrack.preferredTransform;
          let orientation = UIInterfaceOrientation.Portrait;

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
          console.log('Set Transform');
          layerInstruction.setTransformAtTime(finalTransform, transitionRange.start);
        }
      }

      videoComposition.frameDuration = CMTimeMake(1, 30);
      const audioChannels = 2;
      const audioSampleRate = 44100;
      const audioBitrate = 128000; // default to 128 kilobits

      console.log('-- initializing SDAVAssetExportSession');
      // const assetExportSession = SDAVAssetExportSession.exportSessionWithAsset(composition);
      const assetExportSession = SDAVAssetExportSession.alloc().initWithAsset(composition);
      console.log('-SDAVAssetExportSession', assetExportSession);
      console.log('-assetExportSession', assetExportSession.audioMix);
      console.log('-- assetExportSession', assetExportSession);
      assetExportSession.outputFileType = AVFileTypeMPEG4;

      // TODO: this needs to be checked if it works
      assetExportSession.outputURL = NSURL.URLWithString(outputPath);
      // assetExportSession.outputURL = [self getURLFromFilePath:outputFilePath];

      assetExportSession.shouldOptimizeForNetworkUse = false;
      // TODO: need to check if this works
      console.log('-- setting video settings');
      // const videoSettings = NSMutableDictionary.alloc();
      // const videoSettings = new NSDictionary([AVVideoCodecH264, targetSize.width, targetSize.height], ['AVVideoCodecKey', 'AVVideoWidthKey', 'AVVideoHeightKey']);
      const videoSettings: any = {
        'AVVideoCodecKey': AVVideoCodecH264,
        'AVVideoWidthKey': targetSize.width,
        'AVVideoHeightKey': targetSize.height,
      };
      assetExportSession.videoSettings = videoSettings as NSDictionary<string, any>;
      // assetExportSession.videoSettings = @ {
      // AVVideoCodecKey: AVVideoCodecH264,
      // AVVideoWidthKey: [NSNumber numberWithInt: targetSize.width],
      // AVVideoHeightKey: [NSNumber numberWithInt: targetSize.height],
      // };

      // TODO: need to check if this works
      console.log('-- setting audio settings');
      const audioSettings: any = {
        'AVFormatIDKey': kAudioFormatMPEG4AAC,
        'AVNumberOfChannelsKey': audioChannels,
        'AVSampleRateKey': audioSampleRate,
        'AVEncoderBitRateKey': audioBitrate,
      };
      assetExportSession.audioSettings = audioSettings as NSDictionary<string, any>;

      assetExportSession.timeRange = CMTimeRangeMake(CMTimeMake(0, 1000), outputPosition);
      assetExportSession.videoComposition = videoComposition;
      console.log('starting encoding');

      // Start encoding
      dispatch_async(main_queue, () => {
        assetExportSession.exportAsynchronouslyWithCompletionHandler(() => {
          console.log('-- COMPLETED');
        });
      });

      // Start encoding
      //   dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{

      //     [assetExportSession exportAsynchronouslyWithCompletionHandler:^
      //      {
      //          if (assetExportSession.status == AVAssetExportSessionStatusCompleted)
      //          {
      //              [exportProgressBarTimer invalidate];
      //              NSLog(@"Video export succeeded ");
      //              NSLog(@"Finished! Created %@", outputFilePath);
      //              resolve(@"Finished");
      //          }
      //          else if (assetExportSession.status == AVAssetExportSessionStatusCancelled)
      //          {
      //              [exportProgressBarTimer invalidate];
      //              NSLog(@"Video export cancelled");
      //              reject(@"cancel", @"Cancelled", assetExportSession.error);

      //          }
      //          else
      //          {
      //              [exportProgressBarTimer invalidate];
      //              NSLog(@"Video export failed with error: %@: %ld", assetExportSession.error.localizedDescription, (long)assetExportSession.error.code);;
      //              reject(@"failed", @"Failed", assetExportSession.error);
      //          }
      //      }];
      // });

      // https://github.com/selsamman/react-native-transcode/blob/master/ios/Transcode/Transcode.m
    }
  }

  invokeOnRunLoop = (function () {
    var runloop = CFRunLoopGetMain();
    return function (func) {
      CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, func);
      CFRunLoopWakeUp(runloop);
    };
  })();
}
