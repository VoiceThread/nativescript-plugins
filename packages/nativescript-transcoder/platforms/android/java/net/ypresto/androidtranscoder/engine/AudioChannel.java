package net.ypresto.androidtranscoder.engine;

import android.media.MediaCodec;
import android.media.MediaFormat;
import net.ypresto.androidtranscoder.TLog;

import net.ypresto.androidtranscoder.compat.MediaCodecBufferCompatWrapper;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.ShortBuffer;
import java.util.ArrayDeque;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Queue;

/**
 * InputChannel of raw audio from multiple decoders to a single encoder.
 * Performs the necessary conversion between different input & output audio formats.
 *
 * We currently support upmixing from mono to stereo & downmixing from stereo to mono.
 * Sample rate conversion is not supported yet.
 */
class AudioChannel {

    private class RemixResult  {
        public long mPresentationTime;
        public long mDuration;
        public int mBufferPosition;
        public int mBufferOverflowPosition;
        RemixResult(long presentationTime, int bufferPosition, int bufferOverflowPosition) {
            mBufferPosition = bufferPosition;
            mPresentationTime = presentationTime;
            mBufferOverflowPosition = bufferOverflowPosition;
        }
    }
    private static class AudioBuffer {
        int bufferIndex;
        Long presentationTimeUs;
        Long presentationTimeOffsetUs;
        boolean mute;
        ShortBuffer data;
    }

    private static final String TAG = "AudioChannel";
    public static final int BUFFER_INDEX_END_OF_STREAM = -1;

    private static final int BYTES_PER_SHORT = 2;
    private static final long MICROSECS_PER_SEC = 1000000;

    private final LinkedHashMap<String, Queue<AudioBuffer>> mEmptyBuffers;
    private final LinkedHashMap<String, Queue<AudioBuffer>> mFilledBuffers;
    private final LinkedHashMap<String, Boolean> mAtEndOfSegment;
    private final LinkedHashMap<String, Boolean> mMute;
    private final LinkedHashMap<String, MediaCodec> mDecoders;
    private final MediaCodec mEncoder;
    private final MediaFormat mEncodeFormat;

    private Integer mInputSampleRate;
    private Integer mInputChannelCount;
    private int mOutputChannelCount;

    private AudioRemixer mRemixer;

    private final LinkedHashMap<String, MediaCodecBufferCompatWrapper> mDecoderBuffers;
    private final MediaCodecBufferCompatWrapper mEncoderBuffers;

    private final AudioBuffer mOverflowBuffer = new AudioBuffer();

    private MediaFormat mActualDecodedFormat;
    
    private ShortBuffer mEncoderBuffer;
    private int mEncoderBufferIndex;
    private long mOutputPresentationTimeUs = -1l;

    public AudioChannel(final LinkedHashMap<String, MediaCodec> decoders,
                        final MediaCodec encoder, final MediaFormat encodeFormat) {
        mDecoders = decoders;
        mEncoder = encoder;
        mEncodeFormat = encodeFormat;
        mDecoderBuffers = new LinkedHashMap<String, MediaCodecBufferCompatWrapper>();
        mEmptyBuffers = new LinkedHashMap<String, Queue<AudioBuffer>>();
        mFilledBuffers = new LinkedHashMap<String, Queue<AudioBuffer>>();
        mAtEndOfSegment = new LinkedHashMap<String, Boolean>();
        mMute = new LinkedHashMap<String, Boolean>();

        for (Map.Entry<String, MediaCodec> entry : mDecoders.entrySet()) {
            MediaCodec decoder = entry.getValue();
            mDecoderBuffers.put(entry.getKey(), new MediaCodecBufferCompatWrapper(decoder));
            Queue<AudioBuffer> empty = new ArrayDeque<>();
            Queue<AudioBuffer> filled = new ArrayDeque<>();
            mEmptyBuffers.put(entry.getKey(), empty);
            mFilledBuffers.put(entry.getKey(), filled);
            mAtEndOfSegment.put(entry.getKey(), false);
            mMute.put(entry.getKey(), false);
        }
        mEncoderBuffers = new MediaCodecBufferCompatWrapper(mEncoder);
    }
    public void finalize () {
        if (mEncoderBuffer != null) {
            TLog.e(TAG, "Orphaned encoder buffer");
        }
    }

    public AudioChannel createFromExisting(final LinkedHashMap<String, MediaCodec> decoders,
                                           final MediaCodec encoder, final MediaFormat encodeFormat) {

        AudioChannel audioChannel = new AudioChannel(decoders, encoder, encodeFormat);
        audioChannel.mOutputPresentationTimeUs = mOutputPresentationTimeUs;
        for (Map.Entry<String, MediaCodecBufferCompatWrapper> entry : audioChannel.mDecoderBuffers.entrySet()) {
            if (mDecoderBuffers.containsKey(entry.getKey()))
                audioChannel.mDecoderBuffers.put(entry.getKey(), mDecoderBuffers.get(entry.getKey()));
        }
        for (Map.Entry<String, Queue<AudioBuffer>> entry : mFilledBuffers.entrySet()) {
            Queue<AudioBuffer> filledBuffers = entry.getValue();
            AudioBuffer decoderBuffer;
            while ((decoderBuffer = filledBuffers.poll()) != null) {
                if (decoderBuffer.bufferIndex != BUFFER_INDEX_END_OF_STREAM) {
                    //TLog.v(TAG, "Released Decoder Buffer " + decoderBuffer.bufferIndex);
                    try {
                        mDecoders.get(entry.getKey()).releaseOutputBuffer(decoderBuffer.bufferIndex, false);
                    } catch (Exception e) {
                        TLog.d(TAG, "Exception caught released Decoder Buffer " + decoderBuffer.bufferIndex);
                    }
                }
            }
        }

        audioChannel.setActualDecodedFormat(getDeterminedFormat());

        return audioChannel;
    }
    public void removeBuffers(String channelName) {
        mDecoderBuffers.remove(channelName);
        mEmptyBuffers.remove(channelName);
        mFilledBuffers.remove(channelName);
    }
    public void setEndOfSegment(String channelName) {
        mAtEndOfSegment.put(channelName, true);
    }
    public void setMute(String channelName) {
        mMute.put(channelName, true);
    }
    public void setActualDecodedFormat(final MediaFormat decodedFormat) {
        mActualDecodedFormat = decodedFormat;

        mInputSampleRate = mActualDecodedFormat.getInteger(MediaFormat.KEY_SAMPLE_RATE);
        if (mInputSampleRate != mEncodeFormat.getInteger(MediaFormat.KEY_SAMPLE_RATE)) {
            throw new UnsupportedOperationException("Audio sample rate conversion not supported yet.");
        }
/*
        if (mInputChannelCount != null && !mInputChannelCount.equals(mActualDecodedFormat.getInteger(MediaFormat.KEY_CHANNEL_COUNT)))
            throw new UnsupportedOperationException("Mixing mono and stereo not supported yet.");
*/
        mInputChannelCount = mActualDecodedFormat.getInteger(MediaFormat.KEY_CHANNEL_COUNT);
        mOutputChannelCount = mEncodeFormat.getInteger(MediaFormat.KEY_CHANNEL_COUNT);

        if (mInputChannelCount != 1 && mInputChannelCount != 2) {
            throw new UnsupportedOperationException("Input channel count (" + mInputChannelCount + ") not supported.");
        }

        if (mOutputChannelCount != 1 && mOutputChannelCount != 2) {
            throw new UnsupportedOperationException("Output channel count (" + mOutputChannelCount + ") not supported.");
        }

        if (mInputChannelCount > mOutputChannelCount) {
            mRemixer = AudioRemixer.DOWNMIX;
        } else if (mInputChannelCount < mOutputChannelCount) {
            mRemixer = AudioRemixer.UPMIX;
        } else {
            mRemixer = AudioRemixer.PASSTHROUGH;
        }

        mOverflowBuffer.presentationTimeUs = 0l;
    }

    public MediaFormat getDeterminedFormat() {
        return mActualDecodedFormat;
    }

    public long getBufferDurationUs(String input, final int bufferIndex) {
        // Grab the buffer from the decoder
        MediaCodecBufferCompatWrapper decoderBuffer = mDecoderBuffers.get(input);
        if (mActualDecodedFormat == null) {
            throw new RuntimeException("Buffer received before format!");
        }

        // Get actual decoded data
        final ShortBuffer data =
                bufferIndex == BUFFER_INDEX_END_OF_STREAM ?
                        null : decoderBuffer.getOutputBuffer(bufferIndex).asShortBuffer();

        return data == null ? 0l : sampleCountToInputDurationUs(data.limit());

    }

    /**
     * Take the data from a decoder buffer and queue it up to later be fed to the encoder.
     * @param input - channel
     * @param bufferIndex - decoder buffer index
     * @param presentationTimeUs - presentation time for output purposes
     * @param presentationTimeOffsetUs - presentation time offset relative to output

     * @param skipFirstUs - amount to skip at start of buffer
     * @param skipLastUs - amount to skip at end of buffer
     */
    public void drainDecoderBufferAndQueue(String input, final int bufferIndex,
        final Long presentationTimeUs, Long presentationTimeOffsetUs, long skipFirstUs, long skipLastUs) {

        // Grab the buffer from the decoder
        MediaCodecBufferCompatWrapper decoderBuffer = mDecoderBuffers.get(input);
        if (mActualDecodedFormat == null) {
            throw new RuntimeException("Buffer received before format!");
        }

        // Get actual decoded data
        final ShortBuffer data =
                bufferIndex == BUFFER_INDEX_END_OF_STREAM ?
                        null : decoderBuffer.getOutputBuffer(bufferIndex).asShortBuffer();

        // Grab an empty buffer (recycled) or create a new one
        AudioBuffer buffer = mEmptyBuffers.get(input).poll();
        if (buffer == null) {
            buffer = new AudioBuffer();
        }

        if (skipFirstUs > 0)
            data.position(durationToSampleCount(skipFirstUs));
        if (skipLastUs > 0)
            data.limit(data.limit() - durationToSampleCount(skipLastUs));

        // Populate buffer with decoded data
        buffer.bufferIndex = bufferIndex; // Original decoder buffer index
        buffer.presentationTimeUs = presentationTimeUs;
        buffer.presentationTimeOffsetUs = presentationTimeOffsetUs;
        buffer.data = data == null ? null : data;

        // Make sure we have an overflow buffer ready
        if (mOverflowBuffer.data == null && data != null) {
            mOverflowBuffer.data = ByteBuffer
                    .allocateDirect(data.capacity() * 2)
                    .order(ByteOrder.nativeOrder())
                    .asShortBuffer();
            mOverflowBuffer.data.clear().flip();
        }

        // Add to list of filled buffers to be processed by feedEncoder
        mFilledBuffers.get(input).add(buffer);
    }

    /**
     * Take filled buffers from drainDecoderBufferAndQueue, mix them down if needed and feed them
     * to the encoder, noting that this is not a one-to-one buffer operation and may involved
     * overflowing to an additional buffer (mostly when upmixing)
     * @param timeoutUs
     * @return
     */
    public Long feedEncoder(long timeoutUs) {

        // Determine whether we have an overflow buffer or filled buffer to process
        final boolean hasOverflow = mOverflowBuffer.data != null && mOverflowBuffer.data.hasRemaining();
        boolean areAllFilled = true;
        boolean someFilled = hasOverflow;
        // All channels must have filled buffers before we mix down
        for (Map.Entry<String, Queue<AudioBuffer>> entry : mFilledBuffers.entrySet()) {
            if (entry.getValue().isEmpty()) {
                if (!mAtEndOfSegment.get(entry.getKey()) && !mMute.get(entry.getKey()))
                    areAllFilled = false;
            } else {
                someFilled = true;
            }
        }
        if (!(someFilled && (areAllFilled || hasOverflow))) {
            // Not all channel's buffers filled so just hang tight 'till they are
            return null;
        }

        // Get a buffer from the encoder that we can fill or wait until there is a buffer
        if (mEncoderBuffer == null) {
           mEncoderBufferIndex = mEncoder.dequeueInputBuffer(timeoutUs);
            if (mEncoderBufferIndex < 0) {
                return null;
            }
            mEncoderBuffer = mEncoderBuffers.getInputBuffer(mEncoderBufferIndex).asShortBuffer();
            //TLog.v(TAG, "Got encoder buffer");
        }

        // Drain overflow first, just hand it over and we will process the rest next time
        if (hasOverflow) {
            long presentationTimeUs = drainOverflow(mEncoderBuffer);
            mEncoder.queueInputBuffer(mEncoderBufferIndex,
                    0, mEncoderBuffer.position() * BYTES_PER_SHORT,
                    presentationTimeUs, 0);
            TLog.v(TAG, "Submitting audio overflow encoder buffer at " + presentationTimeUs + " bytes: " + mEncoderBuffer.position() * BYTES_PER_SHORT);
            mEncoderBuffer = null;
            return sampleCountToOutputDurationUs(mEncoderBuffer.position());
        }

        // Go through buffers by channel and mix it down into the encoder buffer
        boolean streamPresent = false;
        Long startingPresentationTimeUs  = -1l;
        Long duration = -1l;
        boolean append = false;
        int position = 0;
        int overflowPosition = 0;
        for (Map.Entry<String, Queue<AudioBuffer>> entry : mFilledBuffers.entrySet()) {
            Queue<AudioBuffer> filledBuffers = entry.getValue();
            final AudioBuffer decoderBuffer = filledBuffers.poll();
            if (decoderBuffer != null) {
                if (decoderBuffer.bufferIndex != BUFFER_INDEX_END_OF_STREAM) {
                    streamPresent = true;
                    RemixResult result = remixAndMaybeFillOverflow(decoderBuffer, mEncoderBuffer,
                            append, 0, overflowPosition);
                    position = result.mBufferPosition;
                    overflowPosition = result.mBufferOverflowPosition;
                    startingPresentationTimeUs = Math.max(startingPresentationTimeUs, result.mPresentationTime);
                    duration = sampleCountToOutputDurationUs(mEncoderBuffer.position());
                    TLog.v(TAG, "Released Decoder Buffer " + decoderBuffer.bufferIndex);
                    mEmptyBuffers.get(entry.getKey()).add(decoderBuffer);
                    append = true;
                }
                mDecoders.get(entry.getKey()).releaseOutputBuffer(decoderBuffer.bufferIndex, false);
            }
        }
        if (!streamPresent) {
            mEncoder.queueInputBuffer(mEncoderBufferIndex, 0, 0, 0, MediaCodec.BUFFER_FLAG_END_OF_STREAM);
            mEncoderBuffer = null;
            TLog.d(TAG, "Signaled Audio End of Stream to encoder");
            return null;
        } else {
            if (mEncoderBuffer.limit() > 0) {
                Long originalStartingPresentationTimeUs = startingPresentationTimeUs;
                startingPresentationTimeUs = Math.max(mOutputPresentationTimeUs, startingPresentationTimeUs);
                mOutputPresentationTimeUs = startingPresentationTimeUs + duration;
                mEncoder.queueInputBuffer(mEncoderBufferIndex,
                        0, mEncoderBuffer.position() * BYTES_PER_SHORT,
                        startingPresentationTimeUs, 0);
                TLog.v(TAG, "Encoding audio PT: " + startingPresentationTimeUs +
                        " duration: " + duration +
                        " adjustment " + (startingPresentationTimeUs - originalStartingPresentationTimeUs) +
                        " samples: " + mEncoderBuffer.position());

                mEncoderBuffer = null;
            } else {
                TLog.d(TAG, "Ignoring buffer");
                return -1l; // ignore it
            }
            return duration;
        }
    }

    public long sampleCountToInputDurationUs(final int sampleCount) {
        int sampleRate = mInputSampleRate;
        int channelCount = mInputChannelCount;
        return  (MICROSECS_PER_SEC * sampleCount / channelCount + sampleRate - 1) / sampleRate;
    }
    public long sampleCountToOutputDurationUs(final int sampleCount) {
        int sampleRate = mInputSampleRate;
        int channelCount = mOutputChannelCount;
        return  (MICROSECS_PER_SEC * sampleCount / channelCount + sampleRate - 1) / sampleRate;
    }
    private int durationToSampleCount(final long duration) {
        int sampleRate = mInputSampleRate;
        int channelCount = mInputChannelCount;
        //Long samples = ((duration * sampleRate * channelCount) + MICROSECS_PER_SEC - 1)/ MICROSECS_PER_SEC;
        Long samples = ((duration * sampleRate - sampleRate + 1) * channelCount) / MICROSECS_PER_SEC;
        return samples.intValue();
    }
    private int durationToOutputSampleCount(final long duration) {
        int sampleRate = mInputSampleRate;
        int channelCount = mOutputChannelCount;
        //Long samples = ((duration * sampleRate * channelCount) + MICROSECS_PER_SEC - 1)/ MICROSECS_PER_SEC;
        Long samples = ((duration * sampleRate - sampleRate + 1) * channelCount) / MICROSECS_PER_SEC;
        return samples.intValue();
    }

    /**
     * Move the overflow buffer into the encoder buffer
     * @param outBuff
     * @return
     */
    private long drainOverflow(final ShortBuffer outBuff) {
        final ShortBuffer overflowBuff = mOverflowBuffer.data;
        final int overflowLimit = overflowBuff.limit();
        final int overflowSize = overflowBuff.remaining();

        final long endPresentationTimeUs = mOverflowBuffer.presentationTimeUs +
                sampleCountToInputDurationUs(overflowBuff.position());

        outBuff.clear();
        // Limit overflowBuff to outBuff's capacity
        overflowBuff.limit(outBuff.capacity());
        // Load overflowBuff onto outBuff
        outBuff.put(overflowBuff);

        if (overflowSize >= outBuff.capacity()) {
            // Overflow fully consumed - Reset
            overflowBuff.clear().limit(0);
        } else {
            // Only partially consumed - Keep position & restore previous limit
            overflowBuff.limit(overflowLimit);
        }

        return endPresentationTimeUs;
    }

    /**
     * First fill the encoder buffer we have and any remaining samples are put into the
     * overflow buffer which will be sent to the decoder on the next cycle
     * @param input - Decoder buffer
     * @param outBuff - Encoder buffer
     * @return
     */
    private RemixResult remixAndMaybeFillOverflow(final AudioBuffer input,
                                           final ShortBuffer outBuff, boolean append, int position, int overflowPosition) {
        final ShortBuffer inBuff = input.data;
        final ShortBuffer overflowBuff = mOverflowBuffer.data;
        int outputBufferStartingPosition = 0;
        int overflowBufferStartingPosition = 0;

        // Reset position to 0, and set limit to capacity (Since MediaCodec doesn't do that for us)
        //inBuff.clear();
        //outBuff.clear();
        //outBuff.limit(outBuff.capacity() / 2);

        if (append)
            outBuff.position(position);
        position = 0;

        TLog.v(TAG, "remixing buffer at " + (input.presentationTimeUs + input.presentationTimeOffsetUs) + " length " +  sampleCountToInputDurationUs(inBuff.remaining()));

        if (inBuff.remaining() > outBuff.remaining()) {
            // Overflow
            // Limit inBuff to outBuff's capacity
            inBuff.limit(Math.max(inBuff.limit(),outBuff.capacity()));

            outputBufferStartingPosition = mRemixer.remix(inBuff, outBuff, append, position);

            // Reset limit to its own capacity & Keep position
            inBuff.limit(inBuff.capacity());
            //outBuff.flip();

            // Remix the rest onto overflowBuffer
            // NOTE: We should only reach this point when overflow buffer is empty
            final long consumedDurationUs = sampleCountToInputDurationUs(inBuff.position());
            overflowBufferStartingPosition = mRemixer.remix(inBuff, overflowBuff, append, overflowPosition);

            // Seal off overflowBuff & mark limit
            //overflowBuff.flip();
            mOverflowBuffer.presentationTimeUs = input.presentationTimeUs + consumedDurationUs +
            input.presentationTimeOffsetUs;
        } else {
            // No overflow
            outputBufferStartingPosition = mRemixer.remix(inBuff, outBuff, append, position);
            inBuff.limit(inBuff.capacity());
            //outBuff.flip();
        }

        return new RemixResult(Math.max(0, input.presentationTimeUs + input.presentationTimeOffsetUs),
                outputBufferStartingPosition, overflowBufferStartingPosition);
    }
}
