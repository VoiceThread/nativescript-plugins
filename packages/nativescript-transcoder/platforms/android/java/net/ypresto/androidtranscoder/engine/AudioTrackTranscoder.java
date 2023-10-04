package net.ypresto.androidtranscoder.engine;

import android.media.MediaCodec;
import android.media.MediaExtractor;
import android.media.MediaFormat;
import net.ypresto.androidtranscoder.TLog;

import net.ypresto.androidtranscoder.compat.MediaCodecBufferCompatWrapper;
import net.ypresto.androidtranscoder.utils.MediaExtractorUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import static net.ypresto.androidtranscoder.engine.AudioChannel.BUFFER_INDEX_END_OF_STREAM;

public class AudioTrackTranscoder implements TrackTranscoder {
    private static final String TAG = "AudioTrackTranscoder";
    private static final QueuedMuxer.SampleType SAMPLE_TYPE = QueuedMuxer.SampleType.AUDIO;
    private static final long BUFFER_LEAD_TIME = 100000; // Amount we will let other decoders get ahead

    private static final int DRAIN_STATE_NONE = 0;
    private static final int DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY = 1;
    private static final int DRAIN_STATE_CONSUMED = 2;

    private final LinkedHashMap<String, MediaExtractor> mExtractors;
    private final QueuedMuxer mMuxer;

    private LinkedHashMap<String, Integer> mTrackIndexes;
    private final LinkedHashMap<String, MediaFormat> mInputFormat;
    private final MediaFormat mOutputFormat;

    private MediaCodec mEncoder;
    private MediaFormat mActualOutputFormat;

    private HashMap<String, MediaCodecBufferCompatWrapper> mDecoderBuffers;
    private MediaCodecBufferCompatWrapper mEncoderBuffers;

    private boolean mIsEncoderEOS;
    private boolean mEncoderStarted;

    private AudioChannel mAudioChannel;
    private boolean mIsSegmentFinished;
    private boolean mIsLastSegment = false;
    private long mOutputPresentationTimeDecodedUs = 0l;
    private long mOutputPresentationTimeEncodedUs = 0;
    private long mLastBufferPresentationTime = 0l;
    private final MediaCodec.BufferInfo mBufferInfo = new MediaCodec.BufferInfo();

    public AudioTrackTranscoder(LinkedHashMap<String, MediaExtractor> extractor,
                                MediaFormat outputFormat, QueuedMuxer muxer) {
        mExtractors = extractor;
        mTrackIndexes = new LinkedHashMap<String, Integer>();
        mOutputFormat = outputFormat;
        mMuxer = muxer;
        mInputFormat = new LinkedHashMap<String, MediaFormat>();
    }
    /**
     * Wraps an extractor -> decoder -> output surface that corresponds to an input channel.
     * The extractor is passed in when created and the start should be called when a segment
     * is found that needs the wrapper.
     */
    private class DecoderWrapper {
        private boolean mIsExtractorEOS;
        private boolean mIsDecoderEOS;
        private boolean mIsSegmentEOS;
        private boolean mDecoderStarted;
        private MediaExtractor mExtractor;
        private MediaCodecBufferCompatWrapper mDecoderInputBuffers;
        private MediaCodec mDecoder;
        private Integer mTrackIndex;
        boolean mBufferRequeued;
        int mResult;
        private final MediaCodec.BufferInfo mBufferInfo = new MediaCodec.BufferInfo();
        DecoderWrapper(MediaExtractor mediaExtractor) {
            mExtractor = mediaExtractor;
        }

        private void start() {
            MediaExtractorUtils.TrackResult trackResult = MediaExtractorUtils.getFirstVideoAndAudioTrack(mExtractor);
            if (trackResult.mAudioTrackFormat != null) {
                int trackIndex = trackResult.mAudioTrackIndex;
                mTrackIndex = trackIndex;
                mExtractor.selectTrack(trackIndex);
                MediaFormat inputFormat = mExtractor.getTrackFormat(trackIndex);

                try {
                    mDecoder = MediaCodec.createDecoderByType(inputFormat.getString(MediaFormat.KEY_MIME));
                } catch (IOException e) {
                    throw new IllegalStateException(e);
                }
                mDecoder.configure(inputFormat, null, null, 0);
                mDecoder.start();
                mDecoderStarted = true;
                mDecoderInputBuffers =  new MediaCodecBufferCompatWrapper(mDecoder);
            }
        }
        private int dequeueOutputBuffer(long timeoutUs) {
            if (!mBufferRequeued)
                mResult = mDecoder.dequeueOutputBuffer(mBufferInfo, timeoutUs);
            mBufferRequeued = false;
            return mResult;
        }
        private void requeueOutputBuffer() {
            mBufferRequeued = true;
        }
        private void release() {
            if (mDecoder != null) {
                mDecoder.stop();
                mDecoder.release();
                mDecoder = null;
            }
        }

    };
    LinkedHashMap<String, DecoderWrapper> mDecoderWrappers = new LinkedHashMap<String, DecoderWrapper>();

    @Override
    public void setupEncoder() {

        try {
            mEncoder = MediaCodec.createEncoderByType(mOutputFormat.getString(MediaFormat.KEY_MIME));
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
        mEncoder.configure(mOutputFormat, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE);
        mEncoder.start();
        mEncoderStarted = true;
        mEncoderBuffers = new MediaCodecBufferCompatWrapper(mEncoder);

    }
    private void createWrapperSlot (TimeLine.Segment segment) {
        if (mDecoderWrappers.keySet().size() < 2)
            return;

        // Release any inactive decoders
        Iterator<Map.Entry<String, DecoderWrapper>> iterator = mDecoderWrappers.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, DecoderWrapper> decoderWrapperEntry = iterator.next();
            if (!segment.getAudioChannels().containsKey(decoderWrapperEntry.getKey())) {
                segment.timeLine().getChannels().get(decoderWrapperEntry.getKey()).mInputEndTimeUs = 0l;
                decoderWrapperEntry.getValue().release();
                iterator.remove();
                TLog.d(TAG, "Releasing Audio Decoder " + decoderWrapperEntry.getKey());
                return;
            }
        }

    }
    @Override
    public void setupDecoders(TimeLine.Segment segment, MediaTranscoderEngine.TranscodeThrottle throttle, int outputRotation, int width, int height) {

        LinkedHashMap<String, MediaCodec> decoders = new LinkedHashMap<String, MediaCodec>();
        boolean hasAudioChannels = false;

        // Start any decoders being opened for the first time
        for (Map.Entry<String, TimeLine.InputChannel> entry : segment.getAudioChannels().entrySet()) {
            TimeLine.InputChannel inputChannel = entry.getValue();
            String channelName = entry.getKey();

            DecoderWrapper decoderWrapper = mDecoderWrappers.get(channelName);
            if (decoderWrapper == null) {
                createWrapperSlot(segment);
                decoderWrapper = new DecoderWrapper(mExtractors.get(channelName));
                mDecoderWrappers.put(channelName, decoderWrapper);
                throttle.participate("Audio" + channelName);
            }
            if (!decoderWrapper.mDecoderStarted) {
                decoderWrapper.start();
            }
            if (decoderWrapper.mIsDecoderEOS) {
                TLog.d(TAG, "setupDecoders channel:" + channelName + " is at EOS -- dropping");
                throttle.departicipate("Audio" + channelName);
            } else {
                TLog.d(TAG, "setupDecoders channel: " + channelName);
                decoderWrapper.mIsSegmentEOS = false;
                decoders.put(entry.getKey(), decoderWrapper.mDecoder);
            }
            hasAudioChannels = true;
        }

        // Setup an audio channel that will mix from multiple decoders
        mAudioChannel = mAudioChannel == null ? new AudioChannel(decoders, mEncoder, mOutputFormat) :
                mAudioChannel.createFromExisting(decoders, mEncoder, mOutputFormat);
        mIsSegmentFinished = false;
        mIsEncoderEOS = false;
        mIsLastSegment = segment.isLastSegment;

        for (Map.Entry<String, TimeLine.InputChannel> entry : segment.getAudioChannels().entrySet()) {
            TimeLine.InputChannel inputChannel = entry.getValue();
            String channelName = entry.getKey();
            if (inputChannel.mMuteAudio)
                mAudioChannel.setMute(channelName);
        }

        if (!hasAudioChannels) {
            mLastBufferPresentationTime += segment.getDuration();
            mOutputPresentationTimeDecodedUs += segment.getDuration();
        }
    }
    @Override
    public MediaFormat getDeterminedFormat() {
        return mActualOutputFormat;
    }

    @Override
    public boolean stepPipeline(TimeLine.Segment outputSegment, MediaTranscoderEngine.TranscodeThrottle throttle) {
        boolean stepped = false;
        Long timeEncodedUs;

        int status;
        while (drainEncoder(0) != DRAIN_STATE_NONE) stepped = true;
        do {
            status = drainDecoder(outputSegment, 0, throttle);
            if (status != DRAIN_STATE_NONE) stepped = true;
            // NOTE: not repeating to keep from deadlock when encoder is full.
        } while (status == DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY);

        while ((timeEncodedUs = mAudioChannel.feedEncoder(0)) != null) {
            if (timeEncodedUs >= 0) {
                TLog.v(TAG, "Encoded audio duration " + timeEncodedUs);
                mOutputPresentationTimeEncodedUs += timeEncodedUs;
            } else {
                for (Map.Entry<String, DecoderWrapper> decoderWrapperEntry : mDecoderWrappers.entrySet()) {
                    decoderWrapperEntry.getValue().mIsSegmentEOS = true;
                }
            }
            stepped = true;
        }
        while (drainExtractors(outputSegment, 0) != DRAIN_STATE_NONE) stepped = true;

        return stepped;
    }

    private int drainExtractors(TimeLine.Segment segment, long timeoutUs) {

        boolean sampleProcessed = false;

        for (Map.Entry<String, TimeLine.InputChannel> inputChannelEntry : segment.getAudioChannels().entrySet()) {

            DecoderWrapper decoderWrapper = mDecoderWrappers.get(inputChannelEntry.getKey());
            String channelName = inputChannelEntry.getKey();
            if (!decoderWrapper.mIsExtractorEOS) {

                // Find out which track the extractor has samples for next
                int trackIndex = decoderWrapper.mExtractor.getSampleTrackIndex();

                // Sample is for a different track (like audio) ignore
                if (trackIndex >= 0 && trackIndex != decoderWrapper.mTrackIndex) {
                    if (inputChannelEntry.getValue().mChannelType == TimeLine.ChannelType.AUDIO)
                        decoderWrapper.mExtractor.advance(); // Skip video
                    continue;
                }

                // Get buffer index to be filled
                int result = decoderWrapper.mDecoder.dequeueInputBuffer(timeoutUs);

                // If no buffers available ignore
                if (result < 0)
                    continue;

                // If end of stream
                if (trackIndex < 0) {
                    decoderWrapper.mIsExtractorEOS = true;
                    decoderWrapper.mDecoder.queueInputBuffer(result, 0, 0, 0, MediaCodec.BUFFER_FLAG_END_OF_STREAM);
                    continue;
                }
                int sampleSize = decoderWrapper.mExtractor.readSampleData(decoderWrapper.mDecoderInputBuffers.getInputBuffer(result), 0);
                long sampleTime = decoderWrapper.mExtractor.getSampleTime();
                boolean isKeyFrame = (decoderWrapper.mExtractor.getSampleFlags() & MediaExtractor.SAMPLE_FLAG_SYNC) != 0;
                decoderWrapper.mDecoder.queueInputBuffer(result, 0, sampleSize, decoderWrapper.mExtractor.getSampleTime(), isKeyFrame ? MediaCodec.BUFFER_FLAG_SYNC_FRAME : 0);

                decoderWrapper.mExtractor.advance();
                sampleProcessed = true;

                // Seek at least to previous key frame if needed cause it's a lot faster
                TimeLine.SegmentChannel segmentChannel = segment.getSegmentChannel(channelName);
                Long seek = segmentChannel.getAudioSeek();
                if (seek != null && (sampleTime + 500000) < seek) {
                    decoderWrapper.mExtractor.seekTo(seek, MediaExtractor.SEEK_TO_PREVIOUS_SYNC);
                    segmentChannel.seekRequestedAudio(); // So we don't repeat
                    TLog.d(TAG, "Extractor Seek " + seek);
                }

            }
        }
        return  sampleProcessed ? DRAIN_STATE_CONSUMED : DRAIN_STATE_NONE;
    }

    private int drainDecoder(TimeLine.Segment segment, long timeoutUs, MediaTranscoderEngine.TranscodeThrottle throttle) {

        boolean consumed = false;

        // Go through each decoder in the segment to get a buffer to process
        for (Map.Entry<String, TimeLine.InputChannel> inputChannelEntry : segment.getAudioChannels().entrySet()) {

            String channelName = inputChannelEntry.getKey();
            TimeLine.InputChannel inputChannel = inputChannelEntry.getValue();
            DecoderWrapper decoderWrapper = mDecoderWrappers.get(inputChannelEntry.getKey());

            // Only process if we have not end end of stream for this decoder or extractor
            if (throttle.canProceed("Audio" + channelName, mLastBufferPresentationTime, decoderWrapper.mIsDecoderEOS) &&
                !decoderWrapper.mIsDecoderEOS && !decoderWrapper.mIsSegmentEOS) {

                int result = decoderWrapper.dequeueOutputBuffer(timeoutUs);
                switch (result) {
                    case MediaCodec.INFO_TRY_AGAIN_LATER:
                        continue;
                    case MediaCodec.INFO_OUTPUT_FORMAT_CHANGED:
                        mAudioChannel.setActualDecodedFormat(decoderWrapper.mDecoder.getOutputFormat());
                    case MediaCodec.INFO_OUTPUT_BUFFERS_CHANGED:
                        TLog.d(TAG, "INFO_OUTPUT_BUFFERS_CHANGED for decoder " + channelName);
                        return DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY;
                }
                TLog.v(TAG, "Dequeued Decoder Buffer " + result);
                consumed = true;
                long bufferInputStartTime = decoderWrapper.mBufferInfo.presentationTimeUs;
                long bufferInputEndTime = bufferInputStartTime + mAudioChannel.getBufferDurationUs(channelName, result);
                long bufferOutputTime = bufferInputStartTime + inputChannel.mAudioInputOffsetUs;
                long bufferOutputEndTime = bufferInputEndTime + inputChannel.mAudioInputOffsetUs;
                mLastBufferPresentationTime = bufferOutputTime;

                TLog.v(TAG, "Processing Audio Buffer on channel " + channelName +
                        " mOutputPresentationTimeDecodedUs=" + mOutputPresentationTimeDecodedUs +
                        " bufferInputStartTime=" + bufferInputStartTime +
                        " bufferOutputTime=" + bufferOutputTime +
                        " mAudioInputOffsetUs=" + inputChannel.mAudioInputOffsetUs +
                        " mOutputPresentationTimeDecodedUs=" + mOutputPresentationTimeDecodedUs);

                // End of stream - requeue the buffer
                if ((decoderWrapper.mBufferInfo.flags & MediaCodec.BUFFER_FLAG_END_OF_STREAM) != 0) {
                    decoderWrapper.mIsDecoderEOS = true;
                    //segment.forceEndOfStream(mOutputPresentationTimeDecodedUs);
                    if (mIsLastSegment)
                        mAudioChannel.drainDecoderBufferAndQueue(channelName, BUFFER_INDEX_END_OF_STREAM, 0l, 0l, 0l, 0l);
                    else
                        decoderWrapper.mDecoder.releaseOutputBuffer(result, false);
                    mAudioChannel.removeBuffers(channelName);
                    TLog.d(TAG, "End of audio stream on channel " + channelName);

                // Detect end of segment
                } else if (inputChannel.mInputEndTimeUs != null && bufferInputEndTime >= inputChannel.mInputEndTimeUs) {

                        decoderWrapper.mIsSegmentEOS = true;
                        TLog.d(TAG, "End of audio segment on channel " + channelName + " " + bufferInputStartTime + " >= " + inputChannel.mInputEndTimeUs);

                        // If there is a partial buffer to submit, submit it
                        if (bufferInputStartTime < inputChannel.mInputEndTimeUs && !inputChannel.mMuteAudio) {
                            inputChannel.mAudioInputAcutalEndTimeUs = inputChannel.mInputEndTimeUs;
                            TLog.v(TAG, "Submitting truncated audio on channel " + channelName);
                            mOutputPresentationTimeDecodedUs = inputChannel.mInputEndTimeUs + inputChannel.mAudioInputOffsetUs;
                            mAudioChannel.drainDecoderBufferAndQueue(channelName, result, decoderWrapper.mBufferInfo.presentationTimeUs, inputChannel.mAudioInputOffsetUs,
                                    0l, bufferInputEndTime - inputChannel.mInputEndTimeUs);
                        } else
                            decoderWrapper.requeueOutputBuffer();
                        mAudioChannel.setEndOfSegment(channelName);

                // Process a buffer with data
                } else if (decoderWrapper.mBufferInfo.size > 0) {

                    // If we are before start skip entirely
                    if (bufferInputStartTime < inputChannel.mAudioInputStartTimeUs || inputChannel.mMuteAudio) {

                        // Completely before start time
                        if (bufferInputEndTime < inputChannel.mAudioInputStartTimeUs || inputChannel.mMuteAudio) {
                            decoderWrapper.mDecoder.releaseOutputBuffer(result, false);
                            TLog.v(TAG, "Skipping audio for channel " + channelName);
                            inputChannel.mAudioInputAcutalEndTimeUs = bufferInputEndTime;
                            mOutputPresentationTimeDecodedUs = bufferOutputEndTime;

                            // Partially before start time
                        } else {
                            inputChannel.mAudioInputAcutalEndTimeUs = bufferInputEndTime;
                            TLog.v(TAG, "Submitting truncated audio for channel " + channelName);
                            mOutputPresentationTimeDecodedUs = bufferOutputEndTime;
                            mAudioChannel.drainDecoderBufferAndQueue(channelName, result, inputChannel.mAudioInputStartTimeUs,
                                    inputChannel.mAudioInputOffsetUs, inputChannel.mAudioInputStartTimeUs - bufferInputStartTime, 0l);
                        }
                    } else {
                        inputChannel.mAudioInputAcutalEndTimeUs = bufferInputEndTime;
                        mOutputPresentationTimeDecodedUs = bufferOutputEndTime;
                        TLog.v(TAG, "Submitting audio for channel " + channelName);
                        mAudioChannel.drainDecoderBufferAndQueue(channelName, result, decoderWrapper.mBufferInfo.presentationTimeUs,
                                inputChannel.mAudioInputOffsetUs, 0l, 0l);
                    }
                } else
                    decoderWrapper.mDecoder.releaseOutputBuffer(result, false);  // No data just ignore it
            }
        }
        if (allDecodersEndOfStream()) {
            //if (mIsLastSegment && !mIsSegmentFinished)
            //    mEncoder.signalEndOfInputStream();
            mIsSegmentFinished = true;
        }

        return consumed ? DRAIN_STATE_CONSUMED : DRAIN_STATE_NONE;
    }

    boolean allDecodersEndOfStream () {
        boolean isDecoderEndOfStream = true;
        for (Map.Entry<String, DecoderWrapper> decoderWrapperEntry : mDecoderWrappers.entrySet()) {
            if (!(decoderWrapperEntry.getValue().mIsDecoderEOS || decoderWrapperEntry.getValue().mIsSegmentEOS))
                isDecoderEndOfStream = false;
        }
        return isDecoderEndOfStream;
    }

    private int drainEncoder(long timeoutUs) {
        if (mIsEncoderEOS) return DRAIN_STATE_NONE;

        int result = mEncoder.dequeueOutputBuffer(mBufferInfo, timeoutUs);
        switch (result) {
            case MediaCodec.INFO_TRY_AGAIN_LATER:
                return DRAIN_STATE_NONE;
            case MediaCodec.INFO_OUTPUT_FORMAT_CHANGED:
                if (mActualOutputFormat != null) {
                    throw new RuntimeException("Audio output format changed twice.");
                }
                mActualOutputFormat = mEncoder.getOutputFormat();
                mMuxer.setOutputFormat(SAMPLE_TYPE, mActualOutputFormat);
                return DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY;
            case MediaCodec.INFO_OUTPUT_BUFFERS_CHANGED:
                mEncoderBuffers = new MediaCodecBufferCompatWrapper(mEncoder);
                return DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY;
        }

        if (mActualOutputFormat == null) {
            throw new RuntimeException("Could not determine actual output format.");
        }

        if ((mBufferInfo.flags & MediaCodec.BUFFER_FLAG_END_OF_STREAM) != 0) {
            mIsEncoderEOS = true;
            mIsSegmentFinished = true;
            mBufferInfo.set(0, 0, 0, mBufferInfo.flags);
        }
        if ((mBufferInfo.flags & MediaCodec.BUFFER_FLAG_CODEC_CONFIG) != 0) {
            // SPS or PPS, which should be passed by MediaFormat.
            mEncoder.releaseOutputBuffer(result, false);
            return DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY;
        }

        mMuxer.writeSampleData(SAMPLE_TYPE, mEncoderBuffers.getOutputBuffer(result), mBufferInfo);

        mEncoder.releaseOutputBuffer(result, false);
        return DRAIN_STATE_CONSUMED;
    }

    @Override
    public long getOutputPresentationTimeDecodedUs() {
        return mOutputPresentationTimeDecodedUs;
    }


    @Override
    public long getOutputPresentationTimeEncodedUs() {return mOutputPresentationTimeEncodedUs;}


    @Override
    public void setOutputPresentationTimeDecodedUs(long presentationTimeDecodedUs) {
        mOutputPresentationTimeDecodedUs = presentationTimeDecodedUs;
    }
    @Override
    public boolean isSegmentFinished() {
        return mIsSegmentFinished;
    }

    @Override
    public void releaseDecoders() {
        for (Map.Entry<String, DecoderWrapper> decoderWrapperEntry : mDecoderWrappers.entrySet()) {
            decoderWrapperEntry.getValue().release();
        }
    }
    @Override
    public void releaseEncoder() {
        TLog.d(TAG, "ReleaseEncoder");
        if (mEncoder != null) {
            if (mEncoderStarted) mEncoder.stop();
            mEncoder.release();
            mEncoder = null;
        }
    }
    @Override
    public void release() {
        releaseDecoders();
        releaseEncoder();
    }
}
