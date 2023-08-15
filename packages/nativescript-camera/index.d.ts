import { ContentView } from 'tns-core-modules/ui/content-view';

export declare class CameraPlus extends ContentView {
  events: ICameraPlusEvents;

  /**
   * Video Support (off by default)
   * defined statically due to necessity to set this very early before constructor
   * users should set this in a component constructor before their view creates the component
   * and can reset it before different using in different views if they want to go back/forth
   * between photo/camera and video/camera
   */
  public static enableVideo: boolean;

  /**
   * Default camera: must be set early before constructor to default the camera correctly on launch (default to 'rear')
   */
  public static defaultCamera: 'front' | 'rear';

  /**
   * String value for hooking into the errorEvent. This event fires when an error is emitted from Camera Plus.
   */
  public static errorEvent: string;

  /**
   * String value for hooking into the photoCapturedEvent. This event fires when a photo is taken.
   */
  public static photoCapturedEvent: string;

  /**
   * String value for hooking into the toggleCameraEvent. This event fires when the device camera is toggled.
   */
  public static toggleCameraEvent: string;

  /**
   * String value when hooking into the videoRecordingStartedEvent. This event fires when video starts recording.
   */
  public static videoRecordingStartedEvent: string;

  /**
   * String value when hooking into the videoRecordingFinishedEvent. This event fires when video stops recording but has not processed yet.
   */
  public static videoRecordingFinishedEvent: string;

  /**
   * String value when hooking into the videoRecordingReadyEvent. This event fires when video has completed processing and is ready to be used.
   */
  public static videoRecordingReadyEvent: string;

  /**
   * String value when hooking into the confirmScreenShownEvent. This event fires when the confirm dialog is shown.
   */
  public static confirmScreenShownEvent: 'confirmScreenShownEvent';

  /**
   * String value when hooking into the confirmScreenDismissedEvent. This event fires when the confirm dialog is dismissed either by Retake or Save.
   */
  public static confirmScreenDismissedEvent: 'confirmScreenDismissedEvent';

  /**
   * If true console logs will be output to help debug the Camera Plus events.
   */
  debug: boolean;

  /**
   * @default 4:3
   * *ANDROID ONLY*  A string to represent the camera preview aspect ratio e.g 4:3, 1:1 ,16:9 to check if the device supports the ratio use {@link getGetSupportedRatios}
   */
  ratio: string;

  /**
   *  *ANDROID ONLY*  Camera zoom uses a float 0 - 1.
   *  0 being no zoom
   *  1 being max zoom
   */
  zoom: number;

  /**
   *  *ANDROID ONLY* Camera white balance
   */
  whiteBalance: WhiteBalance | string;

  /**
   * A string representing the size of picture {@link takePicture} will output. Available sizes can be fetched using {@link getAvailablePictureSizes}
   */
  pictureSize: string;

  /**
   * @param ratio string
   * @returns returns an array of supported picture sizes supported by the current camera
   */
  getAvailablePictureSizes(ratio: string): string[];

  /**
   * *ANDROID ONLY*
   * @returns retuns an array of strings representing the preview sizes supported by the current device.
   */
  getGetSupportedRatios(): string[];

  /**
   * If true the default take picture event will present a confirmation dialog. Default is true.
   */
  confirmPhotos: boolean;

  // /**
  //  * The gallery/library selection mode. 'single' allows one image to be selected. 'multiple' allows multiple images. Default is 'multiple'
  //  */
  // galleryPickerMode: 'single' | 'multiple';

  /**
   * If true the default flash toggle icon/button will show on the Camera Plus layout. Default is true.
   */
  showFlashIcon: boolean;

  /**
   * If true the default camera toggle (front/back) icon/button will show on the Camera Plus layout. Default is true.
   */
  showToggleIcon: boolean;

  /**
   * If true the default capture (take picture) icon/button will show on the Camera Plus layout. Default is true.
   */
  showCaptureIcon: boolean;

  /**
   * If true when a video is done recording, a confirmation dialog will show. Default is true.
   */
  confirmVideo: boolean;

  /**
   * If true, the video/image will save to the device Gallery/Library. Default is true.
   */
  saveToGallery: boolean;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is on (enabled).
   */
  flashOnIcon: string;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  flashOffIcon: string;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  toggleCameraIcon: string;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Capture button icon.
   */
  takePicIcon: string;

  /**
   * *ANDROID ONLY* - If true the camera will auto focus to capture the image. Default is true.
   */
  autoFocus: boolean;

  /**
   * Toggles the device camera (front/back).
   */
  toggleCamera(): void;

  /**
   * Toggles the active camera flash mode.
   */
  toggleFlash(): void;

  /**
   * Gets the current flash mode
   */
  getFlashMode(): string;

  /**
   * Takes a picture of the current preview of the CameraPlus.
   */
  takePicture(options?: ICameraOptions): void;

  /**
   * Start recording video
   * @param options IVideoOptions
   */
  record(options?: IVideoOptions): Promise<void>;

  /**
   * Stop recording video.
   */
  stop(): void;

  /**
   * Returns true if the device has at least one camera.
   */
  isCameraAvailable(): boolean;

  /**
   * Returns current camaer <front | rear>
   */
  getCurrentCamera(): 'rear' | 'front';

  /**
   * ANDROID ONLY
   * Gets the number of cameras on a device.
   */
  getNumberOfCameras(): number;

  /**
   * ANDROID ONLY
   * Returns true if the current camera has a flash mode.
   */
  hasFlash(): boolean;
}

export interface ICameraOptions {
  confirm?: boolean;
  saveToGallery?: boolean;
  keepAspectRatio?: boolean;
  height?: number;
  width?: number;
  autoSquareCrop?: boolean;
  confirmRetakeText?: string;
  confirmSaveText?: string;
  useCameraOptions?: boolean;
}

export declare enum CameraVideoQuality {
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

export interface IChooseOptions {
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
  showImages?: boolean;
  showVideos?: boolean;
}

export interface ICameraPlusEvents {
  errorEvent: any;
  photoCapturedEvent: any;
  toggleCameraEvent: any;
  imagesSelectedEvent: any;
  videoRecordingStartedEvent: any;
  videoRecordingFinishedEvent: any;
  videoRecordingReadyEvent: any;
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
