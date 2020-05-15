Countly = {};
Countly.serverUrl = "";
Countly.appKey = "";
Countly.ready = false;
Countly.version = "20.04";
Countly.isDebug = false;
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (/android/i.test(userAgent)) {
    Countly.isAndroid = true;
    Countly.messagingMode = {"TEST": "2", "PRODUCTION": "0"};
}
if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    Countly.isiOS = true;
    Countly.messagingMode = {"TEST": "1", "PRODUCTION": "0", "ADHOC": "2"};
}

// countly initialization
Countly.init = function(serverUrl,appKey, deviceId){
    var args = [];
    Countly.serverUrl = serverUrl;
    Countly.appKey = appKey;
    args.push(serverUrl || "");
    args.push(appKey || "");
    if(deviceId){
        args.push(deviceId || "");
    };
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","init",args);
}

Countly.recordView = function(recordView){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","recordView",[recordView || ""]);
};

// countly enable logger
Countly.setLoggingEnabled = function(isDebug){
    Countly.isDebug = isDebug;
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setloggingenabled",[]);
}

// countly sending user data
Countly.setUserData = function(options){
    var args = [];
    args.push(options.name || "");
    args.push(options.username || "");
    args.push(options.email || "");
    args.push(options.organization || "");
    args.push(options.phone || "");
    args.push(options.picture || "");
    args.push(options.picturePath || "");
    args.push(options.gender || "");
    args.push(options.byear || 0);

    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setuserdata",args);
}

// countly start for android
Countly.start = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","start",[]);
}

// countly stop for android
Countly.stop = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","stop",[]);
}
// countly halt for android
Countly.halt = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","halt",[]);
}

// countly manualSessionHandling for android
// Countly.manualSessionHandling = function(){
//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","manualSessionHandling",[]);
// }

// countly updateSessionPeriod for android
// Countly.updateSessionPeriod = function(updateSessionPeriod){

//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","updateSessionPeriod",[updateSessionPeriod.toString()]);
// }

// countly eventSendThreshold for android
// Countly.eventSendThreshold = function(eventSendThreshold){
//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","eventSendThreshold",[eventSendThreshold.toString()]);
// }

// countly storedRequestsLimit for android
// Countly.storedRequestsLimit = function(storedRequestsLimit){
//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","storedRequestsLimit",[storedRequestsLimit]);
// }

// countly askForNotificationPermission for android
Countly.askForNotificationPermission = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","askForNotificationPermission",[]);
}
Countly.pushTokenType = function(tokenType){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","pushTokenType",[tokenType]);
}

// countly deviceready for testing purpose
Countly.deviceready = function(){
    Countly.ready = true;
    //testing
}

// countly dummy success and error event
Countly.onSuccess = function(result){
    if(Countly.isDebug){
        console.log("Countly.onSuccess");
        console.log(result);
    }
}
Countly.onError = function(error){
    if(Countly.isDebug){
        console.log("Countly.onError");
        console.log(error);
    }
}

// 2017


Countly.setOptionalParametersForInitialization = function(options){

    var args = [];

    options.latitude = String(options.latitude);
    options.longitude = String(options.longitude);
    if(options.latitude && !options.latitude.match('\\.')){
        options.latitude +=  ".00";
    }
    if(options.longitude && !options.longitude.match('\\.')){
        options.longitude +=  ".00";
    }

    args.push(options.city || "");
    args.push(options.country || "");
    args.push(options.latitude || "0.0");
    args.push(options.longitude || "0.0");
    args.push(String(options.ipAddress) || "0.0.0.0");

    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setOptionalParametersForInitialization",args);
}
Countly.setLocation = function(latitude, longitude){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setLocation",[latitude, longitude]);
}
Countly.changeDeviceId = function(newDeviceID, onServer){
    if(onServer === false){
        onServer = "0";
    }else{
        onServer = "1";
    }
    newDeviceID = newDeviceID.toString() || "";
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","changeDeviceId",[newDeviceID, onServer]);
};

Countly.isCrashReportingEnabled = false;
Countly.enableCrashReporting = function(){
    Countly.isCrashReportingEnabled = true;
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableCrashReporting",[]);
}
Countly.addCrashLog = function(crashLog){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","addCrashLog",[crashLog || ""]);
};
Countly.logException = function(exception, nonfatal, segments){
    var exceptionString = "";
    if (Array.isArray(exception)) {
        for(var i=0, il=exception.length; i<il; i++){
            if (typeof exception[i] === 'string') {
                exceptionString += exception[i] + "\n";
            } else {
                exceptionString += "columnNumber: " +exception[i].columnNumber + "\n";
                exceptionString += "fileName: " +exception[i].fileName + "\n";
                exceptionString += "functionName: " +exception[i].functionName + "\n";
                exceptionString += "lineNumber: " +exception[i].lineNumber + "\n";
            }
        }
    } else if (typeof exception === "string") {
        exceptionString = exception;
    }

    var args = [];
    args.push(exceptionString || "");
    args.push(nonfatal || false);
    for(var key in segments){
        args.push(key);
        args.push(segments[key].toString());
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","logException",args);
};

Countly.enableParameterTamperingProtection = function(salt){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableParameterTamperingProtection",[salt.toString() || ""]);
}

Countly.startEvent = function(key){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","startEvent",[key.toString() || ""]);
}
Countly.cancelEvent = function(key){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","cancelEvent",[key.toString() || ""]);
}
Countly.endEvent = function(options){
    var args = [];
    if(!options.key){
        options.key = "default";
    }
    args.push(options.key.toString());

    if(!options.count){
        options.count = 1;
    }
    args.push(options.count.toString());

    if(!options.sum){
        options.sum = "0";
    }
    args.push(options.sum.toString());

    if(options.segments){
        for(var key in options.segments){
            args.push(key);
            args.push(options.segments[key]);
        }
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","endEvent",args);
};

Countly.recordEvent = function(options){
    if(typeof options === "string")
        options = {key: options};
    var args = [];

    if(!options.key){
        options.key = "default";
    }
    args.push(options.key.toString());

    if(!options.count){
        options.count = 1;
    }
    args.push(options.count.toString());

    if(!options.sum){
        options.sum = "0";
    }
    args.push(options.sum.toString());

    if(!options.duration){
        options.duration = "0";
    }
    args.push(options.duration.toString());

    if(options.segments){
        for(var key in options.segments){
            args.push(key);
            args.push(options.segments[key]);
        }
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","recordEvent",args);
};

//askForNotificationPermission
Countly.askForNotificationPermission = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","askForNotificationPermission",[]);
}

Countly.userData = {};
Countly.userData.setProperty = function(keyName, keyValue){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_setProperty",[keyName.toString() || "", keyValue.toString() || ""]);
};
Countly.userData.increment = function(keyName){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_increment",[keyName.toString() || ""]);
};
Countly.userData.incrementBy = function(keyName, keyIncrement){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_incrementBy",[keyName.toString() || "", keyIncrement.toString() || ""]);
};
Countly.userData.multiply = function(keyName, multiplyValue){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_multiply",[keyName.toString() || "", multiplyValue.toString() || ""]);
};
Countly.userData.saveMax = function(keyName, saveMax){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_saveMax",[keyName.toString() || "", saveMax.toString() || ""]);
};
Countly.userData.saveMin = function(keyName, saveMin){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_saveMin",[keyName.toString() || "", saveMin.toString() || ""]);
};
Countly.userData.setOnce = function(keyName, setOnce){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_setOnce",[keyName.toString() || "", setOnce.toString() || ""]);
};

//pushUniqueValue
Countly.userData.pushUniqueValue = function(key, value){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_pushUniqueValue",[key.toString() || "", value.toString() || ""]);
};

//pushValue
Countly.userData.pushValue = function(type, pushValue){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_pushValue",[type.toString() || "", pushValue.toString() || ""]);
};

//pullValue
Countly.userData.pullValue = function(type, pullValue){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_pullValue",[type.toString() || "", pullValue.toString() || ""]);
};

//setRequiresConsent
Countly.consents = ["sessions", "events", "views", "location", "crashes", "attribution", "users", "push", "star-rating","AppleWatch"];
Countly.setRequiresConsent = function(boolean){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setRequiresConsent",[boolean == true?"1": "0"]);
}
Countly.giveConsent = function(consent){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveConsent",consent);
}
Countly.removeConsent = function(consent){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","removeConsent",consent);
}
Countly.giveAllConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveConsent",Countly.consents);
}
Countly.removeAllConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","removeConsent",Countly.consents);
}

// Remote config
Countly.setRemoteConfigAutomaticDownload = function(onSuccess, onError){
    cordova.exec(onSuccess, onError,"CountlyCordova","setRemoteConfigAutomaticDownload",[]);
}
Countly.remoteConfigUpdate = function(onSuccess, onError){
    cordova.exec(onSuccess, onError,"CountlyCordova","remoteConfigUpdate",[]);
}
Countly.updateRemoteConfigForKeysOnly = function(keys, onSuccess, onError){
    cordova.exec(onSuccess, onError,"CountlyCordova","updateRemoteConfigForKeysOnly",keys);
}
Countly.updateRemoteConfigExceptKeys = function(keys, onSuccess, onError){
    cordova.exec(onSuccess, onError,"CountlyCordova","updateRemoteConfigExceptKeys",keys);
}
Countly.remoteConfigClearValues = function(onSuccess, onError){
    cordova.exec(onSuccess, onError,"CountlyCordova","remoteConfigClearValues",[]);
}
Countly.getRemoteConfigValueForKey = function(key, onSuccess, onError){
    cordova.exec(onSuccess, onError,"CountlyCordova","getRemoteConfigValueForKey",[key]);
}
// Remote config

// Rating
// config
Countly.rating = {
    starRatingMessage: "How would you rate the app?",
    starRatingDismissButtonTitle: "Dismiss",
    starRatingSubmitButtonTitle: "Submit",
}
// orginal method
// Countly.sendRating = function(rating){
//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","sendRating",[rating.toString()]);
// }

// ui related methods
// opens the modal
Countly.askForStarRating = function(callback){
    cordova.exec(callback, callback,"CountlyCordova","askForStarRating",[]);
}

Countly.askForFeedback = function(widgetId, buttonText){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","askForFeedback",[widgetId, buttonText || ""]);
}
// FEEDBACK-WORK

// Push Notification
Countly.sendPushToken = function(options){
    var args = [];
    args.push(options.token || "");
    args.push(options.messagingMode.toString() || Countly.messagingMode.PRODUCTION.toString());
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","sendPushToken",args);
}
// Push Notification

//setHttpPostForced
Countly.setHttpPostForced = function(boolean){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setHttpPostForced",[boolean == true?"1": "0"]);
}

window.Countly = Countly;
document.addEventListener("deviceready", Countly.deviceready, false);
