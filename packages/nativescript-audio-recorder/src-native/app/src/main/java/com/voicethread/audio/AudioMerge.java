package com.voicethread.audio;

import org.mp4parser.Box;
import org.mp4parser.Container;
import org.mp4parser.muxer.Movie;
import org.mp4parser.muxer.Track;
import org.mp4parser.muxer.builder.DefaultMp4Builder;
import org.mp4parser.muxer.container.mp4.MovieCreator;
import org.mp4parser.muxer.tracks.AppendTrack;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.WritableByteChannel;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class AudioMerge {
  public void test() {
    Container container = new Container() {
      @Override
      public List<Box> getBoxes() {
        return null;
      }

      @Override
      public void setBoxes(List<? extends Box> boxes) {

      }

      @Override
      public <T extends Box> List<T> getBoxes(Class<T> clazz) {
        return null;
      }

      @Override
      public <T extends Box> List<T> getBoxes(Class<T> clazz, boolean recursive) {
        return null;
      }

      @Override
      public void writeContainer(WritableByteChannel bb) throws IOException {

      }
    };
  }

}
