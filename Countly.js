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

    return new Promise((resolve,reject) => {
        cordova.exec(resolve,reject,"CountlyCordova","init",args);
    });
}

Countly.isInitialized = function(){
    return new Promise((resolve,reject) => {
        cordova.exec(resolve,reject,"CountlyCordova","isInitialized",[]);
    });
}

/**
 * Record custom view to Countly.
 *
 * @param {string} recordView - name of the view
 * @param {Map} segments - allows to add optional segmentation,
 * Supported data type for segments values are String, int, double and bool
 */
Countly.recordView = function(recordView, segments){
    var args = [];
    args.push(String(recordView) || "");
    if(!segments){
        segments = {};
    }
    for(var key in segments){
        args.push(key);
        args.push(segments[key]);
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","recordView",args);
};

/**
 * Set to true if you want to enable countly internal debugging logs
 * Should be call before Countly init
 */
Countly.setLoggingEnabled = function(isDebug){
    Countly.isDebug = isDebug;
    var args = [isDebug?"true": "false"];
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setLoggingEnabled",args);
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

/**
 *
 * Events get grouped together and are sent either every minute or after the unsent event count reaches a threshold. By default it is 10
 * Should be call before Countly init
 */
// countly eventSendThreshold for android
// Countly.eventSendThreshold = function(eventSendThreshold){
//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","eventSendThreshold",[eventSendThreshold.toString()]);
// }

// countly storedRequestsLimit for android
// Countly.storedRequestsLimit = function(storedRequestsLimit){
//     cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","storedRequestsLimit",[storedRequestsLimit]);
// }

/**
 * 
 * This method will ask for permission, enables push notification and send push token to countly server.
 * Should be call after Countly init
 */
Countly.askForNotificationPermission = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","askForNotificationPermission",[]);
}

/**
 * 
 * Set callback to receive push notifications
 * @param {callback listner } callback 
 */
Countly.onNotification = function(callback){
    cordova.exec(callback,callback,"CountlyCordova","registerForNotification",[]);
}

/**
 *
 * Set Push notification messaging mode
 * Should be call before Countly init
 */
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

/**
 * Set user initial location
 * Should be call before init
 * @param {ISO Country code for the user's country} countryCode 
 * @param {Name of the user's city} city 
 * @param {comma separate lat and lng values. For example, "56.42345,123.45325"} location 
 * @param {IP address of user's} ipAddress 
 * */

Countly.setLocationInit = function(countryCode, city, location, ipAddress){
    var args = [];
    args.push(countryCode || "null");
    args.push(city || "null");
    args.push(location || "null");
    args.push(ipAddress || "null");
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setLocationInit",args);
}

Countly.setLocation = function(latitude, longitude, countryCode, city, ipAddress){
    var args = [];
    var location  = latitude + " , " + longitude;
    args.push(countryCode || "null");
    args.push(city || "null");
    args.push(location || "null");
    args.push(ipAddress || "null");
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setLocation",args);
}

/** 
 * 
 * Get currently used device Id.
 * Should be call after Countly init
 * */
Countly.getCurrentDeviceId = function(onSuccess, onError){
    Countly.isInitialized().then((result) => {
        if(result  != "true") {
            if(Countly.isDebug){
                console.warn("'getCurrentDeviceId, init must be called before getCurrentDeviceId'");
            }
            return;
        }
    },(err) => {
        console.error(err);
    });
    cordova.exec(onSuccess, onError,"CountlyCordova","getCurrentDeviceId",[]);
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

/**
 * Enable crash reporting to report unhandled crashes to Countly
 * Should be call before Countly init
 */
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

/**
 *
 * Set the optional salt to be used for calculating the checksum of requested data which will be sent with each request, using the &checksum field
 * Should be call before Countly init
 */
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

Countly.consents = ["sessions", "events", "views", "location", "crashes", "attribution", "users", "push", "star-rating","AppleWatch"];

/**
 *
 * Set that consent should be required for features to work.
 * Should be call before Countly init
 */
Countly.setRequiresConsent = function(boolean){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setRequiresConsent",[boolean == true?"1": "0"]);
}

/**
 * 
 * Give consent for specific features before init.
 * Should be call after Countly init
 */
Countly.giveConsentInit = async function(consent){
    var features = [];
    if (typeof consent == "string") {
        features.push(consent);
    }
    else if(Array.isArray(consent)) {
        features = consent;
    }
    else {
        if(Countly.isDebug) {
            console.warn("[CountlyCordova] giveConsentInit, unsupported data type '" + (typeof consent) + "'");
        }
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveConsentInit",features);
}

Countly.giveConsent = function(consent){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveConsent",consent);
}
Countly.removeConsent = function(consent){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","removeConsent",consent);
}
/**
 * 
 * Give consent for all features
 * Should be call after Countly init
 */
Countly.giveAllConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveAllConsent",[]);
}
Countly.removeAllConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","removeConsent",Countly.consents);
}

/** 
 * 
 * Set Automatic value download happens when the SDK is initiated or when the device ID is changed.
 * Should be call before Countly init
 */
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
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","sendPushToken",args);
}
// Push Notification

/**
 *
 * Set to "true" if you want HTTP POST to be used for all requests
 * Should be call before Countly init
 */
Countly.setHttpPostForced = function(boolean){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setHttpPostForced",[boolean == true?"1": "0"]);
}

/**
 *
 * Enable campaign attribution reporting to Countly.
 * Should be call before Countly init
 */
Countly.enableAttribution = function() {
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableAttribution",[]);
}

Countly.startTrace = function(traceKey){
    var args = [];
    args.push(traceKey);
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","startTrace",args);
}

Countly.cancelTrace = function(traceKey){
    var args = [];
    args.push(traceKey);
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","cancelTrace",args);
}

Countly.clearAllTraces = function(traceKey){
    var args = [];
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","clearAllTraces",args);
}

Countly.endTrace = function(traceKey, customMetric){
    var args = [];
    args.push(traceKey);
    customMetric = customMetric || {};
    for(var key in customMetric){
        args.push(key.toString());
        args.push(customMetric[key].toString());
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","endTrace",args);
}

Countly.recordNetworkTrace = function(networkTraceKey, responseCode, requestPayloadSize, responsePayloadSize, startTime, endTime){
    var args = [];
    args.push(networkTraceKey);
    args.push(responseCode.toString());
    args.push(requestPayloadSize.toString());
    args.push(responsePayloadSize.toString());
    args.push(startTime.toString());
    args.push(endTime.toString());
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","recordNetworkTrace",args);
}

/**
 *
 * Enable APM features, which includes the recording of app start time.
 * Should be call before Countly init
 */
Countly.enableApm = function(){
    var args = [];
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableApm",args);
}

window.Countly = Countly;
document.addEventListener("deviceready", Countly.deviceready, false);
