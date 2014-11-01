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
    <script type="text/javascript" src="CountlyCordova.js"></script>
```

Step 12: Paste the script below and paste in your script tag, also replace your app key you get from Countly dashboard (not API key)


```

    document.addEventlistener("deviceready",function(){
        CountlyCordova.init("https://cloud.count.ly","App_Key");
        var event = {"eventName":"mypaymentevent":"eventCount":1};
        CountlyCordova.sendEvent(event);
    },false);
    
```

If you are facing any dificulty in implementing the above procedure there is also a sample code in the example folder


### Acknowledgements 

This SDK was initially written by Panteon Technologies (ufuk@panteon.com.tr)
