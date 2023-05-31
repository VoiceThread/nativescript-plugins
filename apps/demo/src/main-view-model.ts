import { Observable, Frame } from '@nativescript/core';

export class MainViewModel extends Observable {
  viewCustomRotors() {
    Frame.topmost().navigate({
      moduleName: 'plugin-demos/nativescript-custom-rotors',
    });
  }

  viewFilePicker() {
    Frame.topmost().navigate({
      moduleName: 'plugin-demos/nativescript-filepicker',
    });
  }

  viewDownloader() {
    Frame.topmost().navigate({
      moduleName: 'plugin-demos/nativescript-downloader',
    });
  }
}
