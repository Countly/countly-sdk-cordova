CountlyCordova = {};
CountlyCordova.serverUrl = "";
CountlyCordova.appKey = "";
CountlyCordova.ready = false;
document.addEventlistener("deviceready",CountlyCordova.deviceready,false);
CountlyCordova.init = function(serverUrl,appKey){
	CountlyCordova.serverUrl = serverUrl;
	CountlyCordova.appKey = appKey;
	cordova.exec(CountlyCordova.onSuccess,CountlyCordova.onError,"CountlyCordova","init",[serverUrl,appKey]);
}

CountlyCordova.deviceready = function(){
	CountlyCordova.ready = true;
	//testing
	
}

CountlyCordova.onSuccess = function(result){
	alert("success");
	alert(result);
}
CountlyCordova.onError = function(error){
	alert("error");
	alert(error);
}
CountlyCordova.demo = function(){

}