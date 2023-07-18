package com.voicethread.audio;

import org.mp4parser.Container;
import org.mp4parser.muxer.Movie;
import org.mp4parser.muxer.Track;
import org.mp4parser.muxer.builder.DefaultMp4Builder;
import org.mp4parser.muxer.container.mp4.MovieCreator;
import org.mp4parser.muxer.tracks.AppendTrack;

import java.io.IOException;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import android.util.Log;

public class AudioMerge {
  // This will merge a series of mp4 (audio or video) files and return the merged
  // mp4 file.
  public String concatenateFiles(String[] inputFiles, String outputfilename) throws IOException {
    Log.v("com.voicethread.audio:AudioMerge", "starting concatenateFiles");
    try {
      for (String filename : inputFiles) {
        Log.v("com.voicethread.audio:AudioMerge.concatenateFiles()", filename);

      }
      List<Movie> inMovies = new ArrayList<Movie>();
      for (String videoUri : inputFiles) {
        System.err.print("Adding uri: " + videoUri);
        File tempfile = new File(videoUri);
        System.err.print("Reading file: " + tempfile.getPath() + ' ' + tempfile.toURI());
        inMovies.add(MovieCreator.build(tempfile.getPath()));
        // inMovies.add(MovieCreator.build(videoUri));
      }

      List<Track> videoTracks = new LinkedList<Track>();
      List<Track> audioTracks = new LinkedList<Track>();

      for (Movie m : inMovies) {
        for (Track t : m.getTracks()) {
          System.err.print(t.getHandler());
          System.err.print(t.getSamples().size());
          if (t.getHandler().equals("soun")) {
            audioTracks.add(t);
          }
          if (t.getHandler().equals("vide")) {
            videoTracks.add(t);
          }
        }
      }

      Movie result = new Movie();

      if (!audioTracks.isEmpty()) {
        Log.v("com.voicethread.audio:AudioMerge.concatenateFiles()", "Adding audio tracks");
        result.addTrack(new AppendTrack(audioTracks.toArray(new Track[audioTracks.size()])));
      }
      if (!videoTracks.isEmpty()) {
        result.addTrack(new AppendTrack(videoTracks.toArray(new Track[videoTracks.size()])));
      }

      Container out = new DefaultMp4Builder().build(result);
      FileOutputStream fos = new FileOutputStream(new File(outputfilename));
      out.writeContainer(fos.getChannel());
      fos.close();
      // FileChannel fc = new RandomAccessFile(String.format("outputfilename"),
      // "rw").getChannel();
      // out.writeContainer(fc);
      // fc.close();

    } catch (IOException exc) {
      Log.e("com.voicethread.audio:AudioMerge.concatenateFiles()", "exception: " + exc.toString());
      outputfilename = null;
    }
    return outputfilename;
  }

  // public String testFunc() {
  // Log.v("com.voicethread.audio:AudioMerge.testFunc()", "logging something");
  // return "Hello there";
  // }

}
