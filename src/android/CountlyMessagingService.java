package ly.count.android.sdk;

import android.content.Intent;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONArray;

import ly.count.android.sdk.messaging.CountlyPush;

public class CountlyMessagingService extends FirebaseMessagingService {
    private static final String TAG = "CountlyMessagingService";

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        if(Countly.sharedInstance().isInitialized()) {
            CountlyNative.log("onNewToken", new JSONArray().put(token));
            CountlyPush.onTokenRefresh(token);
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        if(!Countly.sharedInstance().isInitialized()) {
            int mode = CountlyPush.getLastMessagingMethod(this);
            if(mode == 0) {
                CountlyPush.init(getApplication(), Countly.CountlyMessagingMode.TEST);
            } else if(mode == 1) {
                CountlyPush.init(getApplication(), Countly.CountlyMessagingMode.PRODUCTION);
            }
        }

        CountlyNative.log("onMessageReceived", new JSONArray().put(remoteMessage.getData()));

        // decode message data and extract meaningful information from it: title, body, badge, etc.
        CountlyPush.Message message = CountlyPush.decodeMessage(remoteMessage.getData());

        if (message != null && message.has("typ")) {
            // custom handling only for messages with specific "typ" keys
            message.recordAction(getApplicationContext());
            return;
        }

        Intent notificationIntent = null;

        Boolean result = CountlyPush.displayMessage(getApplicationContext(), message, getApplicationContext().getApplicationInfo().icon, notificationIntent);
        if (result == null) {
            Log.i(TAG, "Message wasn't sent from Countly server, so it cannot be handled by Countly SDK");
        } else if (result) {
            Log.i(TAG, "Message was handled by Countly SDK");
        } else {
            Log.i(TAG, "Message wasn't handled by Countly SDK because API level is too low for Notification support or because currentActivity is null (not enough lifecycle method calls)");
        }
        CountlyNative.onNotification(remoteMessage.getData());
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
    }
}