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
import org.json.JSONObject;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import ly.count.android.sdk.Countly;
import ly.count.android.sdk.CountlyNative;

public class CountlyCordova extends CordovaPlugin {

    public CountlyNative countlyNative = null;

    public enum CountlyMessagingMode {
        TEST, PRODUCTION,
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Context context = this.cordova.getActivity().getApplicationContext();
        if (countlyNative == null) {
            countlyNative = new CountlyNative(this.cordova.getActivity(),
                    this.cordova.getActivity().getApplicationContext());
        }
    }

    @Override
    public void pluginInitialize() {

    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context = this.cordova.getActivity().getApplicationContext();

        if ("init".equals(action)) {
            callbackContext.success(countlyNative.init(args));
        }
        if ("isInitialized".equals(action)) {
            callbackContext.success(countlyNative.isInitialized(args));
        } else if ("getCurrentDeviceId".equals(action)) {
            callbackContext.success(countlyNative.getCurrentDeviceId(args));
        } else if ("getDeviceIdAuthor".equals(action)) {
            callbackContext.success(countlyNative.getDeviceIdAuthor(args));
        } else if ("changeDeviceId".equals(action)) {
            callbackContext.success(countlyNative.changeDeviceId(args));
        } else if ("setHttpPostForced".equals(action)) {
            callbackContext.success(countlyNative.setHttpPostForced(args));
        } else if ("enableParameterTamperingProtection".equals(action)) {
            callbackContext.success(countlyNative.enableParameterTamperingProtection(args));
        } else if ("setLocationInit".equals(action)) {
            callbackContext.success(countlyNative.setLocationInit(args));
        } else if ("setLocation".equals(action)) {
            callbackContext.success(countlyNative.setLocation(args));
        } else if ("enableCrashReporting".equals(action)) {
            callbackContext.success(countlyNative.enableCrashReporting(args));
        } else if ("addCrashLog".equals(action)) {
            callbackContext.success(countlyNative.addCrashLog(args));
        } else if ("logException".equals(action)) {
            callbackContext.success(countlyNative.logException(args));
        }

        else if ("start".equals(action)) {
            callbackContext.success(countlyNative.start(args));
        } else if ("stop".equals(action)) {
            callbackContext.success(countlyNative.stop(args));
        } else if ("halt".equals(action)) {
            callbackContext.success(countlyNative.halt(args));
        }

        else if ("askForNotificationPermission".equals(action)) {
            callbackContext.success(countlyNative.askForNotificationPermission(args));
        } else if ("registerForNotification".equals(action)) {
            PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT);
            pluginResult.setKeepCallback(true);
            callbackContext.sendPluginResult(pluginResult);
            countlyNative.registerForNotification(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);

                }
            });
        } else if ("pushTokenType".equals(action)) {
            callbackContext.success(countlyNative.pushTokenType(args));
        }

        else if ("startEvent".equals(action)) {
            callbackContext.success(countlyNative.startEvent(args));
        } else if ("cancelEvent".equals(action)) {
            callbackContext.success(countlyNative.cancelEvent(args));
        } else if ("endEvent".equals(action)) {
            callbackContext.success(countlyNative.endEvent(args));
        } else if ("recordEvent".equals(action)) {
            callbackContext.success(countlyNative.recordEvent(args));
        }
        // else if ("event".equals(action)) {
        // callbackContext.success(countlyNative.recordEvent(args));
        // }
        else if ("setLoggingEnabled".equals(action)) {
            callbackContext.success(countlyNative.setLoggingEnabled(args));
        }

        else if ("setuserdata".equals(action)) {
            callbackContext.success(countlyNative.setuserdata(args));
        } else if ("userData_setProperty".equals(action)) {
            callbackContext.success(countlyNative.userData_setProperty(args));
        } else if ("userData_increment".equals(action)) {
            callbackContext.success(countlyNative.userData_increment(args));
        } else if ("userData_incrementBy".equals(action)) {
            callbackContext.success(countlyNative.userData_incrementBy(args));
        } else if ("userData_multiply".equals(action)) {
            callbackContext.success(countlyNative.userData_multiply(args));
        } else if ("userData_saveMax".equals(action)) {
            callbackContext.success(countlyNative.userData_saveMax(args));
        } else if ("userData_saveMin".equals(action)) {
            callbackContext.success(countlyNative.userData_saveMin(args));
        } else if ("userData_setOnce".equals(action)) {
            callbackContext.success(countlyNative.userData_setOnce(args));
        } else if ("userData_pushUniqueValue".equals(action)) {
            callbackContext.success(countlyNative.userData_pushUniqueValue(args));
        } else if ("userData_pushValue".equals(action)) {
            callbackContext.success(countlyNative.userData_pushValue(args));
        } else if ("userData_pullValue".equals(action)) {
            callbackContext.success(countlyNative.userData_pullValue(args));
        }
        // setRequiresConsent
        else if ("setRequiresConsent".equals(action)) {
            callbackContext.success(countlyNative.setRequiresConsent(args));
        } else if ("giveConsentInit".equals(action)) {
            callbackContext.success(countlyNative.giveConsentInit(args));
        } else if ("giveConsent".equals(action)) {
            callbackContext.success(countlyNative.giveConsent(args));
        } else if ("removeConsent".equals(action)) {
            callbackContext.success(countlyNative.removeConsent(args));
        } else if ("giveAllConsent".equals(action)) {
            callbackContext.success(countlyNative.giveAllConsent(args));
        } else if ("removeAllConsent".equals(action)) {
            callbackContext.success(countlyNative.removeConsent(args));
        }

        // else if("sendRating".equals(action)){
        // callbackContext.success(countlyNative.sendRating(args));
        // }
        else if ("recordView".equals(action)) {
            callbackContext.success(countlyNative.recordView(args));
        } else if ("setOptionalParametersForInitialization".equals(action)) {
            callbackContext.success(countlyNative.setOptionalParametersForInitialization(args));
        } else if ("setRemoteConfigAutomaticDownload".equals(action)) {
            countlyNative.setRemoteConfigAutomaticDownload(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        } else if ("remoteConfigUpdate".equals(action)) {
            countlyNative.remoteConfigUpdate(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        } else if ("updateRemoteConfigForKeysOnly".equals(action)) {
            countlyNative.updateRemoteConfigForKeysOnly(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        } else if ("updateRemoteConfigExceptKeys".equals(action)) {
            countlyNative.updateRemoteConfigExceptKeys(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        } else if ("remoteConfigClearValues".equals(action)) {
            callbackContext.success(countlyNative.remoteConfigClearValues(args));
        } else if ("getRemoteConfigValueForKey".equals(action)) {
            callbackContext.success(countlyNative.getRemoteConfigValueForKey(args));
        } else if ("setStarRatingDialogTexts".equals(action)) {
            callbackContext.success(countlyNative.setStarRatingDialogTexts(args));
        } else if ("askForStarRating".equals(action)) {
            callbackContext.success(countlyNative.askForStarRating(args));
        } else if ("askForFeedback".equals(action)) {
            countlyNative.askForFeedback(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        } else if ("appLoadingFinished".equals(action)) {
            callbackContext.success(countlyNative.appLoadingFinished(args));
        } else if ("getFeedbackWidgets".equals(action)) {
            countlyNative.getFeedbackWidgets(args, new CountlyNative.JSONObjectCallback() {
                @Override
                public void success(JSONArray result) {
                    PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
                    pluginResult.setKeepCallback(true);
                    callbackContext.sendPluginResult(pluginResult);

                }

                @Override
                public void error(String error) {
                    callbackContext.error(error);
                }
            });
        } else if ("presentFeedbackWidget".equals(action)) {
            countlyNative.presentFeedbackWidget(args, new CountlyNative.Callback() {
                @Override
                public void callback(String result) {
                    callbackContext.success(result);
                }
            });
        } else if ("replaceAllAppKeysInQueueWithCurrentAppKey".equals(action)) {
            countlyNative.replaceAllAppKeysInQueueWithCurrentAppKey();
            callbackContext.success("replaceAllAppKeysInQueueWithCurrentAppKey : Success");
        } else if ("removeDifferentAppKeysFromQueue".equals(action)) {
            countlyNative.removeDifferentAppKeysFromQueue();
            callbackContext.success("removeDifferentAppKeysFromQueue : Success");
        } else if ("sendPushToken".equals(action)) {
            callbackContext.success(countlyNative.sendPushToken(args));
        } else if ("enableAttribution".equals(action)) {
            callbackContext.success(countlyNative.enableAttribution(args));
        } else if ("startTrace".equals(action)) {
            callbackContext.success(countlyNative.startTrace(args));
        } else if ("cancelTrace".equals(action)) {
            callbackContext.success(countlyNative.cancelTrace(args));
        } else if ("clearAllTraces".equals(action)) {
            callbackContext.success(countlyNative.clearAllTraces(args));
        } else if ("endTrace".equals(action)) {
            callbackContext.success(countlyNative.endTrace(args));
        } else if ("recordNetworkTrace".equals(action)) {
            callbackContext.success(countlyNative.recordNetworkTrace(args));
        } else if ("enableApm".equals(action)) {
            callbackContext.success(countlyNative.enableApm(args));
        } else {
            return false;
        }
        return true;
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        countlyNative.onHostResume();
    }

    @Override
    public void onPause(boolean multitasking) {
        super.onPause(multitasking);
        countlyNative.onHostPause();
    }

    @Override
    public void onStart() {
        super.onStart();
    }
}
