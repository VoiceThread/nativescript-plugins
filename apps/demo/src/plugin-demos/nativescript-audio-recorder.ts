import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Image, alert, Button, isAndroid } from '@nativescript/core';
import { DemoSharedNativescriptAudioRecorder } from '@demo/shared';
import { AudioRecorder, AudioRecorderOptions } from '@voicethread/nativescript-audio-recorder';
import { TempFile } from '@voicethread/nativescript-filepicker/files';
import { check as checkPermission, request as requestPermission } from '@nativescript-community/perms';
import { AudioPlayer, AudioPlayerOptions } from '@voicethread/nativescript-audio-player';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptAudioRecorder {
  constructor() {
    super();
    this.recorder = new AudioRecorder();
    this.recorder.on('RecorderFinished', () => {
      console.log('RecorderFinished');
    });
    this.recorder.on('RecorderFinishedSuccessfully', () => {
      console.log('RecorderFinishedSuccessfully');
    });
    this.player = new AudioPlayer();
  }

  protected recorder: AudioRecorder;
  protected player: AudioPlayer;
  protected _isRecording = false;

  protected _recordOptions: AudioRecorderOptions = isAndroid
    ? {
        filename: '',
        metering: true,
        format: android.media.MediaRecorder.OutputFormat.MPEG_4,
        source: null,
        //channels:1,
        // sampleRate:?,
        // bitRate:?,
        // android: { encoder: android.media.MediaRecorder.AudioEncoder.AAC },
        // audioMixing: false,
        infoCallback: infoObject => {
          console.log('AudioRecorder infoCallback: ', JSON.stringify(infoObject));
        },

        errorCallback: errorObject => {
          console.log('AudioRecorder errorCallback: ', JSON.stringify(errorObject));
        },
      }
    : {
        filename: '',
        metering: true,
        // format: ?,
        //channels:1,
        // sampleRate:?,
        // bitRate:?,
        // ios:{},
        // audioMixing: false,
        infoCallback: infoObject => {
          console.log('AudioRecorder infoCallback: ', JSON.stringify(infoObject));
        },

        errorCallback: errorObject => {
          console.log('AudioRecorder errorCallback: ', JSON.stringify(errorObject));
        },
        // sessionCategory: 'AVAudioSessionCategoryPlayAndRecord',
        // sessionMode:'',
        // sessionRouteSharingPolicy:'',
      };

  protected _playOptions: AudioPlayerOptions = {
    audioFile: '',
    loop: false,
    // metering:?,
    // pitch:?,
    audioMixing: false,
    // sessionCategory: 'AVAudioSessionCategoryPlayAndRecord',
    //sessionMode:?,
    //sessionRouteSharingPolicy:?,
    completeCallback: async () => {
      console.log('Audio file recording complete.');
    },

    errorCallback: errorObject => {
      console.log(JSON.stringify(errorObject));
    },

    infoCallback: infoObject => {
      console.log(JSON.stringify(infoObject));
    },
  };

  recordAudio() {
    checkPermission('microphone').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('microphone').then(async result => {
          if (result[0] == 'authorized') {
            try {
              const pauseBtn: Button = Frame.topmost().getViewById('pauseBtn');
              const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
              const stopBtn: Button = Frame.topmost().getViewById('stopBtn');
              if (this.recorder.isPaused()) {
                console.log('paused, so just resuming recording');
                this.recorder.resume();
                recordBtn.visibility = 'collapsed';
                stopBtn.visibility = 'visible';
                pauseBtn.visibility = 'visible';
                return;
              }
              console.log('starting recording of an audio file');
              recordBtn.visibility = 'collapsed';
              pauseBtn.visibility = 'visible';
              stopBtn.visibility = 'visible';

              //set record options and record
              let tempPath = TempFile.getPath('audio', isAndroid ? '.m4a' : '.caf');
              this._playOptions.audioFile = this._recordOptions.filename = tempPath;
              if (File.exists(tempPath)) {
                // remove file if it exists
                File.fromPath(tempPath).removeSync();
              }
              //   this._playOptions.audioFile = tempPath;
              console.log('recording with options', this._recordOptions);
              this._isRecording = true;

              this.recorder
                .record(this._recordOptions)
                .then(() => {
                  console.log('recording audio started');
                })
                .catch(err => {
                  console.error(err);
                });
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for audio recording, can't start recording");
        });
      } else alert('No permission for audio recording. Grant this permission in app settings first');
    });
  }

  stopRecording() {
    const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
    recordBtn.text = 'Record audio';
    recordBtn.visibility = 'visible';
    const stopBtn: Button = Frame.topmost().getViewById('stopBtn');
    stopBtn.visibility = 'collapsed';
    const pauseBtn: Button = Frame.topmost().getViewById('pauseBtn');
    pauseBtn.visibility = 'collapsed';
    // this.handleRecording();
    this.recorder.stop();
    //check if file exists
    console.log('stopRecording(): recording file', this._recordOptions.filename);
    const file = File.fromPath(this._recordOptions.filename);
    console.log(file);
    if (file.size) {
      console.log('YaY! have a non-zero output file with name', this._recordOptions.filename);
      const playBtn: Button = Frame.topmost().getViewById('playBtn');
      playBtn.visibility = 'visible';
      this.handleRecording(file);
    } else {
      console.error('No file found for audio recording with name', this._recordOptions.filename);
    }
  }

  pauseRecording() {
    const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
    recordBtn.text = 'Record more audio';
    recordBtn.visibility = 'visible';
    const pauseBtn: Button = Frame.topmost().getViewById('pauseBtn');
    pauseBtn.visibility = 'collapsed';
    // this.handleRecording();
    console.log('pausing recording for file', this._recordOptions.filename);
    this.recorder.pause();
    //check if file exists
    // const file = File.fromPath(this._recordOptions.filename);
    // console.log(file);
    // if (file.size) {
    //   console.log('YaY! have a non-zero output file with name', this._recordOptions.filename);
    //   const playBtn: Button = Frame.topmost().getViewById('playBtn');
    //   playBtn.visibility = 'visible';
    //   this.handleRecording(file);
    // } else {
    //   console.error('No file found for audio recording with name', this._recordOptions.filename);
    // }
  }
  playRecording() {
    console.log('playRecording(): playing audio that was last recorded');
    this.player.prepareAudio(this._playOptions).then(() => {
      this.player.play();
    });
    const playBtn: Button = Frame.topmost().getViewById('playBtn');
    playBtn.visibility = 'collapsed';
    const stopPlayBtn: Button = Frame.topmost().getViewById('stopPlayBtn');
    stopPlayBtn.visibility = 'visible';
  }

  stopPlayback() {
    console.log('stopPlayback()');
    this.player.pause();
    const playBtn: Button = Frame.topmost().getViewById('playBtn');
    playBtn.visibility = 'visible';
    const stopPlayBtn: Button = Frame.topmost().getViewById('stopPlayBtn');
    stopPlayBtn.visibility = 'collapsed';
  }

  handleRecording(result: File): void {
    console.log('handleRecording(): finished recording, result:', result);
    const outputStack: StackLayout = Frame.topmost().getViewById('outputStack');
    outputStack.removeChildren();
    const fileContainer = new GridLayout();
    fileContainer['rows'] = 'auto';
    fileContainer['columns'] = 'auto, 8, *, auto';
    fileContainer['padding'] = 5;
    fileContainer['margin'] = '1 5';
    fileContainer['borderBottomColor'] = new Color('white');
    fileContainer['borderBottomWidth'] = 1;

    const textContainer = new StackLayout();
    textContainer['row'] = 0;
    textContainer['col'] = 2;
    const fileLabel = new Label();
    let fileParts = result?.path?.split('/');
    fileLabel.text = fileParts[fileParts.length - 1];
    fileLabel.textWrap = true;
    fileLabel.color = new Color('white');
    fileLabel.row = 0;
    fileLabel.col = 2;
    textContainer.addChild(fileLabel);

    const pathLabel = new Label();
    pathLabel.text = `Path: ${result?.path}`;
    pathLabel.textWrap = true;
    pathLabel.color = new Color('white');
    pathLabel.verticalAlignment = 'top';
    pathLabel.row = 1;
    pathLabel.col = 2;
    textContainer.addChild(pathLabel);

    const sizeLabel = new Label();

    sizeLabel.text = 'Size: ' + result?.size;
    sizeLabel.textWrap = true;
    sizeLabel.color = new Color('white');
    sizeLabel.row = 0;
    sizeLabel.col = 3;
    textContainer.addChild(sizeLabel);

    fileContainer.addChild(textContainer);

    outputStack.addChild(fileContainer);
    outputStack.visibility = 'visible';
  }
}
