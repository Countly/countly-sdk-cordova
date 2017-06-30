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

public class CountlyCordova extends CordovaPlugin {

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context = this.cordova.getActivity().getApplicationContext();
        if ("init".equals(action)) {

            String serverUrl = args.getString(0);
            String appKey = args.getString(1);

            if(args.length() == 2){
                Countly.sharedInstance()
                    .init(context, serverUrl, appKey,null,DeviceId.Type.OPEN_UDID);
            }else if(args.length() == 3){
                String yourDeviceID = args.getString(2);
                Countly.sharedInstance()
                    .init(context, serverUrl, appKey,yourDeviceID,null);
            }else{
                Countly.sharedInstance()
                    .init(context, serverUrl, appKey,null,DeviceId.Type.ADVERTISING_ID);
            }

            Countly.sharedInstance().onStart(this.cordova.getActivity());
            callbackContext.success("initialized!");
            return true;
        }


        else if ("changeDeviceId".equals(action)){
            String newDeviceID = args.getString(0);
            Countly.sharedInstance().changeDeviceId(newDeviceID);
            callbackContext.success("changeDeviceId success!");
            return true;
        }
        else if ("setHttpPostForced".equals(action)){
            int isEnabled = Integer.parseInt(args.getString(0));
            if(isEnabled == 1){
                Countly.sharedInstance().setHttpPostForced(true);
            }else{
                Countly.sharedInstance().setHttpPostForced(false);
            }
            callbackContext.success("setHttpPostForced This method doesn't exists!");
            return true;
        }else if("enableParameterTamperingProtection".equals(action)){
            String salt = args.getString(0);
            Countly.sharedInstance().enableParameterTamperingProtection(salt);
            callbackContext.success("enableParameterTamperingProtection success!");
            return true;
        }else if("setLocation".equals(action)){
            double latitude = Double.parseDouble(args.getString(0));
            double longitude = Double.parseDouble(args.getString(1));
            Countly.sharedInstance().setLocation(latitude, longitude);
            callbackContext.success("setLocation success!");
            return true;
        }else if("enableCrashReporting".equals(action)){
            Countly.sharedInstance().enableCrashReporting();
            callbackContext.success("enableCrashReporting success!");
            return true;
        }else if("addCrashLog".equals(action)){
            String record = args.getString(0);
            Countly.sharedInstance().addCrashLog(record);
            callbackContext.success("addCrashLog success!");
            return true;
        }


        else if ("start".equals(action)) {
            Countly.sharedInstance().onStart(this.cordova.getActivity());
            callbackContext.success("started!");
            return true;
        }
        else if ("stop".equals(action)) {
            Countly.sharedInstance().onStop();
            callbackContext.success("stoped!");
            return true;
        }else if("startEvent".equals(action)){
            String startEvent = args.getString(0);
            Countly.sharedInstance().startEvent(startEvent);
            return true;
        }else if("endEvent".equals(action)){
            String eventType = args.getString(0);
            if("event".equals(eventType)){
                String eventName = args.getString(1);
                Countly.sharedInstance().endEvent(eventName);
                callbackContext.success("event sent");
            }
            else if ("eventWithSumSegment".equals(eventType)) {
                String eventName = args.getString(1);
                int eventCount= Integer.parseInt(args.getString(2));
                float eventSum= new Float(args.getString(3)).floatValue();
                HashMap<String, String> segmentation = new HashMap<String, String>();
                for(int i=4,il=args.length();i<il;i+=2){
                    segmentation.put(args.getString(i), args.getString(i+1));
                }
                Countly.sharedInstance().endEvent(eventName, segmentation, eventCount,eventSum);
                callbackContext.success("eventWithSumSegment sent");
            }
            else{
                callbackContext.success("event sent");
            }
            return true;
        }
        else if ("event".equals(action)) {
            String eventType = args.getString(0);
            if("event".equals(eventType)){
                String eventName = args.getString(1);
                int eventCount= Integer.parseInt(args.getString(2));
                Countly.sharedInstance().recordEvent(eventName, eventCount);
                callbackContext.success("event sent");
            }
            else if ("eventWithSum".equals(eventType)) {
                String eventName = args.getString(1);
                int eventCount= Integer.parseInt(args.getString(2));
                float eventSum= new Float(args.getString(3)).floatValue();
                Countly.sharedInstance().recordEvent(eventName, eventCount, eventSum);
                callbackContext.success("eventWithSum sent");
            }
            else if ("eventWithSegment".equals(eventType)) {
                String eventName = args.getString(1);
                int eventCount= Integer.parseInt(args.getString(2));
                //int eventSum= Integer.parseInt(args.getString(3));
                HashMap<String, String> segmentation = new HashMap<String, String>();
                for(int i=3,il=args.length();i<il;i+=2){
                    segmentation.put(args.getString(i), args.getString(i+1));
                }
                Countly.sharedInstance().recordEvent(eventName, segmentation, eventCount);
                callbackContext.success("eventWithSegment sent");
            }
            else if ("eventWithSumSegment".equals(eventType)) {
                String eventName = args.getString(1);
                int eventCount= Integer.parseInt(args.getString(2));
                float eventSum= new Float(args.getString(3)).floatValue();
                HashMap<String, String> segmentation = new HashMap<String, String>();
                for(int i=4,il=args.length();i<il;i+=2){
                    segmentation.put(args.getString(i), args.getString(i+1));
                }
                Countly.sharedInstance().recordEvent(eventName, segmentation, eventCount,eventSum);
                callbackContext.success("eventWithSumSegment sent");
            }
            else{
                callbackContext.success("event sent");
            }
            return true;
        }
        else if ("setloggingenabled".equals(action)) {
            Countly.sharedInstance().setLoggingEnabled(true);
            callbackContext.success("setloggingenabled success!");
            return true;
        }


        else if ("setuserdata".equals(action)) {
            // Bundle bundle = new Bundle();

            Map<String, String> bundle = new HashMap<String, String>();

            bundle.put("name", args.getString(0));
            bundle.put("username", args.getString(1));
            bundle.put("email", args.getString(2));
            bundle.put("org", args.getString(3));
            bundle.put("phone", args.getString(4));
            bundle.put("picture", args.getString(5));
            bundle.put("picturePath", args.getString(6));
            bundle.put("gender", args.getString(7));
            bundle.put("byear", String.valueOf(args.getInt(8)));

            Countly.userData.setUserData(bundle);
            Countly.userData.save();

            // Countly.sharedInstance().setUserData(bundle);
            // Countly.sharedInstance().setUserData(bundle);
            callbackContext.success("setuserdata success");
            return true;
        }
        else if ("userData_setProperty".equals(action)) {
            String keyName = args.getString(0);
            String keyValue = args.getString(1);
            Countly.userData.setProperty(keyName, keyValue);
            Countly.userData.save();
            callbackContext.success("userData_setProperty success!");
            return true;
        }
        else if ("userData_increment".equals(action)) {
            String keyName = args.getString(0);
            Countly.userData.increment(keyName);
            Countly.userData.save();
            callbackContext.success("userData_increment success!");
            return true;
        }
        else if ("userData_incrementBy".equals(action)) {
            String keyName = args.getString(0);
            int keyIncrement = Integer.parseInt(args.getString(1));
            Countly.userData.incrementBy(keyName, keyIncrement);
            Countly.userData.save();
            callbackContext.success("userData_incrementBy success!");
            return true;
        }
        else if ("userData_multiply".equals(action)) {
            String keyName = args.getString(0);
            int multiplyValue = Integer.parseInt(args.getString(1));
            Countly.userData.multiply(keyName, multiplyValue);
            Countly.userData.save();
            callbackContext.success("userData_multiply success!");
            return true;
        }
        else if ("userData_saveMax".equals(action)) {
            String keyName = args.getString(0);
            int maxScore = Integer.parseInt(args.getString(1));
            Countly.userData.saveMax(keyName, maxScore);
            Countly.userData.save();
            callbackContext.success("userData_saveMax success!");
            return true;
        }
        else if ("userData_saveMin".equals(action)) {
            String keyName = args.getString(0);
            int minScore = Integer.parseInt(args.getString(1));
            Countly.userData.saveMin(keyName, minScore);
            Countly.userData.save();
            callbackContext.success("userData_saveMin success!");
            return true;
        }
        else if ("userData_setOnce".equals(action)) {
            String keyName = args.getString(0);
            String minScore = args.getString(1);
            Countly.userData.setOnce(keyName, minScore);
            Countly.userData.save();
            callbackContext.success("userData_setOnce success!");
            return true;
        }


        else if("onregistrationid".equals(action)){
            String registrationId = args.getString(0);
            int messagingMode = Integer.parseInt(args.getString(1));
            String projectId = args.getString(2);

            Countly.CountlyMessagingMode mode = null;
            if(messagingMode == 0){
                mode = Countly.CountlyMessagingMode.TEST;
            }
            else{
                mode = Countly.CountlyMessagingMode.PRODUCTION;
            }
            Countly.sharedInstance().onRegistrationId(registrationId,mode);
            // Countly.sharedInstance().initMessaging(cordova.getActivity(), cordova.getActivity().getClass(), projectId, mode);
            callbackContext.success("initMessaging success");
            Log.e("Nicolson", registrationId);
            return true;
        }
        else if("recordView".equals(action)){
            String viewName = args.getString(0);
            Countly.sharedInstance().recordView(viewName);
            callbackContext.success("View name sent: "+viewName);
            return true;
        }
        else if("setOptionalParametersForInitialization".equals(action)){
            String city = args.getString(0);
            String country = args.getString(1);
            double latitude = Double.parseDouble(args.getString(2));
            double longitude = Double.parseDouble(args.getString(3));

            Countly.sharedInstance().setOptionalParametersForInitialization(country, city, latitude +"," +longitude);
            Countly.userData.save();
            callbackContext.success("setOptionalParametersForInitialization sent.");
            return true;
        }
        else{
            return false;
        }
  }

}
