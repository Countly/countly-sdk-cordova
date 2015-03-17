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
    Countly.Push.onRegisterPushNotification();
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
    args.push(options.mode.toString() || "0");
    // alert(args.toString())
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