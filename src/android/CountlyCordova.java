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
			Countly.sharedInstance()
				.init(context, serverUrl, appKey,null,DeviceId.Type.OPEN_UDID);
			Countly.sharedInstance().onStart();
			callbackContext.success("initialized!");
			return true;
        }
		else if ("start".equals(action)) {
			Countly.sharedInstance().onStart();
            callbackContext.success("started!");
            return true;
    }
		else if ("stop".equals(action)) {
			Countly.sharedInstance().onStop();
            callbackContext.success("stoped!");
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

			bundle .put("name", args.getString(0));
			bundle.put("username", args.getString(1));
			bundle.put("email", args.getString(2));
			bundle.put("org", args.getString(3));
			bundle.put("phone", args.getString(4));
			bundle.put("picture", args.getString(5));
			bundle.put("picturePath", args.getString(6));
			bundle.put("gender", args.getString(7));
			bundle.put("byear", String.valueOf(args.getInt(8)));
			// bundle.putString("name", args.getString(0));
			// bundle.putString("username", args.getString(1));
			// bundle.putString("email", args.getString(2));
			// bundle.putString("org", args.getString(3));
			// bundle.putString("phone", args.getString(4));
			// bundle.putString("picture", args.getString(5));
			// bundle.putString("picturePath", args.getString(6));
			// bundle.putString("gender", args.getString(7));
			// bundle.putInt("byear", args.getInt(8));
			Countly.sharedInstance().setUserData(bundle);
			// Countly.sharedInstance().setUserData(bundle);
			callbackContext.success("setuserdata success");
			return true;
    }
		else if("onregistrationid".equals(action)){
			// This is still in development
			// String registrationId = args.getString(0);
			int messagingMode = Integer.parseInt(args.getString(1));
			Countly.CountlyMessagingMode mode = null;
			if(messagingMode == 0){
				mode = Countly.CountlyMessagingMode.TEST;
			}
			else{
				mode = Countly.CountlyMessagingMode.PRODUCTION;
			}
			String projectId = args.getString(2);
			// Countly.sharedInstance().onRegistrationId(registrationId,mode);
			Countly.sharedInstance().initMessaging(cordova.getActivity(), cordova.getActivity().getClass(), projectId, mode);
			callbackContext.success("initMessaging success");
			// Log.e("Nicolson", String.valueOf(Countly.CountlyMessagingMode.TEST));
			return true;
		}
		else{
			return false;
		}
  }

}
