package ly.count.android.sdk;

import java.util.HashMap;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import ly.count.android.sdk.Countly;
import ly.count.android.sdk.CountlyNative;

public class CountlyCordova extends CordovaPlugin {

    public CountlyNative countlyNative = null;
    public enum CountlyMessagingMode {
        TEST,
        PRODUCTION,
    }
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context = this.cordova.getActivity().getApplicationContext();
        if(countlyNative == null){
            countlyNative = new CountlyNative( this.cordova.getActivity(), this.cordova.getActivity().getApplicationContext());
        }

        if ("init".equals(action)) {
            callbackContext.success(countlyNative.init(args));
        }
        else if ("changeDeviceId".equals(action)){
            callbackContext.success(countlyNative.changeDeviceId(args));
        }
        else if ("setHttpPostForced".equals(action)){
            callbackContext.success(countlyNative.setHttpPostForced(args));
        }
        else if("enableParameterTamperingProtection".equals(action)){
            callbackContext.success(countlyNative.enableParameterTamperingProtection(args));
        }
        else if("setLocation".equals(action)){
            callbackContext.success(countlyNative.setLocation(args));
        }
        else if("enableCrashReporting".equals(action)){
            callbackContext.success(countlyNative.enableCrashReporting(args));
        }
        else if("addCrashLog".equals(action)){
            callbackContext.success(countlyNative.addCrashLog(args));
        }
        else if("logException".equals(action)){
            callbackContext.success(countlyNative.logException(args));
        }

        else if ("start".equals(action)) {
            callbackContext.success(countlyNative.start(args));
        }

        else if ("askForNotificationPermission".equals(action)) {
            // callbackContext.success(countlyNative.askForNotificationPermission(args));
        }

        else if("startEvent".equals(action)){
            callbackContext.success(countlyNative.startEvent(args));
        }
        else if("endEvent".equals(action)){
            callbackContext.success(countlyNative.endEvent(args));
        }
        else if("recordEvent".equals(action)){
            callbackContext.success(countlyNative.recordEvent(args));
        }
        // else if ("event".equals(action)) {
        //     callbackContext.success(countlyNative.recordEvent(args));
        // }
        else if ("setloggingenabled".equals(action)) {
            callbackContext.success(countlyNative.setLoggingEnabled(args));
        }

        else if ("setuserdata".equals(action)) {
            callbackContext.success(countlyNative.setuserdata(args));
        }
        else if ("userData_setProperty".equals(action)) {
            callbackContext.success(countlyNative.userData_setProperty(args));
        }
        else if ("userData_increment".equals(action)) {
            callbackContext.success(countlyNative.userData_increment(args));
        }
        else if ("userData_incrementBy".equals(action)) {
            callbackContext.success(countlyNative.userData_incrementBy(args));
        }
        else if ("userData_multiply".equals(action)) {
            callbackContext.success(countlyNative.userData_multiply(args));
        }
        else if ("userData_saveMax".equals(action)) {
            callbackContext.success(countlyNative.userData_saveMax(args));
        }
        else if ("userData_saveMin".equals(action)) {
            callbackContext.success(countlyNative.userData_saveMin(args));
        }
        else if ("userData_setOnce".equals(action)) {
            callbackContext.success(countlyNative.userData_setOnce(args));
        }
        else if ("userData_pushUniqueValue".equals(action)) {
            callbackContext.success(countlyNative.userData_pushUniqueValue(args));
        }
        else if ("userData_pushValue".equals(action)) {
            callbackContext.success(countlyNative.userData_pushValue(args));
        }
        else if ("userData_pullValue".equals(action)) {
            callbackContext.success(countlyNative.userData_pullValue(args));
        }
        //setRequiresConsent
        else if ("setRequiresConsent".equals(action)) {
            callbackContext.success(countlyNative.setRequiresConsent(args));
        }
        else if ("giveConsent".equals(action)) {
            callbackContext.success(countlyNative.giveConsent(args));
        }
        else if ("removeConsent".equals(action)) {
            callbackContext.success(countlyNative.removeConsent(args));
        }
        else if ("giveAllConsent".equals(action)) {
            callbackContext.success(countlyNative.giveConsent(args));
        }
        else if ("removeAllConsent".equals(action)) {
            callbackContext.success(countlyNative.removeConsent(args));
        }

        // else if("sendRating".equals(action)){
        //     callbackContext.success(countlyNative.sendRating(args));
        // }
        else if("recordView".equals(action)){
            callbackContext.success(countlyNative.recordView(args));
        }
        else if("setOptionalParametersForInitialization".equals(action)){
            callbackContext.success(countlyNative.setOptionalParametersForInitialization(args));
        }
        else if("setRemoteConfigAutomaticDownload".equals(action)){
            countlyNative.setRemoteConfigAutomaticDownload(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        }
        else if("remoteConfigUpdate".equals(action)){
            countlyNative.remoteConfigUpdate(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        }
        else if("updateRemoteConfigForKeysOnly".equals(action)){
            countlyNative.updateRemoteConfigForKeysOnly(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        }
        else if("updateRemoteConfigExceptKeys".equals(action)){
            countlyNative.updateRemoteConfigExceptKeys(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        }
        else if("remoteConfigClearValues".equals(action)){
            callbackContext.success(countlyNative.remoteConfigClearValues(args));
        }
        else if("getRemoteConfigValueForKey".equals(action)){
            callbackContext.success(countlyNative.getRemoteConfigValueForKey(args));
        }
        else if("askForStarRating".equals(action)){
            callbackContext.success(countlyNative.askForStarRating(args));
        }
        else if("askForFeedback".equals(action)){
            countlyNative.askForFeedback(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        }
        else if("sendPushToken".equals(action)){
            callbackContext.success(countlyNative.sendPushToken(args));
        }
        else{
            return false;
        }
        return true;
  }

}
