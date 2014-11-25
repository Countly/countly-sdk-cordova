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
	if(options.eventName)
		args.push(options.eventName.toString());
	if(options.eventCount)
		args.push(options.eventCount.toString());
	if(options.eventSum)
		args.push(options.eventSum.toString());
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","event",args);
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
window.CountlyCordova;
document.addEventListener("deviceready", CountlyCordova.deviceready, false);
