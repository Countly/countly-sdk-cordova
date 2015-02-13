CountlyCordova = {};
CountlyCordova.serverUrl = "";
CountlyCordova.appKey = "";
CountlyCordova.ready = false;
CountlyCordova.CountlyMessagingMode = {"TEST":0,"PRODUCTION":1};
// countly initialization
CountlyCordova.init = function(serverUrl,appKey){
	CountlyCordova.serverUrl = serverUrl;
	CountlyCordova.appKey = appKey;
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","init",[serverUrl,appKey]);
}

// countly sending various types of events
CountlyCordova.sendEvent = function(options){
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
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","event",args);
}

// countly enable logger
CountlyCordova.setLoggingEnabled = function(boolean){
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","setloggingenabled",[]);
}

// countly sending user data
CountlyCordova.setUserData = function(options){
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

	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","setuserdata",args);
}

CountlyCordova.onRegistrationId = function(options){
	var args = [];
	args.push(options.registrationId || "");
	args.push(options.mode || 0);

	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","onregistrationid",args);
}
// countly start for android
CountlyCordova.start = function(){
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","start",[]);
}

// countly stop for android
CountlyCordova.stop = function(){
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","stop",[]);
}

// countly deviceready for testing purpose
CountlyCordova.deviceready = function(){
	CountlyCordova.ready = true;
	//testing
}

// countly dummy success and error event
CountlyCordova.onSuccess = function(result){
	//alert(result);
}
CountlyCordova.onError = function(error){
	// alert("error");
	// alert(error);
}
CountlyCordova.demo = function(){
	
}

/////////////////////////
////// PUSH CODE ////////
/////////////////////////

var push = {};
CountlyCordova.Push = push;
push.onRegisterPushNotification = function(){
    var pushNotification = window.plugins.pushNotification;
    if(!window.device){
    	console.error("dependency required org.apache.cordova.device to know android or ios device.");
    	return;
    }
    if (device.platform == 'android' || device.platform == 'Android') {
        pushNotification.register(push.onPushSucess, push.onPushError,{"senderID":"422665837619","ecb":"CountlyCordova.Push.onNotificationGCM"});
    }
    else{
        pushNotification.register(push.onPushSucess,push.onPushError,{"badge":"true","sound":"true","alert":"true","ecb":"CountlyCordova.Push.onNotificationAPN"});
    }
}
push.onPushSucess = function(result){
    push.onPushId(result)
}
push.onPushError = function(error){
}
push.onPushId = function(pushId){
    if(pushId == "OK" || pushId == "ok")
        return
    push.pushId = pushId;
    push.onSendPushId();
}

push.onSendPushId = function(){
    alert(push.pushId);
    var pushDevice = null;
    if (device.platform == 'android' || device.platform == 'Android') {
        pushDevice = "android";
    }
    else{
        pushDevice = "ios";
    }

    console.log(push.pushId +" push.pushId");
    if(push.pushId && Meteor.user()){
        //if(!Meteor.user().profile.pushId){
            var options = {"pushId":push.pushId,"pushDevice":pushDevice};
            Meteor.call("getPushId",options,function(){});
        //}
            
    }
    else{
        if(Meteor.user())
            push.onRegisterPushNotification();
    }
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

window.CountlyCordova = CountlyCordova;
document.addEventListener("deviceready", CountlyCordova.deviceready, false);