import { EventData, Page, alert, Frame, Screen, Image, File, isIOS, isAndroid, Button, path, knownFolders, Device } from '@nativescript/core';
import { DemoSharedNativescriptCamera } from '@demo/shared';
import { CameraPlus } from '@voicethread/nativescript-camera';
import { ObservableProperty } from './observable-property';
import { Result, checkMultiple, check as checkPermission, request } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';
import { executeOnMainThread } from '@nativescript/core/utils';

export function navigatingTo(args: EventData) {
  console.log('navigatingTo()');
  const page = <Page>args.object;
  page.bindingContext = new DemoModel(page);
}

export function navigatingFrom(args: EventData) {
  console.log('page navigatingFrom()');
  const page = <Page>args.object;
  const video: Video = page.getViewById('nativeVideoPlayer') as Video;
  if (video) {
    if (!isAndroid) video.pause();
    // video.stop();
    video.src = null;
  } else console.warn('Unable to clear video player when leaving page!');
}

export async function onLoaded(args) {
  console.log('page onLoaded()', args.object);
}

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

    this.cameraHeight = Screen.mainScreen.heightDIPs * 0.7;

    if (this._counter > 0) {
      return;
    }

    this.cam.on(CameraPlus.errorEvent, args => {
      console.log('*** CameraPlus errorEvent ***', args.eventName);
    });

    this.cam.on(CameraPlus.toggleCameraEvent, (args: any) => {
      console.log(`toggleCameraEvent listener on main-view-model.ts  ${args}`);
    });

    this.cam.on(CameraPlus.photoCapturedEvent, (args: any) => {
      console.log(`photoCapturedEvent listener on main-view-model.ts  ${args}`);
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
      console.log(`videoRecordingReadyEvent listener fired`, args.data);
      let videoFile = File.fromPath(args.data);
      console.log('File has length', videoFile.size);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.visibility = 'visible';
      video.opacity = 1;
      console.log('event passed path: ', args.data);
      video.src = args.data;
      video.loop = true;
      video.play();
      //add to current array of movie segments
      this.videoSegments.push(videoFile.path);
      this.refreshUI();
    });

    this.cam.on(CameraPlus.videoRecordingStartedEvent, (args: any) => {
      console.log(`videoRecordingStartedEvent listener fired`, args.data);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.visibility = 'hidden';
    });

    this.cam.on(CameraPlus.videoRecordingFinishedEvent, (args: any) => {
      console.log(`videoRecordingFinishedEvent listener fired`);
    });

    this.cam.on(CameraPlus.cameraReadyEvent, (args: any) => {
      console.log(`cameraReadyEvent listener fired`);
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

  public async recordDemoVideo() {
    try {
      let canRecord = true;
      //recheck audio and video permissions
      const result = await checkMultiple({ photo: {}, audio: {}, video: {} });
      if (result['camera'] != 'authorized') {
        console.log('No camera permission, requesting...');
        await request('camera').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canRecord = false;
        });
      }
      if (result['microphone'] != 'authorized') {
        console.log('No microphone permission, requesting...');
        await request('microphone').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canRecord = false;
        });
      }
      console.log('canRecord?:', canRecord);
      if (!canRecord) {
        console.error('Not enough permissions to record video with audio!');
        alert('Not enough permissions to record video with audio!');
        return;
      }

      console.log(`*** start recording ***`);
      this.cam.record({
        saveToGallery: this.cam.saveToGallery,
      });
    } catch (err) {
      console.log(err);
    }
  }

  public stopRecordingDemoVideo() {
    try {
      console.log(`*** stop recording ***`);
      this.cam.stop();
      console.log(`*** after this.cam.stop() ***`);
    } catch (err) {
      console.log(err);
    }
  }

  public async mergeVideos() {
    console.log('mergeVideos()');
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

  public deleteLastSegment() {
    console.log('deleteLastSegment()');
    console.log('Segments in session:', this.videoSegments);
    if (this.videoSegments.length > 0) {
      this.videoSegments.pop();
    } else console.warn('No video segments in current session!');
    console.log(' done with function, Segments in session:', this.videoSegments);
    this.refreshUI();
  }

  public toggleFlashOnCam() {
    console.log('toggleFlashOnCam()');
    this.cam.toggleFlash();
  }

  public toggleShowingFlashIcon() {
    console.log(`showFlashIcon = ${this.cam.showFlashIcon}`);
    this.cam.showFlashIcon = !this.cam.showFlashIcon;
  }

  public toggleTheCamera() {
    console.log('toggleTheCamera()');
    this.cam.toggleCamera();
  }

  public async takePicFromCam() {
    console.log('takePicFromCam()');
    await checkPermission('camera').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await request('camera').then(async result => {
          if (result[0] == 'authorized') {
            if (!this.cam) {
              this.cam = new CameraPlus();
            }
            //take the photo
            let customOptions = {
              saveToGallery: this.cam.saveToGallery,
              autoSquareCrop: this.cam.autoSquareCrop,
              confirm: this.cam.confirmPhotos,
              confirmRetakeText: this.cam.confirmRetakeText,
              confirmSaveText: this.cam.confirmSaveText,
              maxDimension: this.cam.maxDimension,
              quality: this.cam.quality,
            };
            console.log('options', customOptions);
            this.cam.takePicture(customOptions);
          } else alert('No permission for camera, cannot take a photo!');
        });
      } else alert('No permission for camera! Grant this permission in app settings first');
    });
  }

  public async requestGalleryPermission() {
    console.log('requestGalleryPermission()');
    try {
      //iOS always needs permission
      if (isIOS) {
        console.log('iOS checking photo library permissions');
        await checkPermission('photo').then(async (permres: Result) => {
          console.log('current photos gallery perm:', permres);
          await request('photo').then(async result => {
            console.log('request perm result:', result);
            if (result[0] == 'authorized' && result[1]) {
              console.log('authorized Photos Gallery permission');
            } else {
              console.warn("No permission for files, can't save to photos gallery!");
              //warn user they need to update app privacy settings before this will work
              // alert('Update the app privacy settings to allow permission to the Photos Gallery');
            }
          });
        });
      }
      console.log('done checking iOS');
      //Android devices on API <29 need legacy write_external_storage permission to save to gallery
      if (isAndroid && +Device.sdkVersion < 29) {
        console.log('Android device version: ', Device.sdkVersion);
        //requires old external storage write permission
        await checkPermission('storage').then(async permres => {
          console.log('storage check:', permres);
          if (permres[0] == 'undetermined' || permres[0] != 'authorized') {
            await request('storage').then(async result => {
              console.log('storage request', result);
              // console.log(result['android.permission.READ_EXTERNAL_STORAGE']);
              // console.log(result['android.permission.WRITE_EXTERNAL_STORAGE']);
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
    //newer Android APIs don't need permissions for MediaStore to save images
    console.log('done checking Android');

    console.log('requestGalleryPermission complete, returning');
  }
}
