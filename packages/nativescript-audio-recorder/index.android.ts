/* eslint-disable no-async-promise-executor */
import { Application, Observable, File, path, knownFolders, Device } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: android.media.MediaRecorder;
  private _isPaused: boolean = false;
  private _isRecording: boolean = false;
  public _audioFiles: [string] = null;
  public _recorderOptions: AudioRecorderOptions;

  get android() {
    return this._recorder;
  }

  public static CAN_RECORD(): boolean {
    //this only checks if device has a microphone present
    //TODO: should it also check microphone permissions?
    const pManager = Application.android.context.getPackageManager();
    const canRecord = pManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_MICROPHONE);
    if (canRecord) {
      return true;
    } else {
      return false;
    }
  }

  public record(options: AudioRecorderOptions): Promise<any> {
    console.log('Starting a new recording');
    this._recorderOptions = options;
    return new Promise(async (resolve, reject) => {
      try {
        if (this._recorder) {
          // reset for reuse
          this._recorder.reset();
          console.log('reset Android recorder instance');
        } else {
          this._recorder = new android.media.MediaRecorder();
          console.log('initializing Android recorder instance');
        }
        const audioSource = options.source ? options.source : android.media.MediaRecorder.AudioSource.DEFAULT; // https://developer.android.com/reference/android/media/MediaRecorder.AudioSource
        // const audioSource = android.media.MediaRecorder.AudioSource.MIC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioSource
        // this._recorder.setAudioSource(android.media.MediaRecorder.AudioSource.MIC);
        console.log('setting audio Source to ', audioSource);
        // console.log('android.media.MediaRecorder.AudioSource.MIC ', android.media.MediaRecorder.AudioSource.MIC);
        this._recorder.setAudioSource(audioSource);

        // const outFormat = options.format ? options.format : android.media.AudioFormat.ENCODING_PCM_16BIT; // https://developer.android.com/reference/android/media/AudioFormat#ENCODING_PCM_16BIT
        const outFormat = options.format ? options.format : android.media.AudioFormat.ENCODING_AAC_LC; // https://developer.android.com/reference/android/media/AudioFormat#ENCODING_AAC_LC
        this._recorder.setOutputFormat(outFormat);

        const encoder = options.encoder ? options.encoder : android.media.MediaRecorder.AudioEncoder.AAC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioEncoder#AAC
        this._recorder.setAudioEncoder(encoder);

        if (options.channels) {
          this._recorder.setAudioChannels(options.channels);
        }

        let sampleRate = options.sampleRate ? options.sampleRate : 44100;
        this._recorder.setAudioSamplingRate(sampleRate);

        let bitRate = options.bitRate ? options.bitRate : 128000;
        this._recorder.setAudioEncodingBitRate(bitRate);

        if (options.maxDuration) {
          this._recorder.setMaxDuration(options.maxDuration);
        }

        let tempFileName: string, outputPath: string;

        for (let i = 1; i < 999999999; i++) {
          tempFileName = 'tempaudio-' + i + '.mp4';
          outputPath = path.join(knownFolders.documents().path, tempFileName);
          if (!File.exists(outputPath)) break;
        }
        console.log('Starting a new recording session with filename', outputPath);
        if (!this._audioFiles) this._audioFiles = [outputPath];
        else this._audioFiles.push(outputPath);

        //this._recorder.setOutputFile(options.filename);
        this._recorder.setOutputFile(outputPath);

        // On Error
        this._recorder.setOnErrorListener(
          new android.media.MediaRecorder.OnErrorListener({
            onError: (recorder: any, error: number, extra: number) => {
              options.errorCallback({ recorder, error, extra });
            },
          })
        );

        // On Info
        this._recorder.setOnInfoListener(
          new android.media.MediaRecorder.OnInfoListener({
            onInfo: (recorder: any, info: number, extra: number) => {
              options.infoCallback({ recorder, info, extra });
            },
          })
        );

        this._recorder.prepare();
        this._recorder.start();
        this._isRecording = true;
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public getMeters(): number {
    if (this._recorder != null) return this._recorder.getMaxAmplitude();
    else return 0;
  }

  public pause(): Promise<any> {
    console.log('pause() Recording?', this._isRecording);
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          if (!this.isRecording) {
            console.warn('Not currently recording, record/resume before calling pause');
            return reject('Not currently recording, record/resume before calling pause');
          }
          //Android supports pausing and resuming a recording but we want individual recordings so user can preview
          // this._recorder.pause();
          this._recorder.stop();
          this._isPaused = true;
          this._isRecording = false;
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public resume(): Promise<any> {
    console.log('resume() Recording?', this._isRecording);
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          //Android supports pausing and resuming a recording but we want individual recordings so user can preview
          // this._recorder.resume();
          this.record(this._recorderOptions);
          this._isPaused = false;
          this._isRecording = true;
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public stop(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
          this._isRecording = this._isPaused = false;
          //combine audio files recorded so far
          console.log('Done recording, handling temp files', this._audioFiles);
          //if we only have a single file, rename the file to the main recording filename and done
          if (this._audioFiles.length === 1) {
            if (!File.exists(this._audioFiles[0])) {
              return reject('Audio recording not found! path: ' + this._audioFiles[0]);
            }
            console.log('Renaming file from ', this._audioFiles[0], ' to ', this._recorderOptions.filename);
            File.fromPath(this._audioFiles[0]).renameSync(this._recorderOptions.filename);
            if (!File.exists(this._recorderOptions.filename)) {
              console.error('Failed to rename file!');
            }
            File.fromPath(this._audioFiles[0]).removeSync();
            this._audioFiles = null;
            const file = File.fromPath(this._recorderOptions.filename);
            console.log(file, file.size);
            return resolve(file);
          } else if (this._audioFiles.length > 1) {
            //if we have more than one file recorded and merge if so
            console.log('Have files to merge, #:', this._audioFiles.length);

            for (let i = 0; i < this._audioFiles.length; i++) {
              let file = File.fromPath(this._audioFiles[i]);
              console.log('file', file.path, file.size);
            }
            let outputfilename = this.mergeMP4Files(this._audioFiles, this._recorderOptions.filename);
            // let testobj = new com.voicethread.audio.AudioMerge();
            // let outputfilename = testobj.concatenateFiles(this._audioFiles, this._recorderOptions.filename);
            console.log('done merging files, result:', outputfilename);
            if (!outputfilename) {
              console.error('Failed to merge files!');
              return reject('Failed to merge files!');
            }

            let outputfile = File.fromPath(this._recorderOptions.filename);
            console.log(outputfile, outputfile.size);
            // let outputfile = await mergeAudioFiles(this._audioFiles, this._recorderOptions.filename);
            this._audioFiles = null;
            return resolve(outputfile);
          } else {
            //something went wrong
            console.error('No audio files in array');
            return reject('No audio recordings generated');
          }
          // resolve(File.fromPath(this._options.filename));
        } else return reject('No native recorder instance, was this cleared by mistake!?');
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public isPaused() {
    return this._recorder && this._isPaused;
  }

  public isRecording() {
    return this._recorder && this._isRecording;
  }
  private cleanup() {
    //TODO: delete all temporary recording and preview files created during this session

    this._audioFiles = null;
  }

  public dispose(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.release();
        }
        this._isRecording = this._isPaused = false;
        this.cleanup();
        this._recorder = undefined;
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  private mergeMP4Files(audioFiles: [string], outputfilename: string): string {
    //Note: This will only merge audio tracks from  mp4 files, and only succeed if all input have same format/encoding
    //MediaMuxer support for multiple audio/video tracks only on API 26+ only
    if (+Device.sdkVersion < 26) {
      console.error('This is only supported on API 26+');
      return null;
    }
    if (!audioFiles || audioFiles.length <= 1) return null;

    // Create the MediaMuxer and specify the output file
    const muxer = new android.media.MediaMuxer(outputfilename, android.media.MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
    const MAX_SAMPLE_SIZE = 256 * 1024;
    const APPEND_DELAY = 200; //we add a little delay between segments to make segmentation a little more obvious
    var totalDuration = 0;
    var audioFormat: android.media.MediaFormat = null;
    var audioTrackIndex = -1;
    try {
      let muxerStarted: Boolean = false;
      for (let i = 0; i < audioFiles.length; i++) {
        let mediadata = new android.media.MediaMetadataRetriever();
        mediadata.setDataSource(audioFiles[i]);
        var trackDuration = 0;
        try {
          trackDuration = +mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_DURATION);
          // console.log('trackDuration ', trackDuration); //returned in milliseconds
        } catch (err) {
          console.error('Unable to extract trackDuration from metadata!');
        }
        let audioExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
        audioExtractor.setDataSource(audioFiles[i]);
        let tracks = audioExtractor.getTrackCount();
        if (!audioFormat)
          for (let j = 0; j < audioExtractor.getTrackCount(); j++) {
            let mf = audioExtractor.getTrackFormat(j);
            let mime = mf.getString(android.media.MediaFormat.KEY_MIME);
            if (mime.startsWith('audio/')) {
              audioExtractor.selectTrack(j);
              audioFormat = audioExtractor.getTrackFormat(j);
              break;
            }
          }
        if (audioTrackIndex == -1) {
          audioTrackIndex = muxer.addTrack(audioFormat);
        }
        var sawAudioEOS = false;
        var bufferSize = MAX_SAMPLE_SIZE;
        let audioBuf = java.nio.ByteBuffer.allocate(bufferSize);
        var offset = 0;
        var bufferInfo: android.media.MediaCodec.BufferInfo = new android.media.MediaCodec.BufferInfo();

        // start muxer if not started yet
        if (!muxerStarted) {
          muxer.start();
          muxerStarted = true;
        }
        //add file data
        while (!sawAudioEOS) {
          bufferInfo.offset = offset;
          bufferInfo.size = audioExtractor.readSampleData(audioBuf, offset);
          if (bufferInfo.size < 0) {
            sawAudioEOS = true;
            bufferInfo.size = 0;
            totalDuration += trackDuration;
            audioFormat = null;
          } else {
            bufferInfo.presentationTimeUs = audioExtractor.getSampleTime() + totalDuration + APPEND_DELAY;
            bufferInfo.flags = android.media.MediaCodec.BUFFER_FLAG_KEY_FRAME;
            muxer.writeSampleData(audioTrackIndex, audioBuf, bufferInfo);
            audioExtractor.advance();
          }
        }
        mediadata.release();
        mediadata = null;
        audioExtractor.release();
        audioExtractor = null;
      }
      muxer.stop();
      // console.log('totalDuration (ms) => ', totalDuration);
    } catch (err) {
      console.error(err, err.message);
      return null;
    }

    return outputfilename;
  }
}
