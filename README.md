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
Step 1 : Got to <a href="https://github.com/Countly/countly-sdk-android">this</a> repo and download it.<br/>
Step 2 : Got to countly-sdk-android/src file, copy the src files and paste in your src folder in eclipse <br/>
Step 3 : Add ```<plugin name="Countly" value="ly.count.android.api.Countly"/>``` inside plugins tag <br/>
Step 4 : Add jquery.js, cordova.android.js, countly.js in your index.html file. <br/>
	```<script type="text/javascript" src="jquery.js"></script>```<br/>
	```<script type="text/javascript" src="cordova.android.js"></script>```<br/>
    ```<script type="text/javascript" src="countly.js"></script>```<br/>
Step 5 : Paste below scritping and paste in your script tag, also replace your app key <br/>
    ```
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
            alert("here")
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
Comming soon

Comming soon 
==============
Custom events <br/>
iOS implementation<br/>