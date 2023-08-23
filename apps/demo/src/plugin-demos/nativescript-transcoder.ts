import { Observable, EventData, Page, File, Application, Frame, knownFolders } from '@nativescript/core';
import { DemoSharedNativescriptTranscoder } from '@demo/shared';
import { TempFile } from '@voicethread/nativescript-filepicker/files';
import { filePicker, galleryPicker, MediaType, getFreeMBs } from '@voicethread/nativescript-filepicker';
import { NativescriptTranscoder } from '@voicethread/nativescript-transcoder';
import { checkMultiple, check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';
import { Video } from 'nativescript-videoplayer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptTranscoder {
  pickedFiles: File[] = [];

  async pickVideos() {
    this.pickedFiles = [];
    try {
      let tempPath = TempFile.getPath('tempfile', 'tmp');
      let freeSpace = getFreeMBs(tempPath);

      console.log('free MBs on file picker temp directory', freeSpace);
      console.log('temp directory path: ', tempPath);
      if (freeSpace > 400) {
        //check before allowing picker to create temp copy of selected files
        this.pickedFiles = await filePicker(MediaType.VIDEO, true);
      } else alert('Low free space on device, picking not allowed');
    } catch (err) {
      if (err) alert(err?.message);
    }
  }

  async pickAudio() {
    this.pickedFiles = [];
    try {
      this.pickedFiles = await filePicker(MediaType.AUDIO, true);
    } catch (err) {
      if (err) alert(err?.message);
    }
  }

  async pickImageVideo() {
    checkPermission('photo').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('photo').then(async result => {
          if (result[0] == 'authorized') {
            try {
              this.pickedFiles = await galleryPicker(MediaType.IMAGE + MediaType.VIDEO, true);
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for files, can't open picker");
        });
      } else alert("No permission for files, can't open picker. Grant this permission in app settings first and then try again");
    });
  }

  process() {
    // To test
    // Select a single video file (with audio) and run it through here
    console.log('[START PROCESSING]');
    if (this.pickedFiles.length === 0) {
      return;
    }
    const transcoder = new NativescriptTranscoder();
    this.pickedFiles.forEach(file => {
      transcoder.addAsset({
        name: file.name,
        path: file.path,
        type: 'videoAudio',
      });
    });
    transcoder.addSegment({
      duration: 10000,
      tracks: [
        {
          asset: this.pickedFiles[0].name,
          type: 'AudioVideo',
          // filter: 'FadeOut',
          // duration: 5000,
        },
        // {
        //   asset: this.pickedFiles[1].name,
        //   filter: 'FadeOut',
        //   duration: 1000,
        // },
      ],
    });
    let tempPath = TempFile.getPath('processed-tempfile', '.mp4');
    console.log('-ready to process-');
    transcoder.process('low', tempPath).then(() => {
      console.log('[PROCCESSING COMPLETED]');
      const documents = knownFolders.documents();
      const targetFile = documents.getFile('video-copy.mp4');
      const tempFile = File.fromPath(tempPath).readSync();
      targetFile.writeSync(tempFile);
      const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as Video;
      video.src = tempPath;
    });
  }
}
