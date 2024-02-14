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
    let permsok = true;
    //check for permissions first before routing
    try {
      await checkPermission('camera').then(async permres => {
        console.log('checked camera permission', permres);
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
            } else {
              console.error('Unable to request permission!');
              permsok = false;
            }
          });
        } else await alert('No permission for camera! Grant this permission in app settings first');
      });
    } catch (err) {
      console.error(err);
    }
    if (!permsok) {
      console.error('No permission for camera! Grant this permission in app settings first');
      await alert('No permission for camera! Grant this permission in app settings first');
      return;
    }
    try {
      await checkPermission('microphone').then(async permres => {
        console.log('checked microphone permission', permres);
        if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
          if (permres[0] == 'authorized' && permres[1] == true) {
            console.log('authorized');
            console.log('loading camera demo');
            Frame.topmost().navigate({
              moduleName: 'plugin-demos/nativescript-camera',
            });
            return;
          }
          console.log('requesting permission to microphone');
          await request('microphone').then(async result => {
            console.log('request result', result);
            if (result[0] == 'authorized' && permres[1] == true) {
              console.log('loading camera demo');
              Frame.topmost().navigate({
                moduleName: 'plugin-demos/nativescript-camera',
              });
            } else await alert('No permission for microphone, cannot open camera demo!');
          });
        } else await alert('No permission for microphone! Grant this permission in app settings first');
      });
    } catch (err) {
      console.error(err);
    }
  }
}
