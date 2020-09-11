package com.countly.demo;

import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.CordovaActivity;

import ly.count.android.sdk.Countly;

public class App extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.i("App", "applicationOnCreate");
        Countly.applicationOnCreate();
    }
}