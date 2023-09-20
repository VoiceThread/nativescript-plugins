import { Observable, EventData, Page, File, Application, Frame, knownFolders, StackLayout, Label, Color, ScrollView, Button, TextField, TextView, isAndroid, Device } from '@nativescript/core';
import { DemoSharedNativescriptTranscoder } from '@demo/shared';
import { TempFile } from '@voicethread/nativescript-filepicker/files';
import { filePicker, galleryPicker, MediaType, getFreeMBs } from '@voicethread/nativescript-filepicker';
import { NativescriptTranscoder, Segment, VideoConfig } from '@voicethread/nativescript-transcoder';
import { checkMultiple, check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

// TODO: everything works
// just need to restart the app completely on every session or it'll crash [IMPORTANT]

export class DemoModel extends DemoSharedNativescriptTranscoder {
  pickedFile: File | undefined = undefined;
  transcoder: NativescriptTranscoder;
  count = 0;

  constructor() {
    super();
    this.transcoder = new NativescriptTranscoder();
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
    if (isAndroid) {
      this.processAndroid();
    } else {
      this.processVideo('480p');
    }
  }

  processAndroid(): void {
    // currently only working for videos with audio
    // TODO:
    // implement transcoding videos without audio:
    // https://github.com/ypresto/android-transcoder/compare/master...AlexMiniApps:android-transcoder:master
    if (!this.pickedFile) {
      return;
    }

    // we need the absolute path for Android, so we need to use the method below
    const tempPath = TempFile.getPath(`video-copy-${this.count}`, 'mp4');
    this.count += 1;
    if (File.exists(tempPath)) {
      const file = File.fromPath(tempPath);
      file.removeSync();
    }
    console.log('[START PROCESSING]');
    this.transcoder.transcode(this.pickedFile.path, tempPath).then(() => {
      console.log('[PROCCESSING COMPLETED]');
      const tempFile = File.fromPath(tempPath);
      console.log('[outputSize]', tempFile.size);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.opacity = 1;
      video.src = tempPath;
      video.loop = false;
      const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
      outputDetailsLabel.text = `Output Size: ${this.formatBytes(tempFile.size)}`;
      outputDetailsLabel.textWrap = true;
      outputDetailsLabel.fontSize = 16;
      outputDetailsLabel.color = new Color('#ffffff');
    });
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
    this.transcoder.reset();
    this.transcoder.setLogLevel('verbose');
    this.transcoder.addAsset({
      name: this.pickedFile.name,
      path: this.pickedFile.path,
      type: 'videoAudio',
    });
    this.transcoder.addSegment({
      tracks: [{ asset: this.pickedFile.name }],
    });
    // IMPORTANT - specified duration cannot be greater than the video's duration
    // this will cause a crash
    const tempPath = knownFolders.documents().getFile(`video-copy-${this.count}.mp4`).path;
    this.count += 1;
    if (File.exists(tempPath)) {
      const file = File.fromPath(tempPath);
      file.removeSync();
    }
    console.log('[PROCESSING STARTED]');
    this.transcoder
      .process(tempPath, {
        quality: quality,
        frameRate: frameRate || 30,
      })
      .then(() => {
        console.log('[PROCCESSING COMPLETED]');
        const tempFile = File.fromPath(tempPath);
        console.log('[outputSize]', tempFile.size);
        const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
        video.opacity = 1;
        video.src = tempPath;
        video.loop = false;
        const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
        outputDetailsLabel.text = `Output Size: ${this.formatBytes(tempFile.size)}`;
        outputDetailsLabel.textWrap = true;
        outputDetailsLabel.fontSize = 16;
        outputDetailsLabel.color = new Color('#ffffff');
      });
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}
