Countly = {};
Countly.serverUrl = "";
Countly.appKey = "";
Countly.ready = false;
Countly.version = "19.3.0";
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (/android/i.test(userAgent)) {
    Countly.isAndroid = true;
    Countly.messagingMode = {"DEVELOPMENT": 2, "PRODUCTION": 0};
}
if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    Countly.isiOS = true;
    Countly.messagingMode = {"DEVELOPMENT": 1, "PRODUCTION": 0, "ADHOC": 2};
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
    if(serverUrl.lastIndexOf('/') === serverUrl.length -1){
        Ajax.ROOT_URL = serverUrl.substring(0, serverUrl.lastIndexOf("/"));
    }else{
        Ajax.ROOT_URL = serverUrl;
    }
    // For push notification, sending token using pure js method.
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
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","event",args);
}
Countly.recordView = function(recordView){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","recordView",[recordView || ""]);
};

// countly enable logger
Countly.setLoggingEnabled = function(){
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
Countly.getDeviceID = function(successCallback, failureCallback){
    cordova.exec(successCallback, failureCallback,"CountlyCordova","getDeviceID",[]);

}
Countly.sendPushToken = function(options){
    // successCallback = successCallback || Countly.onSuccess;
    // failureCallback = failureCallback || Countly.onError;

    var args = [];
    args.push(options.token || "");
    args.push(options.messagingMode.toString() || Countly.messagingMode.PRODUCTION.toString());
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","sendPushToken",args);

    // Second Old method
    // if(!Countly.appKey){
    //     return failureCallback('Countly sdk is not initialized.')
    // }
    // Countly.getDeviceID(function(deviceId){
    //     var data = {
    //         device_id: deviceId,
    //         app_key: Countly.appKey,
    //         token_session: 1,
    //         test_mode: options.messagingMode,
    //         android_token: options.token,
    //         ios_token: options.token
    //     };
    //     if (Countly.isAndroid) {
    //         delete data.ios_token;
    //     }
    //     if (Countly.isiOS) {
    //         delete data.android_token;
    //     }
    //     Ajax.post('/i', data, successCallback);

    // }, failureCallback);

    // Old method
    // var args = [];
    // args.push(options.registrationId || "");
    // args.push(options.mode || Countly.messagingMode.PRODUCTION);
    // args.push(options.projectId || "");
    // cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","onregistrationid",args);
}
// countly start for android
Countly.start = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","start",[]);
}

// countly stop for android
Countly.stop = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","stop",[]);
}

// countly manualSessionHandling for android
Countly.manualSessionHandling = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","manualSessionHandling",[]);
}

// countly manualSessionHandling for android
Countly.manualSessionHandling = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","manualSessionHandling",[]);
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
Countly.setLocation = function(newDeviceID){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setLocation",[newDeviceID.toString() || ""]);
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

Countly.startSession = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","startSession",[]);
}

Countly.endSession = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","endSession",[]);
}

Countly.enableParameterTamperingProtection = function(salt){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","enableParameterTamperingProtection",[salt.toString() || ""]);
}
Countly.startEvent = function(eventName){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","startEvent",[eventName.toString() || ""]);
}
Countly.endEvent = function(options){
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
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","endEvent",args);
};

Countly.recordEvent = function(options){
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
Countly.userData.pushUniqueValue = function(type, pushUniqueValueString){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","userData_pushUniqueValue",[type.toString() || "", pushUniqueValueString.toString() || ""]);
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
Countly.setRequiresConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setRequiresConsent",[]);
}
Countly.giveConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveConsent",[]);
}
Countly.removeConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","removeConsent",[]);
}
Countly.giveAllConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","giveAllConsent",[]);
}
Countly.removeAllConsent = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","removeAllConsent",[]);
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
Countly.sendRating = function(rating){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","sendRating",[rating.toString()]);
}

// ui related methods
// opens the modal
Countly.askForStarRating = function(callback){
    Countly.rating.create();
    Countly.rating.set(0);
    Countly.rating.callback = callback;
    query('countly-rating-modal').classList.add('open');
}
// closes the modal
Countly.rating.closeModal = function(){
    query('countly-rating-modal').classList.remove('open');
    if(Countly.rating.callback){
        Countly.rating.callback({code: 1, msg: 'The star rating dialog was dismissed.'});
    }
};
// when user selects a star
Countly.rating.success = function(evt){
    var rating = evt.currentTarget.getAttribute('data-rating');
    Countly.rating.rating = rating;
    Countly.rating.set(rating);
    query('countly-modal-dismiss').style.display = 'none';
    query('countly-modal-submit').style.display = 'block';
}
// when user clicks the submits
Countly.rating.send = function(){
    var rating = Countly.rating.rating;
    query('countly-modal-dismiss').style.display = 'block';
    query('countly-modal-submit').style.display = 'none';
    query('countly-rating-modal').classList.remove('open');
    Countly.rating.set(0);
    Countly.sendRating(rating);
    if(Countly.rating.callback){
        Countly.rating.callback({code: 0, msg: 'The user rated the app.', rating: rating});
    }
}
function query(theQuery){
    return document.getElementsByClassName(theQuery)[0];
}
// set's the star in the body
Countly.rating.html = '<div class="countly-modal-header"></div><div class="countly-modal-content"></div><div class="countly-modal-divider"></div><div class="countly-modal-dismiss"></div><div class="countly-modal-submit">Submit</div>';
Countly.rating.css = '.countly-modal.open{display:block}.countly-modal{width:80%;height:auto;position:fixed;top:10%;left:10%;background-color:#fff;border-radius:20px;z-index:99;border:1px solid #e0e0e0;text-align:center;font-size:2.5rem;display:none}.countly-modal div{margin:20px}.countly-modal-header{margin-top:20px}.countly-modal-divider{position:relative;margin:auto;height:1px;border:1px solid #e0e0e0}.countly-modal-dismiss{color:#47a9f4}.countly-modal-submit{display:none;color:#47a9f4}';
Countly.rating.create = function(){
    var div = query('countly-rating-modal');
    if(div){
        div.parentNode.removeChild(div);
    }
    div = document.createElement('div');
    div.setAttribute('class', 'countly-modal countly-rating-modal');
    div.innerHTML = Countly.rating.html;
    document.body.appendChild(div);

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(Countly.rating.css));
    document.head.appendChild(style);

    query('countly-modal-dismiss').addEventListener('click', Countly.rating.closeModal);
    query('countly-modal-submit').addEventListener('click', Countly.rating.send);
}
Countly.rating.set = function(rating){
    rating = Number(rating);
    var html = '';
    for(var i=1;i<6;i++){
        html += '<span class="countly-rating-start" data-rating="' +i +'">' +(rating>=i?'&#x2605': '&#x2606;') +'</span>';
    }
    query('countly-modal-content').innerHTML = html;
    query('countly-modal-header').innerText = Countly.rating.starRatingMessage;
    query('countly-modal-dismiss').innerText = Countly.rating.starRatingDismissButtonTitle;
    query('countly-modal-submit').innerText = Countly.rating.starRatingSubmitButtonTitle;
    var stars = document.getElementsByClassName('countly-rating-start');
    for(var i=0,il=stars.length;i<il;i++){
        stars[i].addEventListener('click', Countly.rating.success);
    }
};
// Rating

// FEEDBACK-WORK
Countly.feedback = {
    starFeedbackMessage: "What's your opinion about this page?",
    starFeedbackDismissButtonTitle: "X",
    starFeedbackSubmitButtonTitle: "Submit feedback",
    starFeedbackSubmitText: "Thank you for your feedback"
};

//open modal for feedback
Countly.askForFeedback = function (callback) {
    Countly.feedback.create();
    Countly.feedback.set(0);
    Countly.feedback.callback = callback;
    query('countly-feedback-modal').classList.add('open');
};

//close modal feedback
Countly.feedback.closeModal = function () {
    query('countly-feedback-modal').classList.remove('open');
    if (Countly.feedback.callback) {
        Countly.feedback.callback({ code: 1, msg: 'modal close' });
    }
};

//set html in feedback modal
Countly.feedback.html = '<div class="countly-feedback-modal-dismiss">X</div><iframe class="countly-feedback-modal-content" src="https://try.count.ly/feedback?widget_id=5d80915a31ec7124c86df698&device_id=a02cee5e35b6b8e8&app_key=0e8a00e8c01395a0af8be0e55da05a404bb23c3e"></iframe>';
Countly.feedback.css = '.countly-main-modal.open{display:block}.countly-main-modal{margin-left:-150px;position:fixed;top:25%;left:48%;background-color:#fff;border-radius:5px;z-index:99;border:1px solid #e0e0e0;text-align:center;font-size:2.5rem;display:none}.countly-main-modal div{margin:7px}.countly-feedback-modal-dismiss{display:block;text-align:right;cursor:pointer;font-size:20px}.countly-feedback-modal-content{font-size:small;height:438px;overflow:hidden;border:0px !important}';
Countly.feedback.create = function () {
    var div = query('countly-feedback-modal');
    if (div) {
        div.parentNode.removeChild(div);
    }
    url =
    div = document.createElement('div');
    div.setAttribute('class', 'countly-main-modal countly-feedback-modal');
    div.innerHTML = Countly.feedback.html;
    document.body.appendChild(div);

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(Countly.feedback.css));
    document.head.appendChild(style);

    query('countly-feedback-modal-dismiss').addEventListener('click', Countly.feedback.closeModal);
}

//feedback emoji set
// Countly.feedback.set = function (feedback) {
//     feedback = Number(feedback);
//     var html = '';
//     var html1 = ''
//     html += '<div class="tooltip countly-feedback-start" style="cursor:pointer;"><img id="0" style="block-size:28px;" src="assest/countly-sdk.js/0_gray.svg"</img><span class="tooltiptext">Very dissatisfied</span></div>';
//     html += '<div class="tooltip countly-feedback-start" style="cursor:pointer;"><img id="1" style="block-size:28px;" src="assest/countly-sdk.js/1_gray.svg"</img><span class="tooltiptext">Somewhat dissatisfied</span></div>';
//     html += '<div class="tooltip countly-feedback-start" style="cursor:pointer;"><img id="2" style="block-size:28px;" src="assest/countly-sdk.js/2_gray.svg"</img><span class="tooltiptext">Neither satisfied nor dissatisfied</span></div>';
//     html += '<div class="tooltip countly-feedback-start" style="cursor:pointer;"><img id="3" style="block-size:28px;" src="assest/countly-sdk.js/3_gray.svg"</img><span class="tooltiptext">Somewhat satisfied</span></div>';
//     html += '<div class="tooltip countly-feedback-start" style="cursor:pointer;"><img id="4" style="block-size:28px;" src="assest/countly-sdk.js/4_gray.svg"</img><span class="tooltiptext">Very satisfied</span></div>';
//     html += '<br>'
//     html += '<div align="left" style="margin-left:48px;margin-top:32px;"><input type="checkbox" id="commntAdd" name="comment" class="commentAdd pointer"> Add comment<br><textarea class="textArea" id="textArea" style="display:none;width:100%;height:60px;margin-top:10px;resize:none;border:1px solid #DBDBDB;outline:none;font-size:13px;border-radius:3px;"></textarea><br><input type="checkbox" name="e-mail" id="emailAdd" class="pointer" > Contact me via e-mail<input type="text" id="emailVal" class="emailVal" style="display:none;width:100%;outline:none;border:1px solid #DBDBDB;height:30px;margin-top:10px;line-height:20px;padding-left:2px;font-size:13px;border-radius:3px"></div>'

//     html1 += '<div><img style="height:2em" src="assest/countly-sdk.js/check-solid.svg"></img></div>';
//     html1 += Countly.feedback.starFeedbackSubmitText

//     query('countly-feedback-modal-content').innerHTML = html;
//     query('countly-feedback-modal-header').innerText = Countly.feedback.starFeedbackMessage;
//     query('countly-feedback-modal-dismiss').innerText = Countly.feedback.starFeedbackDismissButtonTitle;
//     query('countly-feedback-modal-text').innerHTML = html1;
//     query('countly-feedback-modal-submit').innerText = Countly.feedback.starFeedbackSubmitButtonTitle;

//     var commentCheck = document.getElementById('commntAdd');
//     commentCheck.addEventListener('click', function () {
//         if (commentCheck.checked) {
//             query('textArea').style.display = '';
//         } else {
//             query('textArea').style.display = 'none';
//         }
//     });

//     var emailCheck = document.getElementById('emailAdd');
//     emailCheck.addEventListener('click', function () {
//         if (emailCheck.checked) {
//             query('emailVal').style.display = '';
//         } else {
//             query('emailVal').style.display = 'none';
//         }
//     })
//     var resultScore = '';
//     var classname = document.getElementsByClassName("countly-feedback-start");
//     var myFunction = function (evt) {
//         // var default_img = "https://try.count.ly/star-rating/images/star-rating/" + evt.target.id + "_gray.svg";
//         var default_img = "assest/countly-sdk.js/" + evt.target.id + "_gray.svg";
//         var current_img_src = evt.target.getAttribute('src');
//         if (current_img_src === default_img) {
//             Array.from(classname).forEach(function (element) {
//                 // resultScore = '';
//                 if (element.children[0].id !== evt.target.id) {
//                     // var default_img = "https://try.count.ly/star-rating/images/star-rating/" + element.children[0].id + "_gray.svg";
//                     var default_img = "assest/countly-sdk.js/" + element.children[0].id + "_gray.svg";
//                     element.children[0].setAttribute('src', default_img);
//                 } else {
//                     // evt.target.setAttribute('src', "https://try.count.ly/star-rating/images/star-rating/" + evt.target.id + "_color.svg");
//                     evt.target.setAttribute('src', "assest/countly-sdk.js/" + evt.target.id + "_color.svg");
//                     resultScore = element.children[1].innerHTML;
//                 }
//             });
//         } else {
//             evt.target.setAttribute('src', default_img);
//         }
//     };

//     Array.from(classname).forEach(function (element) {
//         element.addEventListener('click', myFunction);
//     });

//     var subBtn = document.getElementById('textVal');
//     subBtn.addEventListener('click', function () {
//         resultData = {};
//         var textVal = document.getElementById('textArea').value;
//         var emailVal = document.getElementById('emailVal').value;
//         resultData.comment = textVal;
//         resultData.email = emailVal;
//         resultData.feedback = resultScore;

//         query('countly-feedback-modal-header').style.display = 'none';
//         query('countly-feedback-modal-content').style.display = 'none';
//         query('countly-feedback-modal-submit').style.display = 'none';
//         query('countly-feedback-modal-text').style.display = 'block';
//         query('countly-feedback-modal-text').style.display = 'block';
//         if (Countly.feedback.callback) {
//             Countly.feedback.callback({ code: 0, msg: 'user submit feedback', data: resultData });
//         } else {
//             Countly.feedback.callback({ code: 1, msg: 'Error to save data'})
//         }
//     })
// };

Countly.sendFeedback = function(feedback){
    var arg = [];
    console.log(feedback);
    arg.push((feedback.rating || "").toString());
    arg.push((feedback.comment || "").toString());
    arg.push((feedback.email || "").toString());
    arg.push((Countly.feedback || "").toString());
    arg.push((Countly.widgetId || "").toString());
    Countly.getFeedbackWidget(Countly.widgetId, function(result){
        console.log(result);
    });
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","sendFeedback",arg);
}

Countly.askForFeedback = function(widgetId, callback){
    cordova.exec(function(url){
        Countly.openFeedbackModal(url);
    },function(error){callback({code: 1, error: error});},"CountlyCordova","askForFeedback",[widgetId.toString()]);
}
Countly.openFeedbackModal = function(url){
    Countly.feedback.create();
    query('countly-feedback-modal').classList.add('open');
}
// FEEDBACK-WORK


//setHttpPostForced
Countly.setHttpPostForced = function(){
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","setHttpPostForced",[]);
}

var Ajax = {};
Ajax.post = function(url, data, cb) {
    if(!data)
        data = {};
    var http = new XMLHttpRequest();
    http.open('POST', Ajax.ROOT_URL + url, true);
    if(http.setRequestHeader){
        http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    http.onreadystatechange = function() {
        if (http.readyState === 4){
            cb(http.responseText);
        }
    };
    http.send(JSON.stringify(data));
};
window.Countly = Countly;
document.addEventListener("deviceready", Countly.deviceready, false);
