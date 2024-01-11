/**********************************************************************************
  2017, nStudio, LLC & LiveShopper, LLC
  2023, VoiceThread - Angel Dominguez
 **********************************************************************************/

import { ContentView, File } from '@nativescript/core';
import { CameraPlus as CameraPlusDefinition } from '.';

export class CameraUtil {
  public static debug: boolean = false;
}

export const CLog = (...args) => {
  if (CameraUtil.debug) {
    console.log('NSCamera ---', args);
  }
};

export const CError = (...args) => {
  if (CameraUtil.debug) {
    console.error('NSCamera ---', args);
  }
};

export type CameraTypes = 'front' | 'rear';

export abstract class CameraPlusBase extends ContentView implements CameraPlusDefinition {
  @GetSetPropertyDebug()
  public debug: boolean = false;

  /**
   * Video Support (off by default)
   * defined statically due to necessity to set this very early before constructor
   * users should set this in a component constructor before their view creates the component
   * and can reset it before different using in different views if they want to go back/forth
   * between photo/camera and video/camera
   */
  public static enableVideo: boolean = false;

  public static disablePhoto: boolean = false;

  /**
   * Default camera: must be set early before constructor to default the camera correctly on launch (default to rear)
   */
  public static defaultCamera: CameraTypes = 'rear';

  /*
   * String value for hooking into the errorEvent. This event fires when an error is emitted from CameraPlus.
   */
  public static errorEvent = 'errorEvent';

  /**
   * String value for hooking into the photoCapturedEvent. This event fires when a photo is taken.
   */
  public static photoCapturedEvent = 'photoCapturedEvent';

  /**
   * String value for hooking into the toggleCameraEvent. This event fires when the device camera is toggled.
   */
  public static toggleCameraEvent = 'toggleCameraEvent';

  /**
   * String value when hooking into the videoRecordingStartedEvent. This event fires when video starts recording.
   */
  public static videoRecordingStartedEvent = 'videoRecordingStartedEvent';

  /**
   * String value when hooking into the videoRecordingFinishedEvent. This event fires when video stops recording but has not processed yet.
   */
  public static videoRecordingFinishedEvent = 'videoRecordingFinishedEvent';

  /**
   * String value when hooking into the videoRecordingReadyEvent. This event fires when video has completed processing and is ready to be used.
   */
  public static videoRecordingReadyEvent = 'videoRecordingReadyEvent';

  /**
   * String value for hooking into the cameraReadyEvent. This event fires when the native camera is done initializing.
   */
  public static cameraReadyEvent = 'cameraReadyEvent';
  /**
   * String value when hooking into the confirmScreenShownEvent. This event fires when the picture confirm dialog is shown.
   */
  public static confirmScreenShownEvent = 'confirmScreenShownEvent';

  /**
   * String value when hooking into the confirmScreenDismissedEvent. This event fires when the picture confirm dialog is dismissed either by Retake or Save button.
   */
  public static confirmScreenDismissedEvent = 'confirmScreenDismissedEvent';

  /**
   * @default 4:3
   * *ANDROID ONLY*  A string to represent the camera preview aspect ratio e.g 4:3, 1:1 ,16:9 to check if the device supports the ratio use {@link getGetSupportedRatios}
   */
  @GetSetProperty()
  public ratio: string;

  /**
   *  *ANDROID ONLY*  Camera zoom uses a float 0 - 1.
   *  0 being no zoom
   *  1 being max zoom
   */
  @GetSetProperty()
  public zoom: number = 0;

  /**
   *  *ANDROID ONLY* Camera white balance
   */
  @GetSetProperty()
  public whiteBalance: WhiteBalance | string = WhiteBalance.Auto;

  /**
   *  *ANDROID ONLY* A string representing the size of picture {@link takePicture} will output. Available sizes can be fetched using {@link getAvailablePictureSizes}
   */
  @GetSetProperty()
  public pictureSize: string = '768x1024';

  /**
   * @param ratio string
   * @returns returns an array of supported picture sizes supported by the current camera
   */
  getAvailablePictureSizes(ratio: string): string[] {
    return [];
  }

  /**
   * @returns retuns an array of strings representing the preview sizes supported by the current device.
   */
  getGetSupportedRatios(): string[] {
    return [];
  }

  /**
   * If true the default take picture event will present a confirmation dialog. Default is false.
   */
  @GetSetProperty()
  public confirmPhotos: boolean = false;

  /**
   * When confirming capture this text will be presented to the user to retake the photo. Default is 'Retake'
   */
  @GetSetProperty()
  public confirmRetakeText?: string;

  /**
   * When confirming capture this text will be presented to the user to save the photo. Default is 'Save'
   */
  @GetSetProperty()
  public confirmSaveText?: string;

  /**
   * If true the default videorecordingready event will present a confirmation dialog. Default is false.
   */
  //TODO: not supported yet
  // @GetSetProperty()
  // public confirmVideo: boolean = false;

  /**
   * If true locks rotation while recording video. Default is true
   */
  @GetSetProperty()
  public shouldLockRotation: boolean = true;

  /**
   * If true the default take picture event will save to device gallery. Default is true.
   */
  @GetSetProperty()
  public saveToGallery: boolean = true;

  /**
   * Quality is a number between 1-100 that is used when saving the image as a JPEG before the File reference is returned by plugin
   * NOTE: this only applies to photos, videos not supported yet
   */
  @GetSetProperty()
  public quality: number = 95;

  /**
   * Maximum dimension among width/height to use for the saved photo image.
   * NOTE: this only applies to photos, videos not supported yet
   */
  @GetSetProperty()
  public maxDimension: number;

  /**
   * If true the default flash toggle icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty()
  public showFlashIcon: boolean = true;

  /**
   * If true the default camera toggle (front/back) icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty()
  public showToggleIcon: boolean = true;

  /**
   * If true the default capture (take picture) icon/button will show on the Camera Plus layout. Default is true.
   */
  @GetSetProperty()
  public showCaptureIcon: boolean = true;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is on (enabled).
   */
  @GetSetProperty()
  public flashOnIcon: string = '';

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  @GetSetProperty()
  public flashOffIcon: string = '';

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  @GetSetProperty()
  public toggleCameraIcon: string = '';

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Capture button icon.
   */
  @GetSetProperty()
  public takePicIcon: string = '';

  /**
   * *ANDROID ONLY* - If true the camera will auto focus to capture the image. Default is true.
   */
  @GetSetProperty()
  public autoFocus: boolean = true;

  /**
   * *iOS ONLY* - Enable/disable double tap gesture to switch camera. (enabled)
   */
  @GetSetProperty()
  public doubleTapCameraSwitch: boolean = true;

  /** If true it will crop the picture to the center square **/
  @GetSetProperty()
  public autoSquareCrop: boolean = false;

  /**
   * Toggles the device camera (front/back).
   */
  toggleCamera(): void {}

  /**
   * Toggles the active camera flash mode.
   */
  toggleFlash(): void {}

  /**
   * Gets the flash mode
   * Android: various strings possible
   * iOS: only 'on' or 'off'
   */
  getFlashMode(): string {
    return null;
  }

  /**
   * Takes a picture of the current preview of the CameraPlus.
   */
  abstract takePicture(options?: ICameraOptions): void;

  /**
   * Start recording video
   * @param options IVideoOptions
   */
  abstract record(options?: IVideoOptions): Promise<void>;

  /**
   * Stop recording video
   */
  abstract stop(): void;

  /*
   * Merge an array of video filenames, must all be valid mp4 format video files with same audio encoding
   */
  abstract mergeVideoFiles(audioFiles: string[], outputPath: string): Promise<File>;

  /**
   * Returns true if the device has at least one camera.
   */
  isCameraAvailable(): boolean {
    return false;
  }

  /**
   * Returns current camera <front | rear>
   */
  getCurrentCamera(): 'rear' | 'front' {
    return 'rear';
  }

  /**
   * * ANDROID ONLY * - Gets the number of cameras on a device.
   */
  getNumberOfCameras(): number {
    return 0;
  }

  /**
   * * ANDROID ONLY * - Returns true if the current camera has a flash mode.
   */
  hasFlash(): boolean {
    return false;
  }

  /**
   * Notify events by name and optionally pass data
   */
  public sendEvent(eventName: string, data?: any, msg?: string) {
    this.notify({
      eventName,
      object: this,
      data,
      message: msg,
    });
  }
}

export interface ICameraOptions {
  confirm?: boolean;
  saveToGallery?: boolean;
  quality?: number;
  maxDimension?: number;
  autoSquareCrop?: boolean;
  confirmRetakeText?: string;
  confirmSaveText?: string;
}

export interface ICameraPlusEvents {
  photoCapturedEvent: any;
  toggleCameraEvent: any;
  imagesSelectedEvent: any;
  videoRecordingStartedEvent: any;
  videoRecordingFinishedEvent: any;
  videoRecordingReadyEvent: any;
  cameraReadyEvent: any;
  confirmScreenShownEvent: any;
  confirmScreenDismissedEvent: any;
}

export enum CameraVideoQuality {
  MAX_480P = '480p',
  MAX_720P = '720p',
  MAX_1080P = '1080p',
  MAX_2160P = '2160p',
  HIGHEST = 'highest',
  LOWEST = 'lowest',
  QVGA = 'qvga',
}

export interface IVideoOptions {
  quality?: CameraVideoQuality;
  confirm?: boolean;
  saveToGallery?: boolean;
  height?: number;
  width?: number;
  disableHEVC?: boolean;
  androidMaxVideoBitRate?: number;
  androidMaxFrameRate?: number;
  androidMaxAudioBitRate?: number;
}

export enum WhiteBalance {
  Auto = 'auto',
  Sunny = 'sunny',
  Cloudy = 'cloudy',
  Shadow = 'shadow',
  Twilight = 'twilight',
  Fluorescent = 'fluorescent',
  Incandescent = 'incandescent',
  WarmFluorescent = 'warm-fluorescent',
}

export function GetSetProperty() {
  return (target, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this['_' + propertyKey];
      },
      set: function (value) {
        if (this['_' + propertyKey] === value) {
          return;
        }
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        this['_' + propertyKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

export function GetSetPropertyDebug() {
  return (target, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this['_' + propertyKey];
      },
      set: function (value) {
        if (this['_' + propertyKey] === value) {
          return;
        }
        if (value === 'true') {
          value = true;
          CameraUtil.debug = true;
        } else if (value === 'false') {
          value = false;
          CameraUtil.debug = false;
        }
        this['_' + propertyKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
