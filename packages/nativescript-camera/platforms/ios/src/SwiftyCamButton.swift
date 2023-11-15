/*Copyright (c) 2016, Andrew Walz.

 Redistribution and use in source and binary forms, with or without modification,are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS
 BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

import UIKit

//MARK: Public Protocol Declaration

/// Delegate for SwiftyCamButton

@objc public protocol SwiftyCamButtonDelegate {

  /// Called when UITapGestureRecognizer begins
  func buttonWasTapped()

  /// Called When UILongPressGestureRecognizer enters UIGestureRecognizerState.began
  func buttonDidBeginLongPress()

  /// Called When UILongPressGestureRecognizer enters UIGestureRecognizerState.end
  func buttonDidEndLongPress()

  /// Called when the maximum duration is reached
  func longPressDidReachMaximumDuration()

  /// Sets the maximum duration of the video recording
  func setMaxiumVideoDuration() -> Double
}

// MARK: Public View Declaration

/*
  UIButton Subclass for Capturing Photo and Video with SwiftyCamViewController
  */
@objc open class SwiftyCamButton: UIButton {
  /// Delegate variable
  @objc public var delegate: SwiftyCamButtonDelegate?
  /// Maximum duration variable
  fileprivate var timer: Timer?
  private var circleBorder: CALayer!
  private var innerCircle: UIView!

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

  /*
  Initialization Declaration
  */
  @objc override public init(frame: CGRect) {
    super.init(frame: frame)
    drawButton()
    createGestureRecognizers()
  }

  /*
  Initialization Declaration
  */
  required public init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    drawButton()
    createGestureRecognizers()
  }

  /*
   UITapGestureRecognizer Function
   */
  @objc fileprivate func Tap() {
    NSLog("Button Tap()")
    self.delegate?.buttonWasTapped()
  }

  /*
   UILongPressGestureRecognizer Function
   */
  @objc fileprivate func LongPress(_ sender: UILongPressGestureRecognizer!) {
    if sender.state == UIGestureRecognizer.State.ended {
      invalidateTimer()
      changeToCircle()
      self.delegate?.buttonDidEndLongPress()
    } else if sender.state == UIGestureRecognizer.State.began {
      changeToSquare()
      self.delegate?.buttonDidBeginLongPress()
      startTimer()
    }
  }

  /// Timer Finished

  @objc fileprivate func timerFinished() {
    invalidateTimer()
    self.delegate?.longPressDidReachMaximumDuration()
  }

  /// Start Maximum Duration Timer

  fileprivate func startTimer() {
    if let duration = delegate?.setMaxiumVideoDuration() {
      //Check if duration is set, and greater than zero
      if duration != 0.0 && duration > 0.0 {
        timer = Timer.scheduledTimer(
          timeInterval: duration, target: self, selector: #selector(SwiftyCamButton.timerFinished),
          userInfo: nil, repeats: false)
      }
    }
  }

  // End timer if UILongPressGestureRecognizer is ended before time has ended

  fileprivate func invalidateTimer() {
    timer?.invalidate()
    timer = nil
  }

  // Add Tap and LongPress gesture recognizers

  fileprivate func createGestureRecognizers() {
    NSLog("CamButton createGestureRecognizers()")
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(SwiftyCamButton.Tap))
    let longGesture = UILongPressGestureRecognizer(
      target: self, action: #selector(SwiftyCamButton.LongPress))
    self.addGestureRecognizer(tapGesture)
    self.addGestureRecognizer(longGesture)
  }

  //UI Animations
  private func drawButton() {
    // self.backgroundColor = UIColor.clear
    // circleBorder = CALayer()
    // circleBorder.backgroundColor = UIColor.clear.cgColor
    // circleBorder.borderWidth = 6.0
    // circleBorder.borderColor = UIColor.white.cgColor
    // circleBorder.bounds = self.bounds
    // circleBorder.position = CGPoint(x: self.bounds.midX, y: self.bounds.midY)
    // circleBorder.cornerRadius = self.frame.size.width / 2
    // layer.insertSublayer(circleBorder, at: 0)
    self.backgroundColor = UIColor.white.withAlphaComponent(0.8)
    self.layer.cornerRadius = self.bounds.width / 2
    self.transform = CGAffineTransform.identity
    self.layer.masksToBounds = true

    // let xCord = self.bounds.width / 2
    // let yCord = self.bounds.height / 2
    // let center = CGPoint(x: xCord, y: yCord)
    // bgPath = UIBezierPath(
    //   arcCenter: center, radius: xCord + 15, startAngle: -.pi / 2, endAngle: .pi * 3 / 2,
    //   clockwise: true)
    // bgPath.close()

    // shapeLayer = CAShapeLayer()
    // shapeLayer.path = bgPath.cgPath
    // shapeLayer.lineWidth = 8
    // shapeLayer.fillColor = nil
    // shapeLayer.strokeColor = UIColor.lightGray.withAlphaComponent(0.8).cgColor
    // self.layer.addSublayer(shapeLayer)

    // progressLayer = CAShapeLayer()
    // progressLayer.path = bgPath.cgPath
    // progressLayer.lineWidth = 8
    // progressLayer.lineCap = CAShapeLayerLineCap.round
    // progressLayer.fillColor = nil
    // progressLayer.strokeColor = UIColor.white.cgColor
    // progressLayer.strokeEnd = 0.0
    // self.layer.addSublayer(progressLayer)

    NSLog("done drawButton()")
  }

  /*public func growButton() {
    innerCircle = UIView(frame: CGRect(x: 0, y: 0, width: 1, height: 1))
    innerCircle.center = CGPoint(x: self.bounds.midX, y: self.bounds.midY)
    innerCircle.backgroundColor = UIColor.red
    innerCircle.layer.cornerRadius = innerCircle.frame.size.width / 2
    innerCircle.clipsToBounds = true
    self.addSubview(innerCircle)

    UIView.animate(
      withDuration: 0.6, delay: 0.0, options: .curveEaseOut,
      animations: {
        self.innerCircle.transform = CGAffineTransform(scaleX: 62.4, y: 62.4)
        self.circleBorder.setAffineTransform(CGAffineTransform(scaleX: 1.352, y: 1.352))
        self.circleBorder.borderWidth = (6 / 1.352)

      }, completion: nil)
  }

  public func shrinkButton() {
    UIView.animate(
      withDuration: 0.3, delay: 0.0, options: .curveEaseOut,
      animations: {
        self.innerCircle.transform = CGAffineTransform(scaleX: 1.0, y: 1.0)
        self.circleBorder.setAffineTransform(CGAffineTransform(scaleX: 1.0, y: 1.0))
        self.circleBorder.borderWidth = 6.0
      },
      completion: { (success) in
        self.innerCircle.removeFromSuperview()
        self.innerCircle = nil
      })
  }*/
  @objc public func changeToSquare() {
    let bounds = self.bounds
    UIView.animate(
      withDuration: 0.2, delay: 0.0, options: .curveLinear,
      animations: { [weak self] in
        self?.transform = CGAffineTransform(scaleX: 1.25, y: 1.25)
        self?.layer.cornerRadius = bounds.width / 4
        self?.backgroundColor = UIColor.red.withAlphaComponent(0.8)
      }, completion: nil)
  }

  @objc public func changeToCircle() {
    let bounds = self.bounds
    UIView.animate(
      withDuration: 0.2, delay: 0.0, options: .curveLinear,
      animations: { [weak self] in
        self?.transform = CGAffineTransform.identity
        self?.layer.cornerRadius = bounds.width / 2
        self?.backgroundColor = UIColor.white.withAlphaComponent(0.8)
        // self?.bgPath.apply(CGAffineTransform.identity)
      }, completion: nil)
  }
}
