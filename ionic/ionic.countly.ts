declare var cordova: any;
declare var window: any;

var Countly_isReady = false;

export class Countly {

    serverUrl: string;
    appKey: string;
    messagingMode: any;
    version: "19.02.0";
    isAndroid: Boolean;
    isiOS: Boolean;
    ROOT_URL: string;

init(serverUrl: string, appKey: string, deviceId: string) {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    this.messagingMode = {};
    if(/android/i.test(userAgent)) {
        this.isAndroid = true;
        this.messagingMode = { "DEVELOPMENT": 2, "PRODUCTION": 0 };
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        this.isiOS = true;
        this.messagingMode = { "DEVELOPMENT": 1, "PRODUCTION": 0, "ADHOC": 2 };
    }
    const args = [];
    this.serverUrl = serverUrl;
    this.appKey = appKey;

    args.push(serverUrl || "");
    args.push(appKey || "");
    if (deviceId) {
        args.push(deviceId || "");
    }
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "init", args);
    if(serverUrl.lastIndexOf('/') === serverUrl.length -1){
        this.ROOT_URL = serverUrl.substring(0, serverUrl.lastIndexOf("/"));
    }else{
        this.ROOT_URL = serverUrl;
    }
}

sendEvent(options: any) {
    let args = [];
    let eventType = "event"; //event, eventWithSum, eventWithSegment, eventWithSumSegment
    let segments = {};

    if (options.eventSum)
        eventType = "eventWithSum";
    if (options.segments)
        eventType = "eventWithSegment";
    if (options.segments && options.eventSum)
        eventType = "eventWithSumSegment";

    args.push(eventType);

    if(options.eventName)
        args.push(options.eventName.toString());
    if(options.eventCount){
        args.push(options.eventCount.toString());
    }else{
        args.push("1");
    }
    if(options.eventSum){
        args.push(options.eventSum.toString());
    }

    if(options.segments){
        segments = options.segments;
    }
    for (var event in segments) {
        args.push(event);
        args.push(segments[event]);
    }
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "event", args);
}

recordView(recordView: any) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "recordView", [recordView || ""]);
}

// countly enable logger
setLoggingEnabled() {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "setloggingenabled", []);
}

// countly sending user data
setUserData(options: any) {
    let args = [];
    args.push(options.name || "");
    args.push(options.username || "");
    args.push(options.email || "");
    args.push(options.org || "");
    args.push(options.phone || "");
    args.push(options.picture || "");
    args.push(options.picturePath || "");
    args.push(options.gender || "");
    args.push(options.byear || 0);

    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "setuserdata", args);
}
getDeviceID(successCallback: any, failureCallback: any){
    cordova.exec(successCallback, failureCallback, "CountlyCordova", "getDeviceID", []);
}
// Depricated method.
// sendPushToken(options: any, successCallback: any, failureCallback: any){
//     let self:any = this;
//     successCallback = successCallback || this.onSuccess;
//     failureCallback = failureCallback || this.onError;
//     if(!self.appKey){
//         return failureCallback('Countly sdk is not initialized.')
//     }
//     self.getDeviceID(function(deviceId){
//         var data = {
//             device_id: deviceId,
//             app_key: self.appKey,
//             token_session: 1,
//             test_mode: options.messagingMode,
//             android_token: options.token,
//             ios_token: options.token
//         };
//         if (self.isAndroid) {
//             delete data.ios_token;
//         }
//         if (self.isiOS) {
//             delete data.android_token;
//         }
//         self.post('/i', data, successCallback);
//     }, failureCallback);
// }
onRegistrationId(options: any) {
    let args = [];
    args.push(options.registrationId || "");
    args.push(this.messagingMode || this.messagingMode.PRODUCTION);
    args.push(options.projectId || "");
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "onregistrationid", args);
}

sendPushToken(options: any) {
    let args = [];
    args.push(options.token || "");
    args.push(options.messagingMode.toString() || this.messagingMode.PRODUCTION.toString());
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","sendPushToken",args);
}
// // countly start for android
start() {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "start", []);
}
// // countly stop for android
stop() {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "stop", []);
}
// // countly deviceready for testing purpose
deviceready = function () {
    this.ready = true;
    //testing
}
isReady = function(){
    return Countly_isReady;
}
// // countly dummy success and error event
onSuccess(result: any) {
    // alert(result);
}
onError(error: any) {
    // alert("error");
    // alert(error);
}
setOptionalParametersForInitialization(options: any) {

    let args = [];
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

    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "setOptionalParametersForInitialization", args);
}
setLocation(newDeviceID: string) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "setLocation", [newDeviceID.toString() || ""]);
}
changeDeviceId(newDeviceID: string, onServer: Boolean) {
    let onServerString = "";
    if(onServer === false){
        onServerString = "0";
    }else{
        onServerString = "1";
    }
    newDeviceID = newDeviceID.toString() || "";
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "changeDeviceId", [newDeviceID, onServerString]);
}

isCrashReportingEnabled = false;

enableCrashReporting() {
    this.isCrashReportingEnabled = true;
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "enableCrashReporting", []);
}

addCrashLog(crashLog) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "addCrashLog", [crashLog || ""]);
}

logException(exception: any, nonfatal: Boolean, segments: any) {
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
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "logException", args);
}

startSession(){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","startSession",[]);
}

endSession(){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","endSession",[]);
}

enableParameterTamperingProtection(salt: any) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "enableParameterTamperingProtection", [salt.toString() || ""]);
}
startEvent(eventName: string) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "startEvent", [eventName.toString() || ""]);
}
endEvent(options: any) {
    if(typeof options === "string")
        options = {eventName: options};
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

    if(!options.eventName)
        options.eventName = "";
    args.push(options.eventName.toString());

    if(!options.eventCount)
        options.eventCount = "1";
    args.push(options.eventCount.toString());

    if(!options.eventSum)
        options.eventSum = "0";
    args.push(options.eventSum.toString());

    if(options.segments)
        segments = options.segments;
    for (var event in segments) {
        args.push(event);
        args.push(segments[event]);
    }
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "endEvent", args);
}

setProperty(keyName: string, keyValue: string) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_setProperty", [keyName.toString() || "", keyValue.toString() || ""]);
}
increment(keyName: string) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_increment", [keyName.toString() || ""]);
}
incrementBy(keyName: string, keyIncrement: Number) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_incrementBy", [keyName.toString() || "", keyIncrement.toString() || ""]);
}
multiply(keyName: string, multiplyValue: Number) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_multiply", [keyName.toString() || "", multiplyValue.toString() || ""]);
}
saveMax(keyName: string, saveMax: Number) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_saveMax", [keyName.toString() || "", saveMax.toString() || ""]);
}
saveMin(keyName: string, saveMin: Number) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_saveMin", [keyName.toString() || "", saveMin.toString() || ""]);
}
setOnce(keyName: string, setOnce: Number) {
    cordova.exec(this.onSuccess, this.onError, "CountlyCordova", "userData_setOnce", [keyName.toString() || "", setOnce.toString() || ""]);
}
Ajax:any = {};
post(url: string, data: any, cb: any) {
    if(!data)
        data = {};
    var http = new XMLHttpRequest();
    http.open('POST', this.ROOT_URL + url, true);
    if(http.setRequestHeader){
        http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    http.onreadystatechange = function() {
        if (http.readyState === 4){
            cb(http.responseText);
        }
    };
    http.send(JSON.stringify(data));
}
}


document.addEventListener('deviceready', function() {
    Countly_isReady = true;
}, false);