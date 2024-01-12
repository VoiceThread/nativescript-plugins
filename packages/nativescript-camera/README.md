# NativeScript Camera ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@voicethread/nativescript-camera?style=flat-square)](https://www.npmjs.com/package/@voicethread/nativescript-camera)

> @voicethread/nativescript-camera



## Contents

- [NativeScript Camera  ](#nativescript-camera--)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Android Permissions](#android-permissions)
  - [iOS Permissions](#ios-permissions)  
  - [Android](#android)
  - [iOS](#ios)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @voicethread/nativescript-camera --save
```
OR
```bash
ns plugin install @voicethread/nativescript-camera
```

## Features
This nativescript camera plugin works on Android (API 26+) and Apple devices (iOS 12+) and has the following features:

* 📸 Photo and Video capture
* 👁️ Camera switching during video recording and option to lock device rotation while recording
* 👌 Pinch to zoom in/out and tap to focus
* 📱 Video merge utility
* 🎞️ Built-in controls for flash, camera switch, camera button
* ⏱️ Supports square-cropping photos and saving to device Photos
* 🧩 Photo confirmation flag and UI
* 🔍 Customizable output photo dimensions and quality (saved as jpeg)


## Future Features
* ⏯️ Customizable Video quality (dimensions)
* 🌓 Video Confirmation flag and UI
* ⚡ Additional properties/functions for better control over Camera and Photo/Video capture

## Usage

The best way to understand how to use the plugin is to look at the demo app included in this repo.
The `apps/demo/` folder contains a simple NS TypeScript application that uses this plugin. Look at `apps/demo/src/plugin-demos/nativescript-camera.ts` and `apps/demo/src/plugin-demos/nativescript-camera.xml` for camera plugin usage, and `apps/demo/src/main-view-model.ts` for obtaining permissions before using the camera plugin. 

1. Import the plugin.

```javascript
import { CameraPlus } from '@voicethread/nativescript-camera';
```

2. Create a camera instance via JS/TS or XML:

```javascript
this.cam = new CameraPlus();
this.cam.id = "camPlus"
this.cam.enableVideo = true;
this.cam.confirmPhotos = true;
this.cam.defaultCamera = 'front';
    ......
//Check camera and microphone permissions first.
//Then, add this.cam to a Layout as a child and voila!
```
or
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:Cam="@voicethread/nativescript-camera">
  ......
      <Cam:CameraPlus height="{{ cameraHeight }}"
          id="camPlus"
          defaultCamera="front"
          enableVideo="true"
          disablePhoto="false"
          saveToGallery="true"
          showCaptureIcon="true"
          showToggleIcon="true"
          showFlashIcon="true"
          confirmPhotos="true"
          autoSquareCrop="false"
          insetButtons="true"
          insetButtonsPercent="0.02"
          shouldLockRotation="true"
          confirmRetakeText="nah"
          confirmSaveText="yeah"
          maxDimension="800"
          quality="90"
          debug="true">         
        </Cam:CameraPlus>
  ......
```

3. Hook into camera events to handle videos and photos taken events along with other useful events. 

```javascript
this.cam.on(CameraPlus.errorEvent, args => {
      //handle error
    });

    this.cam.on(CameraPlus.toggleCameraEvent, (args: any) => {
      // update some UI/state
    });

    this.cam.on(CameraPlus.photoCapturedEvent, (args: any) => {
      // args.data should be the path of the jpeg file produced by camera library
    });

    this.cam.on(CameraPlus.videoRecordingReadyEvent, (args: any) => {
      //args.data should be the path of the file created with the video recording      
    });

    this.cam.on(CameraPlus.videoRecordingStartedEvent, (args: any) => {
      // update some UI/state
    });

    this.cam.on(CameraPlus.videoRecordingFinishedEvent, (args: any) => {
      // some more UI updates
    });

    this.cam.on(CameraPlus.cameraReadyEvent, (args: any) => {
      // lets you know once native camera instance is ready and initialized
    });
```

4. Use the built-in buttons or control the camera using exposed functions in your app.

### Permissions
Before creating/using a Camera instance, you will need to ensure that permissions for both the Camera an the Microphone have been granted by the user. An example using the community permissions plugin can be seen in `apps/demo/src/main-view-model.ts`.
### Android Permissions

To request permissions in the demo app, we use the @nativescript-community [perms plugin](https://github.com/nativescript-community/perms). 


Ensure your AndroidMAnifest.xml has the following declarations.

```xml
<manifest ... >
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
	<uses-permission android:name="android.permission.CAMERA" />

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```


 To support saving to Photos Gallery for API<29 devices also add the following lines in AndroidManifest.xml 

```xml
<manifest ... >
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```
And in your application, make sure you request these permissions if you want to use the `saveToGallery` flag. You can see an example in `apps/demo/src/plugin-demos/nativescript-camera.ts`. 


### iOS Permissions
Add the following to `app/App_Resources/iOS/Info.plist`:

```xml
    <key>NSMicrophoneUsageDescription</key>
	<string>This app requires access to your microphone to record audio</string>
	<key>NSCameraUsageDescription</key>
	<string>This app requires access to your camera to record video and take pictures</string>
```

If you want to use the `saveToGallery` flag then you will also need to add the following (look at the example in `apps/demo/src/plugin-demos/nativescript-camera.ts` for a working example). 

```xml
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Requires access to photo library to upload media.</string>
```

> **NOTE**: if you do use the perms plugin in a production app, make sure to read their README.md first, as using this plugin in production apps may require you to add all iOS Info.plist permission strings to avoid being rejected by automatic processing since the plugin includes code for all permission types.


## Properties

| Name                  | Type    | Default    | Description                                                                                                                  |
| --------------------- | ------- | -----------|----------------------------------------------------------------------------------------------------------------------------- |
| **debug**             | boolean | *false*      | If true logs will be output in the console to help debug the Camera plugin.                                           |
| **confirmPhotos**     | boolean | *true*       | If true the default take picture event will present a confirmation dialog before saving.                                   |
| **confirmRetakeText** | string  | *'Retake'*   | When confirming capture this text will be presented to the user to retake the photo.                                       |
| **confirmSaveText**   | string  | *'Save'*     | When confirming capture this text will be presented to the user to save the photo.                                         |
| **saveToGallery**     | boolean | *true*       | If true the default take picture event will save to device gallery.                                                        |
| **showFlashIcon**     | boolean | *true*       | If true the default flash toggle icon/button will show on the Camera Plus layout.                                          |
| **showToggleIcon**    | boolean | *true*       | If true the default camera toggle (front/back) icon button will show on the Camera Plus layout.                            |
| **showCaptureIcon**   | boolean | *true*       | If true the default capture (take picture) icon/button will show on the Camera Plus layout.                                |
| **showGalleryIcon**   | boolean | *true*       | If true the choose from gallery/library icon/button will show on the Camera Plus layout.                                   |
| **enableVideo**       | boolean | *false*       | If true the Camera instance can record video and will affect camera UX and main camera button icon used.                                      |
| **disablePhoto**       | boolean | *false*       | If true the Camera instance UI will only allow video mode operation. if enableVideo is false and disablePhoto is true, the main camera button will not trigger any actions.                                       |
| **defaultCamera** | `'front'` or `'rear'` | *'rear'*         | Which camera to use on launch.  `'front'` or `'rear'`.                                                  |
| **shouldLockRotation**| boolean | *true*  | If true, locks the device orientation while recording video|

## Android Only Properties

| Name                 | Type    | Description                                                                                 |
| -------------------- | ------- | ------------------------------------------------------------------------------------------- |
| **flashOnIcon**      | string  | Name of app_resource drawable for the native image button when flash is on (enabled).       |
| **flashOffIcon**     | string  | Name of app_resource drawable for the native image button when flash is off (disabled).     |
| **toggleCameraIcon** | string  | Name of app_resource drawable for the toggle camera button.                                 |
| **takePicIcon**      | string  | Name of app_resource drawable for the take picture (capture) button.                        |
| **galleryIcon**      | string  | Name of app_resource drawable for the open gallery (image library) button.                  |
| **autoFocus**        | boolean | If true the camera will use continuous focus when the camera detects changes of the target. |
| **insetButtons**     | boolean | If true, adjusts the spacing from edge of screen for built-in buttons.                      |
| **insetButtonsPercent**|number | The percentage to inset by, from 0.0 - 1.0                                                  |

## iOS Only Properties

| Name                      | Type    | Description                                                   |
| ------------------------- | ------- | ------------------------------------------------------------- |
| **doubleTapCameraSwitch** | boolean | Enable/disable double tap gesture to switch camera. (enabled) |

## Cross Platform Public Methods

| Method                                       | Description                                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isCameraAvailable()**                      | Returns true if the device has at least one camera.                                                                                                             |
| **toggleFlash()**                            | Toggles the flash mode on the active camera.                                                                                                                    |
| **toggleCamera()**                           | Toggles the active camera on the device.                                                                                                                        |
| **takePicture(opts?: ICameraOptions)**      | Takes a picture of the current camera preview. When the image file is saved, `photoCapturedEvent` event will be emitted with its path .                                                                                                       |
| **getFlashMode(): string**                   | Android: various strings possible: https://developer.android.com/reference/android/hardware/Camera.Parameters.html#getFlashMode() iOS: either `'on'` or `'off'` |
| **record(opts?: IVideoOptions)**             | Starts recording a video.                                                                                                                                       |
| **stop()**                                   | Stops the video recording. When the video file is ready, the `videoRecordingReadyEvent` event will be emitted with its path.                                                                   |

## Android Only Public Methods

| Method                                                  | Description                                                                                                                                         |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **getNumberOfCameras()**                                | Returns the number of cameras on the device.                                                                                                        |
| **hasFlash()**                                          | Returns true if the active camera has a flash mode.                                                                                                 |

## Events

| Name                            | Description                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **errorEvent**                  | Executes when an error is emitted from the Camera                                     |
| **photoCapturedEvent**          | Executes when a photo is taken.                                                        |
| **toggleCameraEvent**           | Executes when the device camera is toggled.                                            |
| **videoRecordingStartedEvent**  | Executes when video starts recording.                                                  |
| **videoRecordingFinishedEvent** | Executes when video stops recording but has not process yet.                           |
| **videoRecordingReadyEvent**    | Executes when video has completed processing and is ready to be used.                  |
| **confirmScreenShownEvent**     | Executes when the picture confirm dialog is shown..                                    |
| **confirmScreenDismissedEvent** | Executes when the picture confirm dialog is dismissed either by Retake or Save button. |
| **cameraReadyEvent**            | Executes when the camera instance is done initializing                                 |

## Option Interfaces

Photo taking options
```TS
export interface ICameraOptions {
  confirm?: boolean;
  saveToGallery?: boolean;
  quality?: number;
  maxDimension?: number;
  autoSquareCrop?: boolean;
  confirmRetakeText?: string;
  confirmSaveText?: string;
}
```

Video recording options
```TS
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
export enum CameraVideoQuality {
  MAX_480P = '480p',
  MAX_720P = '720p',
  MAX_1080P = '1080p',
  MAX_2160P = '2160p',
  HIGHEST = 'highest',
  LOWEST = 'lowest',
  QVGA = 'qvga',
}
```


## Additional Utils

This plugin also exports a function `mergeVideoFiles` which a dev can use to merge an array of video files produced by the camera plugin. To use it, all input files must be MP4 with the same video and audio codec settings for all video segments. It takes two parameters; the first is an array of file names for the input video files and the second is a string path to use to save the merged video file. 
``` js
let outputFile = mergeVideoFiles(videoSegmentsArray, outputPath)
```


## Acknowledgements

This plugin was based on [Nativescript-Camera-Plus](https://github.com/nstudio/nativescript-camera-plus) for NS,  [SwiftyCam](https://github.com/NathanWalker/SwiftyCam) for iOS and [FancyCamera](https://github.com/triniwiz/fancycamera) for Android. 

## License

Apache License Version 2.0


