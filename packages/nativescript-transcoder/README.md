# @voicethread/nativescript-transcoder

# Nativescript Transcoder ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@voicethread/nativescript-audio-recorder?style=flat-square)](https://www.npmjs.com/package/@voicethread/nativescript-transcoder)

This plugin provides video transcoding functionality for Android and iOS that supports modifying the video's resolution, frame rate (iOS only) and other utilities such as stitching and layering multiple videos (coming soon).

## Installation

```bash
npm install @voicethread/nativescript-transcoder --save
```

OR 

```bash
ns plugin add @voicethread/nativescript-transcoder
```

## Basic Usage

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application by looking at `apps/demo/src/plugin-demos/nativescript-transcoder-basic.ts`.

1. Import the plugin.

```typescript
import { NativescriptTranscoder } from '@voicethread/nativescript-transcoder';
```

2. Transcode a video to 720p or 1080p (the example below uses a filepicker, but you can use results from the camera as well)

```typescript

selectAndTranscodeVideo(): void {
  // input
  const inputFile = await filePicker(MediaType.VIDEO, false)?.[0];

  // output
   const outputPath = knownFolders.documents().getFile('transcoded-video.mp4').path;
    if (File.exists(outputPath)) {
      const file = File.fromPath(outputPath);
      // make sure file specified as the output path doesn't exist before starting the transcoding process
      file.removeSync();
    }
    const transcoder = new NativescriptTranscoder();
    transcoder
      .transcode(
        inputFile.path,
        outputPath,
          {
              quality: '720p'  // or '1080p'
          }
      ).then(transcodedFile => {
        // do something with the transcodedFile
      })

}
```

## Events

The following events are emitted during the transcoding process:

- `TRANSCODING_STARTED` - emitted at the beginning of the transcoding process
- `TRANSCODING_PROGRESS` - emitted over time with the percentage (0 to 1) completed
- `TRANSCODING_COMPLETE` - emitted after a successful transcoding process (the `transcode` function will return the transcoded file)
- `TRANSCODING_ERROR` - emitted when the transcoding process runs into an error (the `transcode` function will return a rejected promise at this point)
- `TRANSCODING_CANCELLED` - emitted when the transcoding process is cancelled (the `transcode` function will return a rejected promise at this point)

You can listen to these events by attaching the `on` listener to the `transcoder`

```typescript
  const transcoder = new NativescriptTranscoder()
  transcoder.on(NativescriptTranscoder.TRANSCODING_PROGRESS, (payload: MessageData) => {
      // you'll have to wrap any UI updates in `executeOnMainThread` for iOS as the events are emitted from a different thread
      executeOnMainThread(() => {
        progressBar.value = payload.data.progress * 100;
      });
    });
```


## Utilities

The transcoder plugin also contains some utilities to help you when interacting with videos:

| Function    | Description | Return Type | iOS | Android |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| getVideoResolution(videoPath: string)      | Returns the video resolution (e.g. `1920x1080`) | `{ width: string, height: string }` | ✅ | ✅ |
| getVideoSize(videoPath: string)      | Returns the video size in bytes | number | ✅ | ✅ |
| getVideoSizeString(videoPath: string)      | Returns the video size in human readable format (e.g. `5.5 mb`) | string | ✅ | ✅ |

## Troubleshooting

Logs are turned off by default. If you want to view the logs as the video is being processed, you can turn them on by setting the log level to `verbose` before starting the transcode process.

```typescript

startTranscoding(): void {
  const transcdoer = new NativescriptTranscoder();
  transcoder.setLogLevel('verbose');
  transcoder.transcode(...);
}
```
  
## Acknowledgements

This plugin is based on [react-native-transcode](https://github.com/selsamman/react-native-transcode)


## License

Apache License Version 2.0
