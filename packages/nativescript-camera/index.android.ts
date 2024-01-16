/**********************************************************************************
  2017, nStudio, LLC & LiveShopper, LLC
  2023, VoiceThread - Angel Dominguez
 **********************************************************************************/

import { Application, ImageAsset, Device, View, File, Utils, AndroidApplication, ImageSource, path, knownFolders } from '@nativescript/core';
import * as types from '@nativescript/core/utils/types';
import { CameraPlusBase, CameraTypes, CameraVideoQuality, GetSetProperty, ICameraOptions, ICameraPlusEvents, IVideoOptions, WhiteBalance } from './common';
import * as CamHelpers from './helpers';
export * from './common';
export { CameraVideoQuality, WhiteBalance } from './common';
const REQUEST_VIDEO_CAPTURE = 999;
const WRAP_CONTENT = -2;
const ALIGN_PARENT_TOP = 10;
const ALIGN_PARENT_BOTTOM = 12;
const ALIGN_PARENT_LEFT = 9;
const ALIGN_PARENT_RIGHT = 11;
const CENTER_HORIZONTAL = 14;
const DIRECTORY_PICTURES = 'DIRECTORY_PICTURES';
const DIRECTORY_MOVIES = 'DIRECTORY_MOVIES';
const FOCUS_MODE_AUTO = 'auto';
const FOCUS_MODE_EDOF = 'edof';
const FOCUS_MODE_CONTINUOUS_PICTURE = 'continuous-picture';
const FOCUS_MODE_CONTINUOUS_VIDEO = 'continuous-video';
const FLASH_MODE_ON = 'on';
const FLASH_MODE_OFF = 'off';
const CAMERA_FACING_FRONT = 1; // front camera
const CAMERA_FACING_BACK = 0; // rear camera
const RESULT_CODE_PICKER_IMAGES = 941;
const RESULT_OK = -1;

const DEVICE_INFO_STRING = () => `device: ${Device.manufacturer} ${Device.model} on SDK: ${Device.sdkVersion}`;
export class CameraPlus extends CameraPlusBase {
  private _camera: io.github.triniwiz.fancycamera.FancyCamera;
  private _cameraId;

  @GetSetProperty()
  public flashOnIcon: string = 'ic_flash_on_white';
  @GetSetProperty()
  public flashOffIcon: string = 'ic_flash_off_white';
  @GetSetProperty()
  public toggleCameraIcon: string = 'ic_switch_camera_white';
  @GetSetProperty()
  public confirmPhotos: boolean = false;
  @GetSetProperty()
  public saveToGallery: boolean = false;
  @GetSetProperty()
  public takePicIcon: string = 'ic_camera_white';
  @GetSetProperty()
  public takeVideoIcon: string = 'ic_video_white';
  @GetSetProperty()
  public stopVideoIcon: string = 'ic_video_red';
  @GetSetProperty()
  public insetButtons: boolean = false;
  @GetSetProperty()
  public insetButtonsPercent: number = 0.1;
  @GetSetProperty()
  public isRecording: boolean = false;
  private _nativeView;
  private _owner: WeakRef<any>;
  private _mediaRecorder: android.media.MediaRecorder;
  private _textureSurface: android.view.Surface;
  private _textureView: android.view.TextureView;
  private _surface: android.graphics.SurfaceTexture; // reference to surface to ensure toggling the camera works correctly
  private _flashBtn: android.widget.ImageButton = null; // reference to native flash button
  private _takePicBtn: android.widget.ImageButton = null; // reference to native take picture button
  private _toggleCamBtn: android.widget.ImageButton = null; // reference to native toggle camera button
  private _videoOptions: IVideoOptions;
  private _videoPath: string;
  private isButtonLongPressed = false;
  private _defaultCamera: CameraTypes;

  readonly _context; // defining this to pass TS warning, NS provides the context during lifecycle
  _lastCameraOptions: ICameraOptions[];
  constructor() {
    super();
    this._camera = null;

    this._textureSurface = null;

    this.flashOnIcon = this.flashOnIcon ? this.flashOnIcon : 'ic_flash_on_white';

    this.flashOffIcon = this.flashOffIcon ? this.flashOffIcon : 'ic_flash_off_white';

    this.toggleCameraIcon = this.toggleCameraIcon ? this.toggleCameraIcon : 'ic_switch_camera_white';

    this.takePicIcon = this.takePicIcon ? this.takePicIcon : 'ic_camera_alt_white';

    this.cameraId = this.defaultCamera === 'front' ? CAMERA_FACING_FRONT : CAMERA_FACING_BACK;

    this._onLayoutChangeListener = this._onLayoutChangeFn.bind(this);

    this._permissionListener = this._permissionListenerFn.bind(this);
    this._lastCameraOptions = [];
  }

  private isVideoEnabled() {
    return this.enableVideo === true;
  }

  private isPhotoDisabled() {
    return this.disablePhoto === true;
  }

  // @ts-ignore
  get ratio() {
    return this._camera ? this._camera.getRatio() : '4:3';
  }
  set ratio(value: string) {
    if (this._camera) {
      this._camera.setRatio(value);
    }
  }

  // @ts-ignore
  get zoom() {
    return this._camera ? this._camera.getZoom() : 0;
  }

  set zoom(value: number) {
    if (this._camera) {
      this._camera.setZoom(value);
      this.CLog('set zoom', value);
    }
  }

  // @ts-ignore
  get defaultCamera() {
    return this._defaultCamera ? this._defaultCamera : 'rear';
  }

  set defaultCamera(value: CameraTypes) {
    // console.log('set defaultCamera', value, this._defaultCamera);
    this._defaultCamera = value;
    this.cameraId = value === 'front' ? CAMERA_FACING_FRONT : CAMERA_FACING_BACK;
  }

  // @ts-ignore
  set whiteBalance(value: WhiteBalance | string) {
    if (this._camera) {
      switch (value) {
        case WhiteBalance.Cloudy:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Cloudy'));
          break;
        case WhiteBalance.Fluorescent:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Fluorescent'));
          break;
        case WhiteBalance.Incandescent:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Incandescent'));
          break;
        case WhiteBalance.Shadow:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Shadow'));
          break;
        case WhiteBalance.Sunny:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Sunny'));
          break;
        case WhiteBalance.Twilight:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Twilight'));
          break;
        case WhiteBalance.WarmFluorescent:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('WarmFluorescent'));
          break;
        default:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Auto'));
          break;
      }
    }
  }

  get whiteBalance(): WhiteBalance | string {
    if (this._camera) {
      switch (this._camera.getWhiteBalance()) {
        case io.github.triniwiz.fancycamera.WhiteBalance.Cloudy:
          return WhiteBalance.Cloudy;
        case io.github.triniwiz.fancycamera.WhiteBalance.Fluorescent:
          return WhiteBalance.Fluorescent;
        case io.github.triniwiz.fancycamera.WhiteBalance.Incandescent:
          return WhiteBalance.Incandescent;
        case io.github.triniwiz.fancycamera.WhiteBalance.Shadow:
          return WhiteBalance.Shadow;
        case io.github.triniwiz.fancycamera.WhiteBalance.Sunny:
          return WhiteBalance.Sunny;
        case io.github.triniwiz.fancycamera.WhiteBalance.Twilight:
          return WhiteBalance.Twilight;
        case io.github.triniwiz.fancycamera.WhiteBalance.WarmFluorescent:
          return WhiteBalance.WarmFluorescent;
        default:
          return WhiteBalance.Auto;
      }
    }
    return WhiteBalance.Auto;
  }

  getAvailablePictureSizes(ratio: string): string[] {
    const sizes = [];
    if (this._camera && typeof ratio === 'string') {
      const nativeSizes: any = this._camera.getAvailablePictureSizes(ratio);
      for (const size of nativeSizes) {
        sizes.push(`${size.getWidth()}x${size.getHeight()}`);
      }
    }
    // this.CLog('picture sizes available, ', sizes);
    return sizes;
  }

  getGetSupportedRatios(): string[] {
    const ratios = [];
    if (this._camera) {
      const nativeRatios: any = this._camera.getGetSupportedRatios();
      for (const ratio of nativeRatios) {
        ratios.push(ratio);
      }
    }
    return ratios;
  }

  // @ts-ignore
  set pictureSize(value: string) {
    if (this._camera) {
      this._camera.setPictureSize(value);
    }
  }

  get pictureSize(): string {
    return this._camera ? this._camera.getPictureSize() : '0x0';
  }

  get camera() {
    return this._camera;
  }
  /**
   * Create the native view
   */
  public createNativeView() {
    // create the Android RelativeLayout
    Application.android.on('activityRequestPermissions', this._permissionListener);
    this._nativeView = new android.widget.RelativeLayout(this._context);
    this._camera = new io.github.triniwiz.fancycamera.FancyCamera(this._context);
    (this._camera as any).setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT));
    this._nativeView.addView(this._camera as any);
    return this._nativeView;
  }

  private _onLayoutChangeFn(args) {
    const size = this.getActualSize();
    this.CLog('xml width/height:', size.width + 'x' + size.height);
    this._initDefaultButtons();
  }

  private _onLayoutChangeListener: any;

  private _permissionListener: any;

  private _permissionListenerFn(args) {
    if (this._camera) {
      if (this._camera.hasCameraPermission() || this._camera.hasPermission()) {
        this._camera.startPreview();
      }
    }
  }

  initNativeView() {
    let that = this;
    super.initNativeView();
    this.on(View.layoutChangedEvent, this._onLayoutChangeListener);
    const listenerImpl = (<any>io).github.triniwiz.fancycamera.CameraEventListenerUI.extend({
      owner: null,
      onReady(): void {},
      onCameraCloseUI(): void {},
      onCameraError(message: string, ex: java.lang.Exception): void {
        that.CError('listenerImpl.onCameraError:', message);
        const owner: CameraPlus = this.owner ? this.owner.get() : null;
        console.log('owner', owner);
        if (owner) {
          if (owner.isRecording) {
            console.log('isRecording during error, stopping and resetting button');
            owner.isRecording = false;
            owner.stopRecording();
          } else {
            console.log('not recording, just sending error event');
          }
          owner._lastCameraOptions.shift(); //remove the last set of options used
          that.CLog(message, null);
          owner.sendEvent(CameraPlus.errorEvent, null, message);
        } else {
          that.CError('!!! No owner reference found when handling onCameraError event');
        }
      },
      async onCameraPhotoUI(event?: java.io.File) {
        const owner = this.owner ? this.owner.get() : null;
        const file = event;
        const options: ICameraOptions = owner._lastCameraOptions.shift();
        let confirmPic;
        let confirmPicRetakeText;
        let confirmPicSaveText;
        let saveToGallery;
        let maxDimension;
        let quality;
        let shouldAutoSquareCrop = owner.autoSquareCrop;
        that.CLog('onCameraPhotoUI() got a file, saved options', options);
        const density = Utils.layout.getDisplayDensity();
        if (options) {
          //if we have options saved, use them. otherwise fall back on defaults set on plugin
          that.CLog('saved options:', options);
          confirmPic = options.confirmPhotos ? true : false;
          confirmPicRetakeText = options.confirmRetakeText ? options.confirmRetakeText : owner.confirmRetakeText;
          confirmPicSaveText = options.confirmSaveText ? options.confirmSaveText : owner.confirmSaveText;
          saveToGallery = options.saveToGallery ? true : false;
          maxDimension = options.maxDimension ? +options.maxDimension : null;
          shouldAutoSquareCrop = !!options.autoSquareCrop;
          quality = options.quality ? +options.quality : 95;
        } else {
          // otherwise, use xml property getters or their defaults
          that.CLog('Using property getters for defaults, no options.');
          confirmPic = owner.confirmPhotos;
          saveToGallery = owner.saveToGallery;
          confirmPicRetakeText = owner.confirmRetakeText;
          confirmPicSaveText = owner.confirmSaveText;
          shouldAutoSquareCrop = owner.autoSquareCrop;
          saveToGallery = owner.saveToGallery ? true : false;
          maxDimension = owner.maxDimension ? +owner.maxDimension : null;
          quality = owner.quality ? +owner.quality : 95;
        }

        if (confirmPic === true) {
          owner.sendEvent(CameraPlus.confirmScreenShownEvent);
          const result = await CamHelpers.createImageConfirmationDialog(file.getAbsolutePath(), confirmPicRetakeText, confirmPicSaveText).catch(ex => {
            that.CError('Error in createImageConfirmationDialog', ex);
          });
          owner.sendEvent(CameraPlus.confirmScreenDismissedEvent);
          // that.CLog(`confirmation result = ${result}`);
          if (result !== true) {
            // that.CLog('image denied, deleting and returning');
            file.delete();
            return;
          }
        }

        //save a copy to the app's documents folder and return path
        let outFilepath, tempFileName;
        try {
          let source = await ImageSource.fromFile(file.getAbsolutePath());
          for (let i = 1; i < 999999999; i++) {
            tempFileName = 'photo-' + i + '.jpg';
            outFilepath = path.join(knownFolders.documents().path, tempFileName);
            if (!File.exists(outFilepath)) break;
          }
          //resize for maxDimension if option set
          if (maxDimension && maxDimension > 0) source = source.resize(maxDimension);
          const saved = source.saveToFile(outFilepath, 'jpg', quality);
          if (saved) {
            owner.sendEvent(CameraPlus.photoCapturedEvent, outFilepath);
          } else {
            that.CError('ERROR saving image to file at path', outFilepath);
            owner.sendEvent(CameraPlus.errorEvent, 'ERROR saving image to file at path: ' + outFilepath);
          }
        } catch (err) {
          that.CError('ERROR saving image to file at path', outFilepath, err);
          owner.sendEvent(CameraPlus.errorEvent, err);
        }
      },
      onCameraOpenUI(): void {
        const owner = this.owner ? this.owner.get() : null;
        if (owner) {
          owner._initDefaultButtons();
          if (owner._togglingCamera) {
            owner.sendEvent(CameraPlus.toggleCameraEvent, owner.camera);
            owner._ensureCorrectFlashIcon();
            owner._togglingCamera = true;
          } else {
            owner.sendEvent(CameraPlus.cameraReadyEvent, owner.camera);
            that.CLog('Camera ready on ' + DEVICE_INFO_STRING());
          }
        }
      },
      onCameraVideoStartUI(): void {
        const owner = this.owner ? this.owner.get() : null;
        if (owner) {
          owner.isRecording = true;
          owner.sendEvent(CameraPlus.videoRecordingStartedEvent, owner.camera);
        } else {
          that.CError('!!! No owner reference found when handling onCameraVideoUI event');
        }
      },
      onCameraVideoUI(event?: java.io.File): void {
        const owner = this.owner ? this.owner.get() : null;
        if (owner) {
          owner.sendEvent(CameraPlus.videoRecordingReadyEvent, event.getAbsolutePath());
          // this.CLog(`Recording complete`);
          owner.isRecording = false;
        } else {
          that.CError('!!! No owner reference found when handling onCameraVideoUI event');
        }
      },
    });
    const listener = new listenerImpl();
    listener.owner = new WeakRef(this);
    this._camera.setListener(listener);
    this.cameraId = this._cameraId;
    this.CLog('initNativeView()');
    this.enableVideo = this.isVideoEnabled();
    this.CLog('video enabled:', this.isVideoEnabled());
    this.disablePhoto = this.isPhotoDisabled();
    this.CLog('photo disabled:', this.isPhotoDisabled());
  }

  disposeNativeView() {
    this.CLog('disposeNativeView.');
    this.off(View.layoutChangedEvent, this._onLayoutChangeListener);
    Application.android.off('activityRequestPermissions', this._permissionListener);
    this.releaseCamera();
    super.disposeNativeView();
  }

  get cameraId() {
    return this._cameraId;
  }

  set cameraId(id: any) {
    this.CLog('set cameraID() id:', id, io.github.triniwiz.fancycamera.CameraPosition.valueOf('BACK'));
    if (this._camera) {
      switch (id) {
        case CAMERA_FACING_FRONT:
          this._camera.setPosition(io.github.triniwiz.fancycamera.CameraPosition.valueOf('FRONT'));
          this._cameraId = CAMERA_FACING_FRONT;
          break;
        default:
          this._camera.setPosition(io.github.triniwiz.fancycamera.CameraPosition.valueOf('BACK'));
          this._cameraId = CAMERA_FACING_BACK;
          break;
      }
    }
    this._cameraId = id;
  }
  /**
   * Takes a picture with from the camera preview.
   */
  public takePicture(options?: ICameraOptions): void {
    if (this._camera) {
      // Use options if passed, otherwise use the current values set on plugin via XML or code,
      //   or fall back on plugin defaults if no properties set by user before now.
      options = {
        confirmPhotos: options?.confirmPhotos ? options.confirmPhotos : this.confirmPhotos,
        confirmRetakeText: options?.confirmRetakeText ? options.confirmRetakeText : this.confirmRetakeText,
        confirmSaveText: options?.confirmSaveText ? options.confirmSaveText : this.confirmSaveText,
        saveToGallery: options?.saveToGallery ? options.saveToGallery : this._camera.getSaveToGallery(),
        maxDimension: options?.maxDimension ? +options.maxDimension : this.maxDimension,
        autoSquareCrop: options?.autoSquareCrop ? options.autoSquareCrop : this._camera.getAutoSquareCrop(),
        quality: options?.quality ? +options.quality : this.quality,
      };
      this.CLog('takePicture() options:', JSON.stringify(options));
      //these two options need to be set on native side
      this._camera.setSaveToGallery(!!options.saveToGallery);
      this._camera.setAutoSquareCrop(!!options.autoSquareCrop);
      //the rest of the options are used on NS side: confirmPhotos, confirmRetakeText, confirmSaveText, maxDimention and quality
      this._lastCameraOptions.push(options); //save these options for NS side to refer to once a photo file is returned from native code
      this._camera.takePhoto();
    }
  }

  private releaseCamera() {
    if (this._camera) {
      this.CLog('releaseCamera()');
      this._camera.release();
    }
  }

  // @ts-ignore
  public get autoFocus(): boolean {
    return this._camera ? this._camera.getAutoFocus() : false;
  }
  public set autoFocus(focus: boolean) {
    if (this._camera) {
      this._camera.setAutoFocus(focus);
    }
  }

  _togglingCamera = false;
  /**
   * Toggle the opened camera. Only supported on devices with multiple cameras.
   */
  public toggleCamera() {
    if (this._camera) {
      this._togglingCamera = true;
      this._camera.toggleCamera();
      const camNumber = this.getNumberOfCameras();
      if (camNumber <= 1) {
        this.CLog(`Android Device has ${camNumber} camera.`);
        return;
      }
      this.sendEvent(CameraPlus.toggleCameraEvent, this.camera);
      // need to check flash mode when toggling...
      // front cam may not have flash - and just ensure the correct icon shows
      this._ensureCorrectFlashIcon();
      // try to set focus mode when camera gets toggled
      this._ensureFocusMode();
    }
  }

  public async record(options?: IVideoOptions) {
    // options = options || {
    //   disableHEVC: true,
    //   saveToGallery: true,
    //   videoQuality: CameraVideoQuality.MAX_720P,
    // };
    options = {
      saveToGallery: options?.saveToGallery ? options.saveToGallery : this._camera.getSaveToGallery(),
      videoQuality: options?.videoQuality ? options.videoQuality : this.videoQuality,
      videoHeight: options?.videoHeight ? options.videoHeight : this.videoHeight,
      videoWidth: options?.videoWidth ? options.videoWidth : this.videoWidth,
      disableHEVC: options?.disableHEVC ? options.disableHEVC : this.disableHEVC,
      //if these options are not specified, -1 will let Android select based on requested videoQuality
      androidMaxVideoBitRate: options?.androidMaxVideoBitRate ? options.androidMaxVideoBitRate : -1,
      androidMaxFrameRate: options?.androidMaxFrameRate ? options.androidMaxFrameRate : -1,
      androidMaxAudioBitRate: options?.androidMaxAudioBitRate ? options.androidMaxAudioBitRate : -1,
    };
    this.CLog('android.ts record()', options);
    console.log('shouldLockRotation', this.shouldLockRotation);
    if (this._camera) {
      this._camera.setDisableHEVC(!!options.disableHEVC);
      this._camera.setSaveToGallery(!!options.saveToGallery);
      console.log('setting videoQuality based on option', options.videoQuality);
      switch (options.videoQuality) {
        case CameraVideoQuality.HIGHEST:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('HIGHEST'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('HIGHEST'));
          break;
        case CameraVideoQuality.LOWEST:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('LOWEST'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('LOWEST'));
          break;
        case CameraVideoQuality.MAX_2160P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_2160P'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('MAX_2160P'));
          break;
        case CameraVideoQuality.MAX_1080P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_1080P'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('MAX_1080P'));
          break;
        case CameraVideoQuality.MAX_720P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
          break;
        case CameraVideoQuality.QVGA:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('QVGA'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('QVGA'));
          break;
        default:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
          console.log('Set quality ', io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
          break;
      }
      // -1 uses profile value;
      this._camera.setMaxAudioBitRate(options.androidMaxAudioBitRate || -1);
      this._camera.setMaxVideoBitrate(options.androidMaxVideoBitRate || -1);
      this._camera.setMaxVideoFrameRate(options.androidMaxFrameRate || -1);
      if (this.shouldLockRotation) {
        console.log('shouldLockRotation true, locking rotation during recording');
        this.disableRotationAndroid();
      }
      const takePicDrawable = CamHelpers.getImageDrawable(this.stopVideoIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      this._camera.startRecording();
    }
  }

  /**
   * Stop recording video
   */
  public stop(): void {
    this.stopRecording();
  }

  public stopRecording() {
    if (this._camera) {
      this.CLog(`*** stopping mediaRecorder ***`);
      const takePicDrawable = CamHelpers.getImageDrawable(this.takeVideoIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      this._camera.stopRecording();
      if (this.shouldLockRotation) {
        console.log('shouldLockRotation true, unlocking rotation after recording');
        this.enableRotationAndroid();
      }
    } else {
      this.CError("NO camera instance attached, can't stop recording!");
    }
  }

  /**
   * Toggles the flash mode of the camera.
   */

  public toggleFlash() {
    if (this._camera) {
      // @ts-ignore
      this._camera.toggleFlash();
    }
  }

  /**
   * Gets current camera selection
   */
  public getCurrentCamera(): 'front' | 'rear' {
    if (!this._camera) return 'rear';
    switch (this._camera.getPosition()) {
      case io.github.triniwiz.fancycamera.CameraPosition.valueOf('FRONT'):
        // this.CLog('getCurrentCamera() front');
        return 'front';
      default:
        // this.CLog('getCurrentCamera() rear');
        return 'rear';
    }
  }

  /**
   * Check if the device has a camera
   */
  public isCameraAvailable() {
    if (Utils.ad.getApplicationContext().getPackageManager().hasSystemFeature('android.hardware.camera')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns number of cameras on device
   */
  public getNumberOfCameras(): number {
    if (!this._camera) return 0;
    return this._camera.getNumberOfCameras();
  }

  /**
   * Check if device has flash modes
   * @param camera
   */
  public hasFlash() {
    if (!this._camera) {
      return false;
    }
    return this._camera.getHasFlash();
  }

  /**
   * Return the current flash mode of the device. Will return null if the flash mode is not supported by device.
   */
  public getFlashMode() {
    if (this.hasFlash()) {
      this.CLog('getFlashMode() ', this._camera.getFlashMode());
      if (this._camera.getFlashMode() !== io.github.triniwiz.fancycamera.CameraFlashMode.valueOf('OFF')) {
        return 'on';
      }
      return 'off';
    }
    return null;
  }

  /**
   * Helper method to ensure the correct icon (on/off) is shown on flash.
   * Useful when toggling cameras.
   */
  _ensureCorrectFlashIcon() {
    // get current flash mode and set correct image drawable
    const currentFlashMode = this.getFlashMode();
    // this.CLog('_ensureCorrectFlashIcon flash mode', currentFlashMode);

    // if the flash mode is null then we need to remove the button from the parent layout
    if (currentFlashMode === null) {
      // if we have the button - remove it from parent
      if (this._flashBtn) {
        this._flashBtn.setVisibility(android.view.View.GONE);
      }
      return;
    }

    // ensure flashBtn is here - if currentFlashMode is null then don't show/assign the flash button
    if (this._flashBtn === undefined || this._flashBtn === null) {
      return;
    }

    // make sure we have our flash icon button visible - sometimes toggling might set to GONE
    this._flashBtn.setVisibility(android.view.View.VISIBLE);

    // reset the image in the button first
    this._flashBtn.setImageResource((android as any).R.color.transparent);

    const flashIcon = currentFlashMode === FLASH_MODE_OFF ? this.flashOffIcon : this.flashOnIcon;
    // this.CLog('flash icon is now ', flashIcon, 'off icon is ', this.flashOffIcon);
    const imageDrawable = CamHelpers.getImageDrawable(flashIcon);
    this._flashBtn.setImageResource(imageDrawable);
  }

  private _ensureFocusMode() {
    // setup autoFocus if possible
  }

  private _initFlashButton() {
    this._flashBtn = CamHelpers.createImageButton();
    // set correct flash icon on button
    this._ensureCorrectFlashIcon();
    const shape = CamHelpers.createTransparentCircleDrawable();
    this._flashBtn.setBackgroundDrawable(shape);
    const ref = new WeakRef(this);
    this._flashBtn.setOnClickListener(
      new android.view.View.OnClickListener({
        onClick: args => {
          const owner = ref.get();
          if (owner) {
            owner.toggleFlash();
            owner._ensureCorrectFlashIcon();
          }
        },
      })
    );
    const flashParams = new android.widget.RelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
    if (this.insetButtons === true) {
      // this.CLog('insetButtons set to true, adjusting flash button layout');
      // need to get the width of the screen
      const layoutWidth = this._nativeView.getWidth();
      // this.CLog(`layoutWidth = ${layoutWidth}`);
      const xMargin = layoutWidth * this.insetButtonsPercent;
      const layoutHeight = this._nativeView.getHeight();
      // this.CLog(`layoutHeight = ${layoutHeight}`);
      const yMargin = layoutHeight * this.insetButtonsPercent;
      // add margin to left and top where the button is positioned
      flashParams.setMargins(xMargin, yMargin, 8, 8);
    } else {
      flashParams.setMargins(8, 8, 8, 8);
    }
    flashParams.addRule(ALIGN_PARENT_TOP);
    flashParams.addRule(ALIGN_PARENT_LEFT);
    this._nativeView.addView(this._flashBtn, flashParams);
  }

  private _initToggleCameraButton() {
    this._toggleCamBtn = CamHelpers.createImageButton();
    const switchCameraDrawable = CamHelpers.getImageDrawable(this.toggleCameraIcon);
    this._toggleCamBtn.setImageResource(switchCameraDrawable);
    const shape = CamHelpers.createTransparentCircleDrawable();
    this._toggleCamBtn.setBackgroundDrawable(shape);
    const ref = new WeakRef(this);
    this._toggleCamBtn.setOnClickListener(
      new android.view.View.OnClickListener({
        onClick: (view: android.view.View) => {
          const owner = ref.get();
          if (owner) {
            owner.toggleCamera();
          }
        },
      })
    );

    const toggleCamParams = new android.widget.RelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
    if (this.insetButtons === true) {
      // this.CLog('insetButtons set to true, adjusting camtoggle button layout');
      const layoutWidth = this._nativeView.getWidth();
      // this.CLog(`layoutWidth = ${layoutWidth}`);
      const xMargin = layoutWidth * this.insetButtonsPercent;
      const layoutHeight = this._nativeView.getHeight();
      // this.CLog(`layoutHeight = ${layoutHeight}`);
      const yMargin = layoutHeight * this.insetButtonsPercent;
      toggleCamParams.setMargins(8, yMargin, xMargin, 8);
    } else {
      toggleCamParams.setMargins(8, 8, 8, 8);
    }
    toggleCamParams.addRule(ALIGN_PARENT_TOP);
    toggleCamParams.addRule(ALIGN_PARENT_RIGHT);
    this._nativeView.addView(this._toggleCamBtn, toggleCamParams);
  }

  private _initTakePicButton() {
    // this._takePicBtn = CamHelpers.createImageButton();

    if (this.enableVideo) {
      //video mode show a circle icon
      this._takePicBtn = new android.widget.ImageButton(Application.android.context) as android.widget.ImageButton;
      this._takePicBtn.setMaxHeight(48);
      this._takePicBtn.setMaxWidth(48);
      const takePicDrawable = CamHelpers.getImageDrawable(this.takeVideoIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      const shape = new android.graphics.drawable.GradientDrawable();
      shape.setColor(0x99000000);
      shape.setCornerRadius(96);
      shape.setAlpha(0);
      this._takePicBtn.setBackgroundDrawable(shape);
    } else {
      //if we're in camera photo mode, show the takePhoto icon
      this._takePicBtn = CamHelpers.createImageButton();
      const takePicDrawable = CamHelpers.getImageDrawable(this.takePicIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      const shape = CamHelpers.createTransparentCircleDrawable();
      this._takePicBtn.setBackgroundDrawable(shape); // set the transparent background
    }

    const ref = new WeakRef(this);

    this._takePicBtn.setOnTouchListener(
      new android.view.View.OnTouchListener({
        onTouch: (argsView: android.view.View, pEvent: android.view.MotionEvent) => {
          // this.CLog(`_initTakePicButton OnClickListener()`);
          // this.CLog('action:', pEvent.getAction());
          const owner = ref.get();
          if (this.enableVideo) {
            //Video recording
            // this.CLog('video mode handling');
            //check if we're currently doing a long click for snapchat style recording UI
            if (pEvent.getAction() == android.view.MotionEvent.ACTION_UP) {
              if (this.isButtonLongPressed) {
                //Note: if scrollview moves with this view inside, this will trigger false positives
                // this.CLog('long press released, stopping video and setting isButtonLongPressed to false');
                this.isButtonLongPressed = false;
                this.stop();
                owner.isRecording = false;
                // const takePicDrawable = CamHelpers.getImageDrawable(this.takeVideoIcon);
                // this._takePicBtn.setImageResource(takePicDrawable); // set the icon
                return false;
              } else {
                // this.CLog('not an Action_up ignoring', pEvent.getAction());
                return true;
              }
            } else if (pEvent.getAction() == android.view.MotionEvent.ACTION_DOWN) {
              if (!this.isButtonLongPressed && !owner.isRecording) {
                // this.CLog('Video enabled, starting recording');
                owner.isRecording = true;
                this.record();
                // const takePicDrawable = CamHelpers.getImageDrawable(this.stopVideoIcon);
                // this._takePicBtn.setImageResource(takePicDrawable); // set the icon
              }
            }
          } else if (!this.disablePhoto) {
            //Photo Capture
            if (!this.isButtonLongPressed && pEvent.getAction() == android.view.MotionEvent.ACTION_DOWN) {
              // this.CLog('Photo enabled, taking pic on ACTION_DOWN');
              if (owner) {
                this.CLog('_initTakePicButton() calling takePicture without options');
                owner.takePicture();
              }
            } //else this.CLog('Ignoring action');
          } else {
            // console.warn('neither photo or video enabled, ignoring tap');
          }
          return false;
        },
      })
    );

    this._takePicBtn.setOnLongClickListener(
      new android.view.View.OnLongClickListener({
        onLongClick: (argsView: android.view.View) => {
          // this.CLog(`_initTakePicButton OnLongClickListener()`);
          if (this.enableVideo) {
            // this.CLog('recordVideo mode, setting isButtonLongPressed flag');
            this.isButtonLongPressed = true;
          } //else this.CLog('no long click support for photo/preview mode');
          return false;
        },
      })
    );

    const takePicParams = new android.widget.RelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
    if (this.insetButtons === true) {
      // this.CLog('insetButtons set to true, adjusting camera button layout');
      const layoutHeight = this._nativeView.getHeight();
      // this.CLog(`layoutHeight = ${layoutHeight}`);
      const yMargin = layoutHeight * this.insetButtonsPercent;
      takePicParams.setMargins(8, 8, 8, yMargin);
    } else {
      takePicParams.setMargins(8, 8, 8, 8);
    }
    takePicParams.addRule(ALIGN_PARENT_BOTTOM);
    takePicParams.addRule(CENTER_HORIZONTAL);
    this._nativeView.addView(this._takePicBtn, takePicParams);
  }

  /**
   * Creates the default buttons depending on the options to show the various default buttons.
   */
  private _initDefaultButtons() {
    try {
      // flash button setup - if the device doesn't support flash do not setup/show this button
      if (this.showFlashIcon === true && this.getFlashMode() !== null && this._flashBtn === null) {
        this._initFlashButton();
      }

      // camera toggle button setup
      if (this.showToggleIcon === true && this.getNumberOfCameras() > 1 && this._toggleCamBtn === null) {
        this._initToggleCameraButton();
      }

      // take picture button setup
      if (this.showCaptureIcon === true && this._takePicBtn === null) {
        if (this.showFlashIcon === true && this.getFlashMode() !== null && this._flashBtn === null) {
          this._initFlashButton();
        }

        // camera toggle button setup
        if (this.showToggleIcon === true && this.getNumberOfCameras() > 1 && this._toggleCamBtn === null) {
          this._initToggleCameraButton();
        }

        // take picture button setup
        if (this.showCaptureIcon === true && this._takePicBtn === null) {
          this._initTakePicButton();
        }
      }
    } catch (ex) {
      this.CError('_initDefaultButtons error', ex);
    }
  }

  /**
   * @function enableRotation
   */
  private enableRotationAndroid(): void {
    if (!Application.android || !Application.android.foregroundActivity) {
      setTimeout(this.enableRotationAndroid, 100);
      return;
    }

    const activity = Application.android.foregroundActivity;
    activity.setRequestedOrientation(13);
  }

  /**
   * @function disableRotation
   */
  private disableRotationAndroid(disallowPlayerOverride: boolean = false): void {
    if (!Application.android || !Application.android.foregroundActivity) {
      setTimeout(this.disableRotationAndroid, 100);
      return;
    }

    const activity = Application.android.foregroundActivity;
    activity.setRequestedOrientation(14); // SCREEN_ORIENTATION_LOCKED = 14
  }

  /*
   * Merge an array of video filenames, must all be valid mp4 format video files with same audio encoding
   */
  public mergeVideoFiles(inputFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      //Note: This will only merge video tracks from  mp4 files, and only succeed if all input have same audio and video format/encoding
      //MediaMuxer support for multiple audio/video tracks only on API 26+ only
      if (+Device.sdkVersion < 26) {
        this.CError('This is only supported on API 26+');
        return reject('This is only supported on API 26+');
      }
      if (!inputFiles || inputFiles.length <= 0) return reject('inputFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');
      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          this.CError('Unable to remove file!', err);
          return reject('Unable to remove file!' + err.message);
        });
      }
      if (inputFiles.length == 1) {
        let fileData = File.fromPath(inputFiles[0]).readSync();
        File.fromPath(outputPath).writeSync(fileData);
        return resolve(File.fromPath(outputPath));
      }

      // Create the MediaMuxer and specify the output file
      const muxer = new android.media.MediaMuxer(outputPath, android.media.MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
      const MAX_SAMPLE_SIZE = 1024 * 1024;
      const APPEND_DELAY = 200; //we add a little delay between segments to make segmentation a little more obvious
      var totalDuration = 0;
      var audioFormat: android.media.MediaFormat = null;
      var videoFormat: android.media.MediaFormat = null;
      var audioTrackIndex = -1;
      var videoTrackIndex = -1;
      var outRotation = 0;
      try {
        let muxerStarted: Boolean = false;
        for (let i = 0; i < inputFiles.length; i++) {
          // this.CLog('\n\nProcessing file', inputFiles[i], 'index', i);
          let mediadata = new android.media.MediaMetadataRetriever();
          mediadata.setDataSource(inputFiles[i]);
          var trackDuration = 0;
          try {
            trackDuration = +mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_DURATION);
            // this.CLog('trackDuration ', trackDuration); //returned in milliseconds
            let orientation = mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_ROTATION);
            outRotation = +orientation;
            // this.CLog('orientation:', orientation);
          } catch (err) {
            this.CError('Unable to extract trackDuration from metadata!');
          }

          //find video format and select the video track to read from later
          let videoExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
          videoExtractor.setDataSource(inputFiles[i]);
          let videoTracks = videoExtractor.getTrackCount();

          for (let j = 0; j < videoTracks; j++) {
            let mf = videoExtractor.getTrackFormat(j);
            let mime = mf.getString(android.media.MediaFormat.KEY_MIME);
            if (mime.startsWith('video/')) {
              videoExtractor.selectTrack(j);
              if (!videoFormat) {
                videoFormat = videoExtractor.getTrackFormat(j);
                // this.CLog('found a video format', videoFormat);
              }
              break;
            }
          }
          //TODO: check that all other segment formats match first segment

          //find audio format and select the audio track to read from later
          let audioExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
          audioExtractor.setDataSource(inputFiles[i]);
          let audioTracks = audioExtractor.getTrackCount();

          for (let j = 0; j < audioTracks; j++) {
            let mf = audioExtractor.getTrackFormat(j);
            let mime = mf.getString(android.media.MediaFormat.KEY_MIME);
            if (mime.startsWith('audio/')) {
              audioExtractor.selectTrack(j);
              if (!audioFormat) {
                audioFormat = audioExtractor.getTrackFormat(j);
                // this.CLog('found an audio format', audioFormat);
              }
              break;
            }
          }

          if (audioTrackIndex == -1) {
            audioTrackIndex = muxer.addTrack(audioFormat);
            // this.CLog('added an audio track to muxer');
          }
          if (videoTrackIndex == -1) {
            videoTrackIndex = muxer.addTrack(videoFormat);
            // this.CLog('added a video track to muxer');
          }
          videoExtractor.seekTo(0, android.media.MediaExtractor.SEEK_TO_CLOSEST_SYNC);
          audioExtractor.seekTo(0, android.media.MediaExtractor.SEEK_TO_CLOSEST_SYNC);

          // this.CLog('audioTrackIndex', audioTrackIndex, 'videoTrackIndex', videoTrackIndex);
          let sawEOS = false;
          let sawAudioEOS = false;
          let bufferSize = MAX_SAMPLE_SIZE;
          let audioBuf = java.nio.ByteBuffer.allocate(bufferSize);
          let videoBuf = java.nio.ByteBuffer.allocate(bufferSize);
          let offset = 100;
          let videoBufferInfo: android.media.MediaCodec.BufferInfo = new android.media.MediaCodec.BufferInfo();
          let audioBufferInfo: android.media.MediaCodec.BufferInfo = new android.media.MediaCodec.BufferInfo();

          // start muxer if not started yet
          if (!muxerStarted) {
            // this.CLog('Starting muxer after setting rotation', outRotation);
            muxer.setOrientationHint(outRotation); //ensure merged video has same orientation as inputs
            muxer.start();
            muxerStarted = true;
          }
          //add file data
          //write video
          // this.CLog('sawEOS', sawEOS, 'sawAudioEOS', sawAudioEOS);
          while (!sawEOS) {
            let videoSize = videoExtractor.readSampleData(videoBuf, offset);
            // this.CLog('read video buffer size', videoSize);
            if (videoSize < 0) {
              // this.CLog('no more buffer left, done with video');
              sawEOS = true;
            } else {
              //trying to set properties directly on BufferInfo objects doesn't work, need to use the set function
              videoBufferInfo.set(offset, videoSize, videoExtractor.getSampleTime() + totalDuration * 1000 + APPEND_DELAY, android.media.MediaCodec.BUFFER_FLAG_KEY_FRAME);
              // this.CLog('videoBufferInfo data', videoBufferInfo.offset, videoBufferInfo.size, videoBufferInfo.presentationTimeUs, videoBufferInfo.flags);
              muxer.writeSampleData(videoTrackIndex, videoBuf, videoBufferInfo);
              videoExtractor.advance();
            }
          }

          //write audio
          while (!sawAudioEOS) {
            let audioSize = audioExtractor.readSampleData(audioBuf, offset);
            if (audioSize < 0) {
              // this.CLog('no more buffer left, done with audio');
              sawAudioEOS = true;
            } else {
              audioBufferInfo.set(offset, audioSize, audioExtractor.getSampleTime() + totalDuration * 1000 + APPEND_DELAY, android.media.MediaCodec.BUFFER_FLAG_KEY_FRAME);
              // this.CLog('audioBufferInfo data', audioBufferInfo.offset, audioBufferInfo.size, audioBufferInfo.presentationTimeUs, audioBufferInfo.flags);
              muxer.writeSampleData(audioTrackIndex, audioBuf, audioBufferInfo);
              audioExtractor.advance();
            }
          }

          mediadata.release();
          mediadata = null;
          videoBufferInfo = audioBufferInfo = null;
          audioBuf = videoBuf = null;
          videoExtractor.release();
          videoExtractor = null;
          audioExtractor.release();
          audioExtractor = null;
          totalDuration += trackDuration;
          Utils.GC();
          // this.CLog('\ntotalDuration (ms) => ', totalDuration);
        }
        // this.CLog('done merging input files');
        // this.CLog(' stopping muxer');
        muxer.stop();
        // this.CLog('releasing muxer');
        muxer.release();
        this.CLog('finished merging video segments into ', outputPath);
        return resolve(File.fromPath(outputPath));
      } catch (err) {
        this.CError(err, err.message);
        return reject('Error during merge: ' + err.message);
      }
    });
  }
}
