import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptCamera } from '@demo/shared';
import {} from '@voicethread/nativescript-camera';

@Component({
  selector: 'demo-nativescript-camera',
  templateUrl: 'nativescript-camera.component.html',
})
export class NativescriptCameraComponent {
  demoShared: DemoSharedNativescriptCamera;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptCamera();
  }
}
