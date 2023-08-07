import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptAudioRecorder } from '@demo/shared';
// import { } from '@voicethread/nativescript-audio-recorder';

@Component({
  selector: 'demo-nativescript-audio-recorder',
  templateUrl: 'nativescript-audio-recorder.component.html',
})
export class NativescriptAudioRecorderComponent {
  demoShared: DemoSharedNativescriptAudioRecorder;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptAudioRecorder();
  }
}
