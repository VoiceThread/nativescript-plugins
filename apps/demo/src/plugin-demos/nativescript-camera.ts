import { EventData, Page, alert, Frame, Screen, Image, File, isIOS, isAndroid, Button, path, knownFolders, Device } from '@nativescript/core';
import { DemoSharedNativescriptCamera } from '@demo/shared';
import { CameraPlus, CameraVideoQuality, ICameraOptions } from '@voicethread/nativescript-camera';
import { ObservableProperty } from './observable-property';
import { Result, checkMultiple, check as checkPermission, request } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel(page);
}

export function navigatingFrom(args: EventData) {
  const page = <Page>args.object;
  const video: Video = page.getViewById('nativeVideoPlayer') as Video;
  if (video) {
    if (!isAndroid) video.pause();
    video.disposeNativeView();
    video.src = null;
  } else console.warn('Unable to clear video player when leaving page!');
}

export async function onLoaded(args) {}

export class DemoModel extends DemoSharedNativescriptCamera {
  private _counter: number = 0;
  @ObservableProperty()
  public cam: CameraPlus;
  @ObservableProperty()
  public cameraHeight: number;
  public videoSegments = [];

  constructor(page: Page) {
    super();
    this.cam = page.getViewById('camPlus') as unknown as CameraPlus;

    //Notes on properties that affect camera instance
    //[ Both Platforms ]
    //this.cam.enableVideo = true;//defaults to false. Enable to true for video mode
    //this.cam.disablePhoto = true;//defaults to false. Set to true and enableVideo to true, and camera button gestures ignored
    //CURRENTLY UNSUPPORTED:
    // console.log('getAvailablePictureSizes', this.cam.getAvailablePictureSizes('1:1'));//not currently supported/working

    //[ Android only ]
    if (isAndroid) {
      // this.cam.autoFocus = false; // defaults to true so camera will auto focus before capturing image
      //CURRENTLY UNSUPPORTED:
      // this.cam.whiteBalance = 'twilight';//not curreently supported to change whiteBalance, can read current whiteBalance
      // this.cam.zoom = 0.4; //not currently supported to set the zoom, but can read zoom level float from 0.0-1.0
      // this.cam.ratio = '1:1'; //not currently supported, camera defaults to size based on viewport dimensions
    }

    //[ iOS only ]
    if (isIOS) {
      // this.cam.doubleTapCameraSwitch = false; //default is true so double taps on view will switch camera
    }

    this.cameraHeight = Screen.mainScreen.heightDIPs * 0.7;

    if (this._counter > 0) {
      return;
    }

    this.cam.on(CameraPlus.errorEvent, args => {
      console.error('errorEvent:', args);
    });

    this.cam.on(CameraPlus.toggleCameraEvent, (args: any) => {
      console.log(`toggleCameraEvent: ${args}`);
    });

    this.cam.on(CameraPlus.photoCapturedEvent, (args: any) => {
      console.log(`photoCapturedEvent: ${args}`);
      //args.data should be the path of the jpeg file produced by camera library
      if (typeof args.data !== 'string') {
        console.error('returned data is not a file path!');
        return;
      }
      let photoFile = File.fromPath(args.data);
      console.log('File ', args.data, 'has length', photoFile.size);
      const testImg = Frame.topmost().getViewById('photoCaptureResult') as Image;
      testImg.src = args.data;
    });

    this.cam.on(CameraPlus.videoRecordingReadyEvent, (args: any) => {
      //args.data should be the path of the file created with the video recording
      console.log(`videoRecordingReadyEvent:`, args.data);
      let videoFile = File.fromPath(args.data);
      console.log('File has length', videoFile.size);
      //play the video just recorded
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.visibility = 'visible';
      video.opacity = 1;
      video.src = args.data;
      video.loop = true;
      video.play();
      //add to current array of movie segments
      this.videoSegments.push(videoFile.path);
      this.refreshUI();
      //dump out some information on video recording
      console.log('Height/width:', this.cam.getVideoResolution(args.data));
      console.log('codec:', this.cam.getVideoCodec(args.data));
    });

    this.cam.on(CameraPlus.videoRecordingStartedEvent, (args: any) => {
      console.log(`videoRecordingStartedEvent:`, args.data);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.visibility = 'hidden';
    });

    this.cam.on(CameraPlus.videoRecordingFinishedEvent, (args: any) => {
      console.log(`videoRecordingFinishedEvent:`, args);
    });

    this.cam.on(CameraPlus.cameraReadyEvent, (args: any) => {
      console.log(`cameraReadyEvent:`, args);
      if (this.cam.saveToGallery) {
        console.log('saveToGallery set true, checking permissions');
        this.requestGalleryPermission();
      }
    });
    this._counter = 1;
  }

  public refreshUI() {
    const mergeButton = Frame.topmost().getViewById('mergeButton') as Button;
    const deleteButton = Frame.topmost().getViewById('deleteButton') as Button;
    if (this.videoSegments.length > 0) {
      deleteButton.visibility = 'visible';
    } else {
      deleteButton.visibility = 'hidden';
    }
    if (this.videoSegments.length > 1) {
      console.log('# segments avabilalbe to merge', this.videoSegments.length);
      //show the ui to merge
      mergeButton.visibility = 'visible';
    } else {
      mergeButton.visibility = 'hidden';
    }
  }

  // called by custom button on demo page
  public async recordDemoVideo() {
    try {
      let canRecord = true;
      //recheck audio and video permissions
      const result = await checkMultiple({ photo: {}, audio: {}, video: {} });
      if (result['camera'] != 'authorized') {
        await request('camera').then(result => {
          if (result[0] != 'authorized') canRecord = false;
        });
      }
      if (result['microphone'] != 'authorized') {
        await request('microphone').then(result => {
          if (result[0] != 'authorized') canRecord = false;
        });
      }
      if (!canRecord) {
        console.error('Not enough permissions to record video with audio!');
        alert('Not enough permissions to record video with audio!');
        return;
      }

      this.cam.videoQuality = CameraVideoQuality.MAX_1080P;
      this.cam.record({
        saveToGallery: true,
        videoQuality: CameraVideoQuality.MAX_2160P,
        androidMaxVideoBitRate: 100,
        androidMaxFrameRate: 30,
        androidMaxAudioBitRate: 100,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // called by custom button on demo page
  public stopRecordingDemoVideo() {
    try {
      this.cam.stop();
    } catch (err) {
      console.error(err);
    }
  }

  // called by custom button on demo page
  public async mergeVideos() {
    let tempFileName, outputPath;
    for (let i = 1; i < 999999999; i++) {
      tempFileName = 'videorecording-' + i + '.mp4';
      outputPath = path.join(knownFolders.documents().path, tempFileName);
      if (!File.exists(outputPath)) break;
    }
    console.log('starting merge for final recording at:', outputPath);
    let previewfile = await this.cam.mergeVideoFiles(this.videoSegments, outputPath);
    if (previewfile.size) {
      console.log('video preview files merged');
      console.log('File has length', previewfile.size);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.visibility = 'visible';
      video.opacity = 1;
      if (video.src && isAndroid) video.stop();
      video.src = null;
      video.src = outputPath;
      video.loop = true;
    } else {
      console.error('EMPTY merged video file!');
    }
  }

  // called by custom button on demo page
  public deleteLastSegment() {
    console.log('Segments in session:', this.videoSegments);
    if (this.videoSegments.length > 0) {
      this.videoSegments.pop();
    } else console.warn('No video segments in current session!');
    console.log(' done with removal of last segment, Segments now in session:', this.videoSegments);
    this.refreshUI();
  }

  // called by custom button on demo page
  public toggleFlashOnCam() {
    console.log('toggleFlashOnCam()');
    this.cam.toggleFlash();
  }

  // called by custom button on demo page
  public toggleShowingFlashIcon() {
    console.log(`showFlashIcon = ${this.cam.showFlashIcon}`);
    this.cam.showFlashIcon = !this.cam.showFlashIcon;
  }

  // called by custom button on demo page
  public toggleTheCamera() {
    console.log('toggleTheCamera()');
    this.cam.toggleCamera();
  }

  // called by custom button on demo page
  public async takePicFromCam() {
    console.log('takePicFromCam()');
    await checkPermission('camera').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await request('camera').then(async result => {
          if (result[0] == 'authorized') {
            if (!this.cam) {
              this.cam = new CameraPlus();
            }
            /*
            //take the photo, using the same properties set via XML
            // NOTE: not really needed unless you want to override a property set in XML without changing the current plugin value
            let currentOptions: ICameraOptions = {
              confirmPhotos: this.cam.confirmPhotos,
              saveToGallery: this.cam.saveToGallery,
              maxDimension: this.cam.maxDimension,
              quality: this.cam.quality,
              autoSquareCrop: this.cam.autoSquareCrop,
              confirmRetakeText: this.cam.confirmRetakeText,
              confirmSaveText: this.cam.confirmSaveText,
            };
            console.log('current options', currentOptions);
            this.cam.takePicture(currentOptions);
            */
            //Or use custom options instead:
            let customOptions: ICameraOptions = {
              confirmPhotos: true,
              saveToGallery: true,
              maxDimension: 1000,
              quality: 50,
              autoSquareCrop: false,
              confirmRetakeText: 'Hate it!',
              confirmSaveText: 'Love it!',
            };
            console.log('current options', customOptions);
            this.cam.takePicture(customOptions);
          } else alert('No permission for camera, cannot take a photo!');
        });
      } else alert('No permission for camera! Grant this permission in app settings first');
    });
  }

  public async requestGalleryPermission() {
    try {
      //iOS always needs permission to save to gallery
      if (isIOS) {
        await checkPermission('photo').then(async (permres: Result) => {
          await request('photo').then(async result => {
            if (result[0] == 'authorized' && result[1]) {
            } else {
              console.warn("No permission for files, can't save to photos gallery!");
              //warn user they need to update app privacy settings before this will work
              // alert('Update the app privacy settings to allow permission to the Photos Gallery');
            }
          });
        });
      }

      //Android devices on API <29 need legacy write_external_storage permission to save to gallery
      //newer Android APIs don't need permission when using MediaStore to save images
      if (isAndroid && +Device.sdkVersion < 29) {
        console.log('Android device version: ', Device.sdkVersion);
        //requires old external storage write permission
        await checkPermission('storage').then(async permres => {
          if (permres[0] == 'undetermined' || permres[0] != 'authorized') {
            await request('storage').then(async result => {
              if (result['android.permission.READ_EXTERNAL_STORAGE'] == 'authorized' && result['android.permission.WRITE_EXTERNAL_STORAGE'] == 'authorized') {
                console.log('have read/write access to storage for API version ', Device.sdkVersion);
              } else {
                console.error('No read/write permission for storage, will not save a copy to device photos gallery');
              }
            });
            //TODO: check if always denied and warn user they need to update in app privacy settings
          } else {
            //otherwise we are authorized
            console.log('have access to storage for API version ', Device.sdkVersion);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}
