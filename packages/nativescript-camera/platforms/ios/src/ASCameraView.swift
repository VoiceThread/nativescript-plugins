//
//  ASCamera.swift
//  ASCamera

import UIKit
import AVFoundation

@objc public class ASCameraView: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = UIColor.black
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    var videoPreviewLayer: AVCaptureVideoPreviewLayer {
        let previewlayer = layer as! AVCaptureVideoPreviewLayer
        return previewlayer
    }
    
    var session: AVCaptureSession? {
        get {
            return videoPreviewLayer.session
        }
        set {
            videoPreviewLayer.session = newValue
        }
    }
    
    override public class var layerClass: AnyClass {
        return AVCaptureVideoPreviewLayer.self
    }
}


