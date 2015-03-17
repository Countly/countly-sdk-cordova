Countly is an innovative, real-time, open source mobile analytics application. It collects data from mobile devices, and visualizes this information to analyze mobile application usage and end-user behavior. There are two parts of Countly: the server that collects and analyzes data, and mobile SDK that sends this data. Both parts are open source with different licensing terms.

This repository includes the SDK for Phonegap and Icenium. You also need Countly server (either hosted on cloud or installed on-premise as Community Edition or Enterprise Edition).

### Using SDK

```
cordova create CountlyDemo ly.count.demo CountlyDemo
cd CountlyDemo

//adding plugins
//if you are using countly push notification
cordova plugin add org.apache.cordova.device
cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git

//countly core plugin
cordova plugin add https://github.com/Countly/countly-sdk-js.git

//add platform
cordova platform add android
cordova platform add ios

```


In your index.html

```
    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="Countly.js"></script> <!-- no longer required in cordova 3.5 and above, it is auto added -->
```

Docs
-----

```
//initialize
Countly.init("https://cloud.count.ly","App_Key");

//countly push notification
Countly.initMessaging({"messageMode": Countly.messagingMode.TEST, "projectId": "881000050249"});

// example for basic event
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

// example for setUserData enterprise edition only
var options = {};
options.name = "Nicolson Dsouza";
options.username = "nicolsondsouza";
options.email = "nicolsondsouza@gmail.com";
options.org = "Trinisoft Technologies Pvt. Ltd.";
options.phone = "+91 812 840 2946";
options.picture = "http://www.trinisofttechnologies.com/images/logo.png";
options.picturePath = "";
options.gender = "Male";
options.byear = 1989;
Countly.setUserData(options);

// example for setLoggingEnabled
Countly.setLoggingEnabled();

//example to start and stop countly
Countly.start();
Countly.stop();
```

If you are facing any dificulty in implementing the above procedure. Please report an issue for the same, or email us at: 


### Acknowledgements 

This SDK was initially written by Panteon Technologies (ufuk@panteon.com.tr).<br>
It's now maintained by Nicolson Dsouza (nicolsondsouza@gmail.com).
