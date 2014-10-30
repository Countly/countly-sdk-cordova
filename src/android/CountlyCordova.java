package ly.count.android.api;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

public class CountlyCordova extends CordovaPlugin {
	
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		Context context = this.cordova.getActivity().getApplicationContext();
		if ("init".equals(action)) {
			Log.e("Nicolson","at init");
			String serverUrl = args.toString(0);
			String appKey = args.toString(1);
			serverUrl.replace("https://", "http://");
			Log.e("Nicolson",serverUrl);
			Log.e("Nicolson",appKey);
			Countly.sharedInstance().init(context, serverUrl, appKey);
			callbackContext.success("initialized!");
            return true;
        }
		else if ("start".equals(action)) {
//			Log.e("Nicolson","at start");
			Countly.sharedInstance().onStart();
            callbackContext.success("started!");
            return true;
        }
		else if ("stop".equals(action)) {
//			Log.e("Nicolson","at stop");
			Countly.sharedInstance().onStop();
            callbackContext.success("stoped!");
            return true;
        }
		else if ("event".equals(action)) {
			Log.e("Nicolson","at event");
			Log.e("Nicolson",args.toString(0));
			Countly.sharedInstance().recordEvent(args.toString(0), args.getInt(1));
			callbackContext.success();
            return true;
        }
		else if ("carreir".equals(action)) {
//			Log.e("Nicolson","at carreir");
//			Toast.makeText(context, "I am here", Toast.LENGTH_SHORT);
			TelephonyManager manager = (TelephonyManager)context.getSystemService(Context.TELEPHONY_SERVICE);
			String carrierName = manager.getNetworkOperatorName();
			callbackContext.success(carrierName);
            return true;
        }
		else{
			return false;
			//callbackContext.success();
		}
        //return false;  // Returning false results in a "MethodNotFound" error.
    }

}
