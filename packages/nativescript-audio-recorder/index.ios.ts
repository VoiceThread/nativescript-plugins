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
    if (owner._recording) {
      //if we're still recording more, just return last recorded file
      this._resolve(file);
      return;
    }
    console.log('Done recording, handling temp files');
    //if we only have a single file, rename the file to the main recording filename and done
    if (owner._audioFiles.length === 1) {
      if (!File.exists(owner._audioFiles[0])) {
        return this._reject('Audio recording not found! path: ' + owner._audioFiles[0]);
      }
      console.log('Renaming file from ', owner._audioFiles[0], ' to ', owner._recorderOptions.filename);
      File.fromPath(owner._audioFiles[0]).renameSync(owner._recorderOptions.filename);
      if (!File.exists(owner._recorderOptions.filename)) {
        console.error('Failed to rename file!');
      }
      owner._audioFiles = null;
      File.fromPath(owner._audioFiles[0]).removeSync();
      return this._resolve(file);
    } else if (owner._audioFiles.length > 1) {
      //if we have more than one file recorded and merge if so
      console.log('Have files to merge, #:', owner._audioFiles.length);
      // var mergeAudioURL = NSURL.fileURLWithPath(this._recorderOptions.filename);
      let outputfile = await mergeAudioFiles(owner._audioFiles, owner._recorderOptions.filename);
      owner._audioFiles = null;
      return this._resolve(outputfile);
    } else {
      //something went wrong
      console.error('No audio files in array');
      return this._reject('No audio recordings generated');
    }
  }
}

export { TNSRecorderDelegate };

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: AVAudioRecorder;
  private _recordingSession: any;
  public _recording: boolean = false;
  private _delegate: any;
  public _audioFiles: [string] = null;

  protected getDelegate(resolve, reject): any {
    if (!this._delegate) {
      this._delegate = TNSRecorderDelegate.initWithOwner(this, resolve, reject);
    }
    return this._delegate;
  }
  public _recorderOptions: AudioRecorderOptions;

  static CAN_RECORD(): boolean {
    //all iOS devices have a microphone
    return true;
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
    console.log('record() Recording?', this._recording, options);
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
            let tempFileName: string, outputPath: string;

            for (let i = 1; i < 999999999; i++) {
              tempFileName = 'tempaudio-' + i + '.mp4';
              outputPath = path.join(knownFolders.documents().path, tempFileName);
              if (!File.exists(outputPath)) break;
            }
            console.log('Starting recording session with filename', outputPath);
            if (!this._audioFiles) this._audioFiles = [outputPath];
            else this._audioFiles.push(outputPath);
            // const url = NSURL.fileURLWithPath(options.filename);
            const url = NSURL.fileURLWithPath(outputPath);
            this._recorder = (<any>AVAudioRecorder.alloc()).initWithURLSettingsError(url, recordSetting, errorRef);
            if (errorRef && errorRef.value) {
              console.error(`initWithURLSettingsError errorRef: ${errorRef.value}, ${errorRef}`);
            } else {
              // this._recorder.delegate = TNSRecorderDelegate.initWithOwner(this);
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
              this._recording = true;

              resolve(null);
            }
          }
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }

  pause(): Promise<any> {
    console.log('pause() Recording?', this._recording);
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  resume(): Promise<any> {
    console.log('resume() Recording?', this._recording);
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          // this._recorder.record();
          this.record(this._recorderOptions);
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  stop(): Promise<any> {
    console.log('stop() Recording?', this._recording);
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._delegate._resolve = resolve;
          this._delegate._reject = reject;
          this._recording = false; //done recording
          this._recorder.stop();
          //the delegate will handle the file produced if any
        } else {
          console.error('No native recorder instance, was this cleared by mistake!?');
          return reject('No native recorder instance, was this cleared by mistake!?');
        }
        // may need this in future
        this._recordingSession.setActiveError(false, null);
        this._recorder.meteringEnabled = false;
        // resolve(null);
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
          this._recording = false;
          this._recorder.meteringEnabled = false;
          this._recordingSession.setActiveError(false, null);
          this._recorder = undefined;
          this._delegate = null;
          this._audioFiles = null;
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

  isPaused() {
    return this._recorder && this._recorder.recording && this._recording;
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
}

function mergeAudioFiles(audioFileUrls: [string], outputPath: string) {
  return new Promise((resolve, reject) => {
    let composition = AVMutableComposition.new();
    console.log('merging into output file ', outputPath);
    if (File.exists(outputPath)) {
      // remove file if it exists
      File.fromPath(outputPath).removeSync();
    }
    for (let i = 0; i < audioFileUrls.length; i++) {
      let compositionAudioTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, 0);
      console.log('Loading AVURLAsset with path', audioFileUrls[i]);
      let asset = AVURLAsset.assetWithURL(NSURL.fileURLWithPath(audioFileUrls[i]));
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
          for (let i = 0; i < audioFileUrls.length; i++) {
            if (File.exists(audioFileUrls[i])) {
              // remove file if it exists
              File.fromPath(audioFileUrls[i]).removeSync();
            }
            resolve(File.fromPath(outputPath));
          }
          console.log('Done cleaning out temp files merged');
          break;
      }
    });
  });
}
