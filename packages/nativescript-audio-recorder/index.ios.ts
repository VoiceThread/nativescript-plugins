// import { AudioRecorderCommon } from './common';
import { Observable, File } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

declare const kAudioFormatAppleLossless, kAudioFormatMPEG4AAC;

@NativeClass()
class TNSRecorderDelegate extends NSObject implements AVAudioRecorderDelegate {
  static ObjCProtocols = [AVAudioRecorderDelegate];
  private _owner: WeakRef<AudioRecorder>;

  static initWithOwner(owner: AudioRecorder) {
    const delegate = <TNSRecorderDelegate>TNSRecorderDelegate.new();
    delegate._owner = new WeakRef(owner);
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
  }

  audioRecorderDidFinishRecordingSuccessfully(recorder: AVAudioRecorder, flag) {
    const owner = this._owner.get();
    console.log(`audioRecorderDidFinishRecordingSuccessfully: ${flag}`, owner._recorderOptions);
    const file = File.fromPath(owner._recorderOptions.filename);
    console.log(file, file.size, recorder);

    if (owner) {
      owner.notify({
        eventName: 'RecorderFinishedSuccessfully',
      });
    }
  }
}

export { TNSRecorderDelegate };

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: AVAudioRecorder;
  private _recordingSession: any;
  private _recording: boolean = false;
  private _delegate: any;

  protected getDelegate(): any {
    if (!this._delegate) {
      this._delegate = TNSRecorderDelegate.initWithOwner(this);
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
      if (this._recording) {
        //appending to an existing recorder
        console.log('Appending to existing recording', this._recorder);

        this._recorder.record();
        return resolve(null);
      }
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
            let format = options.format ? options.format : kAudioFormatAppleLossless;
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
            console.log(`setting format: ${avAudioQualityValue}`); // https://developer.apple.com/documentation/avfaudio/avaudioquality;
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
              // this._recorder.delegate = TNSRecorderDelegate.initWithOwner(this);
              this._recorder.delegate = this.getDelegate();
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
          this._recorder.pause();
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
          this._recorder.record();
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
          this.dispose();
          // this._recorder.stop();
          // this._delegate = null;
        } else {
          console.error('No native recorder instance, was this cleared by mistake!?');
          return reject('No native recorder instance, was this cleared by mistake!?');
        }
        // may need this in future
        this._recordingSession.setActiveError(false, null);
        this._recorder.meteringEnabled = false;

        resolve(null);
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
          // this._recordingSession.setActiveError(false, null);
          // this._recorder.release();
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
