CountlyCordova = {};
CountlyCordova.serverUrl = "";
CountlyCordova.appKey = "";
CountlyCordova.ready = false;
CountlyCordova.init = function(serverUrl,appKey){
	CountlyCordova.serverUrl = serverUrl;
	CountlyCordova.appKey = appKey;
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","init",[serverUrl,appKey]);
}
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
CountlyCordova.setLoggingEnabled = function(boolean){
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","setloggingenabled",[]);
}
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
CountlyCordova.start = function(){
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","start",[]);
}
CountlyCordova.stop = function(){
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","stop",[]);
}
CountlyCordova.deviceready = function(){
	CountlyCordova.ready = true;
	//testing
}

CountlyCordova.onSuccess = function(result){
	//alert(result);
}
CountlyCordova.onError = function(error){
	// alert("error");
	// alert(error);
}
CountlyCordova.demo = function(){
	
}
window.CountlyCordova = CountlyCordova;
document.addEventListener("deviceready", CountlyCordova.deviceready, false);