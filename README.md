countly-sdk-js
==============

Countly SDK for Icenium and Phonegap. This is a community supported project, 
written and maintained by Panteon Technologies (ufuk@panteon.com.tr)

Prerequisite requirement
==============
You should have a basic "Hello World" Phonegap app for more information see <a href="http://docs.phonegap.com/en/edge/guide_platforms_index.md.html"> here </a>

Getting started 
==============

Android 
==============
Note : This repo contains only javascript file while native android code is maintained <a href="https://github.com/Countly/countly-sdk-android">here</a> <br/>
Step 1 : Go to <a href="https://github.com/Countly/countly-sdk-android">this</a> repo and download it.<br/>
Step 2 : Go to countly-sdk-android/src file, copy the src files and paste in your src folder in eclipse <br/>
Step 3 : Add ```<plugin name="Countly" value="ly.count.android.api.Countly"/>``` inside plugins tag in config.xml file.<br/>
Step 4 : Paste below code inside the application tag in your `Manifiest.xml` <br/>

```xml
	....
	<service android:name="org.openudid.OpenUDID_service"> 
		<intent-filter>
	       	<action android:name="org.openudid.GETUDID" />
	    </intent-filter>
	</service>
</application>
```

Step 5 : Add jquery.js, cordova.android.js, countly.js in your index.html file. <br/>

```xml
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="cordova.android.js"></script>
    <script type="text/javascript" src="countly.js"></script>
```

Step 6 : Paste below scritping and paste in your script tag, also replace your app key <br/>


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
If you are facing any dificulty in implementing the above procedure there is also an sample code in the example folder <br/>

iOS
==============
Note : This repo contains only javascript file while native ios code is maintained <a href="https://github.com/Countly/countly-sdk-ios">here</a> 
<br/>
Step 1 : Go to <a href="https://github.com/Countly/countly-sdk-ios">this</a> repo and download it.<br/>
Step 2 : Add these files to your project under Xcode: `Countly.h` `Countly.m` `Countly_OpenUDID.h` `Countly_OpenUDID.m` `CountlyDB.h` `CountlyDB.m` and `Countly.xcdatamodeld` (Note : Drag and drop these files into your 'plugins' folder and add them as reference files.) <br/>
Step 3 : Select your project in the Project Navigator.<br/>
Step 4 : Select the **Build Phases** tab. <br/>
Step 5 : Open **Link Binaries With Libraries** expander <br/>
Step 6 : Click the **+** button. <br/>
Step 7 : Select CoreTelephony.framework, select **Optional** (instead of Required). <br/>
Step 8 : Select CoreData.framework. <br/>
Step 9 : *(optional)* Drag and drop the added framework to the **Frameworks** group. <br/>
Step 10 : Add this line in config.xml `<plugin name="Countly" value="Countly"/>` <br/>
Step 11 : Add jquery.js, cordova.ios.js, countly.js in your index.html file. <br/>

```xml
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="cordova.ios.js"></script>
    <script type="text/javascript" src="countly.js"></script>
```

Step 12 : Paste below scritping and paste in your script tag, also replace your app key <br/>


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
If you are facing any dificulty in implementing the above procedure there is also an sample code in the example folder <br/>

Comming soon 
==============
Custom events <br/>