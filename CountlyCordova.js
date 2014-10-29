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
	args.push(options.eventName);
	args.push(options.eventCount);
	if(options.eventSum)
		args.push(options.eventSum);
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","event",args);
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
document.addEventListener("deviceready", CountlyCordova.deviceready, false);
