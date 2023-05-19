import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
    {
      name: 'nativescript-custom-rotors',
    },
    {
      name: 'nativescript-downloader',
    },
    {
      name: 'nativescript-filepicker',
    },
  ];
}
