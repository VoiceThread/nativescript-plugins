import { Observable, EventData, Page, File, Application, Frame, isAndroid, isIOS, knownFolders, StackLayout, Label, Color, ScrollView, Button, TextField, TextView, Device } from '@nativescript/core';
import { DemoSharedNativescriptTranscoder } from '@demo/shared';
import { TempFile } from '@voicethread/nativescript-filepicker/files';
import { filePicker, galleryPicker, MediaType, getFreeMBs } from '@voicethread/nativescript-filepicker';
import { NativescriptTranscoder, Segment, VideoConfig } from '@voicethread/nativescript-transcoder';
import { checkMultiple, check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
  if (isIOS) {
    (page.getViewById('ios-gallery-button') as Button).visibility = 'visible';
  }
}

export class DemoModel extends DemoSharedNativescriptTranscoder {
  pickedFiles: File[] = [];
  transcoder: NativescriptTranscoder;
  constructor() {
    super();
    this.transcoder = new NativescriptTranscoder();
  }

  //pick videos and images from device files
  async pickVideos() {
    this.pickedFiles = [];
    let canPick = true;
    try {
      let tempPath = TempFile.getPath('tempfile', 'tmp');
      let freeSpace = getFreeMBs(tempPath);

      console.log('free MBs on file picker temp directory', freeSpace);
      console.log('temp directory path: ', tempPath);

      //check free space before allowing picker to create temp copy of selected files
      if (freeSpace > 400) {
        if (isAndroid && +Device.sdkVersion > 32) {
          const result = await checkMultiple({ photo: {}, audio: {}, video: {} });
          if (result['photo'] != 'authorized') {
            console.log('No photo permission, requesting...');
            await request('photo').then(result => {
              console.log('Request result', result);
              if (result[0] != 'authorized') canPick = false;
            });
          }
          if (result['video'] != 'authorized') {
            console.log('No video permission, requesting...');
            await request('video').then(result => {
              console.log('Request result', result);
              if (result[0] != 'authorized') canPick = false;
            });
          }
          if (result['audio'] != 'authorized') {
            console.log('No audio permission, requesting...');
            await request('audio').then(result => {
              console.log('Request result', result);
              if (result[0] != 'authorized') canPick = false;
            });
          }
          console.log('canPick?:', canPick);
        } else if (isAndroid) {
          //just request external_storage perms otherwise
          const result = await checkPermission('storage');
          if (result['storage'] != 'authorized') console.log('No storage permission, requesting...');
          await request('storage').then(result => {
            console.log('Request result', result);
            if (result['android.permission.READ_EXTERNAL_STORAGE'] != 'authorized') canPick = false;
          });
        }

        if (canPick) {
          let files = await filePicker(MediaType.IMAGE | MediaType.VIDEO, true);
          console.log('files', files);
          if (files.length) this.pickedFiles = files;
          console.log('Selected files', this?.pickedFiles);
          this.updateFileListView();
        } else alert('Need permissions to pick files from device storage');
      } else alert('Low free space on device, picking not allowed');
    } catch (err) {
      if (err) alert(err?.message);
    }
  }

  //Pick videos and images from iOS photos gallery
  async pickVideoGallery() {
    this.pickedFiles = [];
    try {
      let tempPath = TempFile.getPath('tempfile', 'tmp');
      let freeSpace = getFreeMBs(tempPath);

      console.log('free MBs on file picker temp directory', freeSpace);
      console.log('temp directory path: ', tempPath);
      if (freeSpace > 400) {
        //check before allowing picker to create temp copy of selected files
        checkPermission('photo').then(async permres => {
          if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
            await requestPermission('photo').then(async result => {
              if (result[0] == 'authorized') {
                try {
                  this.pickedFiles = await galleryPicker(MediaType.IMAGE + MediaType.VIDEO, true);
                  this.updateFileListView();
                } catch (err) {
                  if (err) alert(err?.message);
                }
              } else alert("No permission for files, can't open picker");
            });
          } else alert("No permission for files, can't open picker. Grant this permission in app settings first and then try again");
        });
      } else alert('Low free space on device, picking not allowed');
    } catch (err) {
      if (err) alert(err?.message);
    }
  }

  async pickAudio() {
    this.pickedFiles = [];
    try {
      this.pickedFiles = await filePicker(MediaType.AUDIO, true);
    } catch (err) {
      if (err) alert(err?.message);
    }
  }

  clear() {
    this.pickedFiles = [];
    this.updateFileListView();
  }

  setEditMode() {
    const assetsGatheringContainer: ScrollView = Frame.topmost().getViewById('assetsGatheringContainer');
    assetsGatheringContainer.visibility = 'collapsed';
    const edittingContainer: ScrollView = Frame.topmost().getViewById('edittingContainer');
    edittingContainer.visibility = 'visible';
  }

  segments: { asset: string; duration: number; seek: number; type: string }[] = [];
  openNewSegmentForm() {
    const newSegmentFormContainer: StackLayout = Frame.topmost().getViewById('newSegmentFormContainer');
    if (!newSegmentFormContainer) {
      return;
    }
    const newSegmentForm = new StackLayout();
    newSegmentForm.backgroundColor = new Color('#0E1729');
    newSegmentForm.padding = 20;
    const promptLabel = new Label();
    promptLabel.text = 'Select Asset';
    promptLabel.textWrap = true;
    promptLabel.fontSize = 16;
    (<any>promptLabel).fontWeight = 700;
    promptLabel.color = new Color('#ffffff');
    promptLabel.marginBottom = 10;
    newSegmentForm.addChild(promptLabel);
    let selectedAsset: File | undefined;
    if (this.pickedFiles?.length > 0) {
      let fileContainers: StackLayout[] = [];
      this.pickedFiles.forEach((file, i) => {
        const fileContainer = new StackLayout();
        fileContainer.padding = 10;
        fileContainer.backgroundColor = new Color('#1e293c');
        fileContainer.marginBottom = 5;
        fileContainer.borderWidth = 1;
        fileContainer.borderColor = new Color('#1e293c');

        const fileLabel = new Label();
        fileLabel.text = file['name'];
        fileLabel.textWrap = true;
        fileLabel.fontSize = 14;
        fileLabel.color = new Color('#ffffff');
        fileContainer.addChild(fileLabel);
        fileContainer.on('tap', args => {
          fileContainers.forEach((container, index) => {
            if (index === i) {
              container.borderColor = new Color('#ffffff');
            } else {
              container.borderColor = new Color('#1e293c');
            }
          });
          selectedAsset = file;
        });
        fileContainers.push(fileContainer);

        newSegmentForm.addChild(fileContainer);
      });

      const durationLabel = new Label();
      durationLabel.text = 'Duration (milliseconds)';
      durationLabel.textWrap = true;
      durationLabel.fontSize = 16;
      (<any>durationLabel).fontWeight = 700;
      durationLabel.color = new Color('#ffffff');
      durationLabel.marginTop = 10;
      durationLabel.marginBottom = 5;
      newSegmentForm.addChild(durationLabel);

      // using TextView as a workaround with the textfield bug for https://github.com/NativeScript/NativeScript/issues/10267
      const durationTextField = new TextView();
      durationTextField.padding = 10;
      durationTextField.marginTop = 10;
      durationTextField.color = new Color('#ffffff');
      durationTextField.backgroundColor = new Color('#1e293c');

      newSegmentForm.addChild(durationTextField);

      const seekLabel = new Label();
      seekLabel.text = 'Seek (milliseconds)';
      seekLabel.textWrap = true;
      seekLabel.fontSize = 16;
      (<any>seekLabel).fontWeight = 700;
      seekLabel.color = new Color('#ffffff');
      seekLabel.marginTop = 10;
      seekLabel.marginBottom = 5;
      newSegmentForm.addChild(seekLabel);

      const seekTextField = new TextView();
      seekTextField.padding = 10;
      seekTextField.marginTop = 10;
      seekTextField.color = new Color('#ffffff');
      seekTextField.backgroundColor = new Color('#1e293c');
      newSegmentForm.addChild(seekTextField);

      const addSegmentButton = new Button();
      addSegmentButton.text = 'Add Segment';
      addSegmentButton.marginTop = 10;
      addSegmentButton.on('tap', () => {
        if (selectedAsset && durationTextField.text) {
          this.segments.push({
            asset: selectedAsset?.name,
            type: 'videoAudio',
            duration: +durationTextField.text || 0,
            seek: +seekTextField.text || 0,
          });
          this.updateSegmentsView();
          newSegmentFormContainer.removeChild(newSegmentForm);
        }
      });
      newSegmentForm.addChild(addSegmentButton);

      newSegmentFormContainer.addChild(newSegmentForm);
    }
  }

  videoConfigs: VideoConfig = { quality: '720p', frameRate: 30, audioChannels: 2, audioSampleRate: 44100, audioBitRate: 128000 };
  videoConfigIsOpen = false;
  openVideoConfigsForm(): void {
    const videoConfigsFormContainer: StackLayout = Frame.topmost().getViewById('videoConfigsFormContainer');
    if (!videoConfigsFormContainer) {
      return;
    }
    if (this.videoConfigIsOpen) {
      return;
    }
    this.videoConfigIsOpen = true;
    const videoConfigsForm = new StackLayout();
    videoConfigsForm.backgroundColor = new Color('#0E1729');
    videoConfigsForm.padding = 20;
    const promptLabel = new Label();
    promptLabel.text = 'Video Quality';
    promptLabel.textWrap = true;
    promptLabel.fontSize = 16;
    (<any>promptLabel).fontWeight = 700;
    promptLabel.color = new Color('#ffffff');
    promptLabel.marginBottom = 10;
    videoConfigsForm.addChild(promptLabel);

    const videoQualityOptions: { displayName: string; configValue: '480p' | '720p' | '1080p' }[] = [
      {
        displayName: '480p',
        configValue: '480p',
      },
      {
        displayName: '720p',
        configValue: '720p',
      },
      {
        displayName: '1080p',
        configValue: '1080p',
      },
    ];
    const videoQualityOptionsContainer = new StackLayout();
    videoQualityOptionsContainer.orientation = 'horizontal';
    const optionButtons: StackLayout[] = [];
    videoQualityOptions.forEach((videoQualityOption, i) => {
      const optionButton = new StackLayout();
      optionButton.borderWidth = 1;
      optionButton.borderColor = new Color('#1e293c');
      if (i === 0) {
        optionButton.borderRadius = '5 0 0 5';
      } else if (i === videoQualityOptions.length - 1) {
        optionButton.borderRadius = '0 5 5 0';
      } else {
        optionButton.borderRadius = 0;
      }
      optionButton.padding = '5 10';
      const optionButtonText = new Label();
      optionButtonText.text = videoQualityOption.displayName;
      optionButtonText.color = new Color('#ffffff');
      optionButton.addChild(optionButtonText);
      // set default selected
      if (videoQualityOption.configValue === this.videoConfigs.quality) {
        optionButton.borderColor = new Color('#ffffff');
      }

      optionButton.on('tap', args => {
        optionButtons.forEach((button, index) => {
          if (index === i) {
            button.borderColor = new Color('#ffffff');
          } else {
            button.borderColor = new Color('#1e293c');
          }
        });
        this.videoConfigs.quality = videoQualityOption.configValue;
      });
      optionButtons.push(optionButton);
      videoQualityOptionsContainer.addChild(optionButton);
    });
    videoConfigsForm.addChild(videoQualityOptionsContainer);

    // frame rate
    const frameRateLabel = new Label();
    frameRateLabel.text = 'Frame Rate';
    frameRateLabel.textWrap = true;
    frameRateLabel.fontSize = 16;
    (<any>frameRateLabel).fontWeight = 700;
    frameRateLabel.color = new Color('#ffffff');
    frameRateLabel.marginTop = 10;
    frameRateLabel.marginBottom = 5;
    videoConfigsForm.addChild(frameRateLabel);

    const frameRateTextField = new TextView();
    frameRateTextField.padding = 10;
    frameRateTextField.marginTop = 10;
    frameRateTextField.color = new Color('#ffffff');
    frameRateTextField.backgroundColor = new Color('#1e293c');
    frameRateTextField.text = this.videoConfigs.frameRate.toString();
    videoConfigsForm.addChild(frameRateTextField);

    // audio sample rate
    // const audioSampleRateLabel = new Label();
    // audioSampleRateLabel.text = 'Audio Sample Rate';
    // audioSampleRateLabel.textWrap = true;
    // audioSampleRateLabel.fontSize = 16;
    // (<any>audioSampleRateLabel).fontWeight = 700;
    // audioSampleRateLabel.color = new Color('#ffffff');
    // audioSampleRateLabel.marginTop = 10;
    // audioSampleRateLabel.marginBottom = 5;
    // videoConfigsForm.addChild(audioSampleRateLabel);

    // const audioSampleRateTextField = new TextView();
    // audioSampleRateTextField.padding = 10;
    // audioSampleRateTextField.marginTop = 10;
    // audioSampleRateTextField.color = new Color('#ffffff');
    // audioSampleRateTextField.backgroundColor = new Color('#1e293c');
    // audioSampleRateTextField.text = this.videoConfigs.audioSampleRate.toString();
    // videoConfigsForm.addChild(audioSampleRateTextField);

    // save button
    const saveButton = new Button();
    saveButton.text = 'Save Settings';
    saveButton.marginTop = 10;
    saveButton.on('tap', () => {
      if (frameRateTextField.text) {
        this.videoConfigs.frameRate = +frameRateTextField.text;
      }
      // if (audioSampleRateTextField.text) {
      //   this.videoConfigs.audioSampleRate = +audioSampleRateTextField.text;
      // }
      // videoConfigsFormContainer.removeChild(videoConfigsForm);
    });
    videoConfigsForm.addChild(saveButton);

    videoConfigsFormContainer.addChild(videoConfigsForm);
  }

  processVideos() {
    if (this.segments.length === 0 || this.pickedFiles.length === 0) {
      return;
    }
    this.transcoder.reset();
    // this.transcoder = new NativescriptTranscoder();
    this.transcoder.setLogLevel('verbose');
    // TODO: we might be able to be smarter about this and only add the files that are used
    this.pickedFiles.forEach(file => {
      this.transcoder.addAsset({
        name: file.name,
        path: file.path,
        type: 'videoAudio',
      });
    });
    this.segments.forEach(segment => {
      this.transcoder.addSegment({
        duration: segment.duration,
        // TODO: we support multiple track per segment, but we don't have the UI updated to support that yet
        tracks: [
          {
            asset: segment.asset,
            // type: segment.type,
            // seek: segment.seek,
          },
        ],
      });
    });

    // IMPORTANT - specified duration cannot be greater than the video's duration
    // this will cause a crash
    const tempPath = knownFolders.documents().getFile('video-copy.mp4').path;
    if (File.exists(tempPath)) {
      const file = File.fromPath(tempPath);
      file.removeSync();
    }
    console.log('[PROCESSING STARTED]');
    this.transcoder.process(tempPath, this.videoConfigs).then(() => {
      console.log('[PROCCESSING COMPLETED]');
      const tempFile = File.fromPath(tempPath);
      console.log('[outputSize]', tempFile.size);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.opacity = 1;
      video.src = tempPath;
      video.loop = true;
      video.controls = true;
      video.play();
      const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
      outputDetailsLabel.text = `Output Size: ${this.formatBytes(tempFile.size)}`;
      outputDetailsLabel.textWrap = true;
      outputDetailsLabel.fontSize = 16;
      outputDetailsLabel.color = new Color('#ffffff');
    });
  }

  setAssetGatheringMode() {
    const edittingContainer: ScrollView = Frame.topmost().getViewById('edittingContainer');
    if (edittingContainer) {
      edittingContainer.visibility = 'collapsed';
    }
    const assetsGatheringContainer: ScrollView = Frame.topmost().getViewById('assetsGatheringContainer');
    if (assetsGatheringContainer) {
      assetsGatheringContainer.visibility = 'visible';
    }
  }

  private updateFileListView(): void {
    const itemList: StackLayout = Frame.topmost().getViewById('pickedFiles');
    if (!itemList) {
      return;
    }
    itemList.removeChildren();
    if (this.pickedFiles?.length > 0) {
      this.pickedFiles.forEach(file => {
        const fileContainer = new StackLayout();
        fileContainer.padding = 10;
        fileContainer.backgroundColor = new Color('#1e293c');
        fileContainer.marginBottom = 5;

        const fileLabel = new Label();
        fileLabel.text = file['name'];
        fileLabel.textWrap = true;
        fileLabel.fontSize = 14;
        fileLabel.color = new Color('#ffffff');
        fileContainer.addChild(fileLabel);

        itemList.addChild(fileContainer);
      });
    }
  }

  private updateSegmentsView(): void {
    const segmentsList: StackLayout = Frame.topmost().getViewById('segmentsContainer');
    if (!segmentsList) {
      return;
    }
    segmentsList.removeChildren();
    if (this.segments?.length > 0) {
      this.segments.forEach(segment => {
        const segmentContainer = new StackLayout();
        segmentContainer.padding = 10;
        segmentContainer.backgroundColor = new Color('#1e293c');
        segmentContainer.marginBottom = 5;

        const segmentLabel = new Label();
        segmentLabel.text = segment.asset;
        (<any>segmentLabel).fontWeight = 700;
        segmentLabel.textWrap = true;
        segmentLabel.fontSize = 14;
        segmentLabel.color = new Color('#ffffff');
        segmentContainer.addChild(segmentLabel);

        const durationLabel = new Label();
        durationLabel.text = `Duration: ${segment.duration} milliseconds`;
        durationLabel.textWrap = true;
        durationLabel.fontSize = 14;
        durationLabel.color = new Color('#ffffff');
        segmentContainer.addChild(durationLabel);

        // const durationLabel = new Label();
        // durationLabel.text = `Duration: ${segment.duration} seconds`;
        // durationLabel.textWrap = true;
        // durationLabel.fontSize = 14;
        // durationLabel.color = new Color('#ffffff');
        // segmentContainer.addChild(durationLabel);

        segmentsList.addChild(segmentContainer);
      });
    }
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}
