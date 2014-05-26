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
Step 5 : Paste below scritping and replace your app key <br/>
	
    ```<script type="text/javascript">```<br/>
        ```function SendDemoEvent()```<br/>
        ```{```<br/>
        ```    var demoEvent = new CountlyEvent();```<br/>
        ```    demoEvent.Key = "Test";```<br/>
        ```    demoEvent.Count = 1;```<br/>
        ```    demoEvent.UsingSegmentation = true;```<br/>
        ``` ```<br/>
        ```    var demoSegmentation = new SegmentationObject();```<br/>
        ```    demoSegmentation.Key = "Key";```<br/>
        ```    demoSegmentation.Value = "Value";```<br/>
        ``` ```<br/>
        ```    demoEvent.Segmentation.push(demoSegmentation);```<br/>
        ```    ```<br/>
        ```    Countly.PostEvent(demoEvent);```<br/>
        ```}```<br/>
        ``` ```<br/>
        ```// Wait for PhoneGap to load```<br/>
        ```document.addEventListener("deviceready", onDeviceReady, false);```<br/>
        ``` ```<br/>
        ```// PhoneGap is ready```<br/>
        ```function onDeviceReady() ```<br/>
        ```{```<br/>
        ```    alert("here")```<br/>
        ```    Countly.Init("https://cloud.count.ly","Replace_Your_App_Key","0.0.1",device.uuid);```<br/>
        ```    ```<br/>
        ```    document.addEventListener("pause", onPause, false);```<br/>
        ```    document.addEventListener("resume", onResume, false);```<br/>
        ```    ```<br/>
        ```    Countly.OnStart();```<br/>
        ```    ```<br/>
        ```    function onPause() ```<br/>
        ```    {```<br/>
        ```        Countly.OnStop();```<br/>
        ```    }```<br/>
        ```    ```<br/>
        ```    function onResume() ```<br/>
        ```    {```<br/>
        ```        Countly.OnStart();```<br/>
       ```     }```<br/>
        ```    ```<br/>
        ```}```<br/>
    ```</script>```<br/>

iOS
==============
Comming soon

Comming soon 
==============
Custom events <br/>
iOS implementation<br/>