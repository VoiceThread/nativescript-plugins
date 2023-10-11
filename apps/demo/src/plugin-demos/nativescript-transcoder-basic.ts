import { EventData, Page, File, Frame, knownFolders, Label, Color, isAndroid, Device, Progress } from '@nativescript/core';
import { DemoSharedNativescriptTranscoder } from '@demo/shared';
import { filePicker, galleryPicker, MediaType } from '@voicethread/nativescript-filepicker';
import { MessageData, NativescriptTranscoder } from '@voicethread/nativescript-transcoder';
import { check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';
import { executeOnMainThread } from '@nativescript/core/utils';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptTranscoder {
  pickedFile: File | undefined = undefined;
  transcoder: NativescriptTranscoder;
  count = 0;

  constructor() {
    super();
    this.transcoder = new NativescriptTranscoder();
    this.transcoder.setLogLevel('verbose');
  }

  async pickVideo() {
    this.pickedFile = undefined;
    if (isAndroid) {
      if (isAndroid && +Device.sdkVersion > 32) {
        requestPermission('storage').then(async result => {
          if (result['android.permission.READ_EXTERNAL_STORAGE'] === 'authorized') {
            const files = await filePicker(MediaType.VIDEO, false);
            this.pickedFile = files?.[0];
          }
        });
      } else {
        await request('video').then(async result => {
          if (result[0] != 'authorized') {
            this.pickedFile = await filePicker(MediaType.VIDEO, false)?.[0];
          }
        });
      }
    } else {
      checkPermission('photo').then(async permres => {
        if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
          await requestPermission('photo').then(async result => {
            if (result[0] == 'authorized') {
              try {
                const files = await galleryPicker(MediaType.VIDEO, false);
                this.pickedFile = files?.[0];
              } catch (err) {
                if (err) alert(err?.message);
              }
            } else alert("No permission for files, can't open picker");
          });
        } else alert("No permission for files, can't open picker. Grant this permission in app settings first and then try again");
      });
    }
  }

  processVideo480() {
    this.processVideo('480p');
  }

  processVideo480FR5() {
    this.processVideo('480p', 5);
  }

  processVideo720() {
    this.processVideo('720p');
  }

  processVideo1080() {
    this.processVideo('1080p');
  }

  processVideo(quality: '480p' | '720p' | '1080p', frameRate?: number) {
    if (!this.pickedFile) {
      return;
    }
    // android doesn't support 480p
    if (isAndroid && quality === '480p') {
      return;
    }
    const tempPath = knownFolders.documents().getFile(`video-copy-${this.count}.mp4`).path;
    this.count += 1;
    if (File.exists(tempPath)) {
      const file = File.fromPath(tempPath);
      file.removeSync();
    }
    console.log('[PROCESSING STARTED]');
    const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
    video.visibility = 'collapsed';
    const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
    outputDetailsLabel.visibility = 'collapsed';
    const progressBar = Frame.topmost().currentPage.getViewById('transcodingProgress') as Progress;
    progressBar.value = 0;
    this.transcoder.on(NativescriptTranscoder.TRANSCODING_PROGRESS, (payload: MessageData) => {
      executeOnMainThread(() => {
        progressBar.value = payload.data.progress * 100;
      });
    });
    const timeStarted = new Date().getTime();
    this.transcoder
      .transcode(
        this.pickedFile.path,
        tempPath,
        isAndroid
          ? {
              quality: quality,
            }
          : {
              quality: quality,
              frameRate: frameRate || 30,
            }
      )
      .then(transcodedFile => {
        const timeTaken = (new Date().getTime() - timeStarted) / 1000;
        progressBar.value = 100;
        console.log('[PROCCESSING COMPLETED]');
        console.log('[Original Size]', this.transcoder.getVideoSizeString(this.pickedFile.path));
        const originalResolution = this.transcoder.getVideoResolution(this.pickedFile.path);
        console.log('[Original Resolution]', `${originalResolution.width}x${originalResolution.height}`);
        console.log('[Transcoded Size]', this.transcoder.getVideoSizeString(transcodedFile.path));
        console.log('[Percentage Reduced]', `${(((this.pickedFile.size - transcodedFile.size) / this.pickedFile.size) * 100).toFixed(2)}%`);
        const resolution = this.transcoder.getVideoResolution(tempPath);
        console.log('[Transcoded Resolution]', `${resolution.width}x${resolution.height}`);
        console.log('[Time Taken]', `${timeTaken} seconds`);
        video.visibility = 'visible';
        video.opacity = 1;
        video.src = tempPath;
        video.loop = false;
        outputDetailsLabel.visibility = 'visible';
        outputDetailsLabel.text = `Output Size: ${this.transcoder.getVideoSizeString(transcodedFile.path)}`;
        outputDetailsLabel.textWrap = true;
        outputDetailsLabel.fontSize = 16;
        outputDetailsLabel.color = new Color('#ffffff');
      })
      .catch(error => {
        outputDetailsLabel.visibility = 'visible';
        outputDetailsLabel.text = `Error: ${error}`;
        outputDetailsLabel.textWrap = true;
        outputDetailsLabel.fontSize = 16;
        outputDetailsLabel.color = new Color('#C70300');
      });
  }
}
