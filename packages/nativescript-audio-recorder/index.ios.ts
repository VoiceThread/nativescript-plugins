// import { AudioRecorderCommon } from './common';
import { Observable, File, path, knownFolders } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

declare const kAudioFormatAppleLossless, kAudioFormatMPEG4AAC;

@NativeClass()
class TNSRecorderDelegate extends NSObject implements AVAudioRecorderDelegate {
  static ObjCProtocols = [AVAudioRecorderDelegate];
  private _owner: WeakRef<AudioRecorder>;
  private _resolve;
  private _reject;
  static initWithOwner(owner: AudioRecorder, resolve, reject) {
    const delegate = <TNSRecorderDelegate>TNSRecorderDelegate.new();
    delegate._owner = new WeakRef(owner);
    delegate._resolve = resolve;
    delegate._reject = reject;
    return delegate;
  }

  audioRecorderDidFinishRecording(recorder: any, success: boolean) {
    console.log(`audioRecorderDidFinishRecording: ${success}`);
    const owner = this._owner.get();
    if (owner) {
      owner.notify({
        eventName: 'RecorderFinished',
      });
    }
    this._reject('Failed to record audio file!');
  }

  async audioRecorderDidFinishRecordingSuccessfully(recorder: AVAudioRecorder, flag) {
    const owner = this._owner.get();
    console.log(`audioRecorderDidFinishRecordingSuccessfully: ${flag}`, owner._recorderOptions);
    const file = File.fromPath(owner._recorderOptions.filename);
    console.log(file, file.size, recorder);

    if (owner) {
      owner.notify({
        eventName: 'RecorderFinishedSuccessfully',
      });
    }
    return this._resolve(file);
  }
}

export { TNSRecorderDelegate };

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: AVAudioRecorder;
  private _recordingSession: any;
  private _delegate: any;
  public _recorderOptions: AudioRecorderOptions;
  public debug: boolean = false;

  protected getDelegate(resolve, reject): any {
    if (!this._delegate) {
      this._delegate = TNSRecorderDelegate.initWithOwner(this, resolve, reject);
    }
    return this._delegate;
  }

  get ios() {
    return this._recorder;
  }

  requestRecordPermission() {
    return new Promise((resolve, reject) => {
      this._recordingSession.requestRecordPermission((allowed: boolean) => {
        if (allowed) {
          resolve(true);
        } else {
          reject('Record permissions denied');
        }
      });
    });
  }

  record(options: AudioRecorderOptions): Promise<any> {
    console.log('record() Recording?', options);
    this._recorderOptions = options;
    return new Promise((resolve, reject) => {
      console.log('Starting a new recording');
      //starting a new recording
      try {
        this._recordingSession = AVAudioSession.sharedInstance();
        let errorRef = new interop.Reference();
        this._recordingSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord, errorRef);
        if (errorRef) {
          console.error(`setCategoryError: ${errorRef.value}, ${errorRef}`);
        }

        this._recordingSession.setActiveError(true, null);
        this._recordingSession.requestRecordPermission((allowed: boolean) => {
          if (allowed) {
            const recordSetting = NSMutableDictionary.alloc().init();
            let format = options.format ? options.format : kAudioFormatMPEG4AAC;
            console.log(`setting format: ${format}`);
            recordSetting.setValueForKey(NSNumber.numberWithInt(format), 'AVFormatIDKey');

            let avAudioQualityValue = AVAudioQuality.Medium;
            if (options.iosAudioQuality) {
              if (options.iosAudioQuality == 'Min') {
                avAudioQualityValue = AVAudioQuality.Min;
              } else if (options.iosAudioQuality == 'Low') {
                avAudioQualityValue = AVAudioQuality.Low;
              } else if (options.iosAudioQuality == 'Medium') {
                avAudioQualityValue = AVAudioQuality.Medium;
              } else if (options.iosAudioQuality == 'High') {
                avAudioQualityValue = AVAudioQuality.High;
              } else if (options.iosAudioQuality == 'Max') {
                avAudioQualityValue = AVAudioQuality.Max;
              }
            }
            console.log(`setting audio quality: ${avAudioQualityValue}`); // https://developer.apple.com/documentation/avfaudio/avaudioquality;
            recordSetting.setValueForKey(NSNumber.numberWithInt(avAudioQualityValue), 'AVEncoderAudioQualityKey');

            let sampleRate = 44100.0;
            if (options.sampleRate) sampleRate = parseFloat(parseInt(options.sampleRate).toFixed(1));
            console.log(`setting sampleRate: ${sampleRate}`);
            recordSetting.setValueForKey(NSNumber.numberWithFloat(sampleRate), 'AVSampleRateKey');

            let channels = options.channels ? options.channels : 1;
            console.log(`setting channels: ${channels}`);
            recordSetting.setValueForKey(NSNumber.numberWithInt(channels), 'AVNumberOfChannelsKey');

            AVAudioSession.sharedInstance().setCategoryWithOptionsError(
              AVAudioSessionCategoryPlayAndRecord,
              // AVAudioSessionCategoryOptions.AllowBluetoothA2DP | //this is only for high-quality audio playback, can't record
              AVAudioSessionCategoryOptions.AllowBluetooth | //this allows playback and recording
                AVAudioSessionCategoryOptions.AllowAirPlay |
                AVAudioSessionCategoryOptions.DefaultToSpeaker
            );
            let inputs = AVAudioSession.sharedInstance().availableInputs;
            if (inputs.count > 1) {
              let bluetooth = null,
                headset = null,
                wired = null,
                builtin = null;
              //if we have multiple inputs, try to select a connected bluetooth or airpod device first
              //otherwise a headset and finally the device mic
              for (let i = 0; i < inputs.count; i++) {
                console.log('Available mic port #', i, ' type:', inputs.objectAtIndex(i).portType);
                if (inputs.objectAtIndex(i).portType.includes('Bluetooth')) bluetooth = i;
                else if (inputs.objectAtIndex(i).portType.includes('BuiltIn')) builtin = i;
                else if (inputs.objectAtIndex(i).portType.includes('Headset')) headset = i;
                else if (inputs.objectAtIndex(i).portType.includes('Wired')) wired = i;
              }
              console.log('Using mic port: ', bluetooth || wired || headset || builtin || 0);
              AVAudioSession.sharedInstance().setPreferredInputError(inputs.objectAtIndex(bluetooth || wired || headset || builtin || 0));
            } else if (inputs.count == 1) AVAudioSession.sharedInstance().setPreferredInputError(inputs.objectAtIndex(0));
            else console.warn('AVAudioSession unable to find available microphone!');
            errorRef = new interop.Reference();

            const url = NSURL.fileURLWithPath(options.filename);
            this._recorder = (<any>AVAudioRecorder.alloc()).initWithURLSettingsError(url, recordSetting, errorRef);
            if (errorRef && errorRef.value) {
              console.error(`initWithURLSettingsError errorRef: ${errorRef.value}, ${errorRef}`);
            } else {
              this._recorder.delegate = this.getDelegate(resolve, reject);
              if (options.metering) {
                this._recorder.meteringEnabled = true;
              }
              if (options.maxDuration) {
                this._recorder.recordForDuration(options.maxDuration / 1000);
              } else {
                this._recorder.prepareToRecord(); //creates audio file and readies recorder
                this._recorder.record();
                console.log('recorder', this._recorder);
              }
              resolve(null);
            }
          }
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }

  stop(): Promise<any> {
    console.log('stop() Recording?', this.isRecording());
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._delegate._resolve = resolve;
          this._delegate._reject = reject;
          this._recorder.stop();
        } else {
          console.error('No native recorder instance, was this cleared by mistake!?');
          return reject('No native recorder instance, was this cleared by mistake!?');
        }
        // may need this in future
        this._recordingSession.setActiveError(false, null);
        this._recorder.meteringEnabled = false;
        // resolve(null); //promise resolution handled by delegate
      } catch (ex) {
        reject(ex);
      }
    });
  }

  dispose(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
          this._recorder.meteringEnabled = false;
          this._recordingSession.setActiveError(false, null);
          this._recorder = undefined;
          this._delegate = null;
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  isRecording() {
    return this._recorder && this._recorder.recording;
  }

  getMeters(channel?: number) {
    if (this._recorder) {
      if (!this._recorder.meteringEnabled) {
        this._recorder.meteringEnabled = true;
      }
      this._recorder.updateMeters();
      return this._recorder.averagePowerForChannel(channel);
    }
  }

  public mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!audioFiles || audioFiles.length <= 0) return reject('audioFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');
      console.log('merging into output file ', outputPath);

      if (File.exists(outputPath)) {
        // remove file if it exists
        console.log('file with this name already exists, removing');
        File.fromPath(outputPath).removeSync(err => {
          console.error('Unable to remove existing file!', err);
          return reject('Unable to remove existing file!' + err.message);
        });
      }
      if (audioFiles.length == 1) {
        console.log('Only a single file in array, renaming from', audioFiles[0], ' and returning', outputPath);
        let segmentFile = File.fromPath(audioFiles[0]);
        console.log('Renaming file', segmentFile, segmentFile.size);
        let suc = NSFileManager.defaultManager.copyItemAtPathToPathError(audioFiles[0], outputPath);
        console.log('ios rename success?', suc);
        if (!suc) {
          console.error('Unable to rename file!');
          return reject('Unable to rename file!');
        }
        return resolve(File.fromPath(outputPath));
      }
      let composition = AVMutableComposition.new();
      for (let i = 0; i < audioFiles.length; i++) {
        let compositionAudioTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, 0);
        console.log('Loading AVURLAsset with path', audioFiles[i]);
        let asset = AVURLAsset.assetWithURL(NSURL.fileURLWithPath(audioFiles[i]));
        let track = asset.tracksWithMediaType(AVMediaTypeAudio)[0];
        let timeRange = CMTimeRangeMake(CMTimeMake(0, 600), track.timeRange.duration);
        compositionAudioTrack.insertTimeRangeOfTrackAtTimeError(timeRange, track, composition.duration);
      }
      let mergeAudioUrl = NSURL.fileURLWithPath(outputPath);
      let assetExport = new AVAssetExportSession({ asset: composition, presetName: AVAssetExportPresetAppleM4A });
      assetExport.outputFileType = AVFileTypeAppleM4A;
      assetExport.outputURL = mergeAudioUrl;
      assetExport.exportAsynchronouslyWithCompletionHandler(() => {
        switch (assetExport.status) {
          case AVAssetExportSessionStatus.Failed:
            console.log('failed (assetExport?.error)', assetExport.error);
            reject(assetExport.error);
            break;
          case AVAssetExportSessionStatus.Cancelled:
            console.log('cancelled (assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Unknown:
            console.log('unknown(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Waiting:
            console.log('waiting(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Exporting:
            console.log('exporting(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Completed:
            console.log('Audio Concatenation Complete');
            resolve(File.fromPath(outputPath));
            break;
        }
      });
    });
  }
}
