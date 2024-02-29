# @voicethread/nativescript-audio-player

# Nativescript audio player ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@voicethread/nativescript-audio-player?style=flat-square)](https://www.npmjs.com/package/@voicethread/nativescript-audio-player)

> @voicethread/nativescript-audio-player

This plugin provides an audio player for Android and iOS that supports playback of both local files and remote URL audio files.  For  **Android**,  MediaPlayer will internally cache remote files after first prepare/play. For **iOS**, the plugin will download and cache remote files on first prepare/play. 

## Contents

- [NativeScript Audio Player](#nativescript-audio-player)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Audio Player options](#supported-audio-player-options)
  - [Audio Player exports](#Audio-Player-exports) 
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @voicethread/nativescript-audio-player --save
```

OR 

```bash
ns plugin add @voicethread/nativescript-audio-player
```

## Usage

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application by looking at `apps/demo/src/plugin-demos/nativescript-audio-player.ts`.


1. Import the plugin and create a player instance.
```javascript
import { AudioPlayer, AudioPlayerOptions } from '@voicethread/nativescript-audio-player';
this.player = new AudioPlayer();
this.player.on(AudioPlayer.completeEvent, () => {
        console.log('playback complete');
    });
```

2. Play an audio file.
```javascript 
protected _playOptions: AudioPlayerOptions = {
    audioFile: knownFolders.currentApp().path + '/audio/example.m4a';,
    loop: false,
    audioMixing: false,
    completeCallback: async result => {
        console.log('AudioPlayer - Audio file playback complete.', result);
    },
    errorCallback: errorObject => {
        console.error('AudioPlayer error!', JSON.stringify(errorObject));
    },
    infoCallback: infoObject => {
        console.info('AudioPlayer info: ', JSON.stringify(infoObject));
    },
};
this.player.prepareAudio(this._playOptions).then(status => {
    if (status) {    
        this.player.play();    
    } else {
        console.log('ERROR! Unable to prepare audio!');
    }
});
```

NOTE: If you want to play an HTTP URL, you'll also need to make some adjustments to your application to allow unsecure connections or URL access will fail silently. 
For iOS, add the following to your app's Info.plist:
```
<key>NSAppTransportSecurity</key>  
<dict>  
    <key>NSAllowsArbitraryLoads</key>
    <true />  
</dict>
```

For Android, ensure your application tag in `App_Resources/Android/src/main/AndroidManifest.xml` has the following:

```
android:usesCleartextTraffic="true"
```

## Supported Audio Player options
```javascript 
export interface AudioPlayerOptions {
  /**
   * Gets or sets the audio file url.
   */
  audioFile: string;

  /**
   * Gets or sets the callback when the currently playing audio file completes.
   * @returns {Object} An object containing the native values for the callback.
   */
  completeCallback?: Function;

  /**
   * Get or sets the player to loop playback.
   */
  loop: boolean;

  audioMixing?: boolean;

  /**
   * Gets or sets the callback when an error occurs with the audio player.
   * @returns {Object} An object containing the native values for the error callback.
   */
  errorCallback?: Function;

  /**
   * Gets or sets the callback to be invoked to communicate some info and/or warning about the media or its playback.
   * @returns {Object} An object containing the native values for the info callback.
   */
  infoCallback?: Function;
}
```

## Audio Player exports

```javascript 
export interface AudioPlayer {
  /**
   * native instance getters
   */
  readonly ios?: any;
  readonly android?: any;

  /**
   * Volume supports values ranging from 0.0 for silence to 1.0 for full volume
   */
  volume: any;

  /**
   * Duration getter in milliseconds
   *    Returns 0 if there is no audio file loaded
   *    Returns -1 if there is an issue getting duration (Android)
   */
  duration: number;

  /**
   * Prepare Audio player by preloading an audio file from file oath or URL
   * @function prepareAudio
   * @param options
   */
  prepareAudio(options: AudioPlayerOptions): Promise<boolean>;

  /**
   * Play current audio file that has been prepared by calling prepareAudio(options)
   */
  play(): Promise<boolean>;

  /**
   * Pauses playing audio file.
   */
  pause(): Promise<boolean>;

  /**
   * Seeks to specific time in ms
   */
  seekTo(time: number): Promise<boolean>;

  /**
   * Releases resources from the audio player.
   */
  dispose(): Promise<boolean>;

  /**
   * Check if the audio is actively playing.
   */
  isAudioPlaying(): boolean;

  /**
   * Get the duration of the audio file playing, in ms (Promise version of duration property getter)
   */
  getAudioTrackDuration(): Promise<number>;

  /**
   * Get the current time position of the audio file playing in ms
   */
  readonly currentTime: number;

   /**
   * Sets the player playback speed rate. On Android this only works on API 23+.
   * @param speed [number] - The speed of the playback.
   * speed should be a float from 0.0 - X.X, and is a scale factor
   */
  changePlayerSpeed(speed: number): void;

  /**
   * ** iOS ONLY ** - Begins playback at a certain delay, relative to the current playback time.
   * @param time [number] - The time to start playing the audio track at.
   */
  playAtTime(time: number);
  /**
   * Events
   */
  public static seekEvent = 'seekEvent';
  public static pausedEvent = 'pausedEvent';
  public static startedEvent = 'startedEvent';
  public static completeEvent = 'completeEvent';
  public static errorEvent = 'errorEvent';
}
```

Tested and working on Android API 25-34.
Tested and working on iOS 12.x-17.x. 

## Acknowledgements

This plugin is based on https://github.com/nstudio/nativescript-audio


## License

Apache License Version 2.0
