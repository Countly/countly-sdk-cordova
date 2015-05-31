
## Phonegap and Cordova SDK for Countly

[Countly](http://count.ly) is an innovative, real-time, open source mobile analytics and push notifications platform. It collects data from mobile devices, and visualizes this information to analyze mobile application usage and end-user behavior. There are two parts of Countly: the server that collects and analyzes data, and mobile SDK that sends this data. Both parts are open source with different licensing terms.

This repository includes the SDK for Phonegap and Icenium. You also need Countly server - either hosted on cloud, or installed on-premise as Community Edition or [Enterprise Edition](http://count.ly/enterprise-edition)

### Using SDK

```
cordova create CountlyDemo ly.count.demo CountlyDemo
cd CountlyDemo

//adding plugins
{
	//if you are using countly push notification
	cordova plugin add org.apache.cordova.device
	cordova plugin add https://github.com/phonegap-build/PushPlugin.git
}

//countly core plugin
cordova plugin add https://github.com/Countly/countly-sdk-js.git

//add platform
cordova platform add android
cordova platform add ios

//!important make sure you build it with cordova
// as cordova links folders very well
cordova build android
cordova build ios

//run the app directly
cordova run android
cordova run ios

//or open the source in Xcode, or eclipse

```

### With meteor app

```
meteor add countly:countly-sdk-js
```

In your index.html, use the following lines:

```
    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="Countly.js"></script> <!-- no longer required in cordova 3.5 and above, it is auto added -->
```

Implementation
-----

Below you can find necessary code snippets to initialize the SDK for sending data to Countly servers. Where possible, use your server URL instead of cloud.count.ly in case you have your own server. 

```
//initialize
Countly.init("https://cloud.count.ly","App_Key");

//countly push notification
Countly.initMessaging({"messageMode": Countly.messagingMode.TEST, "projectId": "881000050249"});

// example for sending basic custom event
var events = {"eventName":"basic_event","eventCount":1};
Countly.sendEvent(events);

// example for event with sum
var events = {"eventName":"event_sum","eventCount":1,"eventSum":"0.99"};
Countly.sendEvent(events);

// example for event with segment
var events = {"eventName":"event_segment","eventCount":1};
events.segments = {"Country" : "Turkey", "Age" : "28"};
Countly.sendEvent(events);

// example for event with segment and sum
var events = {"eventName":"event_segment_sum","eventCount":1,"eventSum":"0.99"};
events.segments = {"Country" : "Turkey", "Age" : "28"};
Countly.sendEvent(events);

// example for setUserData - Enterprise Edition only
var options = {};
options.name = "Trinisoft Technologies";
options.username = "trinisofttechnologies";
options.email = "trinisofttechnologies@gmail.com";
options.org = "Trinisoft Technologies Pvt. Ltd.";
options.phone = "+91 812 840 2946";
options.picture = "http://www.trinisofttechnologies.com/images/logo.png";
options.picturePath = "";
options.gender = "Male";
options.byear = 1989;
Countly.setUserData(options);

// example for setLoggingEnabled
Countly.setLoggingEnabled();

//example to start and stop Countly
Countly.start();
Countly.stop();
```

Troubleshooting
-----
```
NSPersistentStoreCoordinator with a nil model'
```
In this case got to 
https://github.com/Countly/countly-sdk-js/tree/master/src/ios/sdk
Drag and drop "Countly.xcdatamodeld" folder into your plugins folder.
and build it using Xcode.

If you are facing any difficulty in implementing procedures above, please report an issue or directly email me at trinisofttechnologies@gmail.com.

### Acknowledgements 

This SDK was initially written by Panteon Technologies (ufuk@panteon.com.tr).<br>
It's now maintained by Trinisoft Technologies (trinisofttechnologies@gmail.com).

### Help spread the word!

If you liked Countly, [why not use one of our badges](https://count.ly/brand-assets/) and give a link back to us, so others know about this wonderful platform? 

![Light badge](https://count.ly/wp-content/uploads/2014/10/countly_badge_5.png)  ![Dark badge](https://count.ly/wp-content/uploads/2014/10/countly_badge_6.png)
