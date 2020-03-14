package ly.count.android.sdk;

//import io.flutter.plugin.common.MethodChannel;
import ly.count.android.sdk.Countly;
import ly.count.android.sdk.DeviceId;
import ly.count.android.sdk.RemoteConfig;
import ly.count.android.sdk.CountlyStarRating;
//import ly.count.android.sdk.DeviceInfo;
import java.util.HashMap;
import java.util.Map;
import android.app.Activity;
import android.content.Context;
import org.json.JSONArray;
import org.json.JSONException;
import android.util.Log;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;
import java.util.ArrayList;

//Push Plugin
import android.os.Build;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import ly.count.android.sdk.messaging.CountlyPush;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.firebase.FirebaseApp;

public class CountlyNative {

    private Countly.CountlyMessagingMode pushTokenType = Countly.CountlyMessagingMode.PRODUCTION;
    private Context context;
    private Activity activity;
    private Boolean isDebug = false;
    private final Set<String> validConsentFeatureNames = new HashSet<String>(Arrays.asList(
            Countly.CountlyFeatureNames.sessions,
            Countly.CountlyFeatureNames.events,
            Countly.CountlyFeatureNames.views,
            Countly.CountlyFeatureNames.location,
            Countly.CountlyFeatureNames.crashes,
            Countly.CountlyFeatureNames.attribution,
            Countly.CountlyFeatureNames.users,
            Countly.CountlyFeatureNames.push,
            Countly.CountlyFeatureNames.starRating
    ));
    public CountlyNative(Activity _activity, Context _context){
        this.activity = _activity;
        this.context = _context;
    }

    public interface Callback {
        void callback(String result);
    }

    public String init(JSONArray args){
        try {
            String serverUrl = args.getString(0);
            String appKey = args.getString(1);
            if (args.length() == 2) {
                Countly.sharedInstance().init(context, serverUrl, appKey, null, DeviceId.Type.OPEN_UDID);
            } else if (args.length() == 3) {
                String yourDeviceID = args.getString(2);
                Countly.sharedInstance()
                        .init(context, serverUrl, appKey, yourDeviceID, null);
            } else {
                Countly.sharedInstance()
                        .init(context, serverUrl, appKey, null, DeviceId.Type.ADVERTISING_ID);
            }

            Countly.sharedInstance().onStart(activity);
            return "initialized: success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }


    public String changeDeviceId(JSONArray args){
        try {
            String newDeviceID = args.getString(0);
            String onServerString = args.getString(1);
            if ("1".equals(onServerString)) {
                Countly.sharedInstance().changeDeviceId(newDeviceID);
            } else {
                Countly.sharedInstance().changeDeviceId(DeviceId.Type.DEVELOPER_SUPPLIED, newDeviceID);
            }
            return "changeDeviceId success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setHttpPostForced(JSONArray args){
        try {
            int isEnabled = Integer.parseInt(args.getString(0));
            if (isEnabled == 1) {
                isDebug = true;
                Countly.sharedInstance().setHttpPostForced(true);
            } else {
                isDebug = false;
                Countly.sharedInstance().setHttpPostForced(false);
            }
            return "setHttpPostForced This method doesn't exists!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String enableParameterTamperingProtection(JSONArray args){
        try {
            String salt = args.getString(0);
            Countly.sharedInstance().enableParameterTamperingProtection(salt);
            return "enableParameterTamperingProtection success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setLocation(JSONArray args){
        try {
            String latitude = args.getString(0);
            String longitude = args.getString(1);
            String latlng = (latitude + "," + longitude);
            Countly.sharedInstance().setLocation(null, null, latlng, null);
            return "setLocation success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String enableCrashReporting(JSONArray args){
        Countly.sharedInstance().enableCrashReporting();
        return "enableCrashReporting success!";
    }

    public String addCrashLog(JSONArray args){
        try {
            String record = args.getString(0);
            Countly.sharedInstance().addCrashBreadcrumb(record);
            return "addCrashLog success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String logException(JSONArray args){
        try {
            String exceptionString = args.getString(0);
            Exception exception = new Exception(exceptionString);

            Boolean nonfatal = args.getBoolean(1);

            HashMap<String, String> segments = new HashMap<String, String>();
            for (int i = 2, il = args.length(); i < il; i += 2) {
                segments.put(args.getString(i), args.getString(i + 1));
            }
            segments.put("nonfatal", nonfatal.toString());
            Countly.sharedInstance().setCustomCrashSegments(segments);

            Countly.sharedInstance().logException(exception);

            return "logException success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

   public String askForNotificationPermission(JSONArray args){
       if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
           String channelName = "Default Name";
           String channelDescription = "Default Description";
           NotificationManager notificationManager = (NotificationManager) context.getSystemService(context.NOTIFICATION_SERVICE);
           if (notificationManager != null) {
               NotificationChannel channel = new NotificationChannel(CountlyPush.CHANNEL_ID, channelName, NotificationManager.IMPORTANCE_DEFAULT);
               channel.setDescription(channelDescription);
               notificationManager.createNotificationChannel(channel);
           }
       }
       CountlyPush.init(activity.getApplication(), pushTokenType);
       FirebaseApp.initializeApp(context);
       FirebaseInstanceId.getInstance().getInstanceId()
               .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                   @Override
                   public void onComplete(Task<InstanceIdResult> task) {
                       if (!task.isSuccessful()) {
                           Log.w("Tag", "getInstanceId failed", task.getException());
                           return;
                       }
                       String token = task.getResult().getToken();
                       CountlyPush.onTokenRefresh(token);
                   }
               });
       return "askForNotificationPermission";
   }

    public String pushTokenType(JSONArray args){
        try {
            String tokenType = args.getString(0);
            if("2".equals(tokenType)){
                pushTokenType = Countly.CountlyMessagingMode.TEST;
            }else{
                pushTokenType = Countly.CountlyMessagingMode.PRODUCTION;
            }
            return "pushTokenType: success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String start(JSONArray args){
        Countly.sharedInstance().onStart(activity);
        return "started: success";
    }

    public String stop(JSONArray args){
        Countly.sharedInstance().onStop();
        return "stoped: success";
    }

    public String halt(JSONArray args){
        Countly.sharedInstance().halt();
        return "halt: success";
    }



    // public String eventSendThreshold(JSONArray args){
    //     try {
    //         int eventSendThreshold = Integer.parseInt(args.getString(0));
    //         Countly.sharedInstance().setEventQueueSizeToSend(eventSendThreshold);
    //         return "default";
    //     }catch (JSONException jsonException){
    //         return jsonException.toString();
    //     }
    // }



    public String startEvent(JSONArray args){
        try {
            String startEvent = args.getString(0);
            Countly.sharedInstance().startEvent(startEvent);
            return "default";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String endEvent(JSONArray args){
        try {
            String key = args.getString(0);
            int count = Integer.parseInt(args.getString(1));
            float sum = Float.valueOf(args.getString(2)); // new Float(args.getString(2)).floatValue();
            HashMap<String, String> segmentation = new HashMap<String, String>();
            if (args.length() > 3) {
                for (int i = 3, il = args.length(); i < il; i += 2) {
                    segmentation.put(args.getString(i), args.getString(i + 1));
                }
            }
            Countly.sharedInstance().endEvent(key, segmentation, count, sum);
            return "endEvent for:" + key;
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String recordEvent(JSONArray args){
        try {
            String key = args.getString(0);
            int count = Integer.parseInt(args.getString(1));
            float sum = Float.valueOf(args.getString(2)); // new Float(args.getString(2)).floatValue();
            int duration = Integer.parseInt(args.getString(3));
            HashMap<String, String> segmentation = new HashMap<String, String>();
            if (args.length() > 4) {
                for (int i = 4, il = args.length(); i < il; i += 2) {
                    segmentation.put(args.getString(i), args.getString(i + 1));
                }
            }
            Countly.sharedInstance().recordEvent(key, segmentation, count, sum, duration);
            return "recordEvent for: " + key;
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setLoggingEnabled(JSONArray args){
        try {
            String loggingEnable = args.getString(0);
            if (loggingEnable.equals("true")) {
                Countly.sharedInstance().setLoggingEnabled(true);
            } else {
                Countly.sharedInstance().setLoggingEnabled(false);
            }
            return "setLoggingEnabled success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setuserdata(JSONArray args){
        try {
            // Bundle bundle = new Bundle();

            Map<String, String> bundle = new HashMap<String, String>();

            bundle.put("name", args.getString(0));
            bundle.put("username", args.getString(1));
            bundle.put("email", args.getString(2));
            bundle.put("organization", args.getString(3));
            bundle.put("phone", args.getString(4));
            bundle.put("picture", args.getString(5));
            bundle.put("picturePath", args.getString(6));
            bundle.put("gender", args.getString(7));
            bundle.put("byear", String.valueOf(args.getInt(8)));

            Countly.userData.setUserData(bundle);
            Countly.userData.save();
            return "setuserdata success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_setProperty(JSONArray args){
        try {
            String keyName = args.getString(0);
            String keyValue = args.getString(1);
            Countly.userData.setProperty(keyName, keyValue);
            Countly.userData.save();
            return "userData_setProperty success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_increment(JSONArray args){
        try {
            String keyName = args.getString(0);
            Countly.userData.increment(keyName);
            Countly.userData.save();
            return "userData_increment: success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }


    public String userData_incrementBy(JSONArray args){
        try {
            String keyName = args.getString(0);
            int keyIncrement = Integer.parseInt(args.getString(1));
            Countly.userData.incrementBy(keyName, keyIncrement);
            Countly.userData.save();
            return "userData_incrementBy success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_multiply(JSONArray args){
        try {
            String keyName = args.getString(0);
            int multiplyValue = Integer.parseInt(args.getString(1));
            Countly.userData.multiply(keyName, multiplyValue);
            Countly.userData.save();
            return "userData_multiply success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_saveMax(JSONArray args){
        try {
            String keyName = args.getString(0);
            int maxScore = Integer.parseInt(args.getString(1));
            Countly.userData.saveMax(keyName, maxScore);
            Countly.userData.save();
            return "userData_saveMax success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_saveMin(JSONArray args){
        try {
            String keyName = args.getString(0);
            int minScore = Integer.parseInt(args.getString(1));
            Countly.userData.saveMin(keyName, minScore);
            Countly.userData.save();
            return "userData_saveMin success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_setOnce(JSONArray args){
        try {
            String keyName = args.getString(0);
            String minScore = args.getString(1);
            Countly.userData.setOnce(keyName, minScore);
            Countly.userData.save();
            return "userData_setOnce success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_pushUniqueValue(JSONArray args){
        try {
            String type = args.getString(0);
            String pushUniqueValue = args.getString(1);
            Countly.userData.pushUniqueValue(type, pushUniqueValue);
            Countly.userData.save();
            return "userData_pushUniqueValue success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_pushValue(JSONArray args){
        try {
            String type = args.getString(0);
            String pushValue = args.getString(1);
            Countly.userData.pushValue(type, pushValue);
            Countly.userData.save();
            return "userData_pushValue success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String userData_pullValue(JSONArray args){
        try {
            String type = args.getString(0);
            String pullValue = args.getString(1);
            Countly.userData.pullValue(type, pullValue);
            Countly.userData.save();
            return "userData_pullValue success!";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setRequiresConsent(JSONArray args){
        try {
            Boolean consentFlag = args.getBoolean(0);
            Countly.sharedInstance().setRequiresConsent(consentFlag);
            return "setRequiresConsent: Success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String giveConsent(JSONArray args){
        try {
            String consent = null;
            List<String> features = new ArrayList<>();
            for (int i = 0; i < args.length(); i++) {
                consent = args.getString(i);
                if (consent.equals("sessions")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.sessions});
                }
                if (consent.equals("events")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.events});
                }
                if (consent.equals("views")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.views});
                }
                if (consent.equals("location")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.location});
                }
                if (consent.equals("crashes")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.crashes});
                }
                if (consent.equals("attribution")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.attribution});
                }
                if (consent.equals("users")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.users});
                }
                if (consent.equals("push")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.push});
                }
                if (consent.equals("starRating")) {
                    Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.starRating});
                }
            }
            return "giveConsent: Success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String removeConsent(JSONArray args){
        try {
            String consent = null;
            List<String> features = new ArrayList<>();
            for (int i = 0; i < args.length(); i++) {
                consent = args.getString(i);
                if (consent.equals("sessions")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.sessions});
                }
                if (consent.equals("events")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.events});
                }
                if (consent.equals("views")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.views});
                }
                if (consent.equals("location")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.location});
                }
                if (consent.equals("crashes")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.crashes});
                }
                if (consent.equals("attribution")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.attribution});
                }
                if (consent.equals("users")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.users});
                }
                if (consent.equals("push")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.push});
                }
                if (consent.equals("starRating")) {
                    Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.starRating});
                }
            }
            return "removeConsent: Success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String giveAllConsent(JSONArray args){
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.sessions});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.events});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.views});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.location});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.crashes});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.attribution});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.users});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.push});
        Countly.sharedInstance().giveConsent(new String[]{Countly.CountlyFeatureNames.starRating});
        return "giveAllConsent: Success";
    }

    public String removeAllConsent(JSONArray args){
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.sessions});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.events});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.views});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.location});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.crashes});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.attribution});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.users});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.push});
        Countly.sharedInstance().removeConsent(new String[]{Countly.CountlyFeatureNames.starRating});
        return "removeAllConsent: Success";
    }

    // public String sendRating(JSONArray args){
    //     try {
    //         String ratingString = args.getString(0);
    //         int rating = Integer.parseInt(ratingString);

    //         Map<String, String> segm = new HashMap<>();
    //         segm.put("platform", "android");
    //         // segm.put("app_version", DeviceInfo.getAppVersion(context));
    //         segm.put("rating", "" + rating);

    //         Countly.sharedInstance().recordEvent("[CLY]_star_rating", segm, 1);
    //         return "sendRating: " + ratingString;
    //     }catch (JSONException jsonException){
    //         return jsonException.toString();
    //     }
    // }

    public String recordView(JSONArray args){
        try {
            String viewName = args.getString(0);
            Countly.sharedInstance().recordView(viewName);
            return "View name sent: " + viewName;
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setOptionalParametersForInitialization(JSONArray args){
        try {
            String city = args.getString(0);
            String country = args.getString(1);
            String latitude = args.getString(2);
            String longitude = args.getString(3);
            String ipAddress = args.getString(4);
            String latlng = latitude + "," + longitude;
            if(city.length() == 0){
                city = null;
            }
            if(country.length() == 0){
                country = null;
            }
            if(latitude.equals("0.00")){
                latitude = null;
            }
            if(longitude.equals("0.00")){
                longitude = null;
            }
            if(latitude == null && longitude == null){
                latlng = null;
            }
            if(ipAddress.equals("0.0.0.0")){
                ipAddress = null;
            }
            Countly.sharedInstance().setLocation(country, city, latlng, ipAddress);
            return "setOptionalParametersForInitialization sent.";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String setRemoteConfigAutomaticDownload(JSONArray args, final Callback theCallback){
        Countly.sharedInstance().setRemoteConfigAutomaticDownload(true, new RemoteConfig.RemoteConfigCallback() {
            @Override
            public void callback(String error) {
                if (error == null) {
                    theCallback.callback("Success");
                } else {
                    theCallback.callback("Error: " + error.toString());
                }
            }
        });
        return "setRemoteConfigAutomaticDownload: Success";
    }

    public String remoteConfigUpdate(JSONArray args ,final Callback theCallback){
        Countly.sharedInstance().remoteConfigUpdate(new RemoteConfig.RemoteConfigCallback() {
            @Override
            public void callback(String error) {
                if (error == null) {
                    theCallback.callback("Success");
                } else {
                    theCallback.callback("Error: " + error.toString());
                }
            }
        });
        return "remoteConfigUpdate: success";
    }

    public String updateRemoteConfigForKeysOnly(JSONArray args, final Callback theCallback){
        try {
            String[] keysOnly = new String[args.length()];
            for (int i = 0, il = args.length(); i < il; i++) {
                keysOnly[i] = args.getString(i);
                ;
            }

            Countly.sharedInstance().updateRemoteConfigForKeysOnly(keysOnly, new RemoteConfig.RemoteConfigCallback() {
                @Override
                public void callback(String error) {
                    if (error == null) {
                        theCallback.callback("Success");
                    } else {
                        theCallback.callback("Error: " + error.toString());
                    }
                }
            });
            return "updateRemoteConfigForKeysOnly: success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String updateRemoteConfigExceptKeys(JSONArray args, final Callback theCallback){
        try {
            String[] exceptKeys = new String[args.length()];
            for (int i = 0, il = args.length(); i < il; i++) {
                exceptKeys[i] = args.getString(i);
            }

            Countly.sharedInstance().updateRemoteConfigExceptKeys(exceptKeys, new RemoteConfig.RemoteConfigCallback() {
                @Override
                public void callback(String error) {
                    if (error == null) {
                        theCallback.callback("Success");
                    } else {
                        theCallback.callback("Error: " + error.toString());
                    }
                }
            });
            return "updateRemoteConfigExceptKeys: Success";
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String remoteConfigClearValues(JSONArray args){
        Countly.sharedInstance().remoteConfigClearValues();
        return "remoteConfigClearValues: success";
    }

    public String getRemoteConfigValueForKey(JSONArray args){
        try {
            String getRemoteConfigValueForKeyResult = Countly.sharedInstance().getRemoteConfigValueForKey(args.getString(0)).toString();
            return getRemoteConfigValueForKeyResult;
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
    }

    public String askForFeedback(JSONArray args, final Callback theCallback){
        try {
            String widgetId = args.getString(0);
            String closeButtonText = args.getString(1);
            Countly.sharedInstance().showFeedbackPopup(widgetId, closeButtonText, activity, new CountlyStarRating.FeedbackRatingCallback() {
                @Override
                public void callback(String error) {
                    if (error != null) {
                        theCallback.callback("Error: Encountered error while showing feedback dialog: [" + error + "]");
                    } else {
                        theCallback.callback("Feedback submitted.");
                    }
                }
            });
            return "askForFeedback: success";
        }catch (JSONException jsonException){
            theCallback.callback(jsonException.toString());
            return jsonException.toString();
        }
    }

    public String askForStarRating(JSONArray args){
        Countly.sharedInstance().showStarRating(activity, null);
        return "askForStarRating success.";
    }

    public String sendPushToken(JSONArray args){
        try {
            ConnectionQueue connectionQueue_ = Countly.sharedInstance().getConnectionQueue();
            String token = args.getString(0);
            int messagingMode = Integer.parseInt(args.getString(1));
            if(messagingMode == 0){
                connectionQueue_.tokenSession(token, Countly.CountlyMessagingMode.PRODUCTION);
            }else{
                connectionQueue_.tokenSession(token, Countly.CountlyMessagingMode.TEST);
            }
        }catch (JSONException jsonException){
            return jsonException.toString();
        }
        return "sendPushToken success.";
    }


}
