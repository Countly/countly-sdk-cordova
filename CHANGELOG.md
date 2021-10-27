## 21.11.0
* Added a way to retrieve feedback widget data and manually report them
* Appear and dismiss callback implemented for nps/survey widgets
* Updated underlying android SDK to 20.11.10
* Updated underlying iOS SDK to 20.11.3

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
