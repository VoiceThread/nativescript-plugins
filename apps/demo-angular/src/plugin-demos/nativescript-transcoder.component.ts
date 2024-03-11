import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptTranscoder } from '@demo/shared';
import {} from '@voicethread/nativescript-transcoder';

@Component({
  selector: 'demo-nativescript-transcoder',
  templateUrl: 'nativescript-transcoder.component.html',
})
export class NativescriptTranscoderComponent {
  demoShared: DemoSharedNativescriptTranscoder;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptTranscoder();
  }
}
