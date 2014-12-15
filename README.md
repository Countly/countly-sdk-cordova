Countly is an innovative, real-time, open source mobile analytics application. It collects data from mobile devices, and visualizes this information to analyze mobile application usage and end-user behavior. There are two parts of Countly: the server that collects and analyzes data, and mobile SDK that sends this data. Both parts are open source with different licensing terms.

This repository includes the SDK for Phonegap and Icenium. You also need Countly server (either hosted on cloud or installed on-premise as Community Edition or Enterprise Edition).

### Using SDK under Android

```
cordova plugin add https://github.com/nicolsondsouza/countly-sdk-js.git
```



If you are facing any difficulty in implementing the above procedure there is also an sample code in the example folder.

### Using SDK under iOS


```
cordova plugin add https://github.com/nicolsondsouza/countly-sdk-js.git

cordova build ios

/*
Open the project in xcode
Go to /src/ios/sdk/Countly.xcdatamodeld 
drag and drop Countly.xcdatamodeld in your plugin folder.
(because cordova plugin doesn't support folder, so has to be added manually.)
*/
```



In your index.html

```
    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="CountlyCordova.js"></script> <!-- no longer required in cordova 3.5 and above, it is auto added -->
```

Docs
-----

```
//initialize
CountlyCordova.init("https://cloud.count.ly","App_Key");

// example for basic event
var events = {"eventName":"basic_event","eventCount":1};
CountlyCordova.sendEvent(events);

// example for event with sum
var events = {"eventName":"event_sum","eventCount":1,"eventSum":"0.99"};
CountlyCordova.sendEvent(events);

// example for event with segment
var events = {"eventName":"event_segment","eventCount":1};
events.segments = {"Country" : "Turkey", "Age" : "28"};
CountlyCordova.sendEvent(events);

// example for event with segment and sum
var events = {"eventName":"event_segment_sum","eventCount":1,"eventSum":"0.99"};
events.segments = {"Country" : "Turkey", "Age" : "28"};
CountlyCordova.sendEvent(events);

// example for setUserData android only
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
CountlyCordova.setUserData(options);

// example for setLoggingEnabled
CountlyCordova.setLoggingEnabled();

//example to start and stop countly
CountlyCordova.start();
CountlyCordova.stop();
```

If you are facing any dificulty in implementing the above procedure there is also a sample code in the example folder


### Acknowledgements 

This SDK was initially written by Panteon Technologies (ufuk@panteon.com.tr).<br>
It's now maintained by Nicolson Dsouza (nicolsondsouza@gmail.com).
