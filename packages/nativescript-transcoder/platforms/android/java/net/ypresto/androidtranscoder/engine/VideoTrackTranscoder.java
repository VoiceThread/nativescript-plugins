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

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.RectF;
import android.media.MediaCodec;
import android.media.MediaExtractor;
import android.media.MediaFormat;
import android.view.Surface;

import net.ypresto.androidtranscoder.TLog;

import net.ypresto.androidtranscoder.format.MediaFormatExtraConstants;
import net.ypresto.androidtranscoder.utils.MediaExtractorUtils;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

// Refer: https://android.googlesource.com/platform/cts/+/lollipop-release/tests/tests/media/src/android/media/cts/ExtractDecodeEditEncodeMuxTest.java
public class VideoTrackTranscoder implements TrackTranscoder {

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
        private MediaCodec mDecoder;
        private ByteBuffer [] mDecoderInputBuffers;
        private OutputSurface mOutputSurface;
        private Integer mTrackIndex;
        boolean mBufferRequeued;
        int mResult;
        private final MediaCodec.BufferInfo mBufferInfo = new MediaCodec.BufferInfo();
        DecoderWrapper(MediaExtractor mediaExtractor) {
            mExtractor = mediaExtractor;
        }

        public void start(int outputRotation, int outputWidth, int outputHeight) {
            mOutputSurface = new OutputSurface();
            MediaExtractorUtils.TrackResult trackResult = MediaExtractorUtils.getFirstVideoAndAudioTrack(mExtractor);
            if (trackResult.mVideoTrackFormat != null) {
                int trackIndex = trackResult.mVideoTrackIndex;
                mTrackIndex = trackIndex;
                mExtractor.selectTrack(trackIndex);
                MediaFormat inputFormat = mExtractor.getTrackFormat(trackIndex);
                int clipRotation = 0;
                if (inputFormat.containsKey(MediaFormatExtraConstants.KEY_ROTATION_DEGREES))
                    clipRotation = inputFormat.getInteger(MediaFormatExtraConstants.KEY_ROTATION_DEGREES);
                mOutputSurface.setSourceRotation(clipRotation);
                    // Decoded video is rotated automatically in Android 5.0 lollipop.
                    // Turn off here because we don't want to encode rotated one.
                    // refer: https://android.googlesource.com/platform/frameworks/av/+blame/lollipop-release/media/libstagefright/Utils.cpp
                int rotation = clipRotation - outputRotation;
                if (rotation < 0)
                    rotation = 360 + rotation;
                inputFormat.setInteger(MediaFormatExtraConstants.KEY_ROTATION_DEGREES, rotation);
                mOutputSurface.setRotation(rotation);
                int clipWidth = inputFormat.getInteger(MediaFormat.KEY_WIDTH);
                int clipHeight = inputFormat.getInteger(MediaFormat.KEY_HEIGHT);
                if (rotation == 90 || rotation == 270)
                    mOutputSurface.setSourceRect(new RectF(0, 0, clipHeight, clipWidth));
                else
                    mOutputSurface.setSourceRect(new RectF(0, 0, clipWidth, clipHeight));
                mOutputSurface.setOriginalSourceRect(new RectF(0, 0, clipWidth, clipHeight));
                mOutputSurface.setDestRect(new RectF(0, 0, outputWidth, outputHeight));

                try {
                    mDecoder = MediaCodec.createDecoderByType(inputFormat.getString(MediaFormat.KEY_MIME));
                } catch (IOException e) {
                    throw new IllegalStateException(e);
                }
                mDecoder.configure(inputFormat, mOutputSurface.getSurface(), null, 0);
                mDecoder.start();
                mDecoderStarted = true;
                mDecoderInputBuffers = mDecoder.getInputBuffers();
            }
        }
        private float mPresentationTimeus;
        private float mDurationUs;
        private TimeLine.Filter mFilter;
        private void setFilter(TimeLine.Filter filter, long presentationTimeUs, long durationUs) {
            mFilter = filter;
            mPresentationTimeus = presentationTimeUs;
            mDurationUs = durationUs;

        }
        private void filterTick (float presentationTimeUs) {
            if (mFilter == TimeLine.Filter.OPACITY_UP_RAMP) {
                mOutputSurface.setAlpha((presentationTimeUs - mPresentationTimeus) / mDurationUs);
            }
            if (mFilter == TimeLine.Filter.OPACITY_DOWN_RAMP) {
                mOutputSurface.setAlpha(1.0f - (presentationTimeUs - mPresentationTimeus) / mDurationUs);
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
            if (mOutputSurface != null) {
                mOutputSurface.release();
                mOutputSurface = null;
            }
            if (mDecoder != null) {
                mDecoder.stop();
                mDecoder.release();
                mDecoder = null;
            }
        }

    };
    /**
     * Wraps an output surface with logic to write on it's canvas.  It must be passed the media
     * extractor of the first video track so that it can coordinate it's rotation with the vide
     * that it will ultimately be blended with in the TextureRenderer
     */
    private class CanvasWrapper {
        private MediaExtractor mExtractor;
        private OutputSurface mOutputSurface;
        private boolean mDrawn = false;
        CanvasWrapper(MediaExtractor mediaExtractor) {
            mExtractor = mediaExtractor;
        }

        public void start(int outputRotation, int outputWidth, int outputHeight) {

            MediaExtractorUtils.TrackResult trackResult = MediaExtractorUtils.getFirstVideoAndAudioTrack(mExtractor);
            if (trackResult.mVideoTrackFormat != null) {
                int trackIndex = trackResult.mVideoTrackIndex;
                mExtractor.selectTrack(trackIndex);
                MediaFormat inputFormat = mExtractor.getTrackFormat(trackIndex);

                // Determine rotation of this particular video base on meta tag
                int clipRotation = 0;
                if (inputFormat.containsKey(MediaFormatExtraConstants.KEY_ROTATION_DEGREES))
                    clipRotation = inputFormat.getInteger(MediaFormatExtraConstants.KEY_ROTATION_DEGREES);

                // Decoded video is rotated automatically in Android 5.0 lollipop and above (our target)
                // Turn off here because we don't want to rotate the video but rather preserve the meta tag for rotation
                int rotation = clipRotation - outputRotation;  // Subsequent videos may have to rotated to align
                if (rotation < 0)
                    rotation = 360 + rotation;
                inputFormat.setInteger(MediaFormatExtraConstants.KEY_ROTATION_DEGREES, rotation);

                // width & height of clip though this may be swapped if the clip has to be rotated
                int clipWidth = inputFormat.getInteger(MediaFormat.KEY_WIDTH);
                int clipHeight = inputFormat.getInteger(MediaFormat.KEY_HEIGHT);

                mOutputSurface = new OutputSurface(clipWidth,  clipHeight);
                mOutputSurface.setRotation(rotation);  // Actual rotation in fragment shader
                mOutputSurface.setSourceRotation(clipRotation);  // Original rotation

                // Compute rectangle of rotated video
                if (rotation == 90 || rotation == 270)
                    mOutputSurface.setSourceRect(new RectF(0, 0, clipHeight, clipWidth));
                else
                    mOutputSurface.setSourceRect(new RectF(0, 0, clipWidth, clipHeight));

                // Original pre-rotated rectangle
                mOutputSurface.setOriginalSourceRect(new RectF(0, 0, clipWidth, clipHeight));

                // Rectangle of output
                mOutputSurface.setDestRect(new RectF(0, 0, outputWidth, outputHeight));

            }
        }
        void draw (String str) {
            if (str == null)
                return;
            int pivotX = 0;
            int pivotY = 0;
            int rotation = 0;
            int width = Math.round(mOutputSurface.getOriginalSourceRect().width());
            int height = Math.round(mOutputSurface.getOriginalSourceRect().height());
            int outputHeight = height;
            int outputWidth = width;

            int fontSize = outputWidth / 40;
            int offsetX = 0;

            switch (mOutputSurface.getSourceRotation()) {
                case 0:
                    pivotX = width / 2;
                    pivotY = height / 2;
                    break;
                case 90:
                    pivotX = height / 2;
                    pivotY = height / 2;
                    rotation = -90;
                    outputHeight = width;
                    outputWidth = height;
                    break;
                case 180:
                    pivotX = width / 2;
                    pivotY = height / 2;
                    rotation = 180;
                    break;
                case 270:
                    pivotX = width - height / 2;
                    pivotY = height / 2;
                    rotation = -270;
                    offsetX = width - height;
                    outputHeight = width;
                    outputWidth = height;
                    break;
            }
            Surface surface = mOutputSurface.getSurface();
            Canvas canvas = surface.lockCanvas(null);

            Paint textPaint = new Paint();
            //textPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_OVER));
            textPaint.setStyle(Paint.Style.FILL);
            textPaint.setTextSize(fontSize);
            textPaint.setAntiAlias(true);
            textPaint.setARGB(0xff, 0xff, 0xff, 0xff);
            // Removed when upgrading to 28 canvas.save(Canvas.MATRIX_SAVE_FLAG);
            canvas.save();
            canvas.rotate(rotation, pivotX, pivotY);
            canvas.drawColor(Color.TRANSPARENT, PorterDuff.Mode.CLEAR);
            canvas.drawText(str, 10 + offsetX,10 + fontSize, textPaint);
            canvas.drawText(str, 10 + offsetX,outputHeight / 2, textPaint);
            canvas.drawText(str, 10 + offsetX,outputHeight - 10, textPaint);
            canvas.restore();
            surface.unlockCanvasAndPost(canvas);

        }
        private float mPresentationTimeus;
        private float mDurationUs;
        private TimeLine.Filter mFilter;
        private void setFilter(TimeLine.Filter filter, long presentationTimeUs, long durationUs) {
            mFilter = filter;
            mPresentationTimeus = presentationTimeUs;
            mDurationUs = durationUs;

        }
        private void filterTick (float presentationTimeUs) {
            if (mFilter == TimeLine.Filter.OPACITY_UP_RAMP) {
                mOutputSurface.setAlpha((presentationTimeUs - mPresentationTimeus) / mDurationUs);
            }
            if (mFilter == TimeLine.Filter.OPACITY_DOWN_RAMP) {
                mOutputSurface.setAlpha(1.0f - (presentationTimeUs - mPresentationTimeus) / mDurationUs);
            }
        }


        private void release() {
            if (mOutputSurface != null) {
                mOutputSurface.release();
                mOutputSurface = null;
            }
        }

    };
    LinkedHashMap<String, DecoderWrapper> mDecoderWrappers = new LinkedHashMap<String, DecoderWrapper>();
    CanvasWrapper mCanvasWrapper = null;

    private static final String TAG = "VideoTrackTranscoder";
    private static final long BUFFER_LEAD_TIME = 0;//100000; // Amount we will let other decoders get ahead
    private static final int DRAIN_STATE_NONE = 0;
    private static final int DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY = 1;
    private static final int DRAIN_STATE_CONSUMED = 2;
    private final LinkedHashMap<String, MediaExtractor> mExtractors;
    private final MediaFormat mOutputFormat;
    private final QueuedMuxer mMuxer;
    private MediaCodec mEncoder;
    private ByteBuffer[] mEncoderOutputBuffers;
    private MediaFormat mActualOutputFormat;
    private InputSurface mEncoderInputSurfaceWrapper;
    private boolean mIsEncoderEOS;
    private boolean mIsSegmentFinished;
    private boolean mEncoderStarted;
    private int mTexturesReady = 0;
    private int mTextures = 0;
    private long mOutputPresentationTimeDecodedUs = 0l;
    private long mOutputPresentationTimeEncodedUs = 0;
    private long mLastBufferPresentationTime = 0l;
    private long mFrameLength = 0l;
    private TextureRender mTextureRender;
    private boolean mIsLastSegment = false;
    private final MediaCodec.BufferInfo mBufferInfo = new MediaCodec.BufferInfo();

    public VideoTrackTranscoder(LinkedHashMap<String, MediaExtractor> extractors,
                                MediaFormat outputFormat, QueuedMuxer muxer) {
        mOutputFormat = outputFormat;
        mMuxer = muxer;
        mExtractors = extractors;
    }

    @Override
    public void setupEncoder() {
        try {
            mEncoder = MediaCodec.createEncoderByType(mOutputFormat.getString(MediaFormat.KEY_MIME));
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
        mEncoder.configure(mOutputFormat, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE);
        mEncoderInputSurfaceWrapper = new InputSurface(mEncoder.createInputSurface());
        mEncoderInputSurfaceWrapper.makeCurrent();
        mEncoder.start();
        mEncoderStarted = true;
        mEncoderOutputBuffers = mEncoder.getOutputBuffers();
    }
    private void createWrapperSlot (TimeLine.Segment segment) {

        if (mDecoderWrappers.keySet().size() < 2)
            return;

        // Release any inactive decoders
        Iterator<Map.Entry<String, VideoTrackTranscoder.DecoderWrapper>> iterator = mDecoderWrappers.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, VideoTrackTranscoder.DecoderWrapper> decoderWrapperEntry = iterator.next();
            if (!segment.getVideoChannels().containsKey(decoderWrapperEntry.getKey())) {
                decoderWrapperEntry.getValue().release();
                segment.timeLine().getChannels().get(decoderWrapperEntry.getKey()).mInputEndTimeUs = 0l;
                iterator.remove();
                TLog.d(TAG, "setupDecoders Releasing Decoder " + decoderWrapperEntry.getKey());
                return;
            }
        }

    }
    /**
     * Setup all decoders and texture renderers needed for this segment - called at start of segment processing
     * We also close any ones not needed for this segment that may have been opened in a previous segment
     * @param segment
     */
    @Override
    public void setupDecoders(TimeLine.Segment segment, MediaTranscoderEngine.TranscodeThrottle throttle, int outputRotation, int width, int height) {
        if (mCanvasWrapper != null) {
            mCanvasWrapper.release();
            mCanvasWrapper = null;
        }
        // Start any decoders being opened for the first time

        for (Map.Entry<String, TimeLine.InputChannel> entry : segment.getVideoChannels().entrySet()) {
            TimeLine.InputChannel inputChannel = entry.getValue();
            String channelName = entry.getKey();
            DecoderWrapper decoderWrapper = mDecoderWrappers.get(channelName);
            if (decoderWrapper == null) {
                createWrapperSlot(segment);
                decoderWrapper = new DecoderWrapper(mExtractors.get(channelName));
                mDecoderWrappers.put(channelName, decoderWrapper);
            }
            decoderWrapper.mIsSegmentEOS = false;
            if (!decoderWrapper.mDecoderStarted) {
                TLog.d(TAG, "setupDecoders starting decoder for " + channelName);
                decoderWrapper.start(outputRotation, width, height);
            }

            if (false && mCanvasWrapper == null) {
                mCanvasWrapper = new CanvasWrapper(mExtractors.get(channelName));
                mCanvasWrapper.start(outputRotation, width, height);
            }

        }


        // Create array of texture renderers for each patch in the segment

        ArrayList<OutputSurface> outputSurfaces = new ArrayList<OutputSurface>(2);
        for (Map.Entry<String, TimeLine.InputChannel> inputChannelEntry : segment.getVideoChannels().entrySet()) {
            String channelName = inputChannelEntry.getKey();
            TimeLine.InputChannel inputChannel = inputChannelEntry.getValue();
            DecoderWrapper decoderWrapper = mDecoderWrappers.get(channelName);
            decoderWrapper.mOutputSurface.setAlpha(1.0f);
            if (!decoderWrapper.mIsDecoderEOS) {
                outputSurfaces.add(decoderWrapper.mOutputSurface);
                decoderWrapper.setFilter(inputChannel.mFilter, mOutputPresentationTimeDecodedUs, segment.getDuration());
                throttle.participate("Video" + channelName);
            } else
                decoderWrapper.mIsSegmentEOS = true;
        }
        if (mCanvasWrapper != null)
            mTextureRender = new TextureRender(outputSurfaces, mCanvasWrapper.mOutputSurface);
        else
            mTextureRender = new TextureRender(outputSurfaces, null);
        mTextureRender.surfaceCreated();
        TLog.d(TAG, "Surface Texture Created for " + outputSurfaces.size() + " surfaces");
        mTextures = outputSurfaces.size();
        mIsSegmentFinished = false;
        mIsEncoderEOS = false;
        mIsLastSegment = segment.isLastSegment;
        mTexturesReady = 0;
        if (mCanvasWrapper != null)
            mCanvasWrapper.draw(null);
    }

    @Override
    public MediaFormat getDeterminedFormat() {
        return mActualOutputFormat;
    }

    @Override
    public boolean stepPipeline(TimeLine.Segment outputSegment, MediaTranscoderEngine.TranscodeThrottle throttle) {
        boolean stepped = false;
        int status;
        while (drainEncoder(0) != DRAIN_STATE_NONE) stepped = true;
        do {
            status = drainDecoders(outputSegment, 0, throttle);
            if (status != DRAIN_STATE_NONE) stepped = true;
            // NOTE: not repeating to keep from deadlock when encoder is full.
        } while (status == DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY);
        while (drainExtractors(outputSegment, 0) != DRAIN_STATE_NONE) stepped = true;

        return stepped;
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

    // TODO: CloseGuard
    @Override
    public void releaseEncoder() {
        TLog.d(TAG, "ReleaseEncoder");
        if (mEncoderInputSurfaceWrapper != null) {
            mEncoderInputSurfaceWrapper.release();
            mEncoderInputSurfaceWrapper = null;
        }
        if (mEncoder != null) {
            if (mEncoderStarted) mEncoder.stop();
            mEncoder.release();
            mEncoder = null;
        }
        //mTextureRender.surfaceFinished();
    }

    /**
     * Release any decoders not needed in the next segment
     */
    @Override
    public void releaseDecoders() {
        for (Map.Entry<String, DecoderWrapper> decoderWrapperEntry : mDecoderWrappers.entrySet()) {
            decoderWrapperEntry.getValue().release();
        }
    }

    /**
     * Release encoder and any lingering decoders
     */
    @Override
    public void release () {
        releaseDecoders();
        releaseEncoder();
    }

    /**
     * Drain extractors
     * @param segment
     * @param timeoutUs
     * @return DRAIN_STATE_CONSUMED - pipeline has been stepped, DRAIN_STATE_NONE - could not step
     */
    private int drainExtractors(TimeLine.Segment segment, long timeoutUs) {

        boolean sampleProcessed = false;

        for (Map.Entry<String, TimeLine.InputChannel> inputChannelEntry : segment.getVideoChannels().entrySet()) {

            String channelName = inputChannelEntry.getKey();
            DecoderWrapper decoderWrapper = mDecoderWrappers.get(channelName);
            if (!decoderWrapper.mIsExtractorEOS  && !decoderWrapper.mOutputSurface.isExtraTextures()) {

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

                // Get the sample into the buffer
                int sampleSize = decoderWrapper.mExtractor.readSampleData(decoderWrapper.mDecoderInputBuffers[result], 0);
                long sampleTime = decoderWrapper.mExtractor.getSampleTime();
                boolean isKeyFrame = (decoderWrapper.mExtractor.getSampleFlags() & MediaExtractor.SAMPLE_FLAG_SYNC) != 0;
                decoderWrapper.mDecoder.queueInputBuffer(result, 0, sampleSize, sampleTime, isKeyFrame ? MediaCodec.BUFFER_FLAG_SYNC_FRAME : 0);
                decoderWrapper.mExtractor.advance();
                sampleProcessed = true;

                // Seek at least to previous key frame if needed cause it's a lot faster
                TimeLine.SegmentChannel segmentChannel = segment.getSegmentChannel(channelName);
                Long seek = segmentChannel.getVideoSeek();
                if (seek != null && (sampleTime + 500000) < seek) {
                    decoderWrapper.mExtractor.seekTo(seek, MediaExtractor.SEEK_TO_PREVIOUS_SYNC);
                    segmentChannel.seekRequestedVideo(); // So we don't repeat
                    TLog.d(TAG, "Extractor Seek " + seek);
                }
            }
        }
        return  sampleProcessed ? DRAIN_STATE_CONSUMED : DRAIN_STATE_NONE;
    }

    /**
     * We have to drain all decoders
     * @param segment
     * @param timeoutUs
     * @return
     */
    private int drainDecoders(TimeLine.Segment segment, long timeoutUs, MediaTranscoderEngine.TranscodeThrottle throttle) {
        boolean consumed = false;
        String info = "";

        // Go through each decoder in the segment and get it's frame into a texture
        for (Map.Entry<String, TimeLine.InputChannel> inputChannelEntry : segment.getVideoChannels().entrySet()) {

            String channelName = inputChannelEntry.getKey();
            TimeLine.InputChannel inputChannel = inputChannelEntry.getValue();
            DecoderWrapper decoderWrapper = mDecoderWrappers.get(channelName);

            // Only process if we have not end end of stream for this decoder or extractor
            if (throttle.canProceed("Video" + channelName, mLastBufferPresentationTime, decoderWrapper.mIsDecoderEOS) &&
                !decoderWrapper.mIsDecoderEOS && !decoderWrapper.mIsSegmentEOS) {

                info += channelName + ": " + (decoderWrapper.mOutputSurface.isExtraTextures() ? "duplicate" :
                        decoderWrapper.mOutputSurface.isTextureReady() ? "deferred" : "fresh");

                if (!decoderWrapper.mOutputSurface.isTextureReady() && decoderWrapper.mOutputSurface.consumeDuplicateTexture()) {
                    inputChannel.mVideoInputOffsetUs += mFrameLength;
                    mOutputPresentationTimeDecodedUs = Math.max(mOutputPresentationTimeDecodedUs, decoderWrapper.mBufferInfo.presentationTimeUs + inputChannel.mVideoInputOffsetUs);
                    decoderWrapper.filterTick(mOutputPresentationTimeDecodedUs);
                    ++mTexturesReady;
                    TLog.v(TAG, "Duplicate Texture ready " + mOutputPresentationTimeDecodedUs + " (" + decoderWrapper.mBufferInfo.presentationTimeUs + ")" + " for decoder " + channelName);

                    consumed = true;
                    decoderWrapper.mOutputSurface.setDuplicateTextureReady();
                } else if (!decoderWrapper.mOutputSurface.isTextureReady() && !decoderWrapper.mOutputSurface.isEndOfInputStream()) {

                    int result = decoderWrapper.dequeueOutputBuffer(timeoutUs);
                    switch (result) {
                        case MediaCodec.INFO_TRY_AGAIN_LATER:
                            continue;
                        case MediaCodec.INFO_OUTPUT_FORMAT_CHANGED:
                        case MediaCodec.INFO_OUTPUT_BUFFERS_CHANGED:
                            TLog.d(TAG, "INFO_OUTPUT_BUFFERS_CHANGED for decoder " + channelName);
                            return DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY;
                    }
                    consumed = true;
                    mFrameLength = decoderWrapper.mBufferInfo.presentationTimeUs - inputChannel.mLastBufferPresentationTime;
                    if (mFrameLength == 0)
                        mFrameLength = inputChannel.mVideoFrameLength;
                    if (inputChannel.mFrameWasCut) {
                        inputChannel.mFrameWasCut = false;
                        inputChannel.mVideoInputOffsetUs -= mFrameLength;
                        inputChannel.mTimeAlreadyCut += mFrameLength;
                    }

                    long bufferInputStartTime = decoderWrapper.mBufferInfo.presentationTimeUs;
                    long bufferInputEndTime = bufferInputStartTime + mFrameLength;
                    long bufferOutputTime = bufferInputStartTime + inputChannel.mVideoInputOffsetUs;
                    long bufferOutputEndTime = bufferInputEndTime + inputChannel.mVideoInputOffsetUs;
                    inputChannel.mLastBufferPresentationTime = bufferInputStartTime;
                    mLastBufferPresentationTime = bufferOutputTime;

                    TLog.v(TAG, "Processing Video Buffer on channel " + channelName +
                            " bufferInputStartTime=" + bufferInputStartTime +
                            " mFrameLength= " + mFrameLength +
                            " bufferOutputTime=" + bufferOutputTime +
                            " mVideoInputOffsetUs=" + inputChannel.mVideoInputOffsetUs +
                            " mOutputPresentationTimeDecodedUs=" + mOutputPresentationTimeDecodedUs);

                    // See if encoder is end-of-stream and propagate to output surface
                    if ((decoderWrapper.mBufferInfo.flags & MediaCodec.BUFFER_FLAG_END_OF_STREAM) != 0) {
                        decoderWrapper.mBufferInfo.size = 0;
                        decoderWrapper.mOutputSurface.signalEndOfInputStream();
                        decoderWrapper.mIsDecoderEOS = true;
                        TLog.d(TAG, "End of video stream on channel " + channelName);
                        mTextures = 1; // Write if there is a texture
                        decoderWrapper.mDecoder.releaseOutputBuffer(result, false);
                    } else {

                        boolean doRender = (decoderWrapper.mBufferInfo.size > 0);
                        // NOTE: doRender will block if buffer (of encoder) is full.
                        // Refer: http://bigflake.com/mediacodec/CameraToMpegTest.java.txt

                        // End of Segment
                        if (doRender && inputChannel.mInputEndTimeUs != null && bufferInputStartTime >= inputChannel.mInputEndTimeUs) {
                            decoderWrapper.requeueOutputBuffer();
                            decoderWrapper.mIsSegmentEOS = true;
                            TLog.d(TAG, "End of video Segment on channel " + channelName );
                            mTextures = 1; // Write if there is a texture

                        } else if (doRender && bufferInputStartTime >= inputChannel.mVideoInputStartTimeUs) {

                            // Determine whether time scaling down progress thus far dictates cutting a frame
                            boolean cutFrame = false;
                            if (inputChannel.mTimeToCut > inputChannel.mTimeAlreadyCut) {
                                double processed = decoderWrapper.mBufferInfo.presentationTimeUs - inputChannel.mVideoInputStartTimeUs;
                                double trackDuration = inputChannel.mInputEndTimeUs - inputChannel.mVideoInputStartTimeUs;
                                double progress = processed / trackDuration;
                                 if (Math.round(progress * inputChannel.mTimeToCut) > inputChannel.mTimeAlreadyCut)
                                    cutFrame = true;
                            }

                            // Determine whether time scaling up progress thus far dictates adding frames
                            if (inputChannel.mTimeToAdd > inputChannel.mTimeAlreadyAdded) {
                                 double progress = ((double) decoderWrapper.mBufferInfo.presentationTimeUs) /
                                        ((double) (inputChannel.mInputEndTimeUs - inputChannel.mVideoInputStartTimeUs));
                                if (Math.round(progress * inputChannel.mTimeToAdd) > inputChannel.mTimeAlreadyAdded) {
                                    double timeLeftToAdd = inputChannel.mTimeToAdd - inputChannel.mTimeAlreadyAdded;
                                    double timeLeft = inputChannel.mInputEndTimeUs - decoderWrapper.mBufferInfo.presentationTimeUs;
                                    long framesToAdd = Math.round(((double) timeLeftToAdd) / ((double) timeLeft));
                                    if (framesToAdd > 0) {
                                        decoderWrapper.mOutputSurface.duplicateTextures(framesToAdd);
                                        TLog.v(TAG, "Scaling up channel " + channelName + " framesToAdd=" + framesToAdd );
                                        inputChannel.mTimeAlreadyAdded += framesToAdd * mFrameLength;
                                    }
                                }
                            }

                            // If we are cutting a frame make adjustments to the offset and cut amounts
                            if (cutFrame) {
                                TLog.v(TAG, "Scaling down channel " + channelName + " skipping buffer");
                                inputChannel.mFrameWasCut = true;
                                inputChannel.mVideoInputAcutalEndTimeUs = bufferInputEndTime;
                                decoderWrapper.mDecoder.releaseOutputBuffer(result, false);

                                // Otherwise prepare texture for rending
                            } else {
                                decoderWrapper.mDecoder.releaseOutputBuffer(result, true);
                                decoderWrapper.mOutputSurface.awaitNewImage();
                                decoderWrapper.filterTick(mOutputPresentationTimeDecodedUs);
                                ++mTexturesReady;
                                consumed = true;
                                mOutputPresentationTimeDecodedUs = bufferOutputTime;
                                TLog.v(TAG, "Texture ready channel " + channelName + " mOutputPresentationTimeDecodedUs=" + mOutputPresentationTimeDecodedUs);
                                inputChannel.mVideoInputAcutalEndTimeUs = bufferInputEndTime;
                            }

                        // Seeking - release it without rendering
                        } else {
                            TLog.v(TAG, "Skipping video on channel" + channelName);
                            decoderWrapper.mDecoder.releaseOutputBuffer(result, false);
                            inputChannel.mVideoInputAcutalEndTimeUs = bufferInputEndTime;
                            mOutputPresentationTimeDecodedUs = bufferOutputEndTime;

                        }
                    }
                }
            }
        }


        if (allDecodersEndOfStream()) {
            if (mIsLastSegment && !mIsSegmentFinished)
                mEncoder.signalEndOfInputStream();
            mIsSegmentFinished = true;
        }


        // If all textures have been accumulated draw the image and send it to the encoder
        if (mTexturesReady >= mTextures && mTextures > 0) {
            // Wait for Canvas
            if (mCanvasWrapper != null && !mCanvasWrapper.mOutputSurface.isTextureReady()) {
                mCanvasWrapper.draw(info);
                mCanvasWrapper.mOutputSurface.updateTexture();
            }
            mTextureRender.drawFrame();

            TLog.v(TAG, "Encoded video " + mOutputPresentationTimeDecodedUs + " for decoder ");
            mEncoderInputSurfaceWrapper.setPresentationTime(mOutputPresentationTimeDecodedUs * 1000);
            mEncoderInputSurfaceWrapper.swapBuffers();
            mTexturesReady = 0;
            mOutputPresentationTimeEncodedUs += mFrameLength;
            mOutputPresentationTimeDecodedUs = Math.max(mFrameLength + mOutputPresentationTimeDecodedUs, mOutputPresentationTimeDecodedUs);
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
                if (mActualOutputFormat != null)
                    throw new RuntimeException("Video output format changed twice.");
                mActualOutputFormat = mEncoder.getOutputFormat();
                mMuxer.setOutputFormat(QueuedMuxer.SampleType.VIDEO, mActualOutputFormat);
                return DRAIN_STATE_SHOULD_RETRY_IMMEDIATELY;
            case MediaCodec.INFO_OUTPUT_BUFFERS_CHANGED:
                mEncoderOutputBuffers = mEncoder.getOutputBuffers();
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

        mMuxer.writeSampleData(QueuedMuxer.SampleType.VIDEO, mEncoderOutputBuffers[result], mBufferInfo);
        mEncoder.releaseOutputBuffer(result, false);
        return DRAIN_STATE_CONSUMED;
    }
}
