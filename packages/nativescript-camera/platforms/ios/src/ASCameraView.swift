//
//  ASwiftyCamera.swift
//  ASwiftyCamera
//
//  Created by Angel  Dominguez on 8/25/23.
//

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
        // swiftlint:disable force_cast
        let previewlayer = layer as! AVCaptureVideoPreviewLayer
        // swiftlint:enable force_cast
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

