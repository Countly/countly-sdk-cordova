package ly.count.android.api;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
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
			serverUrl = serverUrl.replace("https://", "http://");
			//Log.e("Nicolson",serverUrl);
			//Log.e("Nicolson",appKey);
			//serverUrl = "http://cloud.count.ly";
			//appKey = "98165a6ea732c6af4e200ea0d74e931210c2bd92";
			Countly.sharedInstance().init(context, serverUrl, appKey,null,DeviceId.Type.OPEN_UDID);
			Countly.sharedInstance().onStart();
			callbackContext.success("initialized!");
			Log.e("Nicolson","at init " +serverUrl +" " +appKey);
			return true;
        }
		else if ("start".equals(action)) {
			Countly.sharedInstance().onStart();
            callbackContext.success("started!");
            Log.e("Nicolson","at start");
            return true;
        }
		else if ("stop".equals(action)) {
			Countly.sharedInstance().onStop();
            callbackContext.success("stoped!");
            Log.e("Nicolson","at stop");
            return true;
        }
		else if ("event".equals(action)) {
			String eventName = args.getString(0);
			int eventCount= Integer.parseInt(args.getString(1));
			Countly.sharedInstance().recordEvent(eventName, eventCount);
			callbackContext.success("event sent");
			Log.e("Nicolson","at event " +eventName +" " +eventCount);
			return true;
        }
		else{
			return false;
			//callbackContext.success();
		}
        //return false;  // Returning false results in a "MethodNotFound" error.
    }

}
