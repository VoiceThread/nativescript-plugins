/// <reference path="android-declarations.d.ts"/>

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class BitmapUtils {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.BitmapUtils>;
          public static INSTANCE: io.github.triniwiz.fancycamera.BitmapUtils;
          public getBitmap(param0: java.nio.ByteBuffer, param1: io.github.triniwiz.fancycamera.FrameMetadata): globalAndroid.graphics.Bitmap;
          public getBitmapFromContentUri(param0: globalAndroid.content.ContentResolver, param1: globalAndroid.net.Uri): globalAndroid.graphics.Bitmap;
          public getBitmap(param0: androidNative.Array<number>, param1: io.github.triniwiz.fancycamera.FrameMetadata): globalAndroid.graphics.Bitmap;
          public getBitmap(param0: androidx.camera.core.ImageProxy): globalAndroid.graphics.Bitmap;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Camera extends io.github.triniwiz.fancycamera.CameraBase {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Camera>;
          public getDisplayRatio(): string;
          public cameraRecording(): boolean;
          public setPause(param0: boolean): void;
          public getRetrieveLatestImage(): boolean;
          public getAllowExifRotation(): boolean;
          public setEnablePinchZoom(param0: boolean): void;
          public setMaxVideoFrameRate(param0: number): void;
          public getDisableHEVC(): boolean;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public isStarted(): boolean;
          public startPreview(): void;
          public getMaxAudioBitRate(): number;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public setAutoSquareCrop(param0: boolean): void;
          public setForceStopping(param0: boolean): void;
          public isForceStopping(): boolean;
          public setRotation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public getAutoSquareCrop(): boolean;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public getSaveToGallery(): boolean;
          public isRecording(): boolean;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public setCamera(param0: globalAndroid.hardware.Camera): void;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public getNumberOfCameras(): number;
          public getSupportedRatios(): androidNative.Array<string>;
          public setZoom(param0: number): void;
          public release(): void;
          public getLock(): any;
          public setLock(param0: any): void;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public orientationUpdated(): void;
          public getRotation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public stop(): void;
          public isAudioLevelsEnabled(): boolean;
          public setMaxVideoBitrate(param0: number): void;
          public setRecording(param0: boolean): void;
          public getAmplitudeEMA(): number;
          public stopPreview(): void;
          public setStarted(param0: boolean): void;
          public setRetrieveLatestImage(param0: boolean): void;
          public setPictureSize(param0: string): void;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public setZoomRatio(param0: number): void;
          public getMaxVideoBitrate(): number;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public getCamera(): globalAndroid.hardware.Camera;
          public getDetectorType(): io.github.triniwiz.fancycamera.DetectorType;
          public takePhoto(): void;
          public getMaxVideoFrameRate(): number;
          public getPreviewSurface(): any;
          public getAmplitude(): number;
          public getZoom(): number;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public setDisplayRatio(param0: string): void;
          public getEnableTapToFocus(): boolean;
          public getEnablePinchZoom(): boolean;
          public toggleCamera(): void;
          public setEnableTapToFocus(param0: boolean): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
          public stopRecording(): void;
          public getPause(): boolean;
          public hasFlash(): boolean;
          public constructor(param0: globalAndroid.content.Context);
          public setDetectorType(param0: io.github.triniwiz.fancycamera.DetectorType): void;
          public setMaxAudioBitRate(param0: number): void;
          public getDb(): number;
          public getZoomRatio(): number;
        }
        export module Camera {
          export class WhenMappings {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.Camera.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Camera2 extends io.github.triniwiz.fancycamera.CameraBase {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Camera2>;
          public getDisplayRatio(): string;
          public cameraRecording(): boolean;
          public setPause(param0: boolean): void;
          public getMinZoomRatio(): number;
          public getRetrieveLatestImage(): boolean;
          public getAllowExifRotation(): boolean;
          public setEnablePinchZoom(param0: boolean): void;
          public setMaxVideoFrameRate(param0: number): void;
          public getDisableHEVC(): boolean;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public getMaxAudioBitRate(): number;
          public startPreview(): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public setAutoSquareCrop(param0: boolean): void;
          public setRotation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public getAutoSquareCrop(): boolean;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public getSaveToGallery(): boolean;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public getNumberOfCameras(): number;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public getSupportedRatios(): androidNative.Array<string>;
          public setZoom(param0: number): void;
          public release(): void;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public orientationUpdated(): void;
          public getRotation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public setAmplitude(param0: number): void;
          public isAudioLevelsEnabled(): boolean;
          public stop(): void;
          public setMaxVideoBitrate(param0: number): void;
          public setAmplitudeEMA(param0: number): void;
          public getAmplitudeEMA(): number;
          public stopPreview(): void;
          public setRetrieveLatestImage(param0: boolean): void;
          public setPictureSize(param0: string): void;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public getMaxZoomRatio(): number;
          public setDb(param0: number): void;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public setZoomRatio(param0: number): void;
          public getMaxVideoBitrate(): number;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public getDetectorType(): io.github.triniwiz.fancycamera.DetectorType;
          public setStoredZoomRatio(param0: number): void;
          public getMaxVideoFrameRate(): number;
          public takePhoto(): void;
          public getPreviewSurface(): any;
          public getAmplitude(): number;
          public getZoom(): number;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public getEnableTapToFocus(): boolean;
          public getStoredZoom(): number;
          public setDisplayRatio(param0: string): void;
          public getEnablePinchZoom(): boolean;
          public setStoredZoom(param0: number): void;
          public toggleCamera(): void;
          public setEnableTapToFocus(param0: boolean): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
          public stopRecording(): void;
          public getPause(): boolean;
          public hasFlash(): boolean;
          public constructor(param0: globalAndroid.content.Context);
          public setDetectorType(param0: io.github.triniwiz.fancycamera.DetectorType): void;
          public setMaxAudioBitRate(param0: number): void;
          public getStoredZoomRatio(): number;
          public getDb(): number;
          public getZoomRatio(): number;
        }
        export module Camera2 {
          export class WhenMappings {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.Camera2.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export abstract class CameraBase {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraBase>;
          public setFaceDetectionOptions(param0: any): void;
          public setPause(param0: boolean): void;
          public getAllowExifRotation(): boolean;
          public setCurrentOrientation(param0: number): void;
          public finalize(): void;
          public setMaxVideoFrameRate(param0: number): void;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public getImageLabelingOptions$nativescript_camera_release(): any;
          public setMTimerTask$nativescript_camera_release(param0: java.util.TimerTask): void;
          public startPreview(): void;
          public setOverridePhotoWidth(param0: number): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public setAutoSquareCrop(param0: boolean): void;
          public getDATETIME_FORMAT$nativescript_camera_release(): java.lang.ThreadLocal<java.text.SimpleDateFormat>;
          public setRotation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public setOverridePhotoHeight(param0: number): void;
          public setBarcodeScannerOptions$nativescript_camera_release(param0: any): void;
          public getMTimer$nativescript_camera_release(): java.util.Timer;
          public setOnTextRecognitionListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public setSelfieSegmentationOptions$nativescript_camera_release(param0: any): void;
          public getSaveToGallery(): boolean;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public getSupportedRatios(): androidNative.Array<string>;
          public hasCameraPermission(): boolean;
          public setOnSurfaceUpdateListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.SurfaceUpdateListener): void;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public orientationUpdated(): void;
          public getVIDEO_RECORDER_PERMISSIONS$nativescript_camera_release(): androidNative.Array<string>;
          public convertFromExifDateTime$nativescript_camera_release(param0: string): java.util.Date;
          public setOnImageLabelingListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getCamcorderProfile$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.Quality): globalAndroid.media.CamcorderProfile;
          public setRetrieveLatestImage(param0: boolean): void;
          public getRecorder$nativescript_camera_release(): globalAndroid.media.MediaRecorder;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public setOnSelfieSegmentationListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public isProcessingEveryNthFrame$nativescript_camera_release(): boolean;
          public setSelfieSegmentationOptions(param0: any): void;
          public getProcessEveryNthFrame(): number;
          public getCurrentFrame$nativescript_camera_release(): number;
          public getOnBarcodeScanningListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public setListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.CameraEventListener): void;
          public getDuration(): number;
          public requestAudioPermission(): void;
          public hasAudioPermission(): boolean;
          public getMaxVideoBitrate(): number;
          public setonSurfaceUpdateListener(param0: io.github.triniwiz.fancycamera.SurfaceUpdateListener): void;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public getDetectorType(): io.github.triniwiz.fancycamera.DetectorType;
          public getMTimerTask$nativescript_camera_release(): java.util.TimerTask;
          public getMaxVideoFrameRate(): number;
          public takePhoto(): void;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public incrementCurrentFrame$nativescript_camera_release(): void;
          public getEnableTapToFocus(): boolean;
          public setProcessEveryNthFrame(param0: number): void;
          public getEnablePinchZoom(): boolean;
          public stopDurationTimer$nativescript_camera_release(): void;
          public setImageLabelingOptions(param0: any): void;
          public setOnTextRecognitionListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public stopRecording(): void;
          public getLatestImage$nativescript_camera_release(): globalAndroid.graphics.Bitmap;
          public hasFlash(): boolean;
          public constructor(param0: globalAndroid.content.Context);
          public getEnableAudio(): boolean;
          public setDetectorType(param0: io.github.triniwiz.fancycamera.DetectorType): void;
          public setMaxAudioBitRate(param0: number): void;
          public convertToExifDateTime$nativescript_camera_release(param0: number): string;
          public getDb(): number;
          public setBarcodeScannerOptions(param0: any): void;
          public getMainHandler$nativescript_camera_release(): globalAndroid.os.Handler;
          public getTIME_FORMAT$nativescript_camera_release(): java.lang.ThreadLocal<java.text.SimpleDateFormat>;
          public cameraRecording(): boolean;
          public getDisplayRatio(): string;
          public getRetrieveLatestImage(): boolean;
          public setOnBarcodeScanningListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public setEnablePinchZoom(param0: boolean): void;
          public toggleFlash(): void;
          public getDisableHEVC(): boolean;
          public getOnTextRecognitionListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public requestCameraPermission(): void;
          public getMaxAudioBitRate(): number;
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public hasStoragePermission(): boolean;
          public getFaceDetectionOptions$nativescript_camera_release(): any;
          public getAutoSquareCrop(): boolean;
          public initOptions$nativescript_camera_release(): void;
          public getOverridePhotoWidth(): number;
          public setGettingAudioLevels$nativescript_camera_release(param0: boolean): void;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public getOnSelfieSegmentationListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public setMDuration$nativescript_camera_release(param0: number): void;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public setCurrentFrame$nativescript_camera_release(param0: number): void;
          public getNumberOfCameras(): number;
          public setZoom(param0: number): void;
          public requestPermission(): void;
          public release(): void;
          public getMDuration$nativescript_camera_release(): number;
          public getOnFacesDetectedListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public getRotation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public deInitListener$nativescript_camera_release(): void;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public setOnObjectDetectedListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getSelfieSegmentationOptions$nativescript_camera_release(): any;
          public isAudioLevelsEnabled(): boolean;
          public stop(): void;
          public setMaxVideoBitrate(param0: number): void;
          public getAmplitudeEMA(): number;
          public setOnBarcodeScanningListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public isGettingAudioLevels$nativescript_camera_release(): boolean;
          public stopPreview(): void;
          public getOverridePhotoHeight(): number;
          public setObjectDetectionOptions(param0: any): void;
          public startDurationTimer$nativescript_camera_release(): void;
          public setPictureSize(param0: string): void;
          public setMTimer$nativescript_camera_release(param0: java.util.Timer): void;
          public getOnPoseDetectedListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public setEnableAudio(param0: boolean): void;
          public getVIDEO_RECORDER_PERMISSIONS_REQUEST$nativescript_camera_release(): number;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public setImageLabelingOptions$nativescript_camera_release(param0: any): void;
          public getAnalysisExecutor$nativescript_camera_release(): java.util.concurrent.ExecutorService;
          public setZoomRatio(param0: number): void;
          public getOnSurfaceUpdateListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.SurfaceUpdateListener;
          public hasPermission(): boolean;
          public resetCurrentFrame$nativescript_camera_release(): void;
          public getBarcodeScannerOptions$nativescript_camera_release(): any;
          public getObjectDetectionOptions$nativescript_camera_release(): any;
          public setOnPoseDetectedListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public setOnSelfieSegmentationListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.CameraEventListener;
          public setOnFacesDetectedListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getPreviewSurface(): any;
          public getAmplitude(): number;
          public getZoom(): number;
          public getOnImageLabelingListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public setDisplayRatio(param0: string): void;
          public initListener$nativescript_camera_release(param0: globalAndroid.media.MediaRecorder): void;
          public requestStoragePermission(): void;
          public toggleCamera(): void;
          public setAnalysisExecutor$nativescript_camera_release(param0: java.util.concurrent.ExecutorService): void;
          public setLatestImage$nativescript_camera_release(param0: globalAndroid.graphics.Bitmap): void;
          public setEnableTapToFocus(param0: boolean): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
          public getPause(): boolean;
          public setFaceDetectionOptions$nativescript_camera_release(param0: any): void;
          public setOnPoseDetectedListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public setOnImageLabelingListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public setOnObjectDetectedListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getOnObjectDetectedListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.ImageAnalysisCallback;
          public stringSizeToSize$nativescript_camera_release(param0: string): io.github.triniwiz.fancycamera.Size;
          public getCurrentOrientation(): number;
          public setRecorder$nativescript_camera_release(param0: globalAndroid.media.MediaRecorder): void;
          public setOnFacesDetectedListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public setObjectDetectionOptions$nativescript_camera_release(param0: any): void;
          public getDATE_FORMAT$nativescript_camera_release(): java.lang.ThreadLocal<java.text.SimpleDateFormat>;
          public getZoomRatio(): number;
        }
        export module CameraBase {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraBase.Companion>;
            public getEMA_FILTER$nativescript_camera_release(): number;
            public setFaceDetectionSupported$nativescript_camera_release(param0: boolean): void;
            public isImageLabelingSupported$nativescript_camera_release(): boolean;
            public setTextRecognitionSupported$nativescript_camera_release(param0: boolean): void;
            public setSelfieSegmentationSupported$nativescript_camera_release(param0: boolean): void;
            public isPoseDetectionSupported$nativescript_camera_release(): boolean;
            public isBarcodeScanningSupported$nativescript_camera_release(): boolean;
            public setBarcodeScanningSupported$nativescript_camera_release(param0: boolean): void;
            public setImageLabelingSupported$nativescript_camera_release(param0: boolean): void;
            public isFaceDetectionSupported$nativescript_camera_release(): boolean;
            public isSelfieSegmentationSupported$nativescript_camera_release(): boolean;
            public isTextRecognitionSupported$nativescript_camera_release(): boolean;
            public detectSupport$nativescript_camera_release(): void;
            public isObjectDetectionSupported$nativescript_camera_release(): boolean;
            public setPoseDetectionSupported$nativescript_camera_release(param0: boolean): void;
            public isMLSupported$nativescript_camera_release(): boolean;
            public setObjectDetectionSupported$nativescript_camera_release(param0: boolean): void;
          }
          export class WhenMappings {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraBase.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraEventListener {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraEventListener>;
          /**
           * Constructs a new instance of the io.github.triniwiz.fancycamera.CameraEventListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onReady(): void;
            onCameraOpen(): void;
            onCameraClose(): void;
            onCameraPhoto(param0: java.io.File): void;
            onCameraVideo(param0: java.io.File): void;
            onCameraAnalysis(param0: io.github.triniwiz.fancycamera.ImageAnalysis): void;
            onCameraError(param0: string, param1: java.lang.Exception): void;
            onCameraVideoStart(): void;
          });
          public constructor();
          public onCameraOpen(): void;
          public onCameraClose(): void;
          public onCameraAnalysis(param0: io.github.triniwiz.fancycamera.ImageAnalysis): void;
          public onCameraVideo(param0: java.io.File): void;
          public onCameraVideoStart(): void;
          public onReady(): void;
          public onCameraError(param0: string, param1: java.lang.Exception): void;
          public onCameraPhoto(param0: java.io.File): void;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export abstract class CameraEventListenerUI extends io.github.triniwiz.fancycamera.CameraEventListener {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraEventListenerUI>;
          public onCameraOpenUI(): void;
          public onCameraClose(): void;
          public onCameraVideoUI(param0: java.io.File): void;
          public onCameraError(param0: string, param1: java.lang.Exception): void;
          public onCameraAnalysisUI(param0: io.github.triniwiz.fancycamera.ImageAnalysis): void;
          public onCameraErrorUI(param0: string, param1: java.lang.Exception): void;
          public onCameraPhoto(param0: java.io.File): void;
          public onCameraVideoStartUI(): void;
          public onReadyUI(): void;
          public onCameraOpen(): void;
          public onCameraAnalysis(param0: io.github.triniwiz.fancycamera.ImageAnalysis): void;
          public onCameraVideo(param0: java.io.File): void;
          public constructor();
          public onCameraVideoStart(): void;
          public onCameraCloseUI(): void;
          public onReady(): void;
          public onCameraPhotoUI(param0: java.io.File): void;
        }
        export module CameraEventListenerUI {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraEventListenerUI.Companion>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraFlashMode {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraFlashMode>;
          public static OFF: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static ON: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static AUTO: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static RED_EYE: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static TORCH: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.CameraFlashMode;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.CameraFlashMode>;
          public getValue(): number;
        }
        export module CameraFlashMode {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraFlashMode.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.CameraFlashMode;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraOrientation {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraOrientation>;
          public static UNKNOWN: io.github.triniwiz.fancycamera.CameraOrientation;
          public static PORTRAIT: io.github.triniwiz.fancycamera.CameraOrientation;
          public static PORTRAIT_UPSIDE_DOWN: io.github.triniwiz.fancycamera.CameraOrientation;
          public static LANDSCAPE_LEFT: io.github.triniwiz.fancycamera.CameraOrientation;
          public static LANDSCAPE_RIGHT: io.github.triniwiz.fancycamera.CameraOrientation;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.CameraOrientation>;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.CameraOrientation;
          public getValue(): number;
        }
        export module CameraOrientation {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraOrientation.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.CameraOrientation;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraPosition {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraPosition>;
          public static BACK: io.github.triniwiz.fancycamera.CameraPosition;
          public static FRONT: io.github.triniwiz.fancycamera.CameraPosition;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.CameraPosition>;
          public getValue(): number;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.CameraPosition;
        }
        export module CameraPosition {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraPosition.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.CameraPosition;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class DetectorType {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.DetectorType>;
          public static Barcode: io.github.triniwiz.fancycamera.DetectorType;
          public static DigitalInk: io.github.triniwiz.fancycamera.DetectorType;
          public static Face: io.github.triniwiz.fancycamera.DetectorType;
          public static Image: io.github.triniwiz.fancycamera.DetectorType;
          public static Object: io.github.triniwiz.fancycamera.DetectorType;
          public static Pose: io.github.triniwiz.fancycamera.DetectorType;
          public static Text: io.github.triniwiz.fancycamera.DetectorType;
          public static All: io.github.triniwiz.fancycamera.DetectorType;
          public static Selfie: io.github.triniwiz.fancycamera.DetectorType;
          public static None: io.github.triniwiz.fancycamera.DetectorType;
          public toString(): string;
          public static fromName(param0: string): io.github.triniwiz.fancycamera.DetectorType;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.DetectorType;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.DetectorType>;
          public static fromInt(param0: number): io.github.triniwiz.fancycamera.DetectorType;
        }
        export module DetectorType {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.DetectorType.Companion>;
            public fromInt(param0: number): io.github.triniwiz.fancycamera.DetectorType;
            public fromName(param0: string): io.github.triniwiz.fancycamera.DetectorType;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Event {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Event>;
          public constructor(param0: io.github.triniwiz.fancycamera.EventType, param1: java.io.File, param2: string);
          public getMessage(): string;
          public getFile(): java.io.File;
          public getType(): io.github.triniwiz.fancycamera.EventType;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class EventType {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.EventType>;
          public static Photo: io.github.triniwiz.fancycamera.EventType;
          public static Video: io.github.triniwiz.fancycamera.EventType;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.EventType>;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.EventType;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class FancyCamera {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.FancyCamera>;
          public setFaceDetectionOptions(param0: any): void;
          public setPause(param0: boolean): void;
          public getAllowExifRotation(): boolean;
          public setMaxVideoFrameRate(param0: number): void;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public getBarcodeScannerOptions(): any;
          public startPreview(): void;
          public onPermissionHandler(param0: number, param1: androidNative.Array<string>, param2: androidNative.Array<number>): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public setOverridePhotoWidth(param0: number): void;
          public setAutoSquareCrop(param0: boolean): void;
          public setOverridePhotoHeight(param0: number): void;
          public setOnTextRecognitionListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getSaveToGallery(): boolean;
          public getFaceDetectionOptions(): any;
          public getLatestImage(): globalAndroid.graphics.Bitmap;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public hasCameraPermission(): boolean;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public setOnImageLabelingListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getRatio(): string;
          public setRetrieveLatestImage(param0: boolean): void;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public setSelfieSegmentationOptions(param0: any): void;
          public getProcessEveryNthFrame(): number;
          public getDuration(): number;
          public requestAudioPermission(): void;
          public hasAudioPermission(): boolean;
          public getMaxVideoBitrate(): number;
          public setonSurfaceUpdateListener(param0: io.github.triniwiz.fancycamera.SurfaceUpdateListener): void;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public getSelfieSegmentationOptions(): any;
          public getDetectorType(): io.github.triniwiz.fancycamera.DetectorType;
          public getMaxVideoFrameRate(): number;
          public takePhoto(): void;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public getEnableTapToFocus(): boolean;
          public setProcessEveryNthFrame(param0: number): void;
          public getEnablePinchZoom(): boolean;
          public setImageLabelingOptions(param0: any): void;
          public stopRecording(): void;
          public setCameraOrientation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public constructor(param0: globalAndroid.content.Context);
          public getEnableAudio(): boolean;
          public setDetectorType(param0: io.github.triniwiz.fancycamera.DetectorType): void;
          public setMaxAudioBitRate(param0: number): void;
          public getHasFlash(): boolean;
          public getDb(): number;
          public setEnableAudioLevels(param0: boolean): void;
          public setBarcodeScannerOptions(param0: any): void;
          public static setForceV1(param0: boolean): void;
          public setDetectorWithName(param0: string): void;
          public getRetrieveLatestImage(): boolean;
          public getCameraOrientation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public setEnablePinchZoom(param0: boolean): void;
          public toggleFlash(): void;
          public getDisableHEVC(): boolean;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public requestCameraPermission(): void;
          public getMaxAudioBitRate(): number;
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public hasStoragePermission(): boolean;
          public getAutoSquareCrop(): boolean;
          public getOverridePhotoWidth(): number;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public getObjectDetectionOptions(): any;
          public getNumberOfCameras(): number;
          public static getForceV1(): boolean;
          public setZoom(param0: number): void;
          public requestPermission(): void;
          public release(): void;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public setOnObjectDetectedListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public isAudioLevelsEnabled(): boolean;
          public stop(): void;
          public setMaxVideoBitrate(param0: number): void;
          public setOnBarcodeScanningListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public stopPreview(): void;
          public setObjectDetectionOptions(param0: any): void;
          public getOverridePhotoHeight(): number;
          public setPictureSize(param0: string): void;
          public setEnableAudio(param0: boolean): void;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public hasPermission(): boolean;
          public getGetSupportedRatios(): androidNative.Array<string>;
          public getImageLabelingOptions(): any;
          public setOnSelfieSegmentationListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getZoom(): number;
          public requestStoragePermission(): void;
          public setRatio(param0: string): void;
          public toggleCamera(): void;
          public setEnableTapToFocus(param0: boolean): void;
          public getPause(): boolean;
          public setOnPoseDetectedListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          public getPreviewView(): any;
          public setListener(param0: io.github.triniwiz.fancycamera.CameraEventListener): void;
          public setOnFacesDetectedListener(param0: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
        }
        export module FancyCamera {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.FancyCamera.Companion>;
            public setForceV1(param0: boolean): void;
            public getForceV1(): boolean;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class FancyCameraFileProvider {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.FancyCameraFileProvider>;
          public constructor();
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class FrameMetadata {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.FrameMetadata>;
          public getRotation(): number;
          public getHeight(): number;
          public getWidth(): number;
        }
        export module FrameMetadata {
          export class Builder {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.FrameMetadata.Builder>;
            public constructor();
            public setRotation(param0: number): io.github.triniwiz.fancycamera.FrameMetadata.Builder;
            public setWidth(param0: number): io.github.triniwiz.fancycamera.FrameMetadata.Builder;
            public setHeight(param0: number): io.github.triniwiz.fancycamera.FrameMetadata.Builder;
            public build(): io.github.triniwiz.fancycamera.FrameMetadata;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class ImageAnalysis {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.ImageAnalysis>;
          public constructor();
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class ImageAnalysisCallback {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.ImageAnalysisCallback>;
          /**
           * Constructs a new instance of the io.github.triniwiz.fancycamera.ImageAnalysisCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onSuccess(param0: any): void; onError(param0: string, param1: java.lang.Exception): void });
          public constructor();
          public onSuccess(param0: any): void;
          public onError(param0: string, param1: java.lang.Exception): void;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class ML {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.ML>;
          public constructor();
          public static processBytes(
            param0: androidNative.Array<number>,
            param1: number,
            param2: number,
            param3: number,
            param4: number,
            param5: string,
            param6: io.github.triniwiz.fancycamera.ImageAnalysisCallback
          ): void;
          public static processImage(param0: globalAndroid.graphics.Bitmap, param1: number, param2: string, param3: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
        }
        export module ML {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.ML.Companion>;
            public processBytes(
              param0: androidNative.Array<number>,
              param1: number,
              param2: number,
              param3: number,
              param4: number,
              param5: string,
              param6: io.github.triniwiz.fancycamera.ImageAnalysisCallback
            ): void;
            public processImage(param0: globalAndroid.graphics.Bitmap, param1: number, param2: string, param3: io.github.triniwiz.fancycamera.ImageAnalysisCallback): void;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Quality {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Quality>;
          public static MAX_480P: io.github.triniwiz.fancycamera.Quality;
          public static MAX_720P: io.github.triniwiz.fancycamera.Quality;
          public static MAX_1080P: io.github.triniwiz.fancycamera.Quality;
          public static MAX_2160P: io.github.triniwiz.fancycamera.Quality;
          public static HIGHEST: io.github.triniwiz.fancycamera.Quality;
          public static LOWEST: io.github.triniwiz.fancycamera.Quality;
          public static QVGA: io.github.triniwiz.fancycamera.Quality;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.Quality>;
          public getValue(): number;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.Quality;
        }
        export module Quality {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.Quality.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.Quality;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Size {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Size>;
          public toString(): string;
          public getHeight(): number;
          public getWidth(): number;
          public constructor(param0: number, param1: number);
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class SurfaceUpdateListener {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.SurfaceUpdateListener>;
          /**
           * Constructs a new instance of the io.github.triniwiz.fancycamera.SurfaceUpdateListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onUpdate(): void });
          public constructor();
          public onUpdate(): void;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class WhiteBalance {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.WhiteBalance>;
          public static Auto: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Sunny: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Cloudy: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Shadow: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Twilight: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Fluorescent: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Incandescent: io.github.triniwiz.fancycamera.WhiteBalance;
          public static WarmFluorescent: io.github.triniwiz.fancycamera.WhiteBalance;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.WhiteBalance>;
          public getValue$nativescript_camera_release(): string;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.WhiteBalance;
        }
      }
    }
  }
}

//Generics information:
