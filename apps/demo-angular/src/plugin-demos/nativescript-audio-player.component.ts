import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptAudioPlayer } from '@demo/shared';
// import { } from '@voicethread/nativescript-audio-player';

@Component({
  selector: 'demo-nativescript-audio-player',
  templateUrl: 'nativescript-audio-player.component.html',
})
export class NativescriptAudioPlayerComponent {
  demoShared: DemoSharedNativescriptAudioPlayer;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptAudioPlayer();
  }
}
