## 22.09.0
* Fixed notification trampoline restrictions in Android 12 using reverse activity trampolining implementation.
* Fixed a bug in Android SDK that would throw a null pointer exception when calling "CountlyPush.onTokenRefresh" and CountlyPush was not initialized
* Fixed a bug in Android SDK that would throw a null pointer exception when calling "CountlyPush.displayNotification " and CountlyPush was not initialized
* Updated underlying android SDK to 22.06.2
* Updated underlying iOS SDK version to 22.09.0

## 21.11.0
* !! Major breaking change !! Deprecating "ADVERTISING_ID" as device ID generation strategy. SDK will fall back to 'OPEN_UDID'. All "ADVERTISING_ID" device ID's will have their type changed to "OPEN_UDID". If the device will have a "null" device ID, a random one will be generated.
* !! Major breaking change !! Changing device ID without merging will now clear all consent. It has to be given again after this operation.
* !! Major breaking change !! Entering temporary ID mode will now clear all consent. It has to be given again after this operation.
* Fixed bug that caused crashes when migrating from older versions on Android devices.
* User profile issue fixed, user data was deleted for key if no value, null or undefined value was provided against that key.
* Device ID can now be changed when no consent is given
* Push notification now display/use the sent badge number in Android. It's visualization depends on the launcher.
* When recording internal events with 'recordEvent', the respective feature consent will now be checked instead of the 'events' consent.
* Consent changes will now send the whole consent state and not just the "delta"
* Added platform information to push actioned events
* Fixed potential deadlock issue in Android.
* Fixed possible SecTrustCopyExceptions leak in iOS
* Updated underlying android SDK to 21.11.2
* Updated underlying iOS SDK version to 21.11.2

## 20.11.3
* Added COUNTLY_EXCLUDE_PUSHNOTIFICATIONS flag to disable push notifications altogether in order to avoid App Store Connect warnings.
* Fixed issues related to Push notification crash when notification recieved from other SDK's/Plugins (not from Countly).
* Updated underlying android SDK to 20.11.11
* Updated underlying iOS SDK version to 20.11.3

## 20.11.2
* Moving a push related broadcast receiver declaration to the manifest to comply with 'PendingIntent' checks
* Updated underlying android SDK to 20.11.9
* Underlying iOS SDK version is 20.11.2

## 20.11.1
* "setLoggingEnabled" call issues fixed.
* Updated underlying android SDK to 20.11.8
* Updated underlying iOS SDK to 20.11.2

## 20.11.0
* !! Due to cocoapods issue with Xcode 12, we have added the iOS SDK as source code instead of Pod. Due to that change you may need to remove the ios platform and add it again.
* !! Consent change !! To use remote config, you now need to give "remote-config" consent
* !! Push breaking changes !! Google play vulnerability issue fixed due to broadcast receiver for android push notification
* Added "onNotification" listener for push notification callbacks
* Notification Service Extension automation added
* Tweaked android push notifications to always show up as notifications
* Added Surveys and NPS feedback widgets
* Added "replaceAllAppKeysInQueueWithCurrentAppKey" method to replace all app keys in queue with the current app key
* Added "removeDifferentAppKeysFromQueue" method to remove all different app keys from the queue
* Added "setStarRatingDialogTexts" method to set text's for different fields of star rating dialog
* Added "setLoggingEnabled" call
* Added "setLocationInit" method to record Location before init, to prevent potential issues occurred when location is passed after init.
* Added "giveConsentInit" method to give Consents before init, some features needed consent before init to work properly.
* Added APM calls
* Added "isInitialised" call
* Added functionality to enable attribution
* Added "recordAttributionID" call to support changes in iOS 14 related to App Tracking Permission.
* Added call to retrieve the currently used device ID and Author.
* Updated "init" call to async
* Segmentation added in recordView method
* Renamed countly-sdk-js to countly-sdk-cordova
* Scripts added to create Cordova and Ionic Example app
* Ionic example app removed
* Fixed issues related to location tracking
* Fixed SDK version and SDK name metrics to show not the bridged SDK values but the ones from the cordova SDK
* Updated underlying android SDK to 20.11.2
* Updated underlying ios SDK to 20.11.1

## 19.9.3
