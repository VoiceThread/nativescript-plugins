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
  // private var d: AVCaptureSession.Preset

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

  //default to h264 for greater compatibility
  @objc public var videoCodecType: AVVideoCodecType = AVVideoCodecType.h264

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

  @objc public var shouldUseDeviceOrientation = true

  // MARK: Public Get-only Variable Declarations

  /// Returns true if video is currently being recorded

  // @objc public private(set) var isVideoRecording = false

  /// Returns true if the capture session is currently running

  // @objc public private(set) var isSessionRunning = false
  /// Returns true if the capture session is currently running
  @objc public var isSessionRunning: Bool { return session.isRunning }
  /// Returns the CameraSelection corresponding to the currently utilized camera

  @objc public private(set) var currentCamera = CameraSelection.rear

  // MARK: Private Constant Declarations

  /// Current Capture Session

  @objc public let session: AVCaptureSession = AVCaptureSession()

  /// Serial queue used for setting up session

  @objc public let sessionQueue: DispatchQueue = DispatchQueue(
    label: "session queue", attributes: [])

  // MARK: Private Variable Declarations

  /// Variable for storing current zoom scale

  @objc public var zoomScale: CGFloat = CGFloat(1.0)

  /// Variable for storing initial zoom scale before Pinch to Zoom begins

  @objc public var beginZoomScale: CGFloat = CGFloat(1.0)

  /// Returns true if the torch (flash) is currently enabled

  @objc public var isCameraTorchOn: Bool = false

  /// Variable to store result of capture session setup

  @objc public var setupResult = SessionSetupResult.success

  /// BackgroundID variable for video recording
  //Note: the UIBackgroundTaskIdentifier can't be converted to objc
  public var backgroundRecordingID: UIBackgroundTaskIdentifier? = nil

  /// Video Input variable

  @objc public var videoInput: AVCaptureDeviceInput!
  @objc public var videoOutput: AVCaptureVideoDataOutput?

  //ASCamera variables start
  @objc public var audioInput: AVCaptureDeviceInput?
  @objc public var audioOutput: AVCaptureAudioDataOutput?
  @objc public var assetWriter: AVAssetWriter?
  @objc public var assetWriterVideoInput: AVAssetWriterInput?
  @objc public var assetWriterAudioInput: AVAssetWriterInput?

  // public var orientation: AVCaptureVideoOrientation = .portrait {
  //   didSet {
  //     captureView.videoPreviewLayer.connection?.videoOrientation = self.orientation
  //     let connection = self.videoOutput?.connection(with: AVMediaType.video)
  //     if connection?.isVideoOrientationSupported == true {
  //       connection?.videoOrientation = self.orientation
  //     }
  //   }
  // }
  /// Sets default camera location on initial start
  @objc public var defaultCameraLocation = AVCaptureDevice.Position.back {
    didSet {
      if !isSessionRunning {
        self.cameraLocation = self.defaultCameraLocation
      }
    }
  }
  //
  @objc public var captureDeviceType = AVCaptureDevice.DeviceType.builtInWideAngleCamera
  // Sets whether or not video recordings will record audio
  @objc public var isAudioEnabled = true
  /// Returns true if the capture session is currently running
  // @objc public var isSessionRunning: Bool { return session.isRunning }
  // Directory used for uploading files Directoy
  @objc public var outputFileDirectory: URL = FileManager.default.temporaryDirectory
  /// Desired number of frame per secon. ASCamera will adjust the frame rate only when system is under pressure.
  @objc public var desiredFrameRate: Int = 30 {
    didSet {
      self.configureFrameRate()
    }
  }
  // Returns true if video is currently being recorded
  @objc public var isRecording: Bool {
    return self.didStartWritingSession
  }
  // allow background audio from other applications to continue playing during capture
  @objc public var allowsBackgroundAudio = true
  //ASCamera variables end

  /// Movie File Output variable

  // @objc public var movieFileOutput: AVCaptureMovieFileOutput?

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

  /// Disable view autorotation for forced portrait recording

  @objc override open var shouldAutorotate: Bool {
    return true
  }

  //ASCamera variables start
  private let sessionPrimaryQueueIdentifier = "ASCamera_sessionPrimaryQueue"
  private let sessionPrimaryQueueSpecificKey = DispatchSpecificKey<()>()
  // Serial queue used for setting up session
  private var sessionPrimaryQueue: DispatchQueue
  //
  private let sessionSecondaryQueueIdentifier = "ASCamera_sessionSecondaryQueue"
  private let sessionSecondaryQueueSpecificKey = DispatchSpecificKey<()>()
  // Serial queue used for setting up session
  private var sessionSecondaryQueue: DispatchQueue
  // Variable
  private var lastZoomScale = CGFloat(1.0)

  private var isSwitchingCameras = false
  // BackgroundID variable for video recording
  private var backgroundTaskID: UIBackgroundTaskIdentifier.RawValue.IntegerLiteralType?
  //
  private var didStartWritingSession = false
  //
  private var systemObserver: NSKeyValueObservation?
  //
  private var assetWriterInputPixelBufferAdator: AVAssetWriterInputPixelBufferAdaptor?
  //
  private var previousPresentationTimeStamp: CMTime = .zero
  //
  private var startingPresentationTimeStamp: CMTime = .zero
  //
  private var frameRate: Int = 0
  //
  private var frameCount = 0
  //
  private var shouldCapturePhotoFromDataOutput = false
  //
  private var willStartWritingSession = false
  //
  private(set) internal var shouldStartWritingSession = false
  //
  private var lastVideoSampleDate: Date = Date()
  // Returns true if video is currently being recorded
  // public var isRecording: Bool {
  //   return self.didStartWritingSession
  // }
  // public var desiredFrameRate: Int = 30 {
  //   didSet {
  //     self.configureFrameRate()
  //   }
  // }
  // Returns the current camera being used.
  private(set) public var cameraLocation = AVCaptureDevice.Position.back
  //
  private(set) public var recordingDuration: Double = 0.0

  //ASCamera variables end

  /*
  @objc private var shouldResetZoom = false
  /// Used ignore gesture calls after video is done recording.
  @objc private var shouldIgnore = false
  //
  @objc private var timer: Timer?
  //
  @objc private var timePassed = 0.0
  //
  @objc private var shouldStop = false
  //
  @objc private var shouldCreateTimer = false

  @objc private var cameraButton: ASCameraButton?
  // delegate
  // public weak var delegate: ASCameraDelegate?
  /// The time interval in which didUpdateRecordingDurationTo is called
  @objc public var videoTimeInterval = 0.1
  // In seconds
  @objc public var asmaximumVideoDuration = 100000.0
  //
  @objc public var photoCaptureThreshold = 2.0 {
    willSet { assert(newValue > 0, "[asCamera]: photoCaptureThreshold should be positive") }
  }
*/
  //MARL: init()
  // public init() {
  //   super.init()
  // }

  //ASCamera

  public init() {
    NSLog("init()")
    self.sessionPrimaryQueue = DispatchQueue(
      label: self.sessionPrimaryQueueIdentifier, qos: .userInitiated, target: DispatchQueue.global()
    )
    self.sessionSecondaryQueue = DispatchQueue(
      label: self.sessionSecondaryQueueIdentifier, qos: .utility, target: DispatchQueue.global())

    super.init(nibName: nil, bundle: nil)

    self.addApplicationObservers()
    self.addSessionObservers()
    if #available(iOS 11.1, *) {
      self.addSystemObervers()
    } else {
      NSLog("[msCamera]: iOS 11.1+ required for observers")
    }

    self.sessionPrimaryQueue.setSpecific(key: self.sessionPrimaryQueueSpecificKey, value: ())
    self.sessionSecondaryQueue.setSpecific(key: self.sessionSecondaryQueueSpecificKey, value: ())

    self.session.automaticallyConfiguresApplicationAudioSession = false
  }

  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  //ASCamera

  deinit {
    NSLog("deinit()")
    if self.session.isRunning {
      self.session.stopRunning()
    }
    removeApplicationObservers()
    removeSessionObservers()
    removeSystemObservers()
  }

  // required public init?(coder aDecoder: NSCoder) {
  //   fatalError("init(coder:) has not been implemented")
  // }
  // MARK: ViewDidLoad

  /// ViewDidLoad Implementation
  //SwiftyCamera

  @objc override open func viewDidLoad() {
    NSLog("viewDidLoad()")
    super.viewDidLoad()
    previewLayer = PreviewView(
      frame: CGRect(x: 0.0, y: 0.0, width: view.bounds.width, height: view.bounds.height))

    // Add Gesture Recognizers

    addGestureRecognizersTo(view: previewLayer)

    view.addSubview(previewLayer)
    previewLayer.session = session

    // Test authorization status for Camera and Micophone

    // switch AVCaptureDevice.authorizationStatus(for: AVMediaType.video) {
    // case .authorized:

    //   // already authorized
    //   break
    // case .notDetermined:

    //   // not yet determined
    //   sessionQueue.suspend()
    //   AVCaptureDevice.requestAccess(
    //     for: AVMediaType.video,
    //     completionHandler: { [unowned self] granted in
    //       if !granted {
    //         self.setupResult = .notAuthorized
    //       }
    //       self.sessionQueue.resume()
    //     })
    // default:

    //   // already been asked. Denied access
    //   setupResult = .notAuthorized
    // }
    sessionQueue.async { [unowned self] in
      self.configureSession()
    }
  }

  // MARK: ViewDidLayoutSubviews

  /// ViewDidLayoutSubviews() Implementation
  //SwiftyCamera
  @objc override open func viewDidLayoutSubviews() {
    previewLayer.frame = CGRect(
      x: 0.0, y: 0.0, width: view.bounds.width, height: view.bounds.height)
    super.viewDidLayoutSubviews()
  }

  // MARK: ViewDidAppear

  /// ViewDidAppear(_ animated:) Implementation
  //SwiftyCamera

  @objc override open func viewDidAppear(_ animated: Bool) {
    NSLog("viewDidAppear()")
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
        // self.isSessionRunning = self.session.isRunning

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
  //SwiftyCamera

  @objc override open func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)

    // If session is running, stop the session
    if isSessionRunning == true {
      session.stopRunning()
      // isSessionRunning = false
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
    NSLog("SCVC startVideoRecording()")
    assert(
      Thread.isMainThread,
      "[ASCamera]: This function -startRecording must be called on the main thread.")

    self.executeAsync { [weak self] in
      guard let self = self else { return }
      assert(
        !self.willStartWritingSession && !self.shouldStartWritingSession,
        "[ASCamera]: Called startRecording() when already recording.")
      self.willStartWritingSession = true

      // self.shouldCreateAssetWriter()

      let uuid = UUID().uuidString
      let fileType = self.assetWriter?.outputFileType ?? AVFileType.mp4
      assert(fileType.isVideoFileTypeSupported, "fileType is not supported for video")
      let outputFileName = (uuid as NSString).appendingPathExtension(fileType.stringValue())!
      let outputFileUrl = self.outputFileDirectory.appendingPathComponent(
        outputFileName, isDirectory: false)
      do {
        let assetWriter =
          try self.assetWriter ?? AVAssetWriter(outputURL: outputFileUrl, fileType: fileType)
        self.assetWriter = assetWriter
      } catch {
        print("[ASCamera]: error setting up avassetwrtter: \(error)")
        return
      }

      guard let assetWriter = self.assetWriter else { fatalError("asset writer is nil") }

      self.setBackgroundAudioPreference()
      // Adding audio her is necessary to mimic Snapchat/Instagram camera
      // self.session.beginConfiguration()
      // self.addAudioInput()
      // self.addAudioOutput()
      // self.session.commitConfiguration()

      var videoCompressionSettings = self.videoOutput?.recommendedVideoSettingsForAssetWriter(
        writingTo: assetWriter.outputFileType)
      var compressionProperties =
        videoCompressionSettings?[AVVideoCompressionPropertiesKey] as? [String: Any]
      compressionProperties?[AVVideoExpectedSourceFrameRateKey] = self.frameRate
      videoCompressionSettings?[AVVideoCompressionPropertiesKey] = compressionProperties
      let assetWriterVideoInput =
        self.assetWriterVideoInput
        ?? AVAssetWriterInput(
          mediaType: AVMediaType.video, outputSettings: videoCompressionSettings)
      assetWriterVideoInput.expectsMediaDataInRealTime = true

      if assetWriter.canAdd(assetWriterVideoInput) {
        assetWriter.add(assetWriterVideoInput)
      } else {
        print("[ASCamera]: Could not add VideoWriterInput to VideoWriter")
      }

      self.assetWriterVideoInput = assetWriterVideoInput

      if self.isAudioEnabled {
        let audioCompressionSettings =
          self.audioOutput?.recommendedAudioSettingsForAssetWriter(
            writingTo: assetWriter.outputFileType) as? [String: Any]
        let assetWriterAudioInput =
          self.assetWriterAudioInput
          ?? AVAssetWriterInput(
            mediaType: AVMediaType.audio, outputSettings: audioCompressionSettings)
        assetWriterAudioInput.expectsMediaDataInRealTime = true
        if assetWriter.canAdd(assetWriterAudioInput) {
          assetWriter.add(assetWriterAudioInput)
        } else {
          print("[ASCamera]: Could not add AudioWriterInput to VideoWriter")
        }
        self.assetWriterAudioInput = assetWriterAudioInput
      }

      self.assetWriterInputPixelBufferAdator = AVAssetWriterInputPixelBufferAdaptor.init(
        assetWriterInput: assetWriterVideoInput, sourcePixelBufferAttributes: nil)

      assetWriter.startWriting()

      // DispatchQueue.main.async {
      //   self.willBeginRecordingVideo()
      // }

      self.shouldStartWritingSession = true
      self.willStartWritingSession = false
    }
    // guard let movieFileOutput = movieFileOutput else {
    //   return
    // }

    // if currentCamera == .rear && flashEnabled == true {
    //   enableFlash()
    // }

    // if currentCamera == .front && flashEnabled == true {
    //   flashView = UIView(frame: view.frame)
    //   flashView?.backgroundColor = UIColor.white
    //   flashView?.alpha = 0.85
    //   previewLayer.addSubview(flashView!)
    // }

    // sessionQueue.async { [unowned self] in
    //   if !movieFileOutput.isRecording {
    //     if UIDevice.current.isMultitaskingSupported {
    //       self.backgroundRecordingID = UIApplication.shared.beginBackgroundTask(
    //         expirationHandler: nil)
    //     }

    //     // Update the orientation on the movie file output video connection before starting recording.
    //     let movieFileOutputConnection = self.movieFileOutput?.connection(with: AVMediaType.video)

    //     // flip video output if front facing camera is selected
    //     if self.currentCamera == .front {
    //       movieFileOutputConnection?.isVideoMirrored = true
    //     }

    //     movieFileOutputConnection?.videoOrientation = self.getVideoOrientation()

    //     // Start recording to a temporary file.
    //     let outputFileName = UUID().uuidString
    //     let outputFilePath = (NSTemporaryDirectory() as NSString).appendingPathComponent(
    //       (outputFileName as NSString).appendingPathExtension("mov")!)
    //     movieFileOutput.startRecording(
    //       to: URL(fileURLWithPath: outputFilePath), recordingDelegate: self)
    //     self.isVideoRecording = true
    //     DispatchQueue.main.async {
    //       self.cameraDelegate?.swiftyCam(self, didBeginRecordingVideo: self.currentCamera)
    //     }
    //   } else {
    //     movieFileOutput.stopRecording()
    //   }
    // }
  }

  /**

     Stop video recording video of current session

     SwiftyCamViewControllerDelegate function SwiftyCamDidFinishRecordingVideo() will be called

     When video has finished processing, the URL to the video location will be returned by SwiftyCamDidFinishProcessingVideoAt(url:)

     */

  @objc public func stopVideoRecording() {
    NSLog("SCVC stopVideoRecording()")
    assert(
      Thread.isMainThread,
      "[ASCamera]: This function -stopRecording must be called on the main thread.")

    self.executeAsync { [weak self] in
      guard let self = self else { return }
      assert(
        self.shouldStartWritingSession,
        "[ASCamera]: Called stopRecording() while video is not being recorded")
      guard let assetWriter = self.assetWriter else { return }
      self.shouldStartWritingSession = false
      self.didStartWritingSession = false
      self.frameCount = 0
      self.recordingDuration = 0.0

      self.assetWriterVideoInput?.markAsFinished()
      self.assetWriterAudioInput?.markAsFinished()
      // Must remove audio after recording in order to mimic Snapchat/Instagram camera
      // self.session.beginConfiguration()
      // self.removeAudioInput()
      // self.removeAudioOutput()
      // self.session.commitConfiguration()
      // self.setPreviousBackgroundAudioPreference()

      // DispatchQueue.main.async {
      //   self.didFinishRecordingVideo()
      // }

      assetWriter.finishWriting {
        DispatchQueue.main.async {
          print("Done with assets, calling events")
          if let error = assetWriter.error {
            self.didFailToProcessVideo(error)
          } else {
            self.didFinishProcessingVideoAt(assetWriter.outputURL)
          }
        }
      }

      self.assetWriter = nil
      self.assetWriterAudioInput = nil
      self.assetWriterVideoInput = nil
    }
    // if movieFileOutput?.isRecording == true {
    //   isVideoRecording = false
    //   movieFileOutput!.stopRecording()
    //   disableFlash()

    //   if currentCamera == .front && flashEnabled == true && flashView != nil {
    //     UIView.animate(
    //       withDuration: 0.1, delay: 0.0, options: .curveEaseInOut,
    //       animations: {
    //         self.flashView?.alpha = 0.0
    //       },
    //       completion: { _ in
    //         self.flashView?.removeFromSuperview()
    //       })
    //   }
    //   DispatchQueue.main.async {
    //     print("SCVC dispatching event didFinishRecordingVideo")
    //     self.cameraDelegate?.swiftyCam(self, didFinishRecordingVideo: self.currentCamera)
    //   }
    // }
  }

  @objc public func cancelVideoRecording() {
    assert(
      Thread.isMainThread,
      "[ASCamera]: This function -cancelRecording must be called on the main thread.")

    self.executeAsync { [weak self] in
      guard let self = self else { return }
      assert(
        self.shouldStartWritingSession,
        "[ASCamera]: Called cancelRecording() while video is not being recorded")
      guard let assetWriter = self.assetWriter else { return }
      self.shouldStartWritingSession = false
      self.didStartWritingSession = false
      self.frameCount = 0
      self.recordingDuration = 0.0

      let url = assetWriter.outputURL

      assetWriter.cancelWriting()

      // Must remove audio after recording in order to mimic Snapchat/Instagram camera
      self.session.beginConfiguration()
      self.removeAudioInput()
      self.removeAudioOutput()
      self.session.commitConfiguration()
      self.setPreviousBackgroundAudioPreference()

      // DispatchQueue.main.async {
      //   self.didCancelRecording(at: url)
      // }

      self.assetWriter = nil
      self.assetWriterAudioInput = nil
      self.assetWriterVideoInput = nil
    }
  }

  /**

     Switch between front and rear camera

     SwiftyCamViewControllerDelegate function SwiftyCamDidSwitchCameras(camera:  will be return the current camera selection

     */

  @objc public func switchCamera() {
    NSLog("SWC viewcontroller switchCamera()")

    // guard isVideoRecording != true else {
    //   // TODO: Look into switching camera during video recording
    //   NSLog("[SwiftyCam]: Switching between cameras while recording video is not supported")
    //   return
    // }

    // guard session.isRunning == true else {
    //   return
    // }

    switch currentCamera {
    case .front:
      currentCamera = .rear
    case .rear:
      currentCamera = .front
    }

    /*
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
    */
    guard !isSwitchingCameras else { return }
    self.isSwitchingCameras = true
    let zoomScale = lastZoomScale

    executeSync { [weak self] in
      guard let self = self else { return }
      self.lastZoomScale = self.videoDevice?.videoZoomFactor ?? 1.0

      self.cameraLocation = self.cameraLocation.opposite()

      self.session.beginConfiguration()

      if let videoInput = self.videoInput {
        self.session.removeInput(videoInput)
      }

      self.addVideoInput()
      self.configureSessionQuality()

      // Fix initial frame having incorrect orientation
      // let connection = self.videoOutput?.connection(with: .video)
      // if connection?.isVideoOrientationSupported == true {
      //   connection?.videoOrientation = self.orientation
      // }

      // DispatchQueue.main.async {
      //   self.didSwitchCamera()
      // }

      self.session.commitConfiguration()

      do {
        try self.videoDevice?.lockForConfiguration()
        self.videoDevice?.videoZoomFactor = zoomScale
        self.videoDevice?.unlockForConfiguration()
      } catch {
        print("[ASCamera]: Error locking configuration")
      }

      self.isSwitchingCameras = false
    }
    // }
  }

  // MARK: Private Functions

  /// Configure session, add inputs and outputs

  fileprivate func configureSession() {
    NSLog("viewcontroller configureSession()")
    // guard setupResult == .success else {
    //   return
    // }

    // // Set default camera

    // currentCamera = defaultCamera

    // // begin configuring session

    // session.beginConfiguration()
    // configureVideoPreset()
    // addVideoInput()
    // if disableAudio == false {
    //   addAudioInput()
    // }
    // // configureVideoOutput()
    // configurePhotoOutput()

    // session.commitConfiguration()
    self.executeSync { [weak self] in
      guard let self = self else { return }
      self.session.beginConfiguration()
      print("configureSession() removing inputs")
      for input in self.session.inputs {
        self.session.removeInput(input)
      }

      self.addVideoInput()
      print("configureSession() adding video input")
      self.addVideoOutput()
      print("configureSession() adding video output")
      self.addAudioInput()
      print("configureSession() adding audio input")
      self.addAudioOutput()
      print("configureSession() adding audio output")
      self.configureSessionQuality()
      print("configureSession() configured quality")
      self.session.commitConfiguration()
      NSLog("viewcontroller configureSession() done")
    }
  }

  /// Add inputs after changing camera()

  // fileprivate func addInputs() {
  //   NSLog("viewcontroller addInputs()")
  //   session.beginConfiguration()
  //   configureVideoPreset()
  //   addVideoInput()
  //   if disableAudio == false {
  //     addAudioInput()
  //   }
  //   session.commitConfiguration()
  // }

  // Front facing camera will always be set to VideoQuality.high
  // If set video quality is not supported, videoQuality variable will be set to VideoQuality.high
  /// Configure image quality preset

  // fileprivate func configureVideoPreset() {
  //   if currentCamera == .front {
  //     session.sessionPreset = videoInputPresetFromVideoQuality(quality: .high)
  //   } else {
  //     if session.canSetSessionPreset(videoInputPresetFromVideoQuality(quality: videoQuality)) {
  //       session.sessionPreset = videoInputPresetFromVideoQuality(quality: videoQuality)
  //     } else {
  //       session.sessionPreset = videoInputPresetFromVideoQuality(quality: .high)
  //     }
  //   }
  // }

  /// Add Video Inputs

  /*
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
        NSLog("[SwiftyCam]: Error locking configuration")
      }
    }

    do {
      let videoDeviceInput = try AVCaptureDeviceInput(device: videoDevice!)

      if session.canAddInput(videoDeviceInput) {
        session.addInput(videoDeviceInput)
        self.videoInput = videoDeviceInput
      } else {
        NSLog("[SwiftyCam]: Could not add video device input to the session")
        print(session.canSetSessionPreset(videoInputPresetFromVideoQuality(quality: videoQuality)))
        setupResult = .configurationFailed
        session.commitConfiguration()
        return
      }
    } catch {
      NSLog("[SwiftyCam]: Could not create video device input: \(error)")
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
        NSLog("[SwiftyCam]: Could not add audio device input to the session")
      }
    } catch {
      NSLog("[SwiftyCam]: Could not create audio device input: \(error)")
    }
  }

  /// Configure Movie Output

  // fileprivate func configureVideoOutput() {
  //   let movieFileOutput = AVCaptureMovieFileOutput()

  //   if session.canAddOutput(movieFileOutput) {
  //     session.addOutput(movieFileOutput)
  //     if let connection = movieFileOutput.connection(with: AVMediaType.video) {
  //       if connection.isVideoStabilizationSupported {
  //         connection.preferredVideoStabilizationMode = .auto
  //       }
  //     }
  //     self.movieFileOutput = movieFileOutput
  //   }
  // }
*/
  /// Configure Photo Output
  //TODO: replace with image buffer frame grab version instead

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
    NSLog("[ SwiftyCamViewController ] deviceDidRotate()")
    if !UIDevice.current.orientation.isFlat {
      deviceOrientation = UIDevice.current.orientation
    } else {
      NSLog("device is flat, ignoring")
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

    if let videoConnection: AVCaptureConnection = photoFileOutput?.connection(
      with: AVMediaType.video)
    {
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
        NSLog("[SwiftyCam]: Resolution 3840x2160 not supported")
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
      NSLog("[SwiftyCam]: \(error)")
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
            NSLog("[SwiftyCam]: \(error)")
          }
        }
        device?.unlockForConfiguration()
      } catch {
        NSLog("[SwiftyCam]: \(error)")
      }
    }
  }

  /// Sets whether SwiftyCam should enable background audio from other applications or sources
  @objc open func setPreviousBackgroundAudioPreference() {}
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
      NSLog("[SwiftyCam]: Failed to set background audio preference")
    }
  }
}

// @objc extension SwiftyCamViewController: SwiftyCamButtonDelegate {
//   /// Sets the maximum duration of the SwiftyCamButton

//   public func setMaxiumVideoDuration() -> Double {
//     return maximumVideoDuration
//   }

//   /// Set UITapGesture to take photo

//   public func buttonWasTapped() {
//     NSLog("cambutton buttonWasTapped")
//     takePhoto()
//   }

//   /// Set UILongPressGesture start to begin video

//   public func buttonDidBeginLongPress() {
//     NSLog("cambutton buttonDidBeginLongPress")
//     startVideoRecording()
//   }

//   /// Set UILongPressGesture begin to begin end video

//   public func buttonDidEndLongPress() {
//     NSLog("cambutton buttonDidEndLongPress")
//     stopVideoRecording()
//   }

//   /// Called if maximum duration is reached

//   public func longPressDidReachMaximumDuration() {
//     NSLog("cambutton longPressDidReachMaximumDuration")
//     stopVideoRecording()
//   }
// }

// MARK: AVCaptureFileOutputRecordingDelegate

// extension SwiftyCamViewController: AVCaptureFileOutputRecordingDelegate {
//   public func fileOutput(
//     _ output: AVCaptureFileOutput, didFinishRecordingTo outputFileURL: URL,
//     from connections: [AVCaptureConnection], error: Error?
//   ) {
//     NSLog("empty stub for fileOutput")
//     NSLog(outputFileURL.absoluteString)
//     // Call delegate function with the URL of the outputfile
//     DispatchQueue.main.async {
//       self.cameraDelegate?.swiftyCam(self, didFinishProcessVideoAt: outputFileURL)
//     }
//   }

//   /// Process newly captured video and write it to temporary directory

//   public func capture(
//     _ captureOutput: AVCaptureFileOutput!, didFinishRecordingToOutputFileAt outputFileURL: URL!,
//     fromConnections connections: [Any]!, error: Error!
//   ) {
//     if let currentBackgroundRecordingID = backgroundRecordingID {
//       backgroundRecordingID = UIBackgroundTaskIdentifier.invalid

//       if currentBackgroundRecordingID != UIBackgroundTaskIdentifier.invalid {
//         UIApplication.shared.endBackgroundTask(currentBackgroundRecordingID)
//       }
//     }
//     if error != nil {
//       NSLog("[SwiftyCam]: Movie file finishing error: \(String(describing: error))")
//     } else {
//       // Call delegate function with the URL of the outputfile
//       DispatchQueue.main.async {
//         self.cameraDelegate?.swiftyCam(self, didFinishProcessVideoAt: outputFileURL)
//       }
//     }
//   }
// }

// MARK: UIGestureRecognizer Declarations

extension SwiftyCamViewController {
  /// Handle pinch gesture

  @objc fileprivate func zoomGesture(pinch: UIPinchGestureRecognizer) {
    NSLog("view zoomGesture")
    guard pinchToZoom == true, currentCamera == .rear else {
      // ignore pinch
      NSLog("back camera or option disabled, ignoring")
      return
    }
    do {
      let videoDevice = AVCaptureDevice.devices().first
      try videoDevice?.lockForConfiguration()

      zoomScale = min(
        maxZoomScale,
        max(1.0, min(beginZoomScale * pinch.scale, videoDevice!.activeFormat.videoMaxZoomFactor)))

      videoDevice?.videoZoomFactor = zoomScale

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      videoDevice?.unlockForConfiguration()

    } catch {
      NSLog("[SwiftyCam]: Error locking configuration")
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
      let videoDevice = AVCaptureDevice.devices().first
      try videoDevice?.lockForConfiguration()

      let currentZoom = videoDevice?.videoZoomFactor ?? 0.0

      if swipeToZoomInverted == true {
        zoomScale = min(
          maxZoomScale,
          max(
            1.0,
            min(
              currentZoom - (translationDifference / 75),
              videoDevice!.activeFormat.videoMaxZoomFactor)))
      } else {
        zoomScale = min(
          maxZoomScale,
          max(
            1.0,
            min(
              currentZoom + (translationDifference / 75),
              videoDevice!.activeFormat.videoMaxZoomFactor)))
      }

      videoDevice?.videoZoomFactor = zoomScale

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      videoDevice?.unlockForConfiguration()

    } catch {
      NSLog("[SwiftyCam]: Error locking configuration")
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

/*
// Button related stuff
@objc extension SwiftyCamViewController {
  public func register(_ button: ASCameraButton) {
    self.cameraButton = button
    NSLog("register()")
    let longPressGestureRecognizer = LongPressGestureRecognizer()
    longPressGestureRecognizer.addTarget(self, action: #selector(self.handleButtonZoomPan(_:)))
    longPressGestureRecognizer.addTarget(self, action: #selector(self.handleButtonLongPress(_:)))
    longPressGestureRecognizer.minimumPressDuration = 0.0
    longPressGestureRecognizer.delegate = self
    button.addGestureRecognizer(longPressGestureRecognizer)
    button.longPressGestureRecognizer = longPressGestureRecognizer
    NSLog("done registering gesture handlers")
  }

  // Please Keep in mind that this function is called first by the gesture recognizer
  @objc private func handleButtonZoomPan(_ sender: LongPressGestureRecognizer) {
    // guard self.isPanToZoomEnabled else { return }
    // guard self.isSessionRunning, let videoDevice = self.captureDevice else { return }
    NSLog("handleButtonZoomPan")
    switch sender.state {
    case .began:
      // if !self.isRecording {
      //   self.startingZoomScale = videoDevice.videoZoomFactor
      //   self.shouldResetZoom = true
      // }
      fallthrough
    case .changed, .ended:
      // guard !self.shouldIgnore else { return }

      let location = sender.location(in: sender.view)

      // if location.y >= 0 {
      //   sender.setTranslation(.zero, in: nil)
      // }

      // let translation = sender.translation(in: nil)
      // let mulitiplier: CGFloat = min(
      //   max(1.0, self.maxZoomScale), videoDevice.activeFormat.videoMaxZoomFactor)
      // let senderScale = (-1 * translation.y / self.zoomPanMaxLength) * mulitiplier  // + 1.0
      // let scale = min(
      //   self.maxZoomScale, max(self.minZoomScale, self.startingZoomScale * senderScale))
      // let adjustedScale = min(videoDevice.activeFormat.videoMaxZoomFactor, max(1.0, scale))
      // self.zoom(to: adjustedScale)
      NSLog("changed/ended")
    case .cancelled:
      NSLog("cancelled")
    // if self.shouldResetZoom {
    // self.zoom(to: self.startingZoomScale, withRate: -1)
    // self.shouldResetZoom = false
    // }
    default: break
    }
  }

  // Please Keep in mind that this function is called second by the gesture recognizer
  @objc fileprivate func handleButtonLongPress(_ sender: UILongPressGestureRecognizer) {
    NSLog("handleButtonLongPress")
    // print("sender.state", sender.state)
    switch sender.state {
    case .began:
      // if !self.shouldStartWritingSession {
      //   self.start()
      // } else {
      //   self.shouldStop = true
      // }
      NSLog("began")
      self.cameraButton?.changeToSquare()
    case .ended:
      NSLog("ended")
      guard !self.shouldIgnore else {
        self.shouldIgnore = false
        return
      }

      //            if self.timePassed <= self.photoCaptureThreshold {
      //                // Take photo and discard Video
      //                self.capturePhoto()
      //
      //                let shouldUnlockFlash = self.isFlashLocked == false
      //                let shouldUnlockZoom = self.isZoomLocked == false
      //                self.lockFlash()
      //                self.lockZoom()
      //
      //                self.cancel()
      //
      //                self.executeAsync {
      //                    DispatchQueue.main.async { [weak self] in
      //                        if shouldUnlockFlash {
      //                            self?.unlockFlash()
      //                        }
      //                        if shouldUnlockZoom {
      //                            self?.unlockZoom()
      //                        }
      //                    }
      //                }
      //            } else
      // if self.stopsRecordingOnTouchUp, self.isRecording {
      //   self.stop()
      // } else if self.shouldStop {
      //   self.stop()
      //   self.shouldStop = false
      // }

      // if self.isVideoRecording {
      //   //stop
      //   self.isVideoRecording = false
      //   self.cameraButton?.changeToCircle()
      // } else {
      //   //start
      //   self.isVideoRecording = true
      //   self.cameraButton?.changeToSquare()
      // }
      self.cameraButton?.changeToCircle()
      //and trigger the takePhoto
      // self.takePhoto()
      takePhoto();

    case .cancelled:
      NSLog("cancelled")
      guard !self.shouldIgnore else {
        self.shouldIgnore = false
        return
      }
    // self.cancel()
    default:
      break
    }
  }

  // private func start() {
  //   self.shouldCreateTimer = true
  //   self.startRecording()
  // }

  // private func stop() {
  //   self.shouldCreateTimer = false
  //   self.invalidateTimer()
  //   self.stopRecording()
  // }

  // private func cancel() {
  //   self.shouldCreateTimer = false
  //   self.invalidateTimer()
  //   self.cancelRecording()
  // }

  @objc private func updateTimer() {
    self.timePassed += 0.1
    // self.delegate?.asCamera?(self, didUpdateRecordingDurationTo: self.timePassed)

    if self.timePassed >= self.asmaximumVideoDuration {
      DispatchQueue.main.async { [weak self] in
        self?.shouldIgnore = true
        // self?.stop()
        print("max duration passed, issuing stop")
        self?.invalidateTimer()
      }
    }
  }

  private func startTimer() {
    print("startTimer")
    guard self.shouldCreateTimer else { return }
    self.timer = Timer.scheduledTimer(
      timeInterval: self.videoTimeInterval, target: self,
      selector: #selector(self.updateTimer), userInfo: nil, repeats: true)
  }

  private func invalidateTimer() {
    self.timer?.invalidate()
    self.timer = nil
    self.timePassed = 0.0
    print("invalidateTimer")
    // self.delegate?.asCamera?(self, didUpdateRecordingDurationTo: self.timePassed)
  }
}

@objc extension SwiftyCamViewController: UIGestureRecognizerDelegate {
  public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
    // if gestureRecognizer == self.pinchGestureRecognizer {
    //   // return self.isPinchToZoomEnabled
    //   return true
    // }

    // if gestureRecognizer == self.singleTapGestureRecognizer {
    //   // return self.isTapToFocusEnabled
    //   return true
    // }

    // if gestureRecognizer == self.doubleTapGestureRecognizer {
    //   NSLog("doubletap seen")
    //   // return self.isDoubleTapToSwitchCameraEnabled
    //   return true
    // }

    // if gestureRecognizer is UILongPressGestureRecognizer && gestureRecognizer.view is ASCameraButton
    // {
    //   return true
    // }

    // return false
    return true
  }

  public func gestureRecognizer(
    _ gestureRecognizer: UIGestureRecognizer, shouldReceive press: UIPress
  ) -> Bool {
    return false
  }

  public func gestureRecognizer(
    _ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch
  ) -> Bool {
    return true
  }

  public func gestureRecognizer(
    _ gestureRecognizer: UIGestureRecognizer,
    shouldRequireFailureOf otherGestureRecognizer: UIGestureRecognizer
  ) -> Bool {
    return false
  }

  public func gestureRecognizer(
    _ gestureRecognizer: UIGestureRecognizer,
    shouldBeRequiredToFailBy otherGestureRecognizer: UIGestureRecognizer
  ) -> Bool {
    return false
  }

  public func gestureRecognizer(
    _ gestureRecognizer: UIGestureRecognizer,
    shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer
  ) -> Bool {
    return false
  }
}

private class LongPressGestureRecognizer: UILongPressGestureRecognizer {
  override var state: UIGestureRecognizer.State {
    didSet {
      if self.state == .began {
        self.startingLocation = self.location(in: self.view)
      }
    }
  }

  var startingLocation: CGPoint = .zero

  func translation(in view: UIView?) -> CGPoint {
    let startingLocation =
      self.view?.convert(self.startingLocation, to: view) ?? self.startingLocation
    let currentLocation = self.location(in: view)
    return CGPoint(
      x: currentLocation.x - startingLocation.x, y: currentLocation.y - startingLocation.y)
  }

  func setTranslation(_ translation: CGPoint, in view: UIView?) {
    self.startingLocation = self.location(in: self.view)
  }
}
*/

extension SwiftyCamViewController {
  private func addApplicationObservers() {
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleApplicationWillResignActive(_:)),
      name: UIApplication.willResignActiveNotification, object: nil)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleApplicationDidBecomeActive(_:)),
      name: UIApplication.didBecomeActiveNotification, object: nil)
  }

  private func removeApplicationObservers() {
    NotificationCenter.default.removeObserver(
      self, name: UIApplication.willResignActiveNotification, object: nil)
    NotificationCenter.default.removeObserver(
      self, name: UIApplication.didBecomeActiveNotification, object: nil)
  }

  private func addSessionObservers() {
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionRuntimeError(_:)),
      name: NSNotification.Name.AVCaptureSessionRuntimeError, object: self.session)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionWasInterrupted(_:)),
      name: NSNotification.Name.AVCaptureSessionWasInterrupted, object: self.session)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionInterruptionEnded(_:)),
      name: NSNotification.Name.AVCaptureSessionInterruptionEnded, object: self.session)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionDidStartRunning(_:)),
      name: NSNotification.Name.AVCaptureSessionDidStartRunning, object: self.session)
  }

  private func removeSessionObservers() {
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionRuntimeError, object: self.session)
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionWasInterrupted, object: self.session)
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionInterruptionEnded, object: self.session)
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionDidStartRunning, object: self.session)
  }

  @available(iOS 11.1, *)
  private func addSystemObervers() {
    guard let videoDevice: AVCaptureDevice = self.videoDevice else { return }
    systemObserver = videoDevice.observe(
      \AVCaptureDevice.systemPressureState, options: [.new]
    ) { [weak self] (_, change) in
      guard let self = self else { return }
      guard let systemPressureState = change.newValue else { return }
      let pressureLevel = systemPressureState.level
      switch pressureLevel {
      case .serious, .critical:
        if self.isRecording {
          NSLog(
            "[ASCamera]: Reached elevated system pressure level: \(pressureLevel). Throttling frame rate."
          )
          self.configureFrameRate(toframeRate: 20)
        }
      case .shutdown:
        NSLog("[ASCamera]: Session stopped running due to shutdown system pressure level.")
      default:
        if self.isRecording {
          NSLog(
            "[ASCamera]: Reached normal system pressure level: \(pressureLevel). Resetting frame rate."
          )
          self.configureFrameRate()
        }
      }
    }
  }

  private func removeSystemObservers() {
    systemObserver = nil
  }

  @objc open func handleApplicationWillResignActive(_ notification: Notification) {

  }

  @objc open func handleApplicationDidBecomeActive(_ notification: Notification) {

  }

  @objc open func handleSessionRuntimeError(_ notification: Notification) {
    NSLog("[ASCamera]: SessionRuntimeError: \(String(describing: notification.userInfo))")
    if let error = notification.userInfo?[AVCaptureSessionErrorKey] as? AVError {
      switch error.code {
      case .deviceIsNotAvailableInBackground:
        NSLog("Media services are not available in the background")
      case .mediaServicesWereReset:
        NSLog("Media services were reset")
      //self.session.startRunning()
      default:
        break
      }
    }
  }

  @objc open func handleSessionWasInterrupted(_ notification: Notification) {

  }

  @objc open func handleSessionInterruptionEnded(_ notification: Notification) {

  }

  @objc open func handleSessionDidStartRunning(_ notification: Notification) {

  }
}
extension SwiftyCamViewController {
  private func configureSessionQuality() {
    let preset: AVCaptureSession.Preset
    switch self.videoQuality {
    case .high:
      preset = AVCaptureSession.Preset.high
      // NSLog("Setting session quality high")
      break
    case .medium:
      preset = AVCaptureSession.Preset.medium
    case .low:
      preset = AVCaptureSession.Preset.low
    case .resolution352x288:
      preset = AVCaptureSession.Preset.cif352x288
    case .resolution640x480:
      preset = AVCaptureSession.Preset.vga640x480
    case .resolution1280x720:
      preset = AVCaptureSession.Preset.hd1280x720
    case .resolution1920x1080:
      preset = AVCaptureSession.Preset.hd1920x1080
    case .resolution3840x2160:
      preset = AVCaptureSession.Preset.hd4K3840x2160
    case .iframe960x540:
      preset = AVCaptureSession.Preset.iFrame960x540
    case .iframe1280x720:
      preset = AVCaptureSession.Preset.iFrame1280x720
    default:
      preset = AVCaptureSession.Preset.medium
      break
    }

    guard self.session.canSetSessionPreset(preset) else {
      NSLog(
        "[ASCamera]: Error could not set session preset to \(preset), which enables custom video quality control. Defaulting to \(session.sessionPreset)"
      )
      return
    }
    // session.sessionPreset = videoInputPresetFromVideoQuality(quality: preset)
    session.sessionPreset = preset
    NSLog(
      "[ASCamera]:  sessionPreset set to \(preset)."
    )
    self.configureFrameRate()
  }

  /// Fixing framerate does effect low light capture performance

  /// Todo: Make this functionality optional.

  private func configureFrameRate(toframeRate: Int? = nil) {
    NSLog("configureFrameRate()")
    guard let videoDevice = self.videoDevice else {
      NSLog("[ASCamera]: Cannot configure frame rate. Reason: Video Capture Device is nil")
      return
    }

    let desiredFrameRate = toframeRate ?? self.desiredFrameRate
    var frameRate: Int = desiredFrameRate

    let ranges = videoDevice.activeFormat.videoSupportedFrameRateRanges

    let maxFrameRates = ranges.map({ return $0.maxFrameRate })

    let minFrameRates = ranges.map({ return $0.minFrameRate })

    var maxFrameRate = -1
    var minFrameRate = -1

    maxFrameRates.forEach { (rate) in
      maxFrameRate = rate > Double(maxFrameRate) ? Int(rate) : maxFrameRate
    }

    minFrameRates.forEach { (rate) in
      minFrameRate = rate > Double(minFrameRate) ? Int(rate) : minFrameRate
    }

    if desiredFrameRate > maxFrameRate {
      NSLog(
        "[ASCamera]: Desired frame rate is higher than supported frame rates. setting to \(maxFrameRate) instead."
      )
      frameRate = maxFrameRate
    } else if desiredFrameRate < minFrameRate {
      NSLog(
        "[ASCamera]: Desired frame rate is lower than supported frame rates. setting to \(minFrameRate) instead."
      )
      frameRate = minFrameRate

    }
    NSLog("[ASCamera]: Same frame rate \(frameRate).")
    guard videoDevice.activeVideoMinFrameDuration.timescale != frameRate,
      videoDevice.activeVideoMaxFrameDuration.timescale != frameRate
    else { return }

    do {
      try videoDevice.lockForConfiguration()
      videoDevice.activeVideoMinFrameDuration = CMTime.init(
        value: 1, timescale: CMTimeScale(frameRate))
      videoDevice.activeVideoMaxFrameDuration = CMTime.init(
        value: 1, timescale: CMTimeScale(frameRate))
      videoDevice.unlockForConfiguration()

      self.frameRate = frameRate
      NSLog("[ASCamera]: Set frame rate to \(frameRate).")
    } catch {
      NSLog("[ASCamera]: Could not lock device for configuration: \(error)")
    }
    NSLog("configureFrameRate() done")
  }

  private func addVideoInput() {
    self.videoDevice =
      AVCaptureDevice.DiscoverySession(
        deviceTypes: [captureDeviceType], mediaType: AVMediaType.video, position: cameraLocation
      ).devices.first

    self.removeSystemObservers()
    if #available(iOS 11.1, *) {
      self.addSystemObervers()
    } else {
      // Fallback on earlier versions
      NSLog("[msCamera]: iOS 11.1+ required for observers")
    }

    guard let videoDevice = self.videoDevice else {
      NSLog("[ASCamera]: Could not add video device input to the session")
      return
    }

    if let device: AVCaptureDevice = self.videoDevice {
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
        NSLog("[SwiftyCam]: Error locking configuration")
      }
    }

    do {

      let videoDeviceInput = try AVCaptureDeviceInput(device: videoDevice)
      if self.session.canAddInput(videoDeviceInput) {
        self.session.addInput(videoDeviceInput)
        self.videoInput = videoDeviceInput
      } else {
        // NSLog("[ASCamera]: Could not add video device input to the session")
        NSLog("[SwiftyCam]: Could not add video device input to the session")
        print(session.canSetSessionPreset(videoInputPresetFromVideoQuality(quality: videoQuality)))
        setupResult = .configurationFailed
        session.commitConfiguration()
        return
      }
    } catch {
      // NSLog("[ASCamera]: Could not create video device input: \(error)")
      NSLog("[SwiftyCam]: Could not create video device input: \(error)")
      setupResult = .configurationFailed
      return
    }
  }

  private func addVideoOutput() {
    let dataOutput = AVCaptureVideoDataOutput.init()
    dataOutput.setSampleBufferDelegate(self, queue: self.sessionSecondaryQueue)

    if self.session.canAddOutput(dataOutput) {
      self.session.addOutput(dataOutput)
    }

    // let connection = dataOutput.connection(with: AVMediaType.video)
    // if connection?.isVideoOrientationSupported == true {
    //   connection?.videoOrientation = self.orientation
    // }

    self.videoOutput = dataOutput
  }

  private func addAudioInput() {
    guard let audioDevice = AVCaptureDevice.default(for: AVMediaType.audio) else {
      NSLog("[ASCamera]: Could not add audio device input to the session")
      return
    }
    do {
      let audioDeviceInput = try AVCaptureDeviceInput(device: audioDevice)
      if self.session.canAddInput(audioDeviceInput) {
        self.session.addInput(audioDeviceInput)
        self.audioInput = audioDeviceInput
      } else {
        NSLog("[ASCamera]: Could not add audio device input to the session")
      }
    } catch {
      NSLog("[ASCamera]: Could not create audio device input: \(error)")
    }
  }

  private func addAudioOutput() {
    let dataOutput = AVCaptureAudioDataOutput.init()
    dataOutput.setSampleBufferDelegate(self, queue: self.sessionSecondaryQueue)

    if self.session.canAddOutput(dataOutput) {
      self.session.addOutput(dataOutput)
      self.audioOutput = dataOutput
    }
  }

  private func removeAudioOutput() {
    guard let audioOutput = self.audioOutput else { return }
    self.session.removeOutput(audioOutput)
    self.audioOutput = nil
  }

  private func removeAudioInput() {
    guard let audioInput = self.audioInput else { return }
    self.session.removeInput(audioInput)
    self.audioInput = nil
  }
}

//Adding this section and next causes type issues until I rewrite for new approach and remove old recorder approach for video

@objc extension SwiftyCamViewController {
  //
  // func shouldCreateAssetWriter() {

  // }
  ///
  // func willBeginRecordingVideo() {
  //   if UIDevice.current.isMultitaskingSupported {
  //     let backgroundTaskID = UIApplication.shared.beginBackgroundTask { [weak self] in
  //       // End Task
  //       if self?.isRecording == true {
  //         //TODO: fix this
  //         // self?.stopRecording()
  //       }
  //     }
  //     self.backgroundTaskID = backgroundTaskID.rawValue
  //   }
  // }
  ///
  // func didBeginRecordingVideo() {

  // }
  ///
  // func didFinishRecordingVideo() {

  // }
  ///

  func didFinishProcessingVideoAt(_ url: URL) {
    NSLog("didFinishProcessingVideoAt")
    NSLog(url.absoluteString)
    if let currentBackgroundTaskID = backgroundTaskID {
      backgroundTaskID = UIBackgroundTaskIdentifier.invalid.rawValue

      if currentBackgroundTaskID != UIBackgroundTaskIdentifier.invalid.rawValue {
        UIApplication.shared.endBackgroundTask(
          UIBackgroundTaskIdentifier(rawValue: currentBackgroundTaskID))
      }
    }
    //send event with url generated from recording process
    DispatchQueue.main.async {
      self.cameraDelegate?.swiftyCam(self, didFinishProcessVideoAt: url)
    }
  }

  ///

  func didFailToProcessVideo(_ error: Error) {
    NSLog("didFailToProcessVideo")
    NSLog(error.localizedDescription)
    if let currentBackgroundTaskID = backgroundTaskID {
      backgroundTaskID = UIBackgroundTaskIdentifier.invalid.rawValue

      if currentBackgroundTaskID != UIBackgroundTaskIdentifier.invalid.rawValue {
        UIApplication.shared.endBackgroundTask(
          UIBackgroundTaskIdentifier(rawValue: currentBackgroundTaskID))
      }
    }
  }

  ///
  // func didSwitchCamera() {

  // }
  // ///
  // func didCancelRecording(at url: URL) {

  // }
  ///
  // func willCaptureImage() {

  // }
  ///
  // func didCaptureImage() {

  // }
  ///
  // func didFinishProcessing(image: UIImage, with properties: CFDictionary) {

  // }
}

@objc
extension SwiftyCamViewController: AVCaptureVideoDataOutputSampleBufferDelegate,
  AVCaptureAudioDataOutputSampleBufferDelegate
{

  public func captureOutput(
    _ output: AVCaptureOutput, didDrop sampleBuffer: CMSampleBuffer,
    from connection: AVCaptureConnection
  ) {
    NSLog("[ASCamera]: Dropped \(output == self.audioOutput ? "audio" : "video") Frame")
  }

  public func captureOutput(
    _ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer,
    from connection: AVCaptureConnection
  ) {

    if self.shouldCapturePhotoFromDataOutput {
      self.shouldCapturePhotoFromDataOutput = false

      self.handlePhotoCapture(sampleBuffer)
    }

    guard self.shouldStartWritingSession else { return }

    let isDataReady = CMSampleBufferDataIsReady(sampleBuffer)
    guard isDataReady, let assetWriter = self.assetWriter else { return }

    if !self.didStartWritingSession {
      let presentationTimestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      assetWriter.startSession(atSourceTime: presentationTimestamp)
      self.didStartWritingSession = true
      // DispatchQueue.main.async {
      //   self.didBeginRecordingVideo()
      // }
      self.startingPresentationTimeStamp = presentationTimestamp
      self.previousPresentationTimeStamp = presentationTimestamp
    }

    guard self.isRecording else { return }

    if let assetWriterAudioInput = self.assetWriterAudioInput,
      output == self.audioOutput, assetWriterAudioInput.isReadyForMoreMediaData
    {
      let since = Date().timeIntervalSince(self.lastVideoSampleDate)
      if since < 0.05 {
        let success = assetWriterAudioInput.append(sampleBuffer)
        if !success, let error = assetWriter.error {
          print(error)
          fatalError(error.localizedDescription)
        }
      }
    }

    if let assetWriterInputPixelBufferAdator = self.assetWriterInputPixelBufferAdator,
      let assetWriterVideoInput = self.assetWriterVideoInput,
      output == self.videoOutput,
      assetWriterVideoInput.isReadyForMoreMediaData,
      let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)
    {

      let currentPresentationTimestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      let previousPresentationTimeStamp = self.previousPresentationTimeStamp

      // Frame correction logic. Fixes the bug of video/audio unsynced when switching cameras
      let currentFramePosition =
        (Double(self.frameRate) * Double(currentPresentationTimestamp.value))
        / Double(currentPresentationTimestamp.timescale)
      let previousFramePosition =
        (Double(self.frameRate) * Double(previousPresentationTimeStamp.value))
        / Double(previousPresentationTimeStamp.timescale)
      var presentationTimeStamp = currentPresentationTimestamp
      let maxFrameDistance = 1.1
      let frameDistance = currentFramePosition - previousFramePosition
      if frameDistance > maxFrameDistance {
        let expectedFramePosition = previousFramePosition + 1.0
        //                print(
        //                    "[asCamera]: Frame at incorrect position moving from \(currentFramePosition) to \(expectedFramePosition)")

        let newFramePosition =
          (expectedFramePosition * Double(currentPresentationTimestamp.timescale))
          / Double(self.frameRate)

        let newPresentationTimeStamp = CMTime.init(
          value: CMTimeValue(newFramePosition), timescale: currentPresentationTimestamp.timescale)

        presentationTimeStamp = newPresentationTimeStamp
      }

      let success = assetWriterInputPixelBufferAdator.append(
        pixelBuffer, withPresentationTime: presentationTimeStamp)
      if !success, let error = assetWriter.error {
        print(error)
        fatalError(error.localizedDescription)
      }
      self.lastVideoSampleDate = Date()
      self.previousPresentationTimeStamp = presentationTimeStamp

      let startTime =
        Double(startingPresentationTimeStamp.value)
        / Double(startingPresentationTimeStamp.timescale)
      let currentTime =
        Double(currentPresentationTimestamp.value) / Double(currentPresentationTimestamp.timescale)
      let previousTime =
        Double(previousPresentationTimeStamp.value)
        / Double(previousPresentationTimeStamp.timescale)

      self.frameCount += 1
      self.recordingDuration = currentTime - startTime

      if (Int(previousTime - startTime) == Int(currentTime - startTime)) == false {
        //print("[asCamera]: Frame Count for previous second: \(self.frameCount)")
        self.frameCount = 0
      }
    }
    //        if output == self.audioOutput {
    //            self.handleAudioBuffer(sampleBuffer)
    //        }
    //
    //        if output == self.videoOutput {
    //            self.handleVideoBuffer(sampleBuffer)
    //        }
  }

  private func handlePhotoCapture(_ sampleBuffer: CMSampleBuffer) {
    let isDataReady = CMSampleBufferDataIsReady(sampleBuffer)
    guard isDataReady else {
      NSLog("[ASCamera]: SampleBuffer was not ready")
      return
    }

    // DispatchQueue.main.async { [weak self] in
    //   self?.didCaptureImage()
    // }

    guard let cgImage = self.cgImage(from: sampleBuffer) else { return }
    let size = UIScreen.main.bounds.size
    guard let image = UIImage.init(cgImage: cgImage).scaled(toHeight: size.height) else { return }
    let properties = metadata(from: sampleBuffer)

    // DispatchQueue.main.async { [weak self] in
    //   self?.didFinishProcessing(image: image, with: properties)
    // }
  }

  private func handleAudioBuffer(_ sampleBuffer: CMSampleBuffer) {
    guard let assetWriter = self.assetWriter else { return }
    if let assetWriterAudioInput = self.assetWriterAudioInput,
      assetWriterAudioInput.isReadyForMoreMediaData
    {
      let success = assetWriterAudioInput.append(sampleBuffer)
      if !success, let error = assetWriter.error {
        print(error)
        fatalError(error.localizedDescription)
      }
    }
  }

  private func handleVideoBuffer(_ sampleBuffer: CMSampleBuffer) {
    guard let assetWriter = self.assetWriter else { return }
    if let assetWriterInputPixelBufferAdator = self.assetWriterInputPixelBufferAdator,
      let assetWriterVideoInput = self.assetWriterVideoInput,
      assetWriterVideoInput.isReadyForMoreMediaData,
      let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)
    {

      let currentPresentationTimestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      let previousPresentationTimeStamp = self.previousPresentationTimeStamp

      // Frame correction logic. Fixes the bug of video/audio unsynced when switching cameras
      let currentFramePosition =
        (Double(self.frameRate) * Double(currentPresentationTimestamp.value))
        / Double(currentPresentationTimestamp.timescale)
      let previousFramePosition =
        (Double(self.frameRate) * Double(previousPresentationTimeStamp.value))
        / Double(previousPresentationTimeStamp.timescale)
      var presentationTimeStamp = currentPresentationTimestamp
      let maxFrameDistance = 1.1
      let frameDistance = currentFramePosition - previousFramePosition
      if frameDistance > maxFrameDistance {
        let expectedFramePosition = previousFramePosition + 1.0
        //                print(
        //                    "[ASCamera]: Frame at incorrect position moving from \(currentFramePosition) to \(expectedFramePosition)")
        let newFramePosition =
          (expectedFramePosition * Double(currentPresentationTimestamp.timescale))
          / Double(self.frameRate)

        let newPresentationTimeStamp = CMTime.init(
          value: CMTimeValue(newFramePosition), timescale: currentPresentationTimestamp.timescale)

        presentationTimeStamp = newPresentationTimeStamp
      }

      let success = assetWriterInputPixelBufferAdator.append(
        pixelBuffer, withPresentationTime: presentationTimeStamp)
      if !success, let error = assetWriter.error {
        print(error)
        fatalError(error.localizedDescription)
      }

      self.previousPresentationTimeStamp = presentationTimeStamp

      let startTime =
        Double(startingPresentationTimeStamp.value)
        / Double(startingPresentationTimeStamp.timescale)
      let currentTime =
        Double(currentPresentationTimestamp.value) / Double(currentPresentationTimestamp.timescale)
      let previousTime =
        Double(previousPresentationTimeStamp.value)
        / Double(previousPresentationTimeStamp.timescale)

      self.frameCount += 1
      self.recordingDuration = currentTime - startTime

      if (Int(previousTime - startTime) == Int(currentTime - startTime)) == false {
        //print("[ASCamera]: Frame Count for previous second: \(self.frameCount)")
        self.frameCount = 0
      }
    }
  }

}

extension SwiftyCamViewController {
  private func cgImage(from sampleBuffer: CMSampleBuffer) -> CGImage? {
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return nil }
    // Lock the base address of the pixel buffer
    CVPixelBufferLockBaseAddress(pixelBuffer, CVPixelBufferLockFlags.readOnly)
    let ciImage = CIImage.init(cvPixelBuffer: pixelBuffer)
    let context = CIContext.init()
    let cgimage = context.createCGImage(ciImage, from: ciImage.extent)
    // Unlock the pixel buffer
    CVPixelBufferUnlockBaseAddress(pixelBuffer, CVPixelBufferLockFlags.readOnly)
    return cgimage
  }

  private func metadata(from sampleBuffer: CMSampleBuffer) -> NSMutableDictionary {
    let rawMetadata = CMCopyDictionaryOfAttachments(
      allocator: nil, target: sampleBuffer,
      attachmentMode: CMAttachmentMode(kCMAttachmentMode_ShouldPropagate))
    let metadata = CFDictionaryCreateMutableCopy(nil, 0, rawMetadata) as NSMutableDictionary
    return metadata
  }

  // private func metadata(from url: URL) {
  //   if let imageSource = CGImageSourceCreateWithURL(url as CFURL, nil) {
  //     let imageProperties = CGImageSourceCopyPropertiesAtIndex(imageSource, 0, nil)
  //     if let dict = imageProperties as? [String: Any] {
  //       print(dict)
  //     }

  //     guard let imageMetadata = CGImageSourceCopyMetadataAtIndex(imageSource, 0, .none) else {
  //       return
  //     }

  //     guard let tags = CGImageMetadataCopyTags(imageMetadata) else {
  //       return
  //     }
  //     // swiftlint:disable force_cast
  //     var result = [String: Any]()
  //     for tag in tags as NSArray {
  //       let tagMetadata = tag as! CGImageMetadataTag
  //       if let cfName = CGImageMetadataTagCopyName(tagMetadata) {
  //         let name = String(cfName)
  //         let value = CGImageMetadataTagCopyValue(tagMetadata)
  //         result[name] = value
  //       }
  //     }

  //     // swiftlint:enable force_cast

  //     print(result)
  //   }
  // }

  public func createData(
    from cgImage: CGImage, fileType: AVFileType, quality: CGFloat,
    properties: NSMutableDictionary = NSMutableDictionary()
  ) -> Data? {

    let imageData = NSMutableData()
    let numberOfImages = 1
    guard
      let destination = CGImageDestinationCreateWithData(
        imageData as CFMutableData, fileType as CFString, numberOfImages, nil)
    else { return nil }

    let options = [kCGImageDestinationLossyCompressionQuality: quality]
    properties.addEntries(from: options)
    CGImageDestinationAddImage(destination, cgImage, properties as CFDictionary)
    CGImageDestinationFinalize(destination)

    return imageData as Data
  }

  public func save(
    cgImage: CGImage, fileType: AVFileType, quality: CGFloat,
    properties: NSMutableDictionary = NSMutableDictionary()
  ) -> URL? {

    let uuid = UUID().uuidString
    assert(fileType.isImageFileTypeSupported, "fileType is not supported for video")
    let outputFileName = (uuid as NSString).appendingPathExtension(fileType.stringValue())!
    let outputFileUrl = self.outputFileDirectory.appendingPathComponent(
      outputFileName, isDirectory: false)

    //var qual = quality
    //let compression = CFNumberCreate(kCFAllocatorDefault, CFNumberType.floatType, &qual)
    let numberOfImages = 1
    guard
      let destination = CGImageDestinationCreateWithURL(
        outputFileUrl as CFURL, fileType as CFString, numberOfImages, nil)
    else { return nil }
    let options = [kCGImageDestinationLossyCompressionQuality: quality]
    properties.addEntries(from: options)
    CGImageDestinationAddImage(destination, cgImage, properties as CFDictionary)

    guard CGImageDestinationFinalize(destination) else { return nil }

    return outputFileUrl
  }
}

@objc extension UIImage {
  fileprivate func scaled(toWidth width: CGFloat) -> UIImage? {
    let oldWidth = self.size.width
    let scaleFactor = width / oldWidth
    let newHeight = self.size.height * scaleFactor
    let newWidth = oldWidth * scaleFactor
    let newSize = CGSize(width: newWidth, height: newHeight)
    let renderer = UIGraphicsImageRenderer(size: newSize)
    let newImage = renderer.image { _ in
      self.draw(in: CGRect.init(origin: CGPoint.zero, size: newSize))
    }
    return newImage
  }

  fileprivate func scaled(toHeight height: CGFloat) -> UIImage? {
    let scale = height / self.size.height
    let newWidth = self.size.width * scale
    let newSize = CGSize(width: newWidth, height: height)
    let renderer = UIGraphicsImageRenderer(size: newSize)
    let newImage = renderer.image { _ in
      self.draw(in: CGRect.init(origin: CGPoint.zero, size: newSize))
    }

    return newImage
  }
}

@objc extension SwiftyCamViewController {
  func executeAsync(_ closure: @escaping () -> Void) {
    self.sessionPrimaryQueue.async(execute: closure)
  }

  func executeSync(withClosure closure: @escaping () -> Void) {
    if DispatchQueue.getSpecific(key: self.sessionPrimaryQueueSpecificKey) != nil {
      closure()
    } else {
      self.sessionPrimaryQueue.sync(execute: closure)
    }
  }
}

extension AVCaptureDevice.Position {
  fileprivate func opposite() -> AVCaptureDevice.Position {
    switch self {
    case .front: return .back
    case .back: return .front
    case .unspecified: return .unspecified
    @unknown default:
      return .unspecified
    }
  }
}

extension AVFileType {
  // swiftlint:disable cyclomatic_complexity file_length
  fileprivate func stringValue() -> String {
    var string = ""
    switch self {
    case .mov: string += "mov"
    case .mp4: string += "mp4"
    case .m4v: string += "m4v"
    case .m4a: string += "m4a"
    case .mobile3GPP: string += "3gp"
    case .mobile3GPP2: string += "3g2"
    case .caf: string += "caf"
    case .wav: string += "wav"
    case .aiff: string += "aif"
    case .aifc: string += "aifc"
    case .amr: string += "amr"
    case .mp3: string += "mp3"
    case .au: string += "au"
    case .ac3: string += "ac3"
    case .eac3: string += "eac3"
    case .jpg: string += "jpg"
    case .dng: string += "dng"
    case .heic: string += "heic"
    case .avci: string += "avci"
    case .heif: string += "heif"
    case .tif: string += "tiff"
    default: fatalError("AVFileType: \(self.rawValue) not supported")
    }
    return string
  }

  fileprivate var isImageFileTypeSupported: Bool {
    return self == .heic || self == .jpg || self == .tif
  }

  fileprivate var isVideoFileTypeSupported: Bool {
    return self == .mov || self == .mp4 || self == .mobile3GPP || self == .mobile3GPP2
  }
}
