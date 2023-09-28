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
package net.ypresto.androidtranscoder.utils;

import android.media.MediaExtractor;
import android.media.MediaFormat;

public class MediaExtractorUtils {

    private MediaExtractorUtils() {
    }

    public static class TrackResult {

        private TrackResult() {
        }

        public static final int TRACK_NOT_FOUND = -1;
        public int mVideoTrackIndex;
        public String mVideoTrackMime;
        public MediaFormat mVideoTrackFormat;
        public int mAudioTrackIndex;
        public String mAudioTrackMime;
        public MediaFormat mAudioTrackFormat;
    }

    public static TrackResult getFirstVideoAndAudioTrack(MediaExtractor extractor) {
        TrackResult trackResult = new TrackResult();
        trackResult.mVideoTrackIndex = TrackResult.TRACK_NOT_FOUND;
        trackResult.mAudioTrackIndex = TrackResult.TRACK_NOT_FOUND;
        int trackCount = extractor.getTrackCount();
        for (int i = 0; i < trackCount; i++) {
            MediaFormat format = extractor.getTrackFormat(i);
            String mime = format.getString(MediaFormat.KEY_MIME);
            if (trackResult.mVideoTrackIndex == TrackResult.TRACK_NOT_FOUND && mime.startsWith("video/")) {
                trackResult.mVideoTrackIndex = i;
                trackResult.mVideoTrackMime = mime;
                trackResult.mVideoTrackFormat = format;
            } else if (trackResult.mAudioTrackIndex == TrackResult.TRACK_NOT_FOUND && mime.startsWith("audio/")) {
                trackResult.mAudioTrackIndex = i;
                trackResult.mAudioTrackMime = mime;
                trackResult.mAudioTrackFormat = format;
            }
            if (trackResult.mVideoTrackIndex != TrackResult.TRACK_NOT_FOUND
                    && trackResult.mAudioTrackIndex != TrackResult.TRACK_NOT_FOUND)
                break;
        }
        if (trackResult.mVideoTrackIndex == TrackResult.TRACK_NOT_FOUND) {
            throw new IllegalArgumentException("extractor does not contain video track.");
        }
        return trackResult;
    }
}