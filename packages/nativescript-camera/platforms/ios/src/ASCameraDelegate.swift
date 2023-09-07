//
//  ASCameraDelegate.swift
//  ASCamera
//
//  Created by Angel on 9/5/23.
//

import AVFoundation
import UIKit


@objc public protocol ASCameraDelegate: AnyObject {
    /**
     ASBaseCameraViewControllerDelegate function called before ASBaseCameraViewController begins recording video.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter camera: Current camera orientation
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, willBeginRecordingVideoAt location: ASCameraLocation)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController begins recording video.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter camera: Current camera orientation
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didBeginRecordingVideoAt location: ASCameraLocation)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController updates recording duration.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter duration: The total duration of the current recording
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didUpdateRecordingDurationTo duration: Double)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController finishes recording video.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter camera: Current camera orientation
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didFinishRecordingVideoAt location: ASCameraLocation)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController is done processing video.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter url: URL location of video in temporary directory
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didFinishProcessingVideoAt url: URL)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController fails to process a video.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter error: An error object that describes the problem
     */
    @objc optional func asCamera(_ asCamera: ASCamera, didFailToProcessVideo error: Error)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController switches between front or rear camera.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter camera: Current camera selection
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didSwitchCamera location: ASCameraLocation)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController view is tapped and begins focusing at that point.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter point: Location in view where camera focused
     
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didFocusAtPoint point: CGPoint)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController view changes zoom level.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter zoom: Current zoom level
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didChangeZoomLevelTo zoomLevel: CGFloat)
    
    /**
     ASBaseCameraViewControllerDelegate function called when ASBaseCameraViewController view changes zoom level.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter zoom: Current zoom level
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didCancelRecordingAt url: URL)
    
    /**
     ASBaseCameraViewControllerDelegate function called right before ASBaseCameraViewController
     checks for an asset writer and inputs or creates one.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     */
    
    @objc optional func asCamera(shouldCreateAssetWriter asCamera: ASCamera)
    
    /**
     ASBaseCameraViewControllerDelegate function called before ASBaseCameraViewController takes a photo.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter camera: Current camera orientation
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, willCaptureImageAt location: ASCameraLocation)
    
    /**
     ASBaseCameraViewControllerDelegate function called after ASBaseCameraViewController captures the frame for an image.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter camera: Current camera orientation
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didCaptureImageAt location: ASCameraLocation)
    
    /**
     ASBaseCameraViewControllerDelegate function called after ASBaseCameraViewController finished processing image.
     
     - Parameter ASCamera: Current ASBaseCameraViewController session
     - Parameter image: UIImage of the captured frame
     */
    
    @objc optional func asCamera(_ asCamera: ASCamera, didFinishProcessing image: UIImage, with properties: CFDictionary)
}

