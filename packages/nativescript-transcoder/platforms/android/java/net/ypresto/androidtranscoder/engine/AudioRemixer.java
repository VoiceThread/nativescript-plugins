package net.ypresto.androidtranscoder.engine;

import java.nio.ShortBuffer;
import java.util.Arrays;

public class AudioRemixer {

    int remix(final ShortBuffer inSBuff, final ShortBuffer outSBuff, boolean append, int position) {return 0;};

    static final int SIGNED_SHORT_LIMIT = 32768;
    static final int UNSIGNED_SHORT_MAX = 65535;

    // Viktor Toth's algorithm -
    // See: http://www.vttoth.com/CMS/index.php/technical-notes/68
    //      http://stackoverflow.com/a/25102339
    static private short mix (int a, int b) {
        a = a + SIGNED_SHORT_LIMIT;
        b = b + SIGNED_SHORT_LIMIT;
        int m;
        // Pick the equation
        if ((a < SIGNED_SHORT_LIMIT) || (b < SIGNED_SHORT_LIMIT)) {
            // Viktor's first equation when both sources are "quiet"
            // (i.e. less than middle of the dynamic range)
            m = a * b / SIGNED_SHORT_LIMIT;
        } else {
            // Viktor's second equation when one or both sources are loud
            m = 2 * (a + b) - (a * b) / SIGNED_SHORT_LIMIT - UNSIGNED_SHORT_MAX;
        }
        // Convert output back to signed short
        if (m == UNSIGNED_SHORT_MAX + 1) m = UNSIGNED_SHORT_MAX;
        return (short) (m - SIGNED_SHORT_LIMIT);

    }

    static AudioRemixer DOWNMIX = new AudioRemixer() {

        @Override
        public int remix(final ShortBuffer inSBuff, final ShortBuffer outSBuff, boolean append, int position) {
            // Down-mix stereo to mono
            final int inRemaining = inSBuff.remaining() / 2;
            final int outSpace = outSBuff.remaining();
            final int samplesToBeProcessed = Math.min(inRemaining, outSpace);
            int outBuffStartingPosition = 0;

            if (append) {
                ShortBuffer outSBuffCopy = outSBuff.duplicate();
                outBuffStartingPosition = outSBuffCopy.position();
                outSBuffCopy.position(position);
                for (int i = 0; i < samplesToBeProcessed; ++i) {
                    // Convert to unsigned
                    int aLeft = inSBuff.get();
                    int aRight = inSBuff.get();
                    final int ab = outSBuffCopy.get();
                    outSBuff.put(mix(mix(aLeft, aRight), ab));
                }
            } else {
                for (int i = 0; i < samplesToBeProcessed; ++i) {
                    // Convert to unsigned
                    int a = inSBuff.get();
                    int b = inSBuff.get();
                    outBuffStartingPosition = outSBuff.position();
                    outSBuff.put(mix(a, b));
                }
            }
            return outBuffStartingPosition;
        }
    };

    static AudioRemixer UPMIX = new AudioRemixer() {
        @Override
        public int remix(final ShortBuffer inSBuff, final ShortBuffer outSBuff, boolean append, int position) {
            // Up-mix mono to stereo
            final int inRemaining = inSBuff.remaining();
            final int outSpace = outSBuff.remaining() / 2;
            int outBuffStartingPosition = 0;
            final int samplesToBeProcessed = Math.min(inRemaining, outSpace);
            if (append) {
                ShortBuffer outSBuffCopy = outSBuff.duplicate();
                outBuffStartingPosition = outSBuffCopy.position();
                outSBuffCopy.position(position);
                for (int i = 0; i < samplesToBeProcessed; ++i) {
                    // Convert to unsigned
                    int a = inSBuff.get();
                    int b = outSBuffCopy.get();
                      short m = mix(a, b);
                    outSBuff.put(m);
                    outSBuff.put(m);
                }
            } else {
                for (int i = 0; i < samplesToBeProcessed; ++i) {
                    short inSample = inSBuff.get();
                    outBuffStartingPosition = outSBuff.position();
                    outSBuff.put(inSample);
                    outSBuff.put(inSample);
                }
            }
            return outBuffStartingPosition;
        }
    };

    static AudioRemixer PASSTHROUGH =new AudioRemixer() {
        @Override
        public int remix(final ShortBuffer inSBuff, final ShortBuffer outSBuff, boolean append, int position) {

            int outBuffStartingPosition = 0;
            if (append) {
                ShortBuffer outSBuffCopy = outSBuff.duplicate();
                final int inRemaining = inSBuff.remaining() / 2;
                final int outSpace = outSBuff.remaining() / 2;
                final int samplesToBeProcessed = Math.min(inRemaining, outSpace);
                outBuffStartingPosition = outSBuff.position();
                outSBuffCopy.position(position);
                for (int i = 0; i < samplesToBeProcessed; ++i) {
                    // Convert to unsigned
                    int aLeft = inSBuff.get();
                    int aRight = inSBuff.get();
                    int bLeft = outSBuffCopy.get();
                    int bRight = outSBuffCopy.get();
                    outSBuff.put(mix(aLeft, bLeft));
                    outSBuff.put(mix(aRight, bRight));
                }

            } else {

                // Passthrough
                outBuffStartingPosition = outSBuff.position();
                outSBuff.put(inSBuff);
            }
            return outBuffStartingPosition;
        }
    };

}
