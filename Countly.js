Countly = {};
Countly.serverUrl = "";
Countly.appKey = "";
Countly.ready = false;
Countly.version = "18.08.2";
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
    if(serverUrl.lastIndexOf('/') === serverUrl.length -1){
        Ajax.ROOT_URL = serverUrl.substring(0, serverUrl.lastIndexOf("/"));
    }else{
        Ajax.ROOT_URL = serverUrl;
    }
    cordova.exec(Countly.onSuccess,Countly.onError,"CountlyCordova","init",args);
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
Countly.sendPushToken = function(options, successCallback, failureCallback){
    successCallback = successCallback || Countly.onSuccess;
    failureCallback = failureCallback || Countly.onError;
    if(!Countly.appKey){
        return failureCallback('Countly sdk is not initialized.')
    }
    Countly.getDeviceID(function(deviceId){
        var data = {
            device_id: deviceId,
            api_key: Countly.appKey,
            token_session: 1,
            test_mode: options.messagingMode,
            android_token: options.token,
            ios_token: options.token
        };
        if (Countly.isAndroid) {
            delete data.ios_token;
        }
        if (Countly.isiOS) {
            delete data.android_token;
        }
        Ajax.post('/i', data, successCallback);

    }, failureCallback);

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
    args.push(options.city || "");
    args.push(options.country || "");
    args.push(String(options.latitude) || "0.0");
    args.push(String(options.longitude) || "0.0");
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
    for(var i=0,il=exception.length;i<il;i++){
        exceptionString += "columnNumber: " +exception[i].columnNumber +"\n";
        exceptionString += "fileName: " +exception[i].fileName +"\n";
        exceptionString += "functionName: " +exception[i].functionName +"\n";
        exceptionString += "lineNumber: " +exception[i].lineNumber +"\n";
    }
    var args = [];
    args.push(exceptionString || "");
    args.push(nonfatal || false);
    for(var key in segments){
        args.push(key);
        args.push(segments.toString());
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
    query('countly-rating').classList.add('open');
}
// closes the modal
Countly.rating.closeModal = function(){
    query('countly-rating').classList.remove('open');
    if(Countly.rating.callback){
        Countly.rating.callback({code: 1, msg: 'The star rating dialog was dismissed.'});
    }
};
// when user selects a star
Countly.rating.success = function(evt){
    var rating = evt.currentTarget.getAttribute('data-rating');
    Countly.rating.rating = rating;
    Countly.rating.set(rating);
    query('countly-rating-dismiss').style.display = 'none';
    query('countly-rating-submit').style.display = 'block';
}
// when user clicks the submits
Countly.rating.send = function(){
    var rating = Countly.rating.rating;
    query('countly-rating-dismiss').style.display = 'block';
    query('countly-rating-submit').style.display = 'none';
    query('countly-rating').classList.remove('open');
    Countly.rating.set(0);
    Countly.sendRating(rating);
    if(Countly.rating.callback){
        Countly.rating.callback({code: 0, msg: 'The user rated the app.', rating: rating});
    }
}
function query(theQuery){
    return document.getElementsByClassName(theQuery)[0];
}
function getId(theID){
    return document.getElementById(theID);
}
// set's the star in the body
Countly.rating.html = '<div class="countly-rating-header"></div><div class="countly-rating-content"></div><div class="countly-rating-divider"></div><div class="countly-rating-dismiss"></div><div class="countly-rating-submit">Submit</div>';
Countly.rating.css = '.countly-rating.open{display:block}.countly-rating{width:80%;height:auto;position:fixed;top:10%;left:10%;background-color:#fff;border-radius:20px;z-index:99;border:1px solid #e0e0e0;text-align:center;font-size:2.5rem;display:none}.countly-rating div{margin:20px}.countly-rating-header{margin-top:20px}.countly-rating-divider{position:relative;margin:auto;height:0.1px;border:1px solid #e0e0e0}.countly-rating-dismiss{color:#47a9f4}.countly-rating-submit{display:none;color:#47a9f4}';
Countly.rating.create = function(){
    var div = query('countly-rating');
    if(div){
        div.parentNode.removeChild(div);
    }
    div = document.createElement('div');
    div.setAttribute('class', 'countly-rating');
    div.innerHTML = Countly.rating.html;
    document.body.appendChild(div);

    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(Countly.rating.css));
    document.head.appendChild(style);

    query('countly-rating-dismiss').addEventListener('click', Countly.rating.closeModal);
    query('countly-rating-submit').addEventListener('click', Countly.rating.send);
}
Countly.rating.set = function(rating){
    rating = Number(rating);
    var html = '';
    for(var i=1;i<6;i++){
        html += '<span class="countly-rating-start" data-rating="' +i +'">' +(rating>=i?'&#x2605': '&#x2606;') +'</span>';
    }
    query('countly-rating-content').innerHTML = html;
    query('countly-rating-header').innerText = Countly.rating.starRatingMessage;
    query('countly-rating-dismiss').innerText = Countly.rating.starRatingDismissButtonTitle;
    query('countly-rating-submit').innerText = Countly.rating.starRatingSubmitButtonTitle;
    var stars = document.getElementsByClassName('countly-rating-start');
    for(var i=0,il=stars.length;i<il;i++){
        stars[i].addEventListener('click', Countly.rating.success)
    }
};
// Rating

// Feedback
Countly.feedback = {};
Countly.feedback.config = {
    popup_header_text: 'Header',
    popup_email_callout: '',
    popup_comment_callout: '',
    popup_thanks_message: ''
}
var chekedElement = document.getElementsByClassName("check-data");
for(var i = 0; i< chekedElement.length; i++ ){
    chekedElement[i].addEventListener('click', function(evt){
        var selectedId = evt.target.getAttribute('data-id');
        if(this.checked) {
            getId(selectedId).style.display = "inline";
        } else {
            getId(selectedId).style.display = "none";
        }
    });
}

var emotion = document.getElementsByClassName("rating-emotion");
for(var i = 0; i< emotion.length; i++ ){
    emotion[i].addEventListener('click', function(evt){
        for(var j = 0; j< emotion.length; j++ ){
            var reSetSrcLink = emotion[j].getAttribute('src');
            var reSetNewStrLink = reSetSrcLink.replace("color", "gray");
            emotion[j].setAttribute('src', reSetNewStrLink);
        }
        var srcLink = evt.target.getAttribute('src');
        var newStrLink = srcLink.replace("gray", "color");
        evt.target.setAttribute('src', newStrLink);
    });
}

var feedback_data_example = {
    "_id": "5b2ceb1b6b71e62eb22d6a46",
    "popup_header_text": "Widget 1",
    "popup_button_callout": "Submit feedback",
    "popup_comment_callout": "Add comment",
    "popup_thanks_message": "Thank you for your feedback",
    "trigger_position": "center-left",
    "trigger_bg_color": "132f1d",
    "trigger_button_text": "Feedback",
    "trigger_font_color": "#FFFFFF",
    "target_devices": "[\"mobile\",\"desktop\",\"tablet\"]",
    "target_page": "selected",
    "target_pages": "[\"/\"]",
    "is_active": "true"
};
Countly.feedback.create = function(){

}
Countly.feedback.set = function(score){
    score = Number(score);
    var child = query('countly-feedback-content').childNodes;
    for(var i=0; i<child.length; i++){
        if(!child[i].nodeName !== 'SPAN'){
            continue;
        }
        if(Number(child[i].getAttribute('data-score')) > child[i]){
            child[i].style.backgroundColor = 'black';
        }else{
            child[i].style.backgroundColor = 'none';
        }
        console.log(query('countly-feedback-content').childNodes[i-1])
    }
}
Countly.feedback.show = function(callback){
    Countly.feedback.create();
    Countly.feedback.set(0);
    Countly.feedback.callback = callback;
    query('countly-feedback').classList.add('open');
}
Countly.feedback.hide = function(){
    query('countly-feedback').classList.remove('open');
    if(Countly.feedback.callback){
        Countly.feedback.callback({code: 1, msg: 'The feedback dialog was dismissed.'});
    }
}
Countly.feedback.click = function(evt){
    Countly.feedback.set(evt.currentTarget.getAttribute('data-score'));
}
Countly.feedback.send = function(){
    let feedback_data = {
        comment: getId("countly-comment").value,
        email: getId("countly-email").value,
        isComment: getId("commentCheckbox").checked,
        score: 0
    };
    console.log(feedback_data)
    return feedback_data;
};
query('countly-footer-btn').addEventListener('click', Countly.feedback.send);
Countly.feedback.show();
// Feedback

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
