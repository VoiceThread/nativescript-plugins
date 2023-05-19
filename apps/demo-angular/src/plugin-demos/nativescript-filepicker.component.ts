import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptFilepicker } from '@demo/shared';
import {} from '@voicethread/nativescript-filepicker';

@Component({
  selector: 'demo-nativescript-filepicker',
  templateUrl: 'nativescript-filepicker.component.html',
})
export class NativescriptFilepickerComponent {
  demoShared: DemoSharedNativescriptFilepicker;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptFilepicker();
  }
}
