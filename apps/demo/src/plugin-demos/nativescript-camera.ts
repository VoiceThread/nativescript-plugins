import { Observable, EventData, Page, ImageAsset, alert, ImageSource, Frame, Screen, Image, File, ScrollView, isAndroid } from '@nativescript/core';
import { DemoSharedNativescriptCamera } from '@demo/shared';
import { CameraPlus } from '@voicethread/nativescript-camera';
import { ObservableProperty } from './observable-property';
import { checkMultiple, check as checkPermission, request } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';
import { executeOnMainThread } from '@nativescript/core/utils';

export function navigatingTo(args: EventData) {
  console.log('navigatingTo()');
  const page = <Page>args.object;
  page.bindingContext = new DemoModel(page);
}

export function navigatingFrom(args: EventData) {
  console.log('navigatingFrom()');
  const page = <Page>args.object;
  const video = page.getViewById('nativeVideoPlayer') as Video;
  if (video) {
    video.src = null;
  }
}

export async function onLoaded(args) {
  console.log('onLoaded()', args.object);
}

export class DemoModel extends DemoSharedNativescriptCamera {
  private _counter: number = 0;
  @ObservableProperty()
  public cam: CameraPlus;
  @ObservableProperty()
  public cameraHeight: number;

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
      console.log((<any>args).data);
      ImageSource.fromAsset((<any>args).data).then(res => {
        const testImg = Frame.topmost().getViewById('testImagePickResult') as Image;
        testImg.src = res;
      });
    });

    this.cam.on(CameraPlus.videoRecordingReadyEvent, (args: any) => {
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
    });

    this.cam.on(CameraPlus.videoRecordingStartedEvent, (args: any) => {
      console.log(`videoRecordingStartedEvent listener fired`, args.data);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.visibility = 'collapsed';
    });

    this.cam.on(CameraPlus.videoRecordingFinishedEvent, (args: any) => {
      console.log(`videoRecordingFinishedEvent listener fired`);
    });

    this._counter = 1;
  }

  public camLoaded(args) {
    //TODO: not currently hooked into NS event properly
    console.log('camera loaded', args, args.object);
  }

  public async recordDemoVideo() {
    try {
      let canPick = true;
      //check audio and video permissions
      const result = await checkMultiple({ photo: {}, audio: {}, video: {} });
      if (result['camera'] != 'authorized') {
        console.log('No camera permission, requesting...');
        await request('camera').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canPick = false;
        });
      }
      if (result['microphone'] != 'authorized') {
        console.log('No microphone permission, requesting...');
        await request('microphone').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canPick = false;
        });
      }
      console.log('canPick?:', canPick);
      if (!canPick) {
        console.error('Not enough permissions to record video with audio!');
        alert('Not enough permissions to record video with audio!');
        return;
      }
      console.log(`*** start recording ***`);
      this.cam.record({
        saveToGallery: false,
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

  public takePicFromCam() {
    console.log('takePicFromCam()');
    // this.cam.requestCameraPermissions().then(() => {
    checkPermission('camera').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await request('camera').then(async result => {
          if (result[0] == 'authorized') {
            if (!this.cam) {
              this.cam = new CameraPlus();
            }
            this.cam.takePicture({ saveToGallery: true });
          } else alert('No permission for camera, cannot take a photo!');
        });
      } else alert('No permission for camera! Grant this permission in app settings first');
    });
    // });
  }
}
