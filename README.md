Countly is an innovative, real-time, open source mobile analytics application. It collects data from mobile devices, and visualizes this information to analyze mobile application usage and end-user behavior. There are two parts of Countly: the server that collects and analyzes data, and mobile SDK that sends this data. Both parts are open source with different licensing terms.

This repository includes the SDK for Phonegap and Icenium. You also need Countly server (either hosted on cloud or installed on-premise as Community Edition or Enterprise Edition).

### Using SDK under Android

Note : This repo contains only JS file while native android code is maintained <a href="https://github.com/Countly/countly-sdk-android">here</a>

Step 1: Go to <a href="https://github.com/Countly/countly-sdk-android">this</a> repo and download it.<br/>
Step 2: Go to countly-sdk-android/src file, copy the src files and paste in your src folder in eclipse <br/>
Step 3: Add ```<plugin name="Countly" value="ly.count.android.api.Countly"/>``` inside plugins tag in config.xml file.<br/>
Step 4: Paste below code inside the application tag in your `Manifest.xml` <br/>

```xml
	....
	<service android:name="org.openudid.OpenUDID_service"> 
		<intent-filter>
	       	<action android:name="org.openudid.GETUDID" />
	    </intent-filter>
	</service>
</application>
```

Step 5: Add jquery.js, cordova.android.js, countly.js in your index.html file. <br/>

```
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="cordova.android.js"></script>
<script type="text/javascript" src="countly.js"></script>
```

Step 6: Paste script below and paste in your script tag, also replace your app key:

<pre class="prettyprint">
function SendDemoEvent()
{
	var demoEvent = new CountlyEvent();
        demoEvent.Key = "Test";
        demoEvent.Count = 1;
        demoEvent.UsingSegmentation = true;
        
        var demoSegmentation = new SegmentationObject();
        demoSegmentation.Key = "Key";
        demoSegmentation.Value = "Value";
        
        demoEvent.Segmentation.push(demoSegmentation);
            
        Countly.PostEvent(demoEvent);
}
        
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
        
// PhoneGap is ready
function onDeviceReady() 
        {
	Countly.Init("https://cloud.count.ly","Replace_Your_App_Key","0.0.1",device.uuid);
   
	document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
            
        Countly.OnStart();
            
        function onPause() 
        {
        	Countly.OnStop();
	}
            
        function onResume() 
        {
        	Countly.OnStart();
	}
            
        }
</pre>

If you are facing any difficulty in implementing the above procedure there is also an sample code in the example folder.

### Using SDK under iOS

Note: This repo contains only JS file while native iOS code is maintained <a href="https://github.com/Countly/countly-sdk-ios">here</a> 

Step 1: Go to <a href="https://github.com/Countly/countly-sdk-ios">this</a> repo and download it.<br/>
Step 2: Add these files to your project under Xcode: `Countly.h` `Countly.m` `Countly_OpenUDID.h` `Countly_OpenUDID.m` `CountlyDB.h` `CountlyDB.m` and `Countly.xcdatamodeld` (Note : Drag and drop these files into your 'plugins' folder and add them as reference files.) <br/>
Step 3: Select your project in the Project Navigator.<br/>
Step 4: Select the **Build Phases** tab. <br/>
Step 5: Open **Link Binaries With Libraries** expander <br/>
Step 6: Click the **+** button. <br/>
Step 7: Select CoreTelephony.framework, select **Optional** (instead of Required). <br/>
Step 8: Select CoreData.framework. <br/>
Step 9: *(optional)* Drag and drop the added framework to the **Frameworks** group. <br/>
Step 10: Add this line in config.xml `<plugin name="Countly" value="Countly"/>` <br/>
Step 11: Add jquery.js, cordova.ios.js, countly.js in your index.html file. <br/>

```
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="cordova.ios.js"></script>
<script type="text/javascript" src="countly.js"></script>
```

Step 12: Paste the script below and paste in your script tag, also replace your app key you get from Countly dashboard (not API key)


<pre class="prettyprint">
function SendDemoEvent()
{
	var demoEvent = new CountlyEvent();
	demoEvent.Key = "Test";
	demoEvent.Count = 1;
	demoEvent.UsingSegmentation = true;
        
	var demoSegmentation = new SegmentationObject();
	demoSegmentation.Key = "Key";
	demoSegmentation.Value = "Value";
        
	demoEvent.Segmentation.push(demoSegmentation);
            
	Countly.PostEvent(demoEvent);
}
        
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", onDeviceReady, false);
        
        // PhoneGap is ready
        function onDeviceReady() 
        {
            Countly.Init("https://cloud.count.ly","Replace_Your_App_Key","0.0.1",device.uuid);
            
            document.addEventListener("pause", onPause, false);
            document.addEventListener("resume", onResume, false);
            
            Countly.OnStart();
            
            function onPause() 
            {
                Countly.OnStop();
            }
            
            function onResume() 
            {
                Countly.OnStart();
            }
            
        }
If you are facing any dificulty in implementing the above procedure there is also an sample code in the example folder
</pre>

### Custom Events

There are two constructors for custom events. <br/>

<pre class="prettyprint">
var customEvent = new CountlyEvent()
</pre>

OR 

<pre class="prettyprint">
var customEvent = new CountlyEvent(key, count, usingSum, sum, usingSegmentation, segmentation)
</pre>
	
where 'key' is for name of the event like click, hover, etc and 'count' is to count the number of occurance of that event.

Once custom events are created, we can send them to Countly by:

<pre class="prettyprint">
Countly.PostEvent(customEvent)
</pre>

Below is an example on how to use custom events: 

<pre class="prettyprint">
var customEvent = new CountlyEvent();
customEvent.key = "click #loginButton";
customEvent.count = 1;
customEvent.sum = 125;
customEvent.segmentation.push({"Country", "Turkey"});
customEvent.segmentation.push({"Age":"28"});
Countly.PostEvent(customEvent);
</pre>

For more information about custom events, see <a href="https://count.ly/resources/reference/custom-events">here</a> 

A sample Json for custom event:

<pre class="prettyprint">
    {
        "key": "in_app_purchase",
        "count": 1,
        "sum": 0.99,
        "segmentation": {
            "app_version": "1.0",
            "country": "Turkey",
            "item": "sword"
        }
    }
</pre>

### Acknowledgements 

This SDK was initially written by Panteon Technologies (ufuk@panteon.com.tr)
