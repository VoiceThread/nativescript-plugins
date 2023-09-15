/* Copyright (c) 2016, Andrew Walz.

 Redistribution and use in source and binary forms, with or without modification,are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS
 BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import AVFoundation
import UIKit

// MARK: View Controller Declaration

/// A UIViewController Camera View Subclass

@objc open class SwiftyCamViewController: UIViewController {
  // MARK: Enumeration Declaration

  /// Enumeration for Camera Selection

  @objc public enum CameraSelection: Int {
    /// Camera on the back of the device
    case rear

    /// Camera on the front of the device
    case front
  }

  /// Enumeration for video quality of the capture session. Corresponds to a AVCaptureSessionPreset

  @objc public enum VideoQuality: Int {
    /// AVCaptureSessionPresetHigh
    case high

    /// AVCaptureSessionPresetMedium
    case medium

    /// AVCaptureSessionPresetLow
    case low

    /// AVCaptureSessionPreset352x288
    case resolution352x288

    /// AVCaptureSessionPreset640x480
    case resolution640x480

    /// AVCaptureSessionPreset1280x720
    case resolution1280x720

    /// AVCaptureSessionPreset1920x1080
    case resolution1920x1080

    /// AVCaptureSessionPreset3840x2160
    case resolution3840x2160

    /// AVCaptureSessionPresetiFrame960x540
    case iframe960x540

    /// AVCaptureSessionPresetiFrame1280x720
    case iframe1280x720
  }

  /**

     Result from the AVCaptureSession Setup

     - success: success
     - notAuthorized: User denied access to Camera of Microphone
     - configurationFailed: Unknown error
     */

  @objc public enum SessionSetupResult: Int {
    case success
    case notAuthorized
    case configurationFailed
  }

  // MARK: Public Variable Declarations

  /// Public Camera Delegate for the Custom View Controller Subclass

  @objc public var cameraDelegate: SwiftyCamViewControllerDelegate?

  /// Maxiumum video duration if SwiftyCamButton is used

  @objc public var maximumVideoDuration: Double = 0.0

  /// Video capture quality

  @objc public var videoQuality: VideoQuality = .high

  //
  @objc public var videoCodecType: AVVideoCodecType = AVVideoCodecType.hevc

  /// Disable audio
  @objc public var disableAudio = false

  /// Sets whether flash is enabled for photo and video capture

  @objc public var flashEnabled = false

  /// Sets whether Pinch to Zoom is enabled for the capture session

  @objc public var pinchToZoom = true

  /// Sets the maximum zoom scale allowed during gestures gesture

  @objc public var maxZoomScale = CGFloat.greatestFiniteMagnitude

  /// Sets whether Tap to Focus and Tap to Adjust Exposure is enabled for the capture session

  @objc public var tapToFocus = true

  /// Sets whether the capture session should adjust to low light conditions automatically
  ///
  /// Only supported on iPhone 5 and 5C

  @objc public var lowLightBoost = true

  /// Set whether SwiftyCam should allow background audio from other applications

  @objc public var allowBackgroundAudio = true

  /// Sets whether a double tap to switch cameras is supported

  @objc public var doubleTapCameraSwitch = true

  /// Sets whether swipe vertically to zoom is supported

  @objc public var swipeToZoom = true

  /// Sets whether swipe vertically gestures should be inverted

  @objc public var swipeToZoomInverted = false

  /// Set default launch camera

  @objc public var defaultCamera = CameraSelection.rear

  /// Sets wether the taken photo or video should be oriented according to the device orientation

  @objc public var shouldUseDeviceOrientation = false

  // MARK: Public Get-only Variable Declarations

  /// Returns true if video is currently being recorded

  @objc public private(set) var isVideoRecording = false

  /// Returns true if the capture session is currently running

  @objc public private(set) var isSessionRunning = false

  /// Returns the CameraSelection corresponding to the currently utilized camera

  @objc public private(set) var currentCamera = CameraSelection.rear

  // MARK: Private Constant Declarations

  /// Current Capture Session

  @objc public let session = AVCaptureSession()

  /// Serial queue used for setting up session

  @objc public let sessionQueue = DispatchQueue(label: "session queue", attributes: [])

  // MARK: Private Variable Declarations

  /// Variable for storing current zoom scale

  @objc public var zoomScale = CGFloat(1.0)

  /// Variable for storing initial zoom scale before Pinch to Zoom begins

  @objc public var beginZoomScale = CGFloat(1.0)

  /// Returns true if the torch (flash) is currently enabled

  @objc public var isCameraTorchOn = false

  /// Variable to store result of capture session setup

  @objc public var setupResult = SessionSetupResult.success

  /// BackgroundID variable for video recording

  public var backgroundRecordingID: UIBackgroundTaskIdentifier? = nil

  /// Video Input variable

  @objc public var videoDeviceInput: AVCaptureDeviceInput!

  /// Movie File Output variable

  @objc public var movieFileOutput: AVCaptureMovieFileOutput?

  /// Photo File Output variable

  @objc public var photoFileOutput: AVCaptureStillImageOutput?

  /// Video Device variable

  @objc public var videoDevice: AVCaptureDevice?

  /// PreviewView for the capture session

  @objc public var previewLayer: PreviewView!

  /// UIView for front facing flash

  @objc public var flashView: UIView?

  /// Pan Translation

  @objc public var previousPanTranslation: CGFloat = 0.0

  /// Last changed orientation

  public var deviceOrientation: UIDeviceOrientation?

  /// Disable view autorotation for forced portrait recorindg

  @objc override open var shouldAutorotate: Bool {
    return false
  }

  //MARL: init()
  // public init() {
  //   super.init()
  // }

  // required public init?(coder aDecoder: NSCoder) {
  //   fatalError("init(coder:) has not been implemented")
  // }
  // MARK: ViewDidLoad

  /// ViewDidLoad Implementation

  @objc override open func viewDidLoad() {
    super.viewDidLoad()
    previewLayer = PreviewView(
      frame: CGRect(x: 0.0, y: 0.0, width: view.bounds.width, height: view.bounds.height))

    // Add Gesture Recognizers

    addGestureRecognizersTo(view: previewLayer)

    view.addSubview(previewLayer)
    previewLayer.session = session

    // Test authorization status for Camera and Micophone

    switch AVCaptureDevice.authorizationStatus(for: AVMediaType.video) {
    case .authorized:

      // already authorized
      break
    case .notDetermined:

      // not yet determined
      sessionQueue.suspend()
      AVCaptureDevice.requestAccess(
        for: AVMediaType.video,
        completionHandler: { [unowned self] granted in
          if !granted {
            self.setupResult = .notAuthorized
          }
          self.sessionQueue.resume()
        })
    default:

      // already been asked. Denied access
      setupResult = .notAuthorized
    }
    sessionQueue.async { [unowned self] in
      self.configureSession()
    }
  }

  // MARK: ViewDidLayoutSubviews

  /// ViewDidLayoutSubviews() Implementation

  @objc override open func viewDidLayoutSubviews() {
    previewLayer.frame = CGRect(
      x: 0.0, y: 0.0, width: view.bounds.width, height: view.bounds.height)
    super.viewDidLayoutSubviews()
  }

  // MARK: ViewDidAppear

  /// ViewDidAppear(_ animated:) Implementation

  @objc override open func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)

    // Subscribe to device rotation notifications

    if shouldUseDeviceOrientation {
      subscribeToDeviceOrientationChangeNotifications()
    }

    // Set background audio preference

    setBackgroundAudioPreference()

    sessionQueue.async {
      switch self.setupResult {
      case .success:
        // Begin Session
        self.session.startRunning()
        self.isSessionRunning = self.session.isRunning

        // Preview layer video orientation can be set only after the connection is created
        DispatchQueue.main.async {
          self.previewLayer.videoPreviewLayer.connection?.videoOrientation =
            self.getPreviewLayerOrientation()
        }

      case .notAuthorized:
        // Prompt to App Settings
        self.promptToAppSettings()
      case .configurationFailed:
        // Unknown Error
        DispatchQueue.main.async { [unowned self] in
          let message = NSLocalizedString(
            "Unable to capture media",
            comment: "Alert message when something goes wrong during capture session configuration")
          let alertController = UIAlertController(
            title: "AVCam", message: message, preferredStyle: .alert)
          alertController.addAction(
            UIAlertAction(
              title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel,
              handler: nil))
          self.present(alertController, animated: true, completion: nil)
        }
      }
    }
  }

  // MARK: ViewDidDisappear

  /// ViewDidDisappear(_ animated:) Implementation

  @objc override open func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)

    // If session is running, stop the session
    if isSessionRunning == true {
      session.stopRunning()
      isSessionRunning = false
    }

    // Disble flash if it is currently enabled
    disableFlash()

    // Unsubscribe from device rotation notifications
    if shouldUseDeviceOrientation {
      unsubscribeFromDeviceOrientationChangeNotifications()
    }
  }

  // MARK: Public Functions

  /**

     Capture photo from current session

     UIImage will be returned with the SwiftyCamViewControllerDelegate function SwiftyCamDidTakePhoto(photo:)

     */

  @objc public func takePhoto() {
    guard let device = videoDevice else {
      return
    }

    if device.hasFlash == true
      && flashEnabled == true /* TODO: Add Support for Retina Flash and add front flash */
    {
      changeFlashSettings(device: device, mode: .on)
      capturePhotoAsyncronously(completionHandler: { _ in })

    } else if device.hasFlash == false && flashEnabled == true && currentCamera == .front {
      flashView = UIView(frame: view.frame)
      flashView?.alpha = 0.0
      flashView?.backgroundColor = UIColor.white
      previewLayer.addSubview(flashView!)

      UIView.animate(
        withDuration: 0.1, delay: 0.0, options: .curveEaseInOut,
        animations: {
          self.flashView?.alpha = 1.0

        },
        completion: { _ in
          self.capturePhotoAsyncronously(completionHandler: { _ in
            UIView.animate(
              withDuration: 0.1, delay: 0.0, options: .curveEaseInOut,
              animations: {
                self.flashView?.alpha = 0.0
              },
              completion: { _ in
                self.flashView?.removeFromSuperview()
              })
          })
        })
    } else {
      if device.isFlashActive == true {
        changeFlashSettings(device: device, mode: .off)
      }
      capturePhotoAsyncronously(completionHandler: { _ in })
    }
  }

  /**

     Begin recording video of current session

     SwiftyCamViewControllerDelegate function SwiftyCamDidBeginRecordingVideo() will be called

     */

  @objc public func startVideoRecording() {
    guard let movieFileOutput = movieFileOutput else {
      return
    }

    if currentCamera == .rear && flashEnabled == true {
      enableFlash()
    }

    if currentCamera == .front && flashEnabled == true {
      flashView = UIView(frame: view.frame)
      flashView?.backgroundColor = UIColor.white
      flashView?.alpha = 0.85
      previewLayer.addSubview(flashView!)
    }

    sessionQueue.async { [unowned self] in
      if !movieFileOutput.isRecording {
        if UIDevice.current.isMultitaskingSupported {
          self.backgroundRecordingID = UIApplication.shared.beginBackgroundTask(
            expirationHandler: nil)
        }

        // Update the orientation on the movie file output video connection before starting recording.
        let movieFileOutputConnection = self.movieFileOutput?.connection(with: AVMediaType.video)

        // flip video output if front facing camera is selected
        if self.currentCamera == .front {
          movieFileOutputConnection?.isVideoMirrored = true
        }

        movieFileOutputConnection?.videoOrientation = self.getVideoOrientation()

        // Start recording to a temporary file.
        let outputFileName = UUID().uuidString
        let outputFilePath = (NSTemporaryDirectory() as NSString).appendingPathComponent(
          (outputFileName as NSString).appendingPathExtension("mov")!)
        movieFileOutput.startRecording(
          to: URL(fileURLWithPath: outputFilePath), recordingDelegate: self)
        self.isVideoRecording = true
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(self, didBeginRecordingVideo: self.currentCamera)
        }
      } else {
        movieFileOutput.stopRecording()
      }
    }
  }

  /**

     Stop video recording video of current session

     SwiftyCamViewControllerDelegate function SwiftyCamDidFinishRecordingVideo() will be called

     When video has finished processing, the URL to the video location will be returned by SwiftyCamDidFinishProcessingVideoAt(url:)

     */

  @objc public func stopVideoRecording() {
    if movieFileOutput?.isRecording == true {
      isVideoRecording = false
      movieFileOutput!.stopRecording()
      disableFlash()

      if currentCamera == .front && flashEnabled == true && flashView != nil {
        UIView.animate(
          withDuration: 0.1, delay: 0.0, options: .curveEaseInOut,
          animations: {
            self.flashView?.alpha = 0.0
          },
          completion: { _ in
            self.flashView?.removeFromSuperview()
          })
      }
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didFinishRecordingVideo: self.currentCamera)
      }
    }
  }

  /**

     Switch between front and rear camera

     SwiftyCamViewControllerDelegate function SwiftyCamDidSwitchCameras(camera:  will be return the current camera selection

     */

  @objc public func switchCamera() {
    guard isVideoRecording != true else {
      // TODO: Look into switching camera during video recording
      print("[SwiftyCam]: Switching between cameras while recording video is not supported")
      return
    }

    guard session.isRunning == true else {
      return
    }

    switch currentCamera {
    case .front:
      currentCamera = .rear
    case .rear:
      currentCamera = .front
    }

    session.stopRunning()

    sessionQueue.async { [unowned self] in

      // remove and re-add inputs and outputs

      for input in self.session.inputs {
        self.session.removeInput(input)
      }

      self.addInputs()
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didSwitchCameras: self.currentCamera)
      }

      self.session.startRunning()
    }

    // If flash is enabled, disable it as the torch is needed for front facing camera
    disableFlash()
  }

  // MARK: Private Functions

  /// Configure session, add inputs and outputs

  fileprivate func configureSession() {
    guard setupResult == .success else {
      return
    }

    // Set default camera

    currentCamera = defaultCamera

    // begin configuring session

    session.beginConfiguration()
    configureVideoPreset()
    addVideoInput()
    if disableAudio == false {
      addAudioInput()
    }
    configureVideoOutput()
    configurePhotoOutput()

    session.commitConfiguration()
  }

  /// Add inputs after changing camera()

  fileprivate func addInputs() {
    session.beginConfiguration()
    configureVideoPreset()
    addVideoInput()
    if disableAudio == false {
      addAudioInput()
    }
    session.commitConfiguration()
  }

  // Front facing camera will always be set to VideoQuality.high
  // If set video quality is not supported, videoQuality variable will be set to VideoQuality.high
  /// Configure image quality preset

  fileprivate func configureVideoPreset() {
    if currentCamera == .front {
      session.sessionPreset = videoInputPresetFromVideoQuality(quality: .high)
    } else {
      if session.canSetSessionPreset(videoInputPresetFromVideoQuality(quality: videoQuality)) {
        session.sessionPreset = videoInputPresetFromVideoQuality(quality: videoQuality)
      } else {
        session.sessionPreset = videoInputPresetFromVideoQuality(quality: .high)
      }
    }
  }

  /// Add Video Inputs

  fileprivate func addVideoInput() {
    switch currentCamera {
    case .front:
      videoDevice = SwiftyCamViewController.deviceWithMediaType(
        AVMediaType.video, preferringPosition: .front)
    case .rear:
      videoDevice = SwiftyCamViewController.deviceWithMediaType(
        AVMediaType.video, preferringPosition: .back)
    }

    if let device = videoDevice {
      do {
        try device.lockForConfiguration()
        if device.isFocusModeSupported(.continuousAutoFocus) {
          device.focusMode = .continuousAutoFocus
          if device.isSmoothAutoFocusSupported {
            device.isSmoothAutoFocusEnabled = true
          }
        }

        if device.isExposureModeSupported(.continuousAutoExposure) {
          device.exposureMode = .continuousAutoExposure
        }

        if device.isWhiteBalanceModeSupported(.continuousAutoWhiteBalance) {
          device.whiteBalanceMode = .continuousAutoWhiteBalance
        }

        if device.isLowLightBoostSupported && lowLightBoost == true {
          device.automaticallyEnablesLowLightBoostWhenAvailable = true
        }

        device.unlockForConfiguration()
      } catch {
        print("[SwiftyCam]: Error locking configuration")
      }
    }

    do {
      let videoDeviceInput = try AVCaptureDeviceInput(device: videoDevice!)

      if session.canAddInput(videoDeviceInput) {
        session.addInput(videoDeviceInput)
        self.videoDeviceInput = videoDeviceInput
      } else {
        print("[SwiftyCam]: Could not add video device input to the session")
        print(session.canSetSessionPreset(videoInputPresetFromVideoQuality(quality: videoQuality)))
        setupResult = .configurationFailed
        session.commitConfiguration()
        return
      }
    } catch {
      print("[SwiftyCam]: Could not create video device input: \(error)")
      setupResult = .configurationFailed
      return
    }
  }

  /// Add Audio Inputs

  fileprivate func addAudioInput() {
    do {
      //            if #available(iOS 10.0, *) {
      //                let audioDevice = AVCaptureDevice.default(<#T##deviceType: AVCaptureDevice.DeviceType##AVCaptureDevice.DeviceType#>, for: .audio, position: <#T##AVCaptureDevice.Position#>)
      //            } else {
      //                // Fallback on earlier versions
      let audioDevice = AVCaptureDevice.default(for: .audio)
      //            }
      // .defaultDevice(withMediaType: AVMediaTypeAudio)
      let audioDeviceInput = try AVCaptureDeviceInput(device: audioDevice!)

      if session.canAddInput(audioDeviceInput) {
        session.addInput(audioDeviceInput)
      } else {
        print("[SwiftyCam]: Could not add audio device input to the session")
      }
    } catch {
      print("[SwiftyCam]: Could not create audio device input: \(error)")
    }
  }

  /// Configure Movie Output

  fileprivate func configureVideoOutput() {
    let movieFileOutput = AVCaptureMovieFileOutput()

    if session.canAddOutput(movieFileOutput) {
      session.addOutput(movieFileOutput)
      if let connection = movieFileOutput.connection(with: AVMediaType.video) {
        if connection.isVideoStabilizationSupported {
          connection.preferredVideoStabilizationMode = .auto
        }
      }
      self.movieFileOutput = movieFileOutput
    }
  }

  /// Configure Photo Output

  fileprivate func configurePhotoOutput() {
    let photoFileOutput = AVCaptureStillImageOutput()

    if session.canAddOutput(photoFileOutput) {
      photoFileOutput.outputSettings = [AVVideoCodecKey: AVVideoCodecType.jpeg]
      session.addOutput(photoFileOutput)
      self.photoFileOutput = photoFileOutput
    }
  }

  /// Orientation management

  @objc public func subscribeToDeviceOrientationChangeNotifications() {
    deviceOrientation = UIDevice.current.orientation
    NotificationCenter.default.addObserver(
      self, selector: #selector(deviceDidRotate), name: UIDevice.orientationDidChangeNotification,
      object: nil)
  }

  @objc public func unsubscribeFromDeviceOrientationChangeNotifications() {
    NotificationCenter.default.removeObserver(
      self, name: UIDevice.orientationDidChangeNotification, object: nil)
    deviceOrientation = nil
  }

  @objc public func deviceDidRotate() {
    if !UIDevice.current.orientation.isFlat {
      deviceOrientation = UIDevice.current.orientation
    }
  }

  @objc public func getPreviewLayerOrientation() -> AVCaptureVideoOrientation {
    // Depends on layout orientation, not device orientation
    switch UIApplication.shared.statusBarOrientation {
    case .portrait, .unknown:
      return AVCaptureVideoOrientation.portrait
    case .landscapeLeft:
      return AVCaptureVideoOrientation.landscapeLeft
    case .landscapeRight:
      return AVCaptureVideoOrientation.landscapeRight
    case .portraitUpsideDown:
      return AVCaptureVideoOrientation.portraitUpsideDown
    }
  }

  @objc public func getVideoOrientation() -> AVCaptureVideoOrientation {
    guard shouldUseDeviceOrientation, let deviceOrientation = deviceOrientation else {
      return previewLayer!.videoPreviewLayer.connection!.videoOrientation
    }

    switch deviceOrientation {
    case .landscapeLeft:
      // keep the same if using front camera
      return currentCamera == .rear ? .landscapeRight : .landscapeLeft
    case .landscapeRight:
      // keep the same if using front camera
      return currentCamera == .rear ? .landscapeLeft : .landscapeRight
    case .portraitUpsideDown:
      return .portraitUpsideDown
    default:
      return .portrait
    }
  }

  @objc public func getImageOrientation(forCamera: CameraSelection) -> UIImage.Orientation {
    guard shouldUseDeviceOrientation, let deviceOrientation = deviceOrientation else {
      return forCamera == .rear ? .right : .leftMirrored
    }

    switch deviceOrientation {
    case .landscapeLeft:
      return forCamera == .rear ? .up : .downMirrored
    case .landscapeRight:
      return forCamera == .rear ? .down : .upMirrored
    case .portraitUpsideDown:
      return forCamera == .rear ? .left : .rightMirrored
    default:
      return forCamera == .rear ? .right : .leftMirrored
    }
  }

  /**
     Returns a UIImage from Image Data.

     - Parameter imageData: Image Data returned from capturing photo from the capture session.

     - Returns: UIImage from the image data, adjusted for proper orientation.
     */

  @objc public func processPhoto(_ imageData: Data) -> UIImage {
    let dataProvider = CGDataProvider(data: imageData as CFData)
    let cgImageRef = CGImage(
      jpegDataProviderSource: dataProvider!, decode: nil, shouldInterpolate: true,
      intent: CGColorRenderingIntent.defaultIntent)

    // Set proper orientation for photo
    // If camera is currently set to front camera, flip image

    let image = UIImage(
      cgImage: cgImageRef!, scale: 1.0, orientation: getImageOrientation(forCamera: currentCamera))

    return image
  }

  @objc public func capturePhotoAsyncronously(completionHandler: @escaping (Bool) -> Void) {
    if let videoConnection = photoFileOutput?.connection(with: AVMediaType.video) {
      photoFileOutput?.captureStillImageAsynchronously(
        from: videoConnection,
        completionHandler: { sampleBuffer, _ in
          if sampleBuffer != nil {
            let imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(
              sampleBuffer!)
            let image = self.processPhoto(imageData!)

            // Call delegate and return new image
            DispatchQueue.main.async {
              self.cameraDelegate?.swiftyCam(self, didTake: image)
            }
            completionHandler(true)
          } else {
            completionHandler(false)
          }
        })
    } else {
      completionHandler(false)
    }
  }

  /// Handle Denied App Privacy Settings

  @objc public func promptToAppSettings() {
    // prompt User with UIAlertView

    DispatchQueue.main.async { [unowned self] in
      let message = NSLocalizedString(
        "AVCam doesn't have permission to use the camera, please change privacy settings",
        comment: "Alert message when the user has denied access to the camera")
      let alertController = UIAlertController(
        title: "AVCam", message: message, preferredStyle: .alert)
      alertController.addAction(
        UIAlertAction(
          title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel, handler: nil))
      alertController.addAction(
        UIAlertAction(
          title: NSLocalizedString("Settings", comment: "Alert button to open Settings"),
          style: .default,
          handler: { _ in
            if #available(iOS 10.0, *) {
              UIApplication.shared.openURL(URL(string: UIApplication.openSettingsURLString)!)
            } else {
              if let appSettings = URL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.openURL(appSettings)
              }
            }
          }))
      self.present(alertController, animated: true, completion: nil)
    }
  }

  /**
     Returns an AVCapturePreset from VideoQuality Enumeration

     - Parameter quality: ViewQuality enum

     - Returns: String representing a AVCapturePreset
     */

  @objc public func videoInputPresetFromVideoQuality(quality: VideoQuality)
    -> AVCaptureSession.Preset
  {
    switch quality {
    case .high: return AVCaptureSession.Preset.high
    case .medium: return AVCaptureSession.Preset.medium
    case .low: return AVCaptureSession.Preset.low
    case .resolution352x288: return AVCaptureSession.Preset.cif352x288
    case .resolution640x480: return AVCaptureSession.Preset.vga640x480
    case .resolution1280x720: return AVCaptureSession.Preset.hd1280x720
    case .resolution1920x1080: return AVCaptureSession.Preset.hd1920x1080
    case .iframe960x540: return AVCaptureSession.Preset.iFrame960x540
    case .iframe1280x720: return AVCaptureSession.Preset.iFrame1280x720
    case .resolution3840x2160:
      if #available(iOS 9.0, *) {
        return AVCaptureSession.Preset.hd4K3840x2160
      } else {
        print("[SwiftyCam]: Resolution 3840x2160 not supported")
        return AVCaptureSession.Preset.high
      }
    }
  }

  /// Get Devices

  @objc public class func deviceWithMediaType(
    _ mediaType: AVMediaType, preferringPosition position: AVCaptureDevice.Position
  ) -> AVCaptureDevice? {
    if let devices = AVCaptureDevice.devices(for: mediaType) as? [AVCaptureDevice] {
      return devices.filter { $0.position == position }.first
    }
    return nil
  }

  /// Enable or disable flash for photo

  @objc public func changeFlashSettings(device: AVCaptureDevice, mode: AVCaptureDevice.FlashMode) {
    do {
      try device.lockForConfiguration()
      device.flashMode = mode
      device.unlockForConfiguration()
    } catch {
      print("[SwiftyCam]: \(error)")
    }
  }

  /// Enable flash

  @objc public func enableFlash() {
    if isCameraTorchOn == false {
      toggleFlash()
    }
  }

  /// Disable flash

  @objc public func disableFlash() {
    if isCameraTorchOn == true {
      toggleFlash()
    }
  }

  /// Toggles between enabling and disabling flash

  @objc public func toggleFlash() {
    guard currentCamera == .rear else {
      // Flash is not supported for front facing camera
      return
    }

    let device = AVCaptureDevice.default(for: AVMediaType.video)
    // Check if device has a flash
    if (device?.hasTorch)! {
      do {
        try device?.lockForConfiguration()
        if device?.torchMode == AVCaptureDevice.TorchMode.on {
          device?.torchMode = AVCaptureDevice.TorchMode.off
          isCameraTorchOn = false
        } else {
          do {
            try device?.setTorchModeOn(level: 1.0)
            isCameraTorchOn = true
          } catch {
            print("[SwiftyCam]: \(error)")
          }
        }
        device?.unlockForConfiguration()
      } catch {
        print("[SwiftyCam]: \(error)")
      }
    }
  }

  /// Sets whether SwiftyCam should enable background audio from other applications or sources

  @objc public func setBackgroundAudioPreference() {
    guard allowBackgroundAudio == true else {
      return
    }

    do {
      try AVAudioSession.sharedInstance().setCategory(
        AVAudioSession.Category.playAndRecord,
        options: [.duckOthers, .defaultToSpeaker])

      session.automaticallyConfiguresApplicationAudioSession = false
    } catch {
      print("[SwiftyCam]: Failed to set background audio preference")
    }
  }
}

extension SwiftyCamViewController: SwiftyCamButtonDelegate {
  /// Sets the maximum duration of the SwiftyCamButton

  public func setMaxiumVideoDuration() -> Double {
    return maximumVideoDuration
  }

  /// Set UITapGesture to take photo

  public func buttonWasTapped() {
    takePhoto()
  }

  /// Set UILongPressGesture start to begin video

  public func buttonDidBeginLongPress() {
    startVideoRecording()
  }

  /// Set UILongPressGesture begin to begin end video

  public func buttonDidEndLongPress() {
    stopVideoRecording()
  }

  /// Called if maximum duration is reached

  public func longPressDidReachMaximumDuration() {
    stopVideoRecording()
  }
}

// MARK: AVCaptureFileOutputRecordingDelegate

extension SwiftyCamViewController: AVCaptureFileOutputRecordingDelegate {
  public func fileOutput(
    _ output: AVCaptureFileOutput, didFinishRecordingTo outputFileURL: URL,
    from connections: [AVCaptureConnection], error: Error?
  ) {
    print("empty stub for fileOutput")
  }

  /// Process newly captured video and write it to temporary directory

  public func capture(
    _ captureOutput: AVCaptureFileOutput!, didFinishRecordingToOutputFileAt outputFileURL: URL!,
    fromConnections connections: [Any]!, error: Error!
  ) {
    if let currentBackgroundRecordingID = backgroundRecordingID {
      backgroundRecordingID = UIBackgroundTaskIdentifier.invalid

      if currentBackgroundRecordingID != UIBackgroundTaskIdentifier.invalid {
        UIApplication.shared.endBackgroundTask(currentBackgroundRecordingID)
      }
    }
    if error != nil {
      print("[SwiftyCam]: Movie file finishing error: \(String(describing: error))")
    } else {
      // Call delegate function with the URL of the outputfile
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didFinishProcessVideoAt: outputFileURL)
      }
    }
  }
}

// MARK: UIGestureRecognizer Declarations

extension SwiftyCamViewController {
  /// Handle pinch gesture

  @objc fileprivate func zoomGesture(pinch: UIPinchGestureRecognizer) {
    guard pinchToZoom == true, currentCamera == .rear else {
      // ignore pinch
      return
    }
    do {
      let captureDevice = AVCaptureDevice.devices().first
      try captureDevice?.lockForConfiguration()

      zoomScale = min(
        maxZoomScale,
        max(1.0, min(beginZoomScale * pinch.scale, captureDevice!.activeFormat.videoMaxZoomFactor)))

      captureDevice?.videoZoomFactor = zoomScale

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      captureDevice?.unlockForConfiguration()

    } catch {
      print("[SwiftyCam]: Error locking configuration")
    }
  }

  /// Handle single tap gesture

  @objc fileprivate func singleTapGesture(tap: UITapGestureRecognizer) {
    guard tapToFocus == true else {
      // Ignore taps
      return
    }

    let screenSize = previewLayer!.bounds.size
    let tapPoint = tap.location(in: previewLayer!)
    let x = tapPoint.y / screenSize.height
    let y = 1.0 - tapPoint.x / screenSize.width
    let focusPoint = CGPoint(x: x, y: y)

    if let device = videoDevice {
      do {
        try device.lockForConfiguration()

        if device.isFocusPointOfInterestSupported == true {
          device.focusPointOfInterest = focusPoint
          device.focusMode = .autoFocus
        }
        device.exposurePointOfInterest = focusPoint
        device.exposureMode = AVCaptureDevice.ExposureMode.continuousAutoExposure
        device.unlockForConfiguration()
        // Call delegate function and pass in the location of the touch

        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(self, didFocusAtPoint: tapPoint)
        }
      } catch {
        // just ignore
      }
    }
  }

  /// Handle double tap gesture

  @objc fileprivate func doubleTapGesture(tap: UITapGestureRecognizer) {
    guard doubleTapCameraSwitch == true else {
      return
    }
    switchCamera()
  }

  @objc private func panGesture(pan: UIPanGestureRecognizer) {
    guard swipeToZoom == true && currentCamera == .rear else {
      // ignore pan
      return
    }
    let currentTranslation = pan.translation(in: view).y
    let translationDifference = currentTranslation - previousPanTranslation

    do {
      let captureDevice = AVCaptureDevice.devices().first
      try captureDevice?.lockForConfiguration()

      let currentZoom = captureDevice?.videoZoomFactor ?? 0.0

      if swipeToZoomInverted == true {
        zoomScale = min(
          maxZoomScale,
          max(
            1.0,
            min(
              currentZoom - (translationDifference / 75),
              captureDevice!.activeFormat.videoMaxZoomFactor)))
      } else {
        zoomScale = min(
          maxZoomScale,
          max(
            1.0,
            min(
              currentZoom + (translationDifference / 75),
              captureDevice!.activeFormat.videoMaxZoomFactor)))
      }

      captureDevice?.videoZoomFactor = zoomScale

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      captureDevice?.unlockForConfiguration()

    } catch {
      print("[SwiftyCam]: Error locking configuration")
    }

    if pan.state == .ended || pan.state == .failed || pan.state == .cancelled {
      previousPanTranslation = 0.0
    } else {
      previousPanTranslation = currentTranslation
    }
  }

  /**
     Add pinch gesture recognizer and double tap gesture recognizer to currentView

     - Parameter view: View to add gesture recognzier

     */

  fileprivate func addGestureRecognizersTo(view: UIView) {
    let pinchGesture = UIPinchGestureRecognizer(
      target: self, action: #selector(zoomGesture(pinch:)))
    pinchGesture.delegate = self
    view.addGestureRecognizer(pinchGesture)

    let singleTapGesture = UITapGestureRecognizer(
      target: self, action: #selector(singleTapGesture(tap:)))
    singleTapGesture.numberOfTapsRequired = 1
    singleTapGesture.delegate = self
    view.addGestureRecognizer(singleTapGesture)

    let doubleTapGesture = UITapGestureRecognizer(
      target: self, action: #selector(doubleTapGesture(tap:)))
    doubleTapGesture.numberOfTapsRequired = 2
    doubleTapGesture.delegate = self
    view.addGestureRecognizer(doubleTapGesture)

    let panGesture = UIPanGestureRecognizer(target: self, action: #selector(panGesture(pan:)))
    panGesture.delegate = self
    view.addGestureRecognizer(panGesture)
  }
}

// MARK: UIGestureRecognizerDelegate

extension SwiftyCamViewController: UIGestureRecognizerDelegate {
  /// Set beginZoomScale when pinch begins

  public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
    if gestureRecognizer.isKind(of: UIPinchGestureRecognizer.self) {
      beginZoomScale = zoomScale
    }
    return true
  }
}
