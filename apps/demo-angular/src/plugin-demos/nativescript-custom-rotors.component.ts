import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptCustomRotors } from '@demo/shared';
import {} from '@voicethread/nativescript-custom-rotors';

@Component({
  selector: 'demo-nativescript-custom-rotors',
  templateUrl: 'nativescript-custom-rotors.component.html',
})
export class NativescriptCustomRotorsComponent {
  demoShared: DemoSharedNativescriptCustomRotors;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptCustomRotors();
  }
}
