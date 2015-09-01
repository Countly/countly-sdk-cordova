package ly.count.android.api;

import java.util.HashMap;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.os.Bundle;
//import android.telephony.TelephonyManager;
import android.util.Log;
//import android.widget.Toast;
import ly.count.android.api.Countly;

public class CountlyCordova extends CordovaPlugin {
	
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		Context context = this.cordova.getActivity().getApplicationContext();
		if ("init".equals(action)) {
			
			String serverUrl = args.getString(0);
			String appKey = args.getString(1);
			//serverUrl = serverUrl.replace("https://", "http://");
			Countly.sharedInstance()
				.init(context, serverUrl, appKey,null,DeviceId.Type.OPEN_UDID);
			Countly.sharedInstance().onStart();
			callbackContext.success("initialized!");
			//Log.e("Nicolson","at init " +serverUrl +" " +appKey);
			return true;
        }
		else if ("start".equals(action)) {
			Countly.sharedInstance().onStart();
            callbackContext.success("started!");
            //Log.e("Nicolson","at start");
            return true;
        }
		else if ("stop".equals(action)) {
			Countly.sharedInstance().onStop();
            callbackContext.success("stoped!");
            //Log.e("Nicolson","at stop");
            return true;
        }
		else if ("event".equals(action)) {
			String eventType = args.getString(0);
			if("event".equals(eventType)){
				String eventName = args.getString(1);
				int eventCount= Integer.parseInt(args.getString(2));
				Countly.sharedInstance().recordEvent(eventName, eventCount);
				callbackContext.success("event sent");
				//Log.e("Nicolson","at event sent");
			}
			else if ("eventWithSum".equals(eventType)) {
				String eventName = args.getString(1);
				int eventCount= Integer.parseInt(args.getString(2));
				float eventSum= new Float(args.getString(3)).floatValue();
				Countly.sharedInstance().recordEvent(eventName, eventCount, eventSum);
				callbackContext.success("eventWithSum sent");
				//Log.e("Nicolson","at eventWithSum sent");
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
				//Log.e("Nicolson","at eventWithSegment sent");
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
				//Log.e("Nicolson","at eventWithSumSegment sent");
			}
			else{
				callbackContext.success("event sent");
				//Log.e("Nicolson","at none of the case sent");
			}
			
			//Log.e("Nicolson","at event " +eventName +" " +eventCount);
			return true;
        }
		else if ("setloggingenabled".equals(action)) {
			Countly.sharedInstance().setLoggingEnabled(true);
			callbackContext.success("setloggingenabled success!");
			Log.e("Nicolson","setloggingenabled ");
			return true;
        }
		else if ("setuserdata".equals(action)) {
			Bundle bundle = new Bundle();
			bundle.putString("name", args.getString(0));
			bundle.putString("username", args.getString(1));
			bundle.putString("email", args.getString(2));
			bundle.putString("org", args.getString(3));
			bundle.putString("phone", args.getString(4));
			bundle.putString("picture", args.getString(5));
			bundle.putString("picturePath", args.getString(6));
			bundle.putString("gender", args.getString(7));
			bundle.putInt("byear", args.getInt(8));
			Countly.sharedInstance().setUserData(bundle);
			callbackContext.success("setuserdata success");
			Log.e("Nicolson","setuserdata ");
			return true;
        }
		else if("onregistrationid".equals(action)){
			String registrationId = args.getString(0);
			int messagingMode = Integer.parseInt(args.getString(1));
			Countly.CountlyMessagingMode mode = null;
			if(messagingMode == 0){
				mode = Countly.CountlyMessagingMode.TEST;
			}
			else
				mode = Countly.CountlyMessagingMode.PRODUCTION;
			Countly.sharedInstance().onRegistrationId(registrationId,mode);
			callbackContext.success("onRegistrationId success");
			Log.e("Nicolson","onRegistrationId ");
			return true;
		}
		else{
			return false;
			//callbackContext.success();
		}
        //return false;  // Returning false results in a "MethodNotFound" error.
    }

}
