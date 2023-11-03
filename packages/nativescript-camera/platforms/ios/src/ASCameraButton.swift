//
//  ASCameraButton.swift
//  ASCamera

import UIKit

@objc open class ASCameraButton: UIView {
  var bgPath: UIBezierPath!
  var shapeLayer: CAShapeLayer!
  var progressLayer: CAShapeLayer!
  var progress = 0.0 {
    willSet {
      DispatchQueue.main.async { [weak self] in
        self?.progressLayer.strokeEnd = CGFloat(newValue)
      }
    }
  }

  override open func layoutSubviews() {
    super.layoutSubviews()
    drawButton()
  }

  @objc public func drawButton() {
    NSLog("CameraButton drawButton")
    self.backgroundColor = UIColor.white.withAlphaComponent(0.8)
    self.layer.cornerRadius = self.bounds.width / 2
    //self.layer.masksToBounds = true

    let xCord = self.bounds.width / 2
    let yCord = self.bounds.height / 2
    let center = CGPoint(x: xCord, y: yCord)
    bgPath = UIBezierPath(
      arcCenter: center, radius: xCord + 15, startAngle: -.pi / 2, endAngle: .pi * 3 / 2,
      clockwise: true)
    bgPath.close()

    shapeLayer = CAShapeLayer()
    shapeLayer.path = bgPath.cgPath
    shapeLayer.lineWidth = 8
    shapeLayer.fillColor = nil
    shapeLayer.strokeColor = UIColor.lightGray.withAlphaComponent(0.8).cgColor

    progressLayer = CAShapeLayer()
    progressLayer.path = bgPath.cgPath
    progressLayer.lineWidth = 8
    progressLayer.lineCap = CAShapeLayerLineCap.round
    progressLayer.fillColor = nil
    progressLayer.strokeColor = UIColor.white.cgColor
    progressLayer.strokeEnd = 0.0

    self.layer.addSublayer(shapeLayer)
    self.layer.addSublayer(progressLayer)
  }

  @objc public func changeToSquare() {
    NSLog("CameraButton changeToSquare")
    let bounds = self.bounds
    UIView.animate(
      withDuration: 0.2, delay: 0.0, options: .curveLinear,
      animations: { [weak self] in
        self?.transform = CGAffineTransform(scaleX: 1.25, y: 1.25)
        self?.layer.cornerRadius = bounds.width / 4
        self?.backgroundColor = UIColor.red.withAlphaComponent(0.8)
      }, completion: nil)
    NSLog("CameraButton changeToSquare done")
  }

  @objc public func changeToCircle() {
    NSLog("CameraButton changeToCircle")
    let bounds = self.bounds
    UIView.animate(
      withDuration: 0.2, delay: 0.0, options: .curveLinear,
      animations: { [weak self] in
        self?.transform = CGAffineTransform.identity
        self?.layer.cornerRadius = bounds.width / 2
        self?.backgroundColor = UIColor.white.withAlphaComponent(0.8)
        self?.bgPath.apply(CGAffineTransform.identity)
      }, completion: nil)
    NSLog("CameraButton changeToCircle done")
  }
  @objc var isEnabled: Bool {
    didSet {
      if isUserInteractionEnabled != isEnabled {
        isUserInteractionEnabled = isEnabled
      }
    }
  }

  @objc override open var isUserInteractionEnabled: Bool {
    didSet {
      if isUserInteractionEnabled != isEnabled {
        isEnabled = isUserInteractionEnabled
      }
    }
  }

  @objc public var longPressGestureRecognizer: UILongPressGestureRecognizer?

  @objc public init() {
    self.isEnabled = true
    super.init(frame: .zero)
    self.isUserInteractionEnabled = true
  }

  @objc public override init(frame: CGRect) {
    self.isEnabled = true
    super.init(frame: frame)
    self.isUserInteractionEnabled = true
  }

  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

// @objc class CameraButton: ASCameraButton {
//   var bgPath: UIBezierPath!
//   var shapeLayer: CAShapeLayer!
//   var progressLayer: CAShapeLayer!
//   var progress = 0.0 {
//     willSet {
//       DispatchQueue.main.async { [weak self] in
//         self?.progressLayer.strokeEnd = CGFloat(newValue)
//       }
//     }
//   }

//   override func layoutSubviews() {
//     super.layoutSubviews()
//     drawButton()
//   }

//   @objc public func drawButton() {
//     NSLog("CameraButton drawButton")
//     self.backgroundColor = UIColor.white.withAlphaComponent(0.8)
//     self.layer.cornerRadius = self.bounds.width / 2
//     //self.layer.masksToBounds = true

//     let xCord = self.bounds.width / 2
//     let yCord = self.bounds.height / 2
//     let center = CGPoint(x: xCord, y: yCord)
//     bgPath = UIBezierPath(
//       arcCenter: center, radius: xCord + 15, startAngle: -.pi / 2, endAngle: .pi * 3 / 2,
//       clockwise: true)
//     bgPath.close()

//     shapeLayer = CAShapeLayer()
//     shapeLayer.path = bgPath.cgPath
//     shapeLayer.lineWidth = 8
//     shapeLayer.fillColor = nil
//     shapeLayer.strokeColor = UIColor.lightGray.withAlphaComponent(0.8).cgColor

//     progressLayer = CAShapeLayer()
//     progressLayer.path = bgPath.cgPath
//     progressLayer.lineWidth = 8
//     progressLayer.lineCap = CAShapeLayerLineCap.round
//     progressLayer.fillColor = nil
//     progressLayer.strokeColor = UIColor.white.cgColor
//     progressLayer.strokeEnd = 0.0

//     self.layer.addSublayer(shapeLayer)
//     self.layer.addSublayer(progressLayer)
//   }

//   @objc public func changeToSquare() {
//     NSLog("CameraButton changeToSquare")
//     let bounds = self.bounds
//     UIView.animate(
//       withDuration: 0.2, delay: 0.0, options: .curveLinear,
//       animations: { [weak self] in
//         self?.transform = CGAffineTransform(scaleX: 1.25, y: 1.25)
//         self?.layer.cornerRadius = bounds.width / 4
//         self?.backgroundColor = UIColor.red.withAlphaComponent(0.8)
//       }, completion: nil)
//     NSLog("CameraButton changeToSquare done")
//   }

//   @objc public func changeToCircle() {
//     NSLog("CameraButton changeToCircle")
//     let bounds = self.bounds
//     UIView.animate(
//       withDuration: 0.2, delay: 0.0, options: .curveLinear,
//       animations: { [weak self] in
//         self?.transform = CGAffineTransform.identity
//         self?.layer.cornerRadius = bounds.width / 2
//         self?.backgroundColor = UIColor.white.withAlphaComponent(0.8)
//         self?.bgPath.apply(CGAffineTransform.identity)
//       }, completion: nil)
//     NSLog("CameraButton changeToCircle done")
//   }
// }
