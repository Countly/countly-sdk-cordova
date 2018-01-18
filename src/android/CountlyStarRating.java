package ly.count.android.sdk;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.RatingBar;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class CountlyStarRating {

    /**
     * Callbacks for star rating dialog
     */
    public interface RatingCallback {
        void onRate(int rating);
        void onDismiss();
    }

    /**
     * Call to manually show star rating dialog
     * @param context
     * @param callback
     */
    public static void showStarRating(Context context, final CountlyStarRating.RatingCallback callback){
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        showStarRatingCustom(context, srp.dialogTextTitle, srp.dialogTextMessage, srp.dialogTextDismiss, srp.isDialogCancellable, callback);
    }

    /**
     * Method that created the star rating dialog
     * @param context
     * @param title
     * @param message
     * @param cancelText
     * @param isCancellable
     * @param callback
     */
    public static void showStarRatingCustom(
            final Context context,
            final String title,
            final String message,
            final String cancelText,
            final boolean isCancellable,
            final CountlyStarRating.RatingCallback callback) {

        if(!(context instanceof Activity)) {
            if (Countly.sharedInstance().isLoggingEnabled()) {
                Log.e(Countly.TAG, "Can't show star rating dialog, the provided context is not based off a activity");
            }
            return;
        }

        LayoutInflater inflater = (LayoutInflater) context.getSystemService( Context.LAYOUT_INFLATER_SERVICE );
        View dialogLayout = null; // inflater.inflate(R.layout.star_rating_layout, null);
        RatingBar ratingBar = null; // (RatingBar) dialogLayout.findViewById(R.id.ratingBar);

        final AlertDialog.Builder builder = new AlertDialog.Builder(context)
                .setTitle(title)
                .setMessage(message)
                .setCancelable(isCancellable)
                .setView(dialogLayout)
                .setOnCancelListener(new DialogInterface.OnCancelListener() {
                    @Override
                    public void onCancel(DialogInterface dialogInterface) {
                        if(callback != null) {
                            //call the dismiss callback ir the user clicks the back button or clicks outside the dialog
                            callback.onDismiss();
                        }
                    }
                })
                .setPositiveButton(cancelText, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        if(callback != null) {
                            //call the dismiss callback if the user clicks the "dismiss" button
                            callback.onDismiss();
                        }
                    }
                });

        final AlertDialog dialog = builder.show();

        ratingBar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float v, boolean b) {
                int rating = (int)v;
                Map<String,String> segm = new HashMap<>();
                segm.put("platform", "android");
                segm.put("app_version", DeviceInfo.getAppVersion(context));
                segm.put("rating", "" + rating);

                Countly.sharedInstance().recordEvent("[CLY]_star_rating", segm, 1);

                dialog.dismiss();
                if(callback != null) {
                    callback.onRate(rating);
                }
            }
        });
    }

    /**
     * Class that handles star rating internal state
     */
    static class StarRatingPreferences {
        String appVersion = ""; //the name of the current version that we keep track of
        int sessionLimit = 5; //session limit for the automatic star rating
        int sessionAmount = 0; //session amount for the current version
        boolean isShownForCurrentVersion = false; //if automatic star rating has been shown for the current version
        boolean automaticRatingShouldBeShown = false; //if the automatic star rating should be shown
        boolean disabledAutomaticForNewVersions = false; //if the automatic star star should not be shown for every new apps version
        boolean automaticHasBeenShown = false; //if automatic star rating has been shown for any app's version
        boolean isDialogCancellable = true; //if star rating dialog is cancellable
        String dialogTextTitle = "App rating";
        String dialogTextMessage = "Please rate this app";
        String dialogTextDismiss = "Cancel";

        private static final String KEY_APP_VERSION = "sr_app_version";
        private static final String KEY_SESSION_LIMIT = "sr_session_limit";
        private static final String KEY_SESSION_AMOUNT = "sr_session_amount";
        private static final String KEY_IS_SHOWN_FOR_CURRENT = "sr_is_shown";
        private static final String KEY_AUTOMATIC_RATING_IS_SHOWN = "sr_is_automatic_shown";
        private static final String KEY_DISABLE_AUTOMATIC_NEW_VERSIONS = "sr_is_disable_automatic_new";
        private static final String KEY_AUTOMATIC_HAS_BEEN_SHOWN = "sr_automatic_has_been_shown";
        private static final String KEY_DIALOG_IS_CANCELLABLE = "sr_automatic_dialog_is_cancellable";
        private static final String KEY_DIALOG_TEXT_TITLE = "sr_text_title";
        private static final String KEY_DIALOG_TEXT_MESSAGE = "sr_text_message";
        private static final String KEY_DIALOG_TEXT_DISMISS = "sr_text_dismiss";

        /**
         * Create a JSONObject from the current state
         * @return
         */
        JSONObject toJSON() {
            final JSONObject json = new JSONObject();

            try {
                json.put(KEY_APP_VERSION, appVersion);
                json.put(KEY_SESSION_LIMIT, sessionLimit);
                json.put(KEY_SESSION_AMOUNT, sessionAmount);
                json.put(KEY_IS_SHOWN_FOR_CURRENT, isShownForCurrentVersion);
                json.put(KEY_AUTOMATIC_RATING_IS_SHOWN, automaticRatingShouldBeShown);
                json.put(KEY_DISABLE_AUTOMATIC_NEW_VERSIONS, disabledAutomaticForNewVersions);
                json.put(KEY_AUTOMATIC_HAS_BEEN_SHOWN, automaticHasBeenShown);
                json.put(KEY_DIALOG_IS_CANCELLABLE, isDialogCancellable);
                json.put(KEY_DIALOG_TEXT_TITLE, dialogTextTitle);
                json.put(KEY_DIALOG_TEXT_MESSAGE, dialogTextMessage);
                json.put(KEY_DIALOG_TEXT_DISMISS, dialogTextDismiss);

            }
            catch (JSONException e) {
                if (Countly.sharedInstance().isLoggingEnabled()) {
                    Log.w(Countly.TAG, "Got exception converting an StarRatingPreferences to JSON", e);
                }
            }

            return json;
        }

        /**
         * Load the preference state from a JSONObject
         * @param json
         * @return
         */
        static StarRatingPreferences fromJSON(final JSONObject json) {

            StarRatingPreferences srp = new StarRatingPreferences();

            if(json != null) {
                try {
                    srp.appVersion = json.getString(KEY_APP_VERSION);
                    srp.sessionLimit = json.optInt(KEY_SESSION_LIMIT, 5);
                    srp.sessionAmount = json.optInt(KEY_SESSION_AMOUNT, 0);
                    srp.isShownForCurrentVersion = json.optBoolean(KEY_IS_SHOWN_FOR_CURRENT, false);
                    srp.automaticRatingShouldBeShown = json.optBoolean(KEY_AUTOMATIC_RATING_IS_SHOWN, true);
                    srp.disabledAutomaticForNewVersions = json.optBoolean(KEY_DISABLE_AUTOMATIC_NEW_VERSIONS, false);
                    srp.automaticHasBeenShown = json.optBoolean(KEY_AUTOMATIC_HAS_BEEN_SHOWN, false);
                    srp.isDialogCancellable = json.optBoolean(KEY_DIALOG_IS_CANCELLABLE, true);

                    if(!json.isNull(KEY_DIALOG_TEXT_TITLE)) {
                        srp.dialogTextTitle = json.getString(KEY_DIALOG_TEXT_TITLE);
                    }

                    if(!json.isNull(KEY_DIALOG_TEXT_MESSAGE)) {
                        srp.dialogTextMessage = json.getString(KEY_DIALOG_TEXT_MESSAGE);
                    }

                    if(!json.isNull(KEY_DIALOG_TEXT_DISMISS)) {
                        srp.dialogTextDismiss = json.getString(KEY_DIALOG_TEXT_DISMISS);
                    }

                } catch (JSONException e) {
                    if (Countly.sharedInstance().isLoggingEnabled()) {
                        Log.w(Countly.TAG, "Got exception converting JSON to a StarRatingPreferences", e);
                    }
                }
            }

            return srp;
        }
    }

    /**
     * Setting things that would be provided during initial config
     * @param context
     * @param limit limit for automatic rating
     * @param starRatingTextTitle provided title
     * @param starRatingTextMessage provided message
     * @param starRatingTextDismiss provided dismiss text
     */
    public static void setStarRatingInitConfig(Context context, int limit, String starRatingTextTitle, String starRatingTextMessage, String starRatingTextDismiss) {
        StarRatingPreferences srp = loadStarRatingPreferences(context);

        if(limit >= 0) {
            srp.sessionLimit = limit;
        }

        if(starRatingTextTitle != null) {
            srp.dialogTextTitle = starRatingTextTitle;
        }

        if(starRatingTextMessage != null) {
            srp.dialogTextMessage = starRatingTextMessage;
        }

        if(starRatingTextDismiss != null) {
            srp.dialogTextDismiss = starRatingTextDismiss;
        }

        saveStarRatingPreferences(context, srp);
    }

    /**
     * Returns a object with the loaded preferences
     * @param context
     * @return
     */
    private static StarRatingPreferences loadStarRatingPreferences(Context context) {
        CountlyStore cs = new CountlyStore(context);
        String srpString = cs.getStarRatingPreferences();
        StarRatingPreferences srp;

        if(!srpString.equals("")) {
            JSONObject srJSON;
            try {
                srJSON = new JSONObject(srpString);
                srp = StarRatingPreferences.fromJSON(srJSON);
            } catch (JSONException e) {
                e.printStackTrace();
                srp = new StarRatingPreferences();
            }
        } else {
            srp = new StarRatingPreferences();
        }
        return srp;
    }

    /**
     * Save the star rating preferences object
     * @param context
     * @param srp
     */
    private static void saveStarRatingPreferences(Context context, StarRatingPreferences srp) {
        CountlyStore cs = new CountlyStore(context);
        cs.setStarRatingPreferences(srp.toJSON().toString());
    }

    /**
     * Set if the star rating dialog should be shown automatically
     * @param context
     * @param shouldShow
     */
    public static void setShowDialogAutomatically(Context context, boolean shouldShow) {
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        srp.automaticRatingShouldBeShown = shouldShow;
        saveStarRatingPreferences(context, srp);
    }

    /**
     * Set if automatic star rating should be disabled for each new version.
     * By default automatic star rating will be shown for every new app version.
     * If this is set to true, star rating will be shown only once over apps lifetime
     * @param context
     * @param disableAsking if set true, will not show star rating for every new app version
     */
    public static void setStarRatingDisableAskingForEachAppVersion(Context context, boolean disableAsking) {
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        srp.disabledAutomaticForNewVersions = disableAsking;
        saveStarRatingPreferences(context, srp);
    }

    /**
     * Register that a apps session has transpired. Will increase session counter and show automatic star rating if needed.
     * @param context
     * @param starRatingCallback
     */
    public static void registerAppSession(Context context, RatingCallback starRatingCallback) {
        StarRatingPreferences srp = loadStarRatingPreferences(context);

        String currentAppVersion = DeviceInfo.getAppVersion(context);

        //a new app version is released, reset all counters
        //if we show the rating once per apps lifetime, don't reset the counters
        if(currentAppVersion != null && !currentAppVersion.equals(srp.appVersion) && !srp.disabledAutomaticForNewVersions) {
            srp.appVersion = currentAppVersion;
            srp.isShownForCurrentVersion = false;
            srp.sessionAmount = 0;
        }

        srp.sessionAmount++;
        if(srp.sessionAmount >= srp.sessionLimit && !srp.isShownForCurrentVersion && srp.automaticRatingShouldBeShown && !(srp.disabledAutomaticForNewVersions && srp.automaticHasBeenShown)) {
            showStarRating(context, starRatingCallback);
            srp.isShownForCurrentVersion = true;
            srp.automaticHasBeenShown = true;
        }

        saveStarRatingPreferences(context, srp);
    }

    /**
     * Returns the session limit set for automatic star rating
     */
    public static int getAutomaticStarRatingSessionLimit(Context context){
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        return srp.sessionLimit;
    }

    /**
     * Returns how many sessions has star rating counted internally
     * @param context
     * @return
     */
    public static int getCurrentVersionsSessionCount(Context context){
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        return srp.sessionAmount;
    }

    /**
     * Set the automatic star rating session count back to 0
     * @param context
     */
    public static void clearAutomaticStarRatingSessionCount(Context context){
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        srp.sessionAmount = 0;
        saveStarRatingPreferences(context, srp);
    }

    /**
     * Set if the star rating dialog is cancellable
     * @param context
     * @param isCancellable
     */
    public static void setIfRatingDialogIsCancellable(Context context, boolean isCancellable){
        StarRatingPreferences srp = loadStarRatingPreferences(context);
        srp.isDialogCancellable = isCancellable;
        saveStarRatingPreferences(context, srp);
    }
}
