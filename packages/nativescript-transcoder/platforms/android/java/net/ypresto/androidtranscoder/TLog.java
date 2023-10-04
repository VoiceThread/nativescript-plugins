package net.ypresto.androidtranscoder;
import android.util.Log;

import java.util.regex.Pattern;

public final class TLog {
    public static void setTags(String tags) {
        TLog.targetTags = Pattern.compile(tags);
    }
    public static void setLevel(int level) {
        TLog.targetLevel = level;
    }
    private static Pattern targetTags = null;
    private static int targetLevel = 4;
    private static boolean doLog(String tag, int level) {
        if (level < TLog.targetLevel)
            return false;
        if (TLog.targetTags != null && !TLog.targetTags.matcher(tag).matches())
            return false;
        return true;
    }
    public static void v(String tag, String msg) {
        if(TLog.doLog(tag, 2))Log.v(tag,msg);
    }
    public static void d(String tag, String msg) {
        if(TLog.doLog(tag, 3))Log.d(tag,msg);
    }
    public static void i(String tag, String msg) {
        if(TLog.doLog(tag, 4))Log.i(tag, msg);
    }
    public static void w(String tag, String msg) {
        if(TLog.doLog(tag, 5))Log.w(tag, msg);
    }
    public static void e(String tag, String msg) {
        if(TLog.doLog(tag, 6))Log.v(tag, msg);
    }
    public static void wtf(String tag, String msg) {
        if(TLog.doLog(tag, 7))Log.wtf(tag, msg);
    }
    public static void v(String tag, String msg, Throwable e) {
        if(TLog.doLog(tag, 2))Log.v(tag, msg, e);
    }
    public static void d(String tag, String msg, Throwable e) {
        if(TLog.doLog(tag, 3))Log.d(tag, msg, e);
    }
    public static void i(String tag, String msg, Throwable e) {
        if(TLog.doLog(tag, 4))Log.i(tag, msg, e);
    }
    public static void w(String tag, String msg, Throwable e) {
        if(TLog.doLog(tag, 5))Log.w(tag, msg, e);
    }
    public static void e(String tag, String msg, Throwable e) {
        if(TLog.doLog(tag, 6))Log.v(tag, msg, e);
    }
    public static void wtf(String tag, String msg, Throwable e) {
        if(TLog.doLog(tag, 7))Log.wtf(tag, msg, e);
    }
}
