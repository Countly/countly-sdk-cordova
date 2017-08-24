declare var cordova;

export class Countly {

    serverUrl: String;
    appKey: String;
    projectId: String;
    messageMode: String;

    init(serverUrl: String, appKey: String) {
    this.serverUrl = serverUrl;
    this.appKey = appKey;
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","init",[serverUrl,appKey]);
  }

  initMessaging(options: any) {
    this.projectId = options.projectId;
    this.messageMode = options.messageMode;
    // this.Push.onRegisterPushNotification();
    let args = [];
    args.push(options.registrationId || "");
    args.push(options.messageMode || "0");
    args.push(options.projectId || "");
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","onregistrationid",args);
   }

  sendEvent(options: any) {
    let args = [];
    let eventType = "event"; //event, eventWithSum, eventWithSegment, eventWithSumSegment
    let segments = {};

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
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","event",args);
  }

   recordView(recordView: any){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","recordView",[recordView || ""]);
   }
   // countly enable logger
  setLoggingEnabled(boolean: any) {
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","setloggingenabled",[]);
  }
  // // countly sending user data
  setUserData(options: any) {
    console.log(options)
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

    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","setuserdata",args);
  }
  onRegistrationId(options: any) {
    let args = [];
    args.push(options.registrationId || "");
    args.push(this.messageMode || "0");
    args.push(options.projectId || "");
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","onregistrationid",args);
  }
  // // countly start for android
  start(){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","start",[]);
  }
  // // countly stop for android
  stop() {
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","stop",[]);
  }
  // // countly deviceready for testing purpose
  deviceready = function(){
    this.ready = true;
    //testing 
  }
  // // countly dummy success and error event
  onSuccess(result: any){
    alert(result);
  }
  onError(error: any){
     // alert("error");
     // alert(error);
  }
  setOptionalParametersForInitialization(options: any){

    let args = [];
    args.push(options.city || "");
    args.push(options.country || "");
    args.push(String(options.latitude) || "0.0");
    args.push(String(options.longitude) || "0.0");


    // this.sharedInstance().setOptionalParametersForInitialization("2 character country code", "city", "56.42345,123.45325");
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","setOptionalParametersForInitialization",args);
  }
  setLocation(newDeviceID: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","setLocation",[newDeviceID.toString() || ""]);
  }
  changeDeviceId(newDeviceID: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","changeDeviceId",[newDeviceID.toString() || ""]);
  }
  enableCrashReporting(){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","enableCrashReporting",[]);
  }
  enableParameterTamperingProtection(salt: any){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","enableParameterTamperingProtection",[salt.toString() || ""]);
  }
  startEvent(eventName: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","startEvent",[eventName.toString() || ""]);
  }
  endEvent(options: any){
    if(typeof options === "string")
        options = {eventName: options};
    let args = [];
    let eventType = "event"; //event, eventWithSum, eventWithSegment, eventWithSumSegment
    let segments = {};

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
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","endEvent",args);
  }

  setProperty(keyName: String, keyValue: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_setProperty",[keyName.toString() || "", keyValue.toString() || ""]);
  }
  increment(keyName: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_increment",[keyName.toString() || ""]);
  }
  incrementBy(keyName: String, keyIncrement: Number){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_incrementBy",[keyName.toString() || "", keyIncrement.toString() || ""]);
  }
  multiply(keyName: String, multiplyValue: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_multiply",[keyName.toString() || "", multiplyValue.toString() || ""]);
  }
  saveMax(keyName: String, saveMax: Number){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_saveMax",[keyName.toString() || "", saveMax.toString() || ""]);
  }
  saveMin(keyName: String, saveMin: Number){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_saveMin",[keyName.toString() || "", saveMin.toString() || ""]);
  }
  setOnce(keyName: String, setOnce: String){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","userData_setOnce",[keyName.toString() || "", setOnce.toString() || ""]);
  }

  addCrashLog(crashLog){
    cordova.exec(this.onSuccess,this.onError,"CountlyCordova","addCrashLog",[crashLog || ""]);
  }
} 
// window.Countly = Countly;
// document.addEventListener("deviceready", this.deviceready, false);