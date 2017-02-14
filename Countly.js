Countly = {};
Countly.serverUrl = "";
Countly.appKey = "";
Countly.ready = false;
Countly.messagingMode = {"TEST":1,"PRODUCTION":0};
// countly initialization
Countly.init = function(serverUrl,appKey){
    Countly.serverUrl = serverUrl;
    Countly.appKey = appKey;
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","init",[serverUrl,appKey]);
}

Countly.initMessaging = function(options){
    Countly.projectId = options.projectId;
    Countly.messageMode = options.messageMode;
    // Countly.Push.onRegisterPushNotification();

    var args = [];
    args.push(options.registrationId || "");
    args.push(options.messageMode || "0");
    args.push(options.projectId || "");
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","onregistrationid",args);
}

// countly sending various types of events
Countly.sendEvent = function(options){
    var args = [];
    var eventType = "event"; //event, eventWithSum, eventWithSegment, eventWithSumSegment
    var segments = {};

    if(options.eventSum)
        eventType = "eventWithSum";
    if(options.segments)
        eventType = "eventWithSegment";
    if(options.segments && options.eventSum)
        eventType = "eventWithSumSegment";

    args.push(eventType);

    if(options.eventName)
        args.push(options.eventName.toString());
    if(options.eventCount)
        args.push(options.eventCount.toString());
    if(options.eventSum)
        args.push(options.eventSum.toString());

    if(options.segments)
        segments = options.segments;
    for (var event in segments) {
        args.push(event);
        args.push(segments[event]);
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","event",args);
}
Countly.recordView = function(recordView){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","recordView",[recordView || ""]);
};

// countly enable logger
Countly.setLoggingEnabled = function(boolean){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setloggingenabled",[]);
}

// countly sending user data
Countly.setUserData = function(options){
    var args = [];
    args.push(options.name || "");
    args.push(options.username || "");
    args.push(options.email || "");
    args.push(options.org || "");
    args.push(options.phone || "");
    args.push(options.picture || "");
    args.push(options.picturePath || "");
    args.push(options.gender || "");
    args.push(options.byear || 0);

    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setuserdata",args);
}

Countly.onRegistrationId = function(options){
    var args = [];
    args.push(options.registrationId || "");
    args.push(Countly.messageMode || "0");
    args.push(options.projectId || "");
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","onregistrationid",args);
}
// countly start for android
Countly.start = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","start",[]);
}

// countly stop for android
Countly.stop = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","stop",[]);
}

// countly deviceready for testing purpose
Countly.deviceready = function(){
    Countly.ready = true;
    //testing
}

// countly dummy success and error event
Countly.onSuccess = function(result){
    // alert(result);
}
Countly.onError = function(error){
     // alert("error");
     // alert(error);
}
Countly.demo = function(){

}

// 2017

Countly.changeDeviceId = function(newDeviceID){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","changeDeviceId",[newDeviceID.toString() || ""]);
}
Countly.enableParameterTamperingProtection = function(salt){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableParameterTamperingProtection",[salt.toString() || ""]);
}
Countly.enableParameterTamperingProtection = function(salt){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableParameterTamperingProtection",[salt.toString() || ""]);
}
Countly.startEvent = function(eventName){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","startEvent",[eventName.toString() || ""]);
}
Countly.endEvent = function(options){
    if(typeof options === "string")
        options = {eventName: options};
    var args = [];
    var eventType = "event"; //event, eventWithSum, eventWithSegment, eventWithSumSegment
    var segments = {};

    if(options.segments && options.eventSum)
        eventType = "eventWithSumSegment";

    args.push(eventType);

    if(options.eventName)
        args.push(options.eventName.toString());
    if(options.eventCount)
        args.push(options.eventCount.toString());
    if(options.eventSum)
        args.push(options.eventSum.toString());

    if(options.segments)
        segments = options.segments;
    for (var event in segments) {
        args.push(event);
        args.push(segments[event]);
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","endEvent",args);
};

Countly.userData = {};
Countly.userData.setProperty = function(keyName, keyValue){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || "", keyValue.toString() || ""]);
};
Countly.userData.increment = function(keyName){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || ""]);
};
Countly.userData.incrementBy = function(keyName, keyIncrement){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || "", keyIncrement.toString() || ""]);
};
Countly.userData.multiply = function(keyName, multiplyValue){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || "", multiplyValue.toString() || ""]);
};
Countly.userData.saveMax = function(keyName, saveMax){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || "", saveMax.toString() || ""]);
};
Countly.userData.saveMin = function(keyName, saveMin){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || "", saveMin.toString() || ""]);
};
Countly.userData.setOnce = function(keyName, setOnce){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData.setProperty",[keyName.toString() || "", setOnce.toString() || ""]);
};

/////////////////////////
////// PUSH CODE ////////
/////////////////////////

var push = {};
Countly.Push = push;
push.onRegisterPushNotification = function(){
    var pushNotification = window.plugins.pushNotification;
    if(!window.device){
        console.error("dependency required org.apache.cordova.device to know android or ios device.");
        return;
    }
    if (device.platform == 'android' || device.platform == 'Android') {
        pushNotification.register(push.onPushSucess, push.onPushError,{"senderID":Countly.projectId,"ecb":"Countly.Push.onNotificationGCM"});
    }
    else{
        pushNotification.register(push.onPushSucess,push.onPushError,{"badge":"true","sound":"true","alert":"true","ecb":"Countly.Push.onNotificationAPN"});
    }
}
push.onPushSucess = function(result){
    push.onPushId(result)
}
push.onPushError = function(error){
    // alert(error)
}
push.onPushId = function(pushId){
    if(pushId == "OK" || pushId == "ok")
        return
    push.pushId = pushId;
    push.onSendPushId();
}

push.onSendPushId = function(){
    // alert(push.pushId)
    var options = {"registrationId":push.pushId,"mode":Countly.messageMode || 0};
    Countly.onRegistrationId(options);
}
push.onSendPushIdCallback = function(err,success){
    if(err){
        push.onSendPushId();
    }
}
push.onNotificationGCM = function(e){
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 ){
                console.log("Regid " + e.regid);
                push.onPushId(e.regid);
            }
        break;

        case 'message':

        break;

        case 'error':

        break;

        default:
            console.log('An unknown GCM event has occurred');
        break;
    }
}
push.onNotificationAPN = function(event){
    var pushNotification = window.plugins.pushNotification;
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(push.onPushSucess, push.onPushError, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
}

/////////////////////////
////// PUSH CODE ////////
/////////////////////////

window.Countly = Countly;
document.addEventListener("deviceready", Countly.deviceready, false);