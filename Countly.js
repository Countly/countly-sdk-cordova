Countly = {};
Countly.serverUrl = "";
Countly.appKey = "";
Countly.ready = false;
Countly.version = "22.09.0";
Countly.isDebug = false;
_isInitialized = false;
if (window.cordova.platformId == "android") {
    Countly.isAndroid = true;
    Countly.messagingMode = { "TEST": "2", "PRODUCTION": "0" };
}
if (window.cordova.platformId == "ios") {
    Countly.isiOS = true;
    Countly.messagingMode = { "TEST": "1", "PRODUCTION": "0", "ADHOC": "2" };
}

// countly initialization
Countly.init = function (serverUrl, appKey, deviceId) {
    var args = [];
    Countly.serverUrl = serverUrl;
    Countly.appKey = appKey;
    args.push(serverUrl || "");
    args.push(appKey || "");
    if (deviceId) {
        args.push(deviceId || "");
    };

    _isInitialized = true;
    return new Promise((resolve, reject) => {
        cordova.exec(resolve, reject, "CountlyCordova", "init", args);
    });
}

Countly.isInitialized = function () {
    return new Promise((resolve, reject) => {
        cordova.exec(resolve, reject, "CountlyCordova", "isInitialized", []);
    });
}

/**
 * Record custom view to Countly.
 *
 * @param {string} recordView - name of the view
 * @param {Map} segments - allows to add optional segmentation,
 * Supported data type for segments values are String, int, double and bool
 */
Countly.recordView = function (recordView, segments) {
    if (!_isInitialized) {
        var msg = "'init' must be called before 'recordView'";
        log("recordView", msg, logLevel.ERROR);
        return msg;
    }
    var args = [];
    args.push(String(recordView) || "");
    if (!segments) {
        segments = {};
    }
    for (var key in segments) {
        args.push(key);
        args.push(segments[key]);
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "recordView", args);
};

/**
 * Set to true if you want to enable countly internal debugging logs
 * Should be call before Countly init
 */
Countly.setLoggingEnabled = function (isDebug = true) {
    isDebug = isDebug.toString() == "true" ? true : false;
    if (_isInitialized) {
        var msg = "'setLoggingEnabled' must be called before 'init'";
        log("setLoggingEnabled", msg, logLevel.ERROR);
        return msg;
    }
    Countly.isDebug = isDebug;
    var args = [isDebug.toString()];
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setLoggingEnabled", args);
}

// countly sending user data
Countly.setUserData = function (userData) {
    if (!_isInitialized) {
        var msg = "'init' must be called before 'setUserData'";
        log("setUserData", msg, logLevel.ERROR);
        return msg;
    }
    var message = null;
    if (!userData) {
        message = "User profile data should not be null or undefined";
        log("setUserData", message, logLevel.ERROR);
        return message;
    }
    if (typeof userData !== 'object') {
        message = "unsupported data type of user data '" + (typeof userData) + "'";
        log("setUserData", message, logLevel.WARNING);
        return message;
    }
    var args = [];
    for (var key in userData) {
        if (typeof userData[key] != "string" && key.toString() != "byear") {
            message = "skipping value for key '" + key.toString() + "', due to unsupported data type '" + (typeof userData[key]) + "', its data type should be 'string'";
            log("setUserData", message, logLevel.WARNING);
        }

    }

    if (userData.org && !userData.organization) {
        userData.organization = userData.org;
        delete userData.org;
    }

    if (userData.byear) {
        userData.byear = userData.byear.toString();
    }
    args.push(userData);

    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setuserdata", args);
}

// countly start for android
Countly.start = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'start'";
        log("start", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "start", []);
}

// countly stop for android
Countly.stop = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'stop'";
        log("stop", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "stop", []);
}
// countly halt for android
Countly.halt = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'halt'";
        log("halt", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "halt", []);
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
Countly.askForNotificationPermission = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'askForNotificationPermission'";
        log("askForNotificationPermission", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "askForNotificationPermission", []);
}

/**
 * 
 * Set callback to receive push notifications
 * @param {callback listner } callback 
 */
Countly.onNotification = function (callback) {
    cordova.exec(callback, callback, "CountlyCordova", "registerForNotification", []);
}

/**
 *
 * Set Push notification messaging mode
 * Should be call after Countly init
 */
Countly.pushTokenType = function (tokenType) {
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "pushTokenType", [tokenType]);
}

// countly deviceready for testing purpose
Countly.deviceready = function () {
    Countly.ready = true;
    //testing
}

// countly dummy success and error event
Countly.onSuccess = function (result) {
    if (Countly.isDebug) {
        console.log("Countly.onSuccess");
        console.log(result);
    }
}
Countly.onError = function (error) {
    if (Countly.isDebug) {
        console.log("Countly.onError");
        console.log(error);
    }
}

// 2017


Countly.setOptionalParametersForInitialization = function (options) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'setOptionalParametersForInitialization'";
        log("setOptionalParametersForInitialization", message, logLevel.ERROR);
        return message;
    }
    var args = [];

    options.latitude = String(options.latitude);
    options.longitude = String(options.longitude);
    if (options.latitude && !options.latitude.match('\\.')) {
        options.latitude += ".00";
    }
    if (options.longitude && !options.longitude.match('\\.')) {
        options.longitude += ".00";
    }

    args.push(options.city || "");
    args.push(options.country || "");
    args.push(options.latitude || "0.0");
    args.push(options.longitude || "0.0");
    args.push(String(options.ipAddress) || "0.0.0.0");

    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setOptionalParametersForInitialization", args);
}

/**
 * Set user initial location
 * Should be call before init
 * @param {ISO Country code for the user's country} countryCode 
 * @param {Name of the user's city} city 
 * @param {comma separate lat and lng values. For example, "56.42345,123.45325"} location 
 * @param {IP address of user's} ipAddress 
 * */

Countly.setLocationInit = function (countryCode, city, location, ipAddress) {
    if (_isInitialized) {
        var message = "'setLocationInit' must be called before 'init'";
        log("setLocationInit", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    args.push(countryCode || "null");
    args.push(city || "null");
    args.push(location || "null");
    args.push(ipAddress || "null");
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setLocationInit", args);
}

Countly.setLocation = function (latitude, longitude, countryCode, city, ipAddress) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'setLocation'";
        log("setLocation", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    var location = latitude + " , " + longitude;
    args.push(countryCode || "null");
    args.push(city || "null");
    args.push(location || "null");
    args.push(ipAddress || "null");
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setLocation", args);
}

/** 
 * 
 * Get currently used device Id.
 * Should be call after Countly init
 * */
Countly.getCurrentDeviceId = function (onSuccess, onError) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'getCurrentDeviceId'";
        log("getCurrentDeviceId", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "getCurrentDeviceId", []);
}

Countly.changeDeviceId = function (newDeviceID, onServer) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'changeDeviceId'";
        log("changeDeviceId", message, logLevel.ERROR);
        return message;
    }
    if (onServer === false) {
        onServer = "0";
    } else {
        onServer = "1";
    }
    newDeviceID = newDeviceID.toString() || "";
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "changeDeviceId", [newDeviceID, onServer]);
};

Countly.isCrashReportingEnabled = false;

/**
 * Enable crash reporting to report unhandled crashes to Countly
 * Should be call before Countly init
 */
Countly.enableCrashReporting = function () {
    if (_isInitialized) {
        var message = "'enableCrashReporting' should be called before 'init'";
        log("enableCrashReporting", message, logLevel.ERROR);
        return message;
    }
    Countly.isCrashReportingEnabled = true;
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "enableCrashReporting", []);
}
Countly.addCrashLog = function (crashLog) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'addCrashLog'";
        log("addCrashLog", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "addCrashLog", [crashLog || ""]);
};
Countly.logException = function (exception, nonfatal, segments) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'logException'";
        log("logException", message, logLevel.ERROR);
        return message;
    }
    var exceptionString = "";
    if (Array.isArray(exception)) {
        for (var i = 0, il = exception.length; i < il; i++) {
            if (typeof exception[i] === 'string') {
                exceptionString += exception[i] + "\n";
            } else {
                exceptionString += "columnNumber: " + exception[i].columnNumber + "\n";
                exceptionString += "fileName: " + exception[i].fileName + "\n";
                exceptionString += "functionName: " + exception[i].functionName + "\n";
                exceptionString += "lineNumber: " + exception[i].lineNumber + "\n";
            }
        }
    } else if (typeof exception === "string") {
        exceptionString = exception;
    }

    var args = [];
    args.push(exceptionString || "");
    args.push(nonfatal || false);
    for (var key in segments) {
        args.push(key);
        args.push(segments[key].toString());
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "logException", args);
};

/**
 *
 * Set the optional salt to be used for calculating the checksum of requested data which will be sent with each request, using the &checksum field
 * Should be call before Countly init
 */
Countly.enableParameterTamperingProtection = function (salt) {
    if (_isInitialized) {
        var message = "'enableParameterTamperingProtection' should be called before 'init'";
        log("enableParameterTamperingProtection", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "enableParameterTamperingProtection", [salt.toString() || ""]);
}

Countly.startEvent = function (key) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'startEvent'";
        log("startEvent", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "startEvent", [key.toString() || ""]);
}
Countly.cancelEvent = function (key) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'cancelEvent'";
        log("cancelEvent", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "cancelEvent", [key.toString() || ""]);
}
Countly.endEvent = function (options) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'endEvent'";
        log("endEvent", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    if (!options.key) {
        options.key = "default";
    }
    args.push(options.key.toString());

    if (!options.count) {
        options.count = 1;
    }
    args.push(options.count.toString());

    if (!options.sum) {
        options.sum = "0";
    }
    args.push(options.sum.toString());

    if (options.segments) {
        for (var key in options.segments) {
            args.push(key);
            args.push(options.segments[key]);
        }
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "endEvent", args);
};

Countly.recordEvent = function (options) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'recordEvent'";
        log("recordEvent", message, logLevel.ERROR);
        return message;
    }
    if (typeof options === "string")
        options = { key: options };
    var args = [];

    if (!options.key) {
        options.key = "default";
    }
    args.push(options.key.toString());

    if (!options.count) {
        options.count = 1;
    }
    args.push(options.count.toString());

    if (!options.sum) {
        options.sum = "0";
    }
    args.push(options.sum.toString());

    if (!options.duration) {
        options.duration = "0";
    }
    args.push(options.duration.toString());

    if (options.segments) {
        for (var key in options.segments) {
            args.push(key);
            args.push(options.segments[key]);
        }
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "recordEvent", args);
};

//askForNotificationPermission
Countly.askForNotificationPermission = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'askForNotificationPermission'";
        log("askForNotificationPermission", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "askForNotificationPermission", []);
}

/**
 * Common function to handle user data calls, print and return message if data is not valid.
 * It will return message if any issue found related to data validation else return null.
 * @param {String} callName : name of function from where value is validating.
 * @param {String} providedKey : name of user data key.
 * @param {String} providedValue : value against provided key
 * @param {String} expectedValueInfo : value from 1 to 3. 1 - no value, 2 - int value, 3 - other values
 * @returns 
 */
userDataHandleCall = async function (callName, providedKey, providedValue = null, expectedValueInfo = 1) {
    if (!_isInitialized) {
        var msg = "'init' must be called before '" + callName + "'";
        log(callName, msg, logLevel.ERROR);
        return msg;
    }
    try {
        log(callName, "trying to interact with user data properties [ " + providedKey + "]", logLevel.info);
        var valueArray = [];

        // First we try to validate the provided key value
        // Provided key should not be empty, null or undefined
        var message = null;
        if (!providedKey) {
            message = "Key should not be null, undefined or empty";
        }
        else if (typeof providedKey !== "string") {
            message = "skipping value for 'key', due to unsupported data type '" + (typeof providedKey) + "', its data type should be 'string'";
        }
        if (message) {
            log(callName, message, logLevel.ERROR);
            return message;
        }
        //provided key is acceptable, store it in the value array and check values
        valueArray.push(providedKey);

        // if info value is 1, we don't need any value and the validation can be skipped
        if (expectedValueInfo == 2 || expectedValueInfo == 3) {
            // if info value is 2 we expected a parsable string or number to produce an int
            // if info value is 3 we expect a non empty string

            // Provided value should not be null or undefined
            if (providedValue === null || providedValue === undefined) {
                message = "Value should not be null or undefined";
                log(callName, message, logLevel.ERROR);
                return message;
            }

            // cache the currently provided value
            var keyValue = providedValue;

            if (expectedValueInfo == 2) {
                // Provided value should be 'number' or 'string' that is parsable to 'number'
                if (typeof providedValue == "string") {
                    log(functionName, "unsupported data type '" + (typeof providedValue) + "', its data type should be 'number'", logLevel.WARNING);
                }
                else if (typeof providedValue != "number") {
                    message = "skipping value for 'value', due to unsupported data type '" + (typeof providedValue) + "', its data type should be 'number'";
                    log(callName, message, logLevel.ERROR);
                    return message;
                }

                var intValue = parseInt(providedValue);
                if (isNaN(intValue)) {
                    message = "skipping value for 'value', due to unsupported data type '" + (typeof providedValue) + "', its data type should be 'number' or parseable to 'integer'";
                    log(callName, message, logLevel.ERROR);
                    return message;
                }
                //replace the cached value with the newly parsed int
                keyValue = intValue.toString();
            }

            //add the validated key value value array together with the key
            valueArray.pushValue(keyValue);
        }
        cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "userData_" + callName, valueArray);
    }
    catch (e) {
        log("userDataHandleCall", e.message, logLevel.ERROR);
        return e.message;
    }

};

Countly.userData = {};
Countly.userData.setProperty = function (keyName, keyValue) {
    userDataHandleCall("setProperty", keyName, keyValue, 3);
};

Countly.userData.increment = function (keyName) {
    userDataHandleCall("increment", keyName);
};

Countly.userData.incrementBy = function (keyName, keyValue) {
    userDataHandleCall("incrementBy", keyName, keyValue, 2);
};

Countly.userData.multiply = function (keyName, keyValue) {
    userDataHandleCall("multiply", keyName, keyValue, 2);
};

Countly.userData.saveMax = function (keyName, keyValue) {
    userDataHandleCall("saveMax", keyName, keyValue, 2);
};

Countly.userData.saveMin = function (keyName, keyValue) {
    userDataHandleCall("saveMin", keyName, keyValue, 2);
};

Countly.userData.setOnce = function (keyName, keyValue) {
    userDataHandleCall("setOnce", keyName, keyValue, 3);
};

//pushUniqueValue
Countly.userData.pushUniqueValue = function (keyName, keyValue) {
    userDataHandleCall("pushUniqueValue", keyName, keyValue, 3);
};

//pushValue
Countly.userData.pushValue = function (keyName, keyValue) {
    userDataHandleCall("pushValue", keyName, keyValue, 3);
};

//pullValue
Countly.userData.pullValue = function (keyName, keyValue) {
    userDataHandleCall("pullValue", keyName, keyValue, 3);
};

Countly.consents = ["sessions", "events", "views", "location", "crashes", "attribution", "users", "push", "star-rating", "AppleWatch"];

/**
 *
 * Set that consent should be required for features to work.
 * Should be call before Countly init
 */
Countly.setRequiresConsent = function (boolean) {
    if (_isInitialized) {
        var message = "'setRequiresConsent' must be called before 'init'";
        log("setRequiresConsent", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setRequiresConsent", [boolean == true ? "1" : "0"]);
}

/**
 * 
 * Give consent for specific features before init.
 * Should be call before Countly init
 */
Countly.giveConsentInit = async function (consent) {
    if (_isInitialized) {
        var message = "'giveConsentInit' must be called before 'init'";
        log("giveConsentInit", message, logLevel.ERROR);
        return message;
    }
    var features = [];
    if (typeof consent == "string") {
        features.push(consent);
    }
    else if (Array.isArray(consent)) {
        features = consent;
    }
    else {
        if (Countly.isDebug) {
            console.warn("[CountlyCordova] giveConsentInit, unsupported data type '" + (typeof consent) + "'");
        }
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "giveConsentInit", features);
}

Countly.giveConsent = function (consent) {
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "giveConsent", consent);
}
Countly.removeConsent = function (consent) {
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "removeConsent", consent);
}
/**
 * 
 * Give consent for all features
 * Should be call after Countly init
 */
Countly.giveAllConsent = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'giveAllConsent'";
        log("giveAllConsent", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "giveAllConsent", []);
}
Countly.removeAllConsent = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'removeAllConsent'";
        log("removeAllConsent", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "removeConsent", Countly.consents);
}

/** 
 * 
 * Set Automatic value download happens when the SDK is initiated or when the device ID is changed.
 * Should be call before Countly init
 */
Countly.setRemoteConfigAutomaticDownload = function (onSuccess, onError) {
    if (_isInitialized) {
        var message = "'setRemoteConfigAutomaticDownload' must be called before 'init'";
        log("setRemoteConfigAutomaticDownload", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "setRemoteConfigAutomaticDownload", []);
}
Countly.remoteConfigUpdate = function (onSuccess, onError) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'remoteConfigUpdate'";
        log("remoteConfigUpdate", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "remoteConfigUpdate", []);
}
Countly.updateRemoteConfigForKeysOnly = function (keys, onSuccess, onError) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'updateRemoteConfigForKeysOnly'";
        log("updateRemoteConfigForKeysOnly", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "updateRemoteConfigForKeysOnly", keys);
}
Countly.updateRemoteConfigExceptKeys = function (keys, onSuccess, onError) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'updateRemoteConfigExceptKeys'";
        log("updateRemoteConfigExceptKeys", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "updateRemoteConfigExceptKeys", keys);
}
Countly.remoteConfigClearValues = function (onSuccess, onError) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'remoteConfigClearValues'";
        log("remoteConfigClearValues", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "remoteConfigClearValues", []);
}
Countly.getRemoteConfigValueForKey = function (key, onSuccess, onError) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'getRemoteConfigValueForKey'";
        log("getRemoteConfigValueForKey", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(onSuccess, onError, "CountlyCordova", "getRemoteConfigValueForKey", [key]);
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

/**
 * Set's the text's for the different fields in the star rating dialog. Set value null if for some field you want to keep the old value
 * 
 * @param {String} starRatingTextTitle - dialog's title text (Only for Android)
 * @param {String} starRatingTextMessage - dialog's message text 
 * @param {String} starRatingTextDismiss - dialog's dismiss buttons text (Only for Android)
 */
Countly.setStarRatingDialogTexts = function (starRatingTextTitle, starRatingTextMessage, starRatingTextDismiss) {
    if (_isInitialized) {
        var message = "'setStarRatingDialogTexts' must be called before 'init'";
        log("setStarRatingDialogTexts", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    args.push(starRatingTextTitle);
    args.push(starRatingTextMessage);
    args.push(starRatingTextDismiss);
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setStarRatingDialogTexts", args);
}
// ui related methods
// opens the modal
Countly.askForStarRating = function (callback) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'askForStarRating'";
        log("askForStarRating", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(callback, callback, "CountlyCordova", "askForStarRating", []);
}

Countly.askForFeedback = function (widgetId, buttonText) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'askForFeedback'";
        log("askForFeedback", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "askForFeedback", [widgetId, buttonText || ""]);
}

// Call this function when app is loaded, so that the app launch duration can be recorded.
// Should be call after init.
Countly.appLoadingFinished = async function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'appLoadingFinished'";
        log("appLoadingFinished", message, logLevel.ERROR);
        return message;
    }
    Countly.isInitialized().then((result) => {
        if (result != "true") {
            if (Countly.isDebug) {
                console.warn('[CountlyCordova] appLoadingFinished, init must be called before appLoadingFinished');
            }
            return;
        }
    }, (err) => {
        console.error(err);
    });
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "appLoadingFinished", []);
}

/**
 * Get a list of available feedback widgets for this device ID
 */
Countly.getFeedbackWidgets = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'getFeedbackWidgets'";
        log("getFeedbackWidgets", message, logLevel.ERROR);
        return message;
    }
    return new Promise((resolve, reject) => {
        cordova.exec(resolve, reject, "CountlyCordova", "getFeedbackWidgets", []);
    });
}

/**
 * Present a chosen feedback widget
 * 
 * @param {Object} feedbackWidget - feeback Widget with id, type and name
 * @param {String} closeButtonText - text for cancel/close button
 */
Countly.presentFeedbackWidget = function (feedbackWidget, buttonText) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'presentFeedbackWidget'";
        log("presentFeedbackWidget", message, logLevel.ERROR);
        return message;
    }
    if (!feedbackWidget) {
        if (Countly.isDebug) {
            console.error("[CountlyCordova] presentFeedbackWidget, feedbackWidget should not be null or undefined");
        }
        return "feedbackWidget should not be null or undefined";
    }
    if (!feedbackWidget.id) {
        if (Countly.isDebug) {
            console.error("[CountlyCordova] presentFeedbackWidget, feedbackWidget id should not be null or empty");
        }
        return "FeedbackWidget id should not be null or empty";
    }
    if (!feedbackWidget.type) {
        if (Countly.isDebug) {
            console.error("[CountlyCordova] presentFeedbackWidget, feedbackWidget type should not be null or empty");
        }
        return "FeedbackWidget type should not be null or empty";
    }
    var widgetId = feedbackWidget.id;
    var widgetType = feedbackWidget.type;
    var widgetName = feedbackWidget.name || "";
    buttonText = buttonText || "";
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "presentFeedbackWidget", [widgetId, widgetType, widgetName, buttonText]);
}

/**
 * Replaces all requests with a different app key with the current app key.
 * In request queue, if there are any request whose app key is different than the current app key,
 * these requests' app key will be replaced with the current app key.
 */
Countly.replaceAllAppKeysInQueueWithCurrentAppKey = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'replaceAllAppKeysInQueueWithCurrentAppKey'";
        log("replaceAllAppKeysInQueueWithCurrentAppKey", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "replaceAllAppKeysInQueueWithCurrentAppKey", []);
}

/**
 * Removes all requests with a different app key in request queue.
 * In request queue, if there are any request whose app key is different than the current app key,
 * these requests will be removed from request queue.
 */
Countly.removeDifferentAppKeysFromQueue = function () {
    if (!_isInitialized) {
        var message = "'init' must be called before 'removeDifferentAppKeysFromQueue'";
        log("removeDifferentAppKeysFromQueue", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "removeDifferentAppKeysFromQueue", []);
}

// Push Notification
Countly.sendPushToken = function (options) {
    var args = [];
    args.push(options.token || "");
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "sendPushToken", args);
}
// Push Notification

/**
 *
 * Set to "true" if you want HTTP POST to be used for all requests
 * Should be call before Countly init
 */
Countly.setHttpPostForced = function (boolean) {
    if (_isInitialized) {
        var message = "'setHttpPostForced' must be called before 'init'";
        log("setHttpPostForced", message, logLevel.ERROR);
        return message;
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "setHttpPostForced", [boolean == true ? "1" : "0"]);
}

/**
 *
 * Enable campaign attribution reporting to Countly.
 * For iOS use "recordAttributionID" instead of "enableAttribution"
 * Should be call before Countly init
 */
Countly.enableAttribution = function (attributionID = "") {
    if (_isInitialized) {
        var message = "'enableAttribution' must be called before 'init'";
        log("enableAttribution", message, logLevel.ERROR);
        return message;
    }
    if (Countly.isiOS) {
        if (attributionID == "") {
            if (Countly.isDebug) {
                console.error("[CountlyReactNative] enableAttribution, attribution Id for iOS can't be empty string");
            }
            return "attribution Id for iOS can't be empty string";
        }
        Countly.recordAttributionID(attributionID);
    }
    else {
        cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "enableAttribution", []);
    }
}

/**
 * 
 * set attribution Id for campaign attribution reporting.
 * Currently implemented for iOS only
 * For Android just call the enableAttribution to enable campaign attribution.
 */
Countly.recordAttributionID = function (attributionID) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'recordAttributionID'";
        log("recordAttributionID", message, logLevel.ERROR);
        return message;
    }
    if (!Countly.isiOS) return "recordAttributionID : To be implemented";
    var args = [];
    args.push(attributionID);
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "recordAttributionID", args);
}

Countly.startTrace = function (traceKey) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'startTrace'";
        log("startTrace", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    args.push(traceKey);
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "startTrace", args);
}

Countly.cancelTrace = function (traceKey) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'cancelTrace'";
        log("cancelTrace", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    args.push(traceKey);
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "cancelTrace", args);
}

Countly.clearAllTraces = function (traceKey) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'clearAllTraces'";
        log("clearAllTraces", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "clearAllTraces", args);
}

Countly.endTrace = function (traceKey, customMetric) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'endTrace'";
        log("endTrace", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    args.push(traceKey);
    customMetric = customMetric || {};
    for (var key in customMetric) {
        args.push(key.toString());
        args.push(customMetric[key].toString());
    }
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "endTrace", args);
}

Countly.recordNetworkTrace = function (networkTraceKey, responseCode, requestPayloadSize, responsePayloadSize, startTime, endTime) {
    if (!_isInitialized) {
        var message = "'init' must be called before 'recordNetworkTrace'";
        log("recordNetworkTrace", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    args.push(networkTraceKey);
    args.push(responseCode.toString());
    args.push(requestPayloadSize.toString());
    args.push(responsePayloadSize.toString());
    args.push(startTime.toString());
    args.push(endTime.toString());
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "recordNetworkTrace", args);
}

/**
 *
 * Enable APM features, which includes the recording of app start time.
 * Should be call before Countly init
 */
Countly.enableApm = function () {
    if (_isInitialized) {
        var message = "'enableApm' must be called before 'init'";
        log("enableApm", message, logLevel.ERROR);
        return message;
    }
    var args = [];
    cordova.exec(Countly.onSuccess, Countly.onError, "CountlyCordova", "enableApm", args);
}

window.Countly = Countly;
document.addEventListener("deviceready", Countly.deviceready, false);

logLevel = { "VERBOSE": "1", "DEBUG": "2", "INFO": "3", "WARNING": "4", "ERROR": "5" };
/**
 * Print log if logging is enabled
 * @param {String} functionName : name of function from where value is validating.
 * @param {String} message : log message
 * @param {String} logLevel : log level (INFO, DEBUG, VERBOSE, WARNING, ERROR)
 */
log = (functionName, message, logLevel = logLevel.DEBUG) => {
    if (Countly.isDebug) {
        var logMessage = "[CountlyCordova] " + functionName + ", " + message;
        switch (logLevel) {
            case logLevel.VERBOSE:
                console.log(logMessage);
                break;
            case logLevel.DEBUG:
                console.debug(logMessage);
                break;
            case logLevel.INFO:
                console.info(logMessage);
                break;
            case logLevel.WARNING:
                console.warn(logMessage);
                break;
            case logLevel.ERROR:
                console.error(logMessage);
                break;
            default:
                console.log(logMessage);
        }
    }
};

