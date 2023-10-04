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

public class MediaFormatStrategyPresets {
    /**
     * @deprecated Use {@link #createExportPreset960x540Strategy()}.
     */
    @Deprecated
    public static final MediaFormatStrategy EXPORT_PRESET_960x540 = new ExportPreset960x540Strategy();

    /**
     * Preset based on Nexus 4 camera recording with 720p quality.
     * This preset is ensured to work on any Android &gt;=4.3 devices by Android CTS
     * (if codec is available).
     * Default bitrate is 8Mbps. {@link #createAndroid720pStrategy(int)} to specify
     * bitrate.
     */
    public static MediaFormatStrategy createAndroid720pStrategy() {
        return new Android720pFormatStrategy();
    }

    /**
     * Preset based on Nexus 4 camera recording with 720p quality.
     * This preset is ensured to work on any Android &gt;=4.3 devices by Android CTS
     * (if codec is available).
     * Audio track will be copied as-is.
     *
     * @param bitrate Preferred bitrate for video encoding.
     */
    public static MediaFormatStrategy createAndroid720pStrategy(int bitrate) {
        return new Android720pFormatStrategy(bitrate);
    }

    /**
     * Preset based on Nexus 4 camera recording with 720p quality.
     * This preset is ensured to work on any Android &gt;=4.3 devices by Android CTS
     * (if codec is available).
     * Note: audio transcoding is experimental feature.
     *
     * @param bitrate       Preferred bitrate for video encoding.
     * @param audioBitrate  Preferred bitrate for audio encoding.
     * @param audioChannels Output audio channels.
     */
    public static MediaFormatStrategy createAndroid720pStrategy(int bitrate, int audioBitrate, int audioChannels) {
        return new Android720pFormatStrategy(bitrate, audioBitrate, audioChannels);
    }

    /**
     *
     * @param audioBitrate  Preferred bitrate for audio encoding.
     * @param audioChannels Output audio channels.
     */
    public static MediaFormatStrategy createAndroid16x9Strategy720P(int audioBitrate, int audioChannels) {
        return new Android16By9FormatStrategy(720, 8000000, audioBitrate, audioChannels);
    }

    /**
     *
     * @param audioBitrate  Preferred bitrate for audio encoding.
     * @param audioChannels Output audio channels.
     */
    public static MediaFormatStrategy createAndroid16x9Strategy1080P(int audioBitrate, int audioChannels) {
        return new Android16By9FormatStrategy(1080, 10000000, audioBitrate, audioChannels);
    }

    /**
     *
     * @param audioBitrate  Preferred bitrate for audio encoding.
     * @param audioChannels Output audio channels.
     */
    public static MediaFormatStrategy createAndroidStrategy720P(int audioBitrate, int audioChannels) {
        return new AndroidFormatStrategy(720, 8000000, audioBitrate, audioChannels);
    }

    /**
     *
     * @param audioBitrate  Preferred bitrate for audio encoding.
     * @param audioChannels Output audio channels.
     */
    public static MediaFormatStrategy createAndroidStrategy1080P(int audioBitrate, int audioChannels) {
        return new AndroidFormatStrategy(1080, 10000000, audioBitrate, audioChannels);
    }

    /**
     * Preset similar to iOS SDK's AVAssetExportPreset960x540.
     * Note that encoding resolutions of this preset are not supported in all
     * devices e.g. Nexus 4.
     * On unsupported device encoded video stream will be broken without any
     * exception.
     */
    public static MediaFormatStrategy createExportPreset960x540Strategy() {
        return new ExportPreset960x540Strategy();
    }

    private MediaFormatStrategyPresets() {
    }
}
