/*
 * Copyright (C) 2014 Yuya Tanaka
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package net.ypresto.androidtranscoder.engine;

import android.media.MediaExtractor;
import android.media.MediaFormat;
import android.media.MediaMetadataRetriever;
import android.media.MediaMuxer;
import net.ypresto.androidtranscoder.TLog;

import net.ypresto.androidtranscoder.format.MediaFormatStrategy;
import net.ypresto.androidtranscoder.utils.MediaExtractorUtils;

import java.io.FileDescriptor;
import java.io.IOException;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Internal engine, do not use this directly.
 */
// TODO: treat encrypted data
public class MediaTranscoderEngine {
    private static final String TAG = "MediaTranscoderEngine";
    private static final double PROGRESS_UNKNOWN = -1.0;
    private static final long SLEEP_TO_WAIT_TRACK_TRANSCODERS = 10;
    private static final long PROGRESS_INTERVAL_STEPS = 10;
    private FileDescriptor mFirstFileDescriptorWithVideo;
    private TrackTranscoder mVideoTrackTranscoder;
    private TrackTranscoder mAudioTrackTranscoder;
    private LinkedHashMap<String, MediaExtractor> mVideoExtractor;
    private LinkedHashMap<String, MediaExtractor> mAudioExtractor;
    private MediaMuxer mMuxer;
    private volatile double mProgress;
    private ProgressCallback mProgressCallback;
    private long mDurationUs;
    private long mOutputPresentationTimeUs = 0l;
    int mOutputRotation = 0;
    int mOutputWidth = 0;
    int mOutputHeight = 0;

    /**
     * The throttle ensures that an encoder doesn't overrun another encoder and produce output
     * time stamps that are two far apart from one another.  A low-water mark is kept for the
     * presentation time and all decoder actions must yield a presentation time at least that
     * high or they must re-queue the buffer until they catch up
     */
    private long ThrottleLimit = 250000l;
    private long ThrottleSeed = 24l * 60l * 60l * 1000000l;
    private long maxBlockTime = 5000l;
    //private long maxBlockTime = 500000l;
    public class TranscodeThrottle {
        private long mPresentationThreshold = ThrottleLimit;
        private Date mBlockedStartTime = null;
        private boolean mBufferProcessed = false;
        private boolean mShouldCancel = false;
        LinkedHashMap <String, Long> mLowestPresentationTime;

        public void participate (String channel) {
            mLowestPresentationTime.put(channel, null);
        }
        public void departicipate(String channel) { mLowestPresentationTime.remove(channel);}
        public void startSegment() {
            mLowestPresentationTime = new LinkedHashMap<String, Long>();
        }

        public boolean canProceed(String channel, long presentationTime, boolean endOfStream) {

            mLowestPresentationTime.put(channel, endOfStream ? -1 : presentationTime);

            // If not too far ahead of target allow processing
            return presentationTime <= mPresentationThreshold;
        }

        public void step() {
            long newPresentationThreshold = ThrottleSeed;
            boolean allChannelsReporting = true;
            for (Map.Entry<String, Long> entry : mLowestPresentationTime.entrySet()) {

                if (entry.getValue() == null)
                    allChannelsReporting = false;
                else if (entry.getValue() < 1)
                    continue;
                else if (entry.getValue() < newPresentationThreshold)
                    newPresentationThreshold = entry.getValue();
            }
            if (allChannelsReporting) {
                if (mPresentationThreshold != newPresentationThreshold + ThrottleLimit)
                    mBufferProcessed = true;
                mPresentationThreshold = newPresentationThreshold + ThrottleLimit;
                for (Map.Entry<String, Long> entry : mLowestPresentationTime.entrySet()) {
                    entry.setValue(null);
                }

            }
            if (!mBufferProcessed) {
                if (mBlockedStartTime == null)
                    mBlockedStartTime = new Date();
                else
                    mShouldCancel = ((new Date()).getTime() > (mBlockedStartTime.getTime() + maxBlockTime));
            } else {
                mShouldCancel = false;
                mBlockedStartTime = null;
            }
            mBufferProcessed = false;
        }
        public boolean shouldCancel() {
            return mShouldCancel;
        }
        public void log() {
            TLog.e(TAG, "Threshold " + mPresentationThreshold);
            for (Map.Entry<String, Long> entry : mLowestPresentationTime.entrySet()) {
                TLog.e(TAG, "Channel " + entry.getKey() + " PT:" + entry.getValue());
            }
        }
    }
    private TranscodeThrottle mThrottle  = new TranscodeThrottle();

    /**
     * Do not use this constructor unless you know what you are doing.
     */
    public MediaTranscoderEngine() {
        mAudioExtractor = new LinkedHashMap<String, MediaExtractor>();
        mVideoExtractor = new LinkedHashMap<String, MediaExtractor>();
    }

    public ProgressCallback getProgressCallback() {
        return mProgressCallback;
    }

    public void setProgressCallback(ProgressCallback progressCallback) {
        mProgressCallback = progressCallback;
    }

    /**
     * NOTE: This method is thread safe.
     */
    public double getProgress() {
        return mProgress;
    }

    /**
     * Run video transcoding. Blocks current thread.
     * Audio data will not be transcoded; original stream will be wrote to output file.
     *
     * @param timeLine                      Time line of segments
     * @param outputPath                    File path to output transcoded video file.
     * @param formatStrategy                Output format strategy.
     * @throws IOException                  when input or output file could not be opened.
     * @throws InvalidOutputFormatException when output format is not supported.
     * @throws InterruptedException         when cancel to transcode.
     */
    public void transcodeVideo(TimeLine timeLine, String outputPath, MediaFormatStrategy formatStrategy) throws IOException, InterruptedException {

        timeLine.prepare();
        if (outputPath == null) {
            throw new NullPointerException("Output path cannot be null.");
        }
        try {
             mMuxer = new MediaMuxer(outputPath, MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
            setupTrackTranscoders(timeLine, formatStrategy);
            if (mFirstFileDescriptorWithVideo == null) {
                throw new IllegalStateException("Data source is not set.");
            }
            try {
                mMuxer.setOrientationHint(mOutputRotation);
            } catch (NumberFormatException e) {
                TLog.e(TAG, "Unable to set orientaiton in Muxer");
            }

            runPipelines(timeLine);
            mMuxer.stop();
            TLog.d(TAG, "Muxer Stopped");
        } finally {
            try {
                if (mVideoTrackTranscoder != null) {
                    //mVideoTrackTranscoder.release();
                    mVideoTrackTranscoder = null;
                }
                if (mAudioTrackTranscoder != null) {
                    //mAudioTrackTranscoder.release();
                    mAudioTrackTranscoder = null;
                }
                for (Map.Entry<String, MediaExtractor> entry : mAudioExtractor.entrySet()) {
                    entry.getValue().release();
                }
                for (Map.Entry<String, MediaExtractor> entry : mVideoExtractor.entrySet()) {
                    entry.getValue().release();
                }
            } catch (RuntimeException e) {
                // Too fatal to make alive the app, because it may leak native resources.
                //noinspection ThrowFromFinallyBlock
                throw new Error("Could not shutdown extractor, codecs and muxer pipeline.", e);
            }
            try {
                if (mMuxer != null) {
                    mMuxer.release();
                    mMuxer = null;
                }
            } catch (RuntimeException e) {
                TLog.e(TAG, "Failed to release muxer.", e);
            }
        }
    }


    /**
     * Setup MediaExtractors for ever possible case in each output segment but defer connecting
     * up the decoders until they are needed.  There is a limit based on device resources as to
     * how many decoders can run at the same time and this reduced to absolute minimum needed.
     *
     * Invoke the extractor to get track information which will be used to determine high level
     * output output format details. Setup a queuedMuxer which delays Muxing until the decoder has
     * enough information to call it's setOutputFormat method and set the detailed output format.
     *
     * @param timeLine
     * @param formatStrategy
     * @throws IOException
     */
    private void setupTrackTranscoders(TimeLine timeLine, MediaFormatStrategy formatStrategy) throws IOException {

        // Setup all extractors for all segments, finding the first video and audio track to establish an interim output format
        MediaFormat videoOutputFormat = null;
        MediaFormat audioOutputFormat = null;
        MediaExtractorUtils.TrackResult trackResult = null;
        boolean allowPassthru = false;//timeLine.getChannels().size() == 1;
        for (Map.Entry<String, TimeLine.InputChannel> inputChannelEntry : timeLine.getChannels().entrySet()) {

            TimeLine.InputChannel inputChannel = inputChannelEntry.getValue();
            String channelName = inputChannelEntry.getKey();
            FileDescriptor fileDescriptor = inputChannel.mInputFileDescriptor;
            if (inputChannel.mChannelType == TimeLine.ChannelType.VIDEO || inputChannel.mChannelType == TimeLine.ChannelType.AUDIO_VIDEO) {
                MediaExtractor videoExtractor = new MediaExtractor();
                try {
                    videoExtractor.setDataSource(fileDescriptor);
                } catch (IOException e) {
                    TLog.w(TAG, "Transcode failed: input file (fd: " + fileDescriptor.toString() + ") not found");
                    throw e;
                }
                trackResult = MediaExtractorUtils.getFirstVideoAndAudioTrack(videoExtractor);
                if (trackResult.mVideoTrackFormat != null) {
                    videoExtractor.selectTrack(trackResult.mVideoTrackIndex);
                    mVideoExtractor.put(channelName, videoExtractor);
                    if (videoOutputFormat == null) {
                        videoOutputFormat = formatStrategy.createVideoOutputFormat(trackResult.mVideoTrackFormat, allowPassthru);
                        mFirstFileDescriptorWithVideo = fileDescriptor;
                    }
                    MediaMetadataRetriever mediaMetadataRetriever = new MediaMetadataRetriever();
                    mediaMetadataRetriever.setDataSource(fileDescriptor);
                    Long duration;
                    try {
                        duration = Long.parseLong(mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION)) * 1000;
                    } catch (NumberFormatException e) {
                        duration = -1l;
                    }
                    TLog.d(TAG, "Duration of " + channelName + ": (us): " + duration);
                    inputChannel.mLengthUs = duration;
                    MediaFormat format = videoExtractor.getTrackFormat(trackResult.mVideoTrackIndex);
                    String mime = format.getString(MediaFormat.KEY_MIME);
                    if (mime.startsWith("video/")) {
                        if (format.containsKey(MediaFormat.KEY_FRAME_RATE)) {
                            long frameLength = 1000000 / format.getInteger(MediaFormat.KEY_FRAME_RATE);
                            TLog.d(TAG, "Frame Length of " + channelName + ": " + frameLength);
                            inputChannel.mVideoFrameLength = frameLength;
                        }
                    }
                }
            }
            if (inputChannel.mChannelType == TimeLine.ChannelType.AUDIO || inputChannel.mChannelType == TimeLine.ChannelType.AUDIO_VIDEO) {
                MediaExtractor audioExtractor = new MediaExtractor();
                try {
                    audioExtractor.setDataSource(fileDescriptor);
                } catch (IOException e) {
                    TLog.w(TAG, "Transcode failed: input file (fd: " + fileDescriptor.toString() + ") not found");
                    throw e;
                }
                trackResult = MediaExtractorUtils.getFirstVideoAndAudioTrack(audioExtractor);
                if (trackResult.mAudioTrackFormat != null) {
                    audioExtractor.selectTrack(trackResult.mAudioTrackIndex);
                    mAudioExtractor.put(inputChannelEntry.getKey(), audioExtractor);
                    if (audioOutputFormat == null) {
                        audioOutputFormat = formatStrategy.createAudioOutputFormat(trackResult.mAudioTrackFormat, allowPassthru);
                    }
                }
            }
        }
        mDurationUs = timeLine.getDuration();
        TLog.d(TAG, "Total duration " + mDurationUs);
        if (videoOutputFormat == null && audioOutputFormat == null) {
            throw new InvalidOutputFormatException("MediaFormatStrategy returned pass-through for both video and audio. No transcoding is necessary.");
        }
        QueuedMuxer queuedMuxer = new QueuedMuxer(mMuxer, mVideoExtractor.keySet().size() > 0, mAudioExtractor.keySet().size() > 0,
                new QueuedMuxer.Listener() {
                    @Override
                    public void onDetermineOutputFormat() {
                        if (mVideoTrackTranscoder != null)
                            MediaFormatValidator.validateVideoOutputFormat(mVideoTrackTranscoder.getDeterminedFormat());
                        if (mAudioTrackTranscoder != null)
                            MediaFormatValidator.validateAudioOutputFormat(mAudioTrackTranscoder.getDeterminedFormat());
                    }
                }
         );

        if (mVideoExtractor.keySet().size() > 0) {
            if (videoOutputFormat == null && trackResult != null) {
                mVideoTrackTranscoder = new PassThroughTrackTranscoder(mVideoExtractor.entrySet().iterator().next().getValue(),
                        trackResult.mVideoTrackIndex, queuedMuxer, QueuedMuxer.SampleType.VIDEO);
            } else {
                mVideoTrackTranscoder = new VideoTrackTranscoder(mVideoExtractor, videoOutputFormat, queuedMuxer);
            }

            MediaMetadataRetriever mediaMetadataRetriever = new MediaMetadataRetriever();
            mediaMetadataRetriever.setDataSource(mFirstFileDescriptorWithVideo);
            mOutputRotation = Integer.parseInt(mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_ROTATION));
            mOutputHeight = Integer.parseInt(mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT));
            mOutputWidth = Integer.parseInt(mediaMetadataRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH));
            mVideoTrackTranscoder.setupEncoder();
        }

        if (mAudioExtractor.keySet().size() > 0) {
            if (audioOutputFormat == null) {
                mAudioTrackTranscoder = new PassThroughTrackTranscoder(mAudioExtractor.entrySet().iterator().next().getValue(),
                        trackResult.mAudioTrackIndex, queuedMuxer, QueuedMuxer.SampleType.AUDIO);
            } else {
                mAudioTrackTranscoder = new AudioTrackTranscoder(mAudioExtractor, audioOutputFormat, queuedMuxer);
            }
            mAudioTrackTranscoder.setupEncoder();
        }
    }

    private void runPipelines(TimeLine timeLine) throws IOException, InterruptedException {
        long loopCount = 0;

        long outputSyncTimeUs = 0l;
        double lastProgress = -1;
        if (mDurationUs <= 0) {
            double progress = PROGRESS_UNKNOWN;
            mProgress = progress;
            if (mProgressCallback != null)
                mProgressCallback.onProgress(progress); // unknown
        }
        for (TimeLine.Segment outputSegment : timeLine.getSegments()) {
            outputSegment.start(mOutputPresentationTimeUs,
                    mVideoTrackTranscoder != null ? mVideoTrackTranscoder.getOutputPresentationTimeDecodedUs() : 0l,
                    mAudioTrackTranscoder != null ? mAudioTrackTranscoder.getOutputPresentationTimeDecodedUs() : 0l,
                    mVideoTrackTranscoder != null ? mVideoTrackTranscoder.getOutputPresentationTimeEncodedUs() : 0l,
                    mAudioTrackTranscoder != null ? mAudioTrackTranscoder.getOutputPresentationTimeEncodedUs() : 0l);
            mThrottle.startSegment();
            if (mAudioTrackTranscoder != null)
                mAudioTrackTranscoder.setupDecoders(outputSegment, mThrottle, mOutputRotation, mOutputWidth, mOutputHeight);
            if (mVideoTrackTranscoder != null)
                mVideoTrackTranscoder.setupDecoders(outputSegment, mThrottle, mOutputRotation, mOutputWidth, mOutputHeight);
            while (!((mVideoTrackTranscoder != null ? mVideoTrackTranscoder.isSegmentFinished() : true) &&
                     (mAudioTrackTranscoder != null ? mAudioTrackTranscoder.isSegmentFinished() : true))) {

                boolean videoStepped = mVideoTrackTranscoder != null ? mVideoTrackTranscoder.stepPipeline(outputSegment, mThrottle) : true;
                boolean audioStepped = mAudioTrackTranscoder != null ? mAudioTrackTranscoder.stepPipeline(outputSegment, mThrottle) : true;
                boolean stepped = videoStepped || audioStepped;
                mOutputPresentationTimeUs = Math.max(
                        mVideoTrackTranscoder != null ? mVideoTrackTranscoder.getOutputPresentationTimeDecodedUs() : 0l,
                        mAudioTrackTranscoder != null ? mAudioTrackTranscoder.getOutputPresentationTimeDecodedUs() : 0l);
                loopCount++;


                if (mVideoTrackTranscoder != null && mDurationUs > 0 && loopCount % PROGRESS_INTERVAL_STEPS == 0) {
                    double progress = Math.min(1.0, (double) mVideoTrackTranscoder.getOutputPresentationTimeDecodedUs() / mDurationUs);
                    mProgress = progress;
                    double roundedProgress = Math.round(progress * 100);
                    if (mProgressCallback != null && roundedProgress != lastProgress) mProgressCallback.onProgress(progress);
                    lastProgress = roundedProgress;
                }

                if (!stepped) {
                    try {
                        Thread.sleep(SLEEP_TO_WAIT_TRACK_TRANSCODERS);
                    } catch (InterruptedException e) {
                        // nothing to do
                    }
                }
                mThrottle.step();
                if (mThrottle.shouldCancel()) {
                    TLog.d(TAG, "Cancel because of waiting for buffer");
                    mThrottle.log();
                    throw new IllegalStateException("Timed out waiting for buffer");
                }
            }

        }
        TLog.d(TAG, "Releasing transcoders");
        if (mVideoTrackTranscoder != null) {
            mVideoTrackTranscoder.release();
            TLog.d(TAG, "Video PT: " + mVideoTrackTranscoder.getOutputPresentationTimeDecodedUs() +
                    " Time " + mVideoTrackTranscoder.getOutputPresentationTimeEncodedUs());
        }
        if (mAudioTrackTranscoder != null) {
            mAudioTrackTranscoder.release();
            TLog.d(TAG, " -- Audio PT:" + mAudioTrackTranscoder.getOutputPresentationTimeDecodedUs() +
                    " Time " + mAudioTrackTranscoder.getOutputPresentationTimeEncodedUs());
        }
     }

    public interface ProgressCallback {
        /**
         * Called to notify progress. Same thread which initiated transcode is used.
         *
         * @param progress Progress in [0.0, 1.0] range, or negative value if progress is unknown.
         */
        void onProgress(double progress);
    }
}
