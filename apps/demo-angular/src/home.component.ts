import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
    {
      name: 'nativescript-audio-player',
    },
    {
      name: 'nativescript-audio-recorder',
    },
    {
      name: 'nativescript-custom-rotors',
    },
    {
      name: 'nativescript-downloader',
    },
    {
      name: 'nativescript-filepicker',
    },
    {
      name: 'nativescript-rive',
    },
  ];
}
