declare class ASBaseCameraViewController extends UIViewController implements AVCaptureAudioDataOutputSampleBufferDelegate, AVCaptureVideoDataOutputSampleBufferDelegate {
  static alloc(): ASBaseCameraViewController; // inherited from NSObject

  static new(): ASBaseCameraViewController; // inherited from NSObject

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  beginSession(): void;

  cancelRecording(): void;

  captureOutputDidDropSampleBufferFromConnection(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;

  captureOutputDidOutputSampleBufferFromConnection(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;

  capturePhotoAfter(deadline: number): void;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  didBeginRecordingVideo(): void;

  didCancelRecordingAt(url: NSURL): void;

  didCaptureImage(): void;

  didFailToProcessVideo(error: NSError): void;

  didFinishProcessingVideoAt(url: NSURL): void;

  didFinishProcessingWithImageWith(image: UIImage, properties: NSDictionary<any, any>): void;

  didFinishRecordingVideo(): void;

  didSwitchCamera(): void;

  endSession(): void;

  handleApplicationDidBecomeActive(notification: NSNotification): void;

  handleApplicationWillResignActive(notification: NSNotification): void;

  handleSessionDidStartRunning(notification: NSNotification): void;

  handleSessionInterruptionEnded(notification: NSNotification): void;

  handleSessionRuntimeError(notification: NSNotification): void;

  handleSessionWasInterrupted(notification: NSNotification): void;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  reconfigureSession(): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;

  setPreviousBackgroundAudioPreference(): void;

  shouldCreateAssetWriter(): void;

  startRecording(): void;

  stopRecording(): void;

  switchCamera(): void;

  willBeginRecordingVideo(): void;

  willCaptureImage(): void;
}

declare class ASCameraButton extends UIView {
  static alloc(): ASCameraButton; // inherited from NSObject

  static appearance(): ASCameraButton; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): ASCameraButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): ASCameraButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): ASCameraButton; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): ASCameraButton; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): ASCameraButton; // inherited from UIAppearance

  static new(): ASCameraButton; // inherited from NSObject

  isEnabled: boolean;

  longPressGestureRecognizer: UILongPressGestureRecognizer;

  changeToCircle(): void;

  changeToSquare(): void;

  drawButton(): void;
}

interface ASCameraDelegate {
  asCameraDidBeginRecordingVideoAt?(asCamera: ASBaseCameraViewController, location: AVCaptureDevicePosition): void;

  asCameraDidCancelRecordingAt?(asCamera: ASBaseCameraViewController, url: NSURL): void;

  asCameraDidCaptureImageAt?(asCamera: ASBaseCameraViewController, location: AVCaptureDevicePosition): void;

  asCameraDidChangeZoomLevelTo?(asCamera: ASBaseCameraViewController, zoomLevel: number): void;

  asCameraDidFailToProcessVideo?(asCamera: ASBaseCameraViewController, error: NSError): void;

  asCameraDidFinishProcessingVideoAt?(asCamera: ASBaseCameraViewController, url: NSURL): void;

  asCameraDidFinishProcessingWith?(asCamera: ASBaseCameraViewController, image: UIImage, properties: NSDictionary<any, any>): void;

  asCameraDidFinishRecordingVideoAt?(asCamera: ASBaseCameraViewController, location: AVCaptureDevicePosition): void;

  asCameraDidFocusAtPoint?(asCamera: ASBaseCameraViewController, point: CGPoint): void;

  asCameraDidSwitchCamera?(asCamera: ASBaseCameraViewController, location: AVCaptureDevicePosition): void;

  asCameraDidUpdateRecordingDurationTo?(asCamera: ASBaseCameraViewController, duration: number): void;

  asCameraWillBeginRecordingVideoAt?(asCamera: ASBaseCameraViewController, location: AVCaptureDevicePosition): void;

  asCameraWillCaptureImageAt?(asCamera: ASBaseCameraViewController, location: AVCaptureDevicePosition): void;

  asCameraWithShouldCreateAssetWriter?(asCamera: ASBaseCameraViewController): void;
}
declare var ASCameraDelegate: {
  prototype: ASCameraDelegate;
};

declare class ASCameraView extends UIView {
  static alloc(): ASCameraView; // inherited from NSObject

  static appearance(): ASCameraView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): ASCameraView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): ASCameraView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): ASCameraView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): ASCameraView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): ASCameraView; // inherited from UIAppearance

  static layerClass(): typeof NSObject;

  static new(): ASCameraView; // inherited from NSObject
}

declare class ASCameraViewController extends ASBaseCameraViewController implements UIGestureRecognizerDelegate {
  static alloc(): ASCameraViewController; // inherited from NSObject

  static new(): ASCameraViewController; // inherited from NSObject

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  flashPreview(): void;

  focusAt(point: CGPoint): void;

  freezePreview(): void;

  gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldReceiveEvent(gestureRecognizer: UIGestureRecognizer, event: _UIEvent): boolean;

  gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

  gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

  gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  lockFlash(): void;

  lockZoom(): void;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  register(button: ASCameraButton): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;

  unfreezePreview(): void;

  unlockFlash(): void;

  unlockZoom(): void;

  zoomToWithRate(factor: number, rate: number): void;
}

declare const enum CameraSelection {
  Rear = 0,

  Front = 1,
}

declare class PreviewView extends UIView {
  static alloc(): PreviewView; // inherited from NSObject

  static appearance(): PreviewView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): PreviewView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): PreviewView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): PreviewView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): PreviewView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): PreviewView; // inherited from UIAppearance

  static layerClass(): typeof NSObject;

  static new(): PreviewView; // inherited from NSObject

  session: AVCaptureSession;

  readonly videoPreviewLayer: AVCaptureVideoPreviewLayer;
}

declare const enum SessionSetupResult {
  Success = 0,

  NotAuthorized = 1,

  ConfigurationFailed = 2,
}

declare class SwiftyCamButton extends UIButton {
  static alloc(): SwiftyCamButton; // inherited from NSObject

  static appearance(): SwiftyCamButton; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): SwiftyCamButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SwiftyCamButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): SwiftyCamButton; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SwiftyCamButton; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): SwiftyCamButton; // inherited from UIAppearance

  static buttonWithConfigurationPrimaryAction(configuration: UIButtonConfiguration, primaryAction: UIAction): SwiftyCamButton; // inherited from UIButton

  static buttonWithType(buttonType: UIButtonType): SwiftyCamButton; // inherited from UIButton

  static buttonWithTypePrimaryAction(buttonType: UIButtonType, primaryAction: UIAction): SwiftyCamButton; // inherited from UIButton

  static new(): SwiftyCamButton; // inherited from NSObject

  static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): SwiftyCamButton; // inherited from UIButton

  static systemButtonWithPrimaryAction(primaryAction: UIAction): SwiftyCamButton; // inherited from UIButton

  delegate: SwiftyCamButtonDelegate;
}

interface SwiftyCamButtonDelegate {
  buttonDidBeginLongPress(): void;

  buttonDidEndLongPress(): void;

  buttonWasTapped(): void;

  longPressDidReachMaximumDuration(): void;

  setMaxiumVideoDuration(): number;
}
declare var SwiftyCamButtonDelegate: {
  prototype: SwiftyCamButtonDelegate;
};

declare class SwiftyCamViewController extends UIViewController implements AVCaptureFileOutputRecordingDelegate, UIGestureRecognizerDelegate {
  static alloc(): SwiftyCamViewController; // inherited from NSObject

  static deviceWithMediaTypePreferringPosition(mediaType: string, position: AVCaptureDevicePosition): AVCaptureDevice;

  static new(): SwiftyCamViewController; // inherited from NSObject

  allowBackgroundAudio: boolean;

  asmaximumVideoDuration: number;

  beginZoomScale: number;

  cameraDelegate: SwiftyCamViewControllerDelegate;

  readonly currentCamera: CameraSelection;

  defaultCamera: CameraSelection;

  disableAudio: boolean;

  doubleTapCameraSwitch: boolean;

  flashEnabled: boolean;

  flashView: UIView;

  isCameraTorchOn: boolean;

  readonly isSessionRunning: boolean;

  readonly isVideoRecording: boolean;

  lowLightBoost: boolean;

  maxZoomScale: number;

  maximumVideoDuration: number;

  movieFileOutput: AVCaptureMovieFileOutput;

  photoCaptureThreshold: number;

  photoFileOutput: AVCaptureStillImageOutput;

  pinchToZoom: boolean;

  previewLayer: PreviewView;

  previousPanTranslation: number;

  readonly session: AVCaptureSession;

  setupResult: SessionSetupResult;

  shouldUseDeviceOrientation: boolean;

  swipeToZoom: boolean;

  swipeToZoomInverted: boolean;

  tapToFocus: boolean;

  videoCodecType: string;

  videoDevice: AVCaptureDevice;

  videoDeviceInput: AVCaptureDeviceInput;

  videoQuality: VideoQuality;

  videoTimeInterval: number;

  zoomScale: number;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  captureOutputDidFinishRecordingToOutputFileAtURLFromConnectionsError(
    output: AVCaptureFileOutput,
    outputFileURL: NSURL,
    connections: NSArray<AVCaptureConnection> | AVCaptureConnection[],
    error: NSError
  ): void;

  captureOutputDidStartRecordingToOutputFileAtURLFromConnections(output: AVCaptureFileOutput, fileURL: NSURL, connections: NSArray<AVCaptureConnection> | AVCaptureConnection[]): void;

  capturePhotoAsyncronouslyWithCompletionHandler(completionHandler: (p1: boolean) => void): void;

  changeFlashSettingsWithDeviceMode(device: AVCaptureDevice, mode: AVCaptureFlashMode): void;

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  deviceDidRotate(): void;

  disableFlash(): void;

  enableFlash(): void;

  gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldReceiveEvent(gestureRecognizer: UIGestureRecognizer, event: _UIEvent): boolean;

  gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

  gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

  gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  getImageOrientationForCamera(forCamera: CameraSelection): UIImageOrientation;

  getPreviewLayerOrientation(): AVCaptureVideoOrientation;

  getVideoOrientation(): AVCaptureVideoOrientation;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  processPhoto(imageData: NSData): UIImage;

  promptToAppSettings(): void;

  register(button: ASCameraButton): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;

  setBackgroundAudioPreference(): void;

  startVideoRecording(): void;

  stopVideoRecording(): void;

  subscribeToDeviceOrientationChangeNotifications(): void;

  switchCamera(): void;

  takePhoto(): void;

  toggleFlash(): void;

  unsubscribeFromDeviceOrientationChangeNotifications(): void;

  videoInputPresetFromVideoQualityWithQuality(quality: VideoQuality): string;
}

interface SwiftyCamViewControllerDelegate {
  swiftyCamDidBeginRecordingVideo(swiftyCam: SwiftyCamViewController, camera: CameraSelection): void;

  swiftyCamDidChangeZoomLevel(swiftyCam: SwiftyCamViewController, zoom: number): void;

  swiftyCamDidFinishProcessVideoAt(swiftyCam: SwiftyCamViewController, url: NSURL): void;

  swiftyCamDidFinishRecordingVideo(swiftyCam: SwiftyCamViewController, camera: CameraSelection): void;

  swiftyCamDidFocusAtPoint(swiftyCam: SwiftyCamViewController, point: CGPoint): void;

  swiftyCamDidSwitchCameras(swiftyCam: SwiftyCamViewController, camera: CameraSelection): void;

  swiftyCamDidTake(swiftyCam: SwiftyCamViewController, photo: UIImage): void;
}
declare var SwiftyCamViewControllerDelegate: {
  prototype: SwiftyCamViewControllerDelegate;
};

declare const enum VideoQuality {
  High = 0,

  Medium = 1,

  Low = 2,

  Resolution352x288 = 3,

  Resolution640x480 = 4,

  Resolution1280x720 = 5,

  Resolution1920x1080 = 6,

  Resolution3840x2160 = 7,

  Iframe960x540 = 8,

  Iframe1280x720 = 9,
}
