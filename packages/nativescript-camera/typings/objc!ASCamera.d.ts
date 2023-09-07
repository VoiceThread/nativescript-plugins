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

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;
}
