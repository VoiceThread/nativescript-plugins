import { Observable, Frame, alert } from '@nativescript/core';
import { checkMultiple, check as checkPermission, request } from '@nativescript-community/perms';

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
  viewAudioPlayer() {
    Frame.topmost().navigate({
      moduleName: 'plugin-demos/nativescript-audio-player',
    });
  }

  viewAudioRecorder() {
    Frame.topmost().navigate({
      moduleName: 'plugin-demos/nativescript-audio-recorder',
    });
  }
  async viewCamera() {
    //check for permissions first before routing
    try {
      await checkPermission('camera').then(async permres => {
        console.log('checked permission', permres);
        if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
          if (permres[0] == 'authorized' && permres[1] == true) {
            console.log('authorized');
            return;
          }
          console.log('requesting permission to camera');
          await request('camera').then(async result => {
            console.log('request result', result);
            if (result[0] == 'authorized' && permres[1] == true) {
              console.log('authorized');
              // if (!this.cam) {
              // this.cam = new CameraPlus();
              // Frame.topmost().navigate({
              //   moduleName: 'plugin-demos/nativescript-camera',
              // });
              // this.cam.visibility = 'visible';
              // }
              // this.cam.takePicture({ saveToGallery: true });
            } else {
              alert('No permission for camera, cannot open camera demo!');
              return;
            }
          });
        } else alert('No permission for camera! Grant this permission in app settings first');
      });
    } catch (err) {
      console.error(err);
    }
    try {
      await checkPermission('microphone').then(async permres => {
        console.log('checked permission', permres);
        if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
          if (permres[0] == 'authorized' && permres[1] == true) {
            console.log('authorized');
            Frame.topmost().navigate({
              moduleName: 'plugin-demos/nativescript-camera',
            });
            return;
          }
          console.log('requesting permission to microphone');
          await request('microphone').then(async result => {
            console.log('request result', result);
            if (result[0] == 'authorized' && permres[1] == true) {
              // if (!this.cam) {
              // this.cam = new CameraPlus();
              Frame.topmost().navigate({
                moduleName: 'plugin-demos/nativescript-camera',
              });
              // this.cam.visibility = 'visible';
              // }
              // this.cam.takePicture({ saveToGallery: true });
            } else alert('No permission for microphone, cannot open camera demo!');
          });
        } else alert('No permission for microphone! Grant this permission in app settings first');
      });
    } catch (err) {
      console.error(err);
    }
    // Frame.topmost().navigate({
    //   moduleName: 'plugin-demos/nativescript-camera',
    // });
  }
}
