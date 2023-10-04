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
package net.ypresto.androidtranscoder.format;

import android.media.MediaCodecInfo;
import android.media.MediaFormat;
import android.util.Log;
import net.ypresto.androidtranscoder.engine.MediaFormatValidator;

public class AndroidFormatStrategy implements MediaFormatStrategy {

    public static final int AUDIO_BITRATE_AS_IS = -1;
    public static final int AUDIO_CHANNELS_AS_IS = -1;
    private static final String TAG = "Android16By9FmtStrategy";
    private int mPSize;
    private final int mVideoBitrate;
    private final int mAudioBitrate;
    private final int mAudioChannels;

    public AndroidFormatStrategy(int scale, int videoBitrate) {
        this(scale, videoBitrate, AUDIO_BITRATE_AS_IS, AUDIO_CHANNELS_AS_IS);
    }

    public AndroidFormatStrategy(int pSize, int videoBitrate, int audioBitrate, int audioChannels) {
        mPSize = pSize;
        mVideoBitrate = videoBitrate;
        mAudioBitrate = audioBitrate;
        mAudioChannels = audioChannels;
    }

    @Override
    public MediaFormat createVideoOutputFormat(MediaFormat inputFormat, boolean allowPassthru) {
        int width = inputFormat.getInteger(MediaFormat.KEY_WIDTH);
        int height = inputFormat.getInteger(MediaFormat.KEY_HEIGHT);
        int longer, shorter, outWidth, outHeight;
        if (width >= height) {
            longer = width;
            shorter = height;
            outWidth = mPSize * width / height;
            outHeight = mPSize;
        } else {
            shorter = width;
            longer = height;
            outWidth = mPSize;
            outHeight = mPSize * height / width;
        }

        boolean isSupported = MediaFormatValidator.validateResolution(outWidth, outHeight);

        // Mostly ultrawide is only supported at 1080 so try that if 720 not supported
        // if (!isSupported)
        // if (mPSize == 720) {
        // mPSize = 1080;
        // return createVideoOutputFormat(inputFormat, allowPassthru);
        // } else
        // throw new OutputFormatUnavailableException("The output height (" + outHeight
        // + ") and width (" + outWidth + ") cannot be transcoded");

        if (allowPassthru && shorter <= mPSize) {
            Log.d(TAG, "This video's height is less or equal to " + mPSize + ", pass-through. (" + width + "x" + height
                    + ")");
            return null;
        }
        MediaFormat format = MediaFormat.createVideoFormat("video/avc", outWidth, outHeight);
        // From Nexus 4 Camera in 720p
        format.setInteger(MediaFormat.KEY_BIT_RATE, mVideoBitrate);
        format.setInteger(MediaFormat.KEY_FRAME_RATE, 30);
        format.setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, 3);
        format.setInteger(MediaFormat.KEY_COLOR_FORMAT, MediaCodecInfo.CodecCapabilities.COLOR_FormatSurface);
        return format;
    }

    @Override
    public MediaFormat createAudioOutputFormat(MediaFormat inputFormat, boolean allowPassthru) {
        if (allowPassthru && mAudioBitrate == AUDIO_BITRATE_AS_IS && mAudioChannels == AUDIO_CHANNELS_AS_IS)
            return null;

        // Use original sample rate, as resampling is not supported yet.
        final MediaFormat format = MediaFormat.createAudioFormat(MediaFormatExtraConstants.MIMETYPE_AUDIO_AAC,
                inputFormat.getInteger(MediaFormat.KEY_SAMPLE_RATE),
                mAudioChannels == AUDIO_CHANNELS_AS_IS ? inputFormat.getInteger(MediaFormat.KEY_CHANNEL_COUNT)
                        : mAudioChannels);
        format.setInteger(MediaFormat.KEY_AAC_PROFILE, MediaCodecInfo.CodecProfileLevel.AACObjectLC);
        format.setInteger(MediaFormat.KEY_BIT_RATE, mAudioBitrate);
        return format;
    }
}
