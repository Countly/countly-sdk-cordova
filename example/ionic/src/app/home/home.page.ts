import { Component } from '@angular/core';

declare var PushNotification;
declare var Countly;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
  }

  init() {
    Countly.isInitialized().then((result) => {
      if(result  != "true") {
          /** Recommended settings for Countly initialisation */
          Countly.setLoggingEnabled(true); // Enable countly internal debugging logs
          Countly.enableCrashReporting(); // Enable crash reporting to report unhandled crashes to Countly
          Countly.setRequiresConsent(true); // Set that consent should be required for features to work.
          Countly.giveConsentInit(["location", "sessions", "attribution", "push", "events", "views", "crashes", "users", "push", "star-rating", "apm"]); // give conset for specific features before init.
          Countly.setLocationInit("TR", "Istanbul", "41.0082,28.9784", "10.2.33.12"); // Set user initial location.


          /** Optional settings for Countly initialisation */
          Countly.enableParameterTamperingProtection("salt"); // Set the optional salt to be used for calculating the checksum of requested data which will be sent with each request
          // Countly.pinnedCertificates("count.ly.cer"); // It will ensure that connection is made with one of the public keys specified
          Countly.setHttpPostForced(false); // Set to "true" if you want HTTP POST to be used for all requests
          Countly.enableApm(); // Enable APM features, which includes the recording of app start time.
          Countly.enableAttribution(); // Enable to measure your marketing campaign performance by attributing installs from specific campaigns.
          Countly.setRemoteConfigAutomaticDownload(function(r){
              alert("onSuccess : " + r)
          }, function(r){
              alert("onError : " + r);
          }); // Set Automatic value download happens when the SDK is initiated or when the device ID is changed.
          
          Countly.init("https://master.count.ly", "a646f1e4325e4e979ad5aa8dc01a334f12a6f4fe").then((result) => {
              /** 
               * Push notifications settings 
               * Should be call after init
              */
              Countly.pushTokenType(Countly.messagingMode.TEST); // Set messaging mode for push notifications
              Countly.onNotification(function(theNotification){
                  alert(JSON.stringify(theNotification));
              }); // Set callback to receive push notifications
              Countly.askForNotificationPermission(); // This method will ask for permission, enables push notification and send push token to countly server.

              // Countly.giveAllConsent(); // give consent for all features, should be call after init
              // Countly.giveConsent(["events", "views"]); // give conset for some specific features, should be call after init.
          },(err) => {
              console.error(err);
          });
      }
  },(err) => {
      console.error(err);
  });
  };

  test() {
    this.onRegistrationId();
    this.sendSampleEvent();
  }

  setOptionalParametersForInitialization = function () {
    Countly.setOptionalParametersForInitialization({
      city: "Tampa",
      country: "US",
      latitude: "28.006324",
      longitude: "-82.7166183"
    });
  };

  event() {
    setInterval(function () {
      this.sendSampleEvent();
    }, 1000);
  }
  start() {
    Countly.start();
  }
  stop() {
    Countly.stop();
  }

  sendSampleEvent() {
    this.basicEvent();
    this.eventWithSum();
    this.eventWithSegment();
    this.eventWithSum_Segment();
  }
  basicEvent() {
    // example for basic event
    var events = {
      "eventName": "basic_event",
      "eventCount": 1
    };
    Countly.sendEvent(events);
  }
  eventWithSum() {
    // example for event with sum
    var events = {
      "eventName": "event_sum",
      "eventCount": 1,
      "eventSum": "0.99"
    };
    Countly.sendEvent(events);
  }
  eventWithSegment() {
    // example for event with segment
    var events = {
      "eventName": "event_segment",
      "eventCount": 1,
      "segments": {}
    };
    events.segments = {
      "Country": "Turkey",
      "Age": "28"
    };
    Countly.sendEvent(events);
  }
  eventWithSum_Segment() {
    // example for event with segment and sum
    var events = {
      "eventName": "event_segment_sum",
      "eventCount": 1,
      "eventSum": "0.99",
      "segments": {}

    };
    events.segments = {
      "Country": "Turkey",
      "Age": "28"
    };
    Countly.sendEvent(events);
  }
  setUserData() {
    // example for setUserData
    var options = {
      "name": "",
      "username": "",
      "email": "",
      "org": "",
      "phone": "",
      "picture": "",
      "picturePath": "",
      "gender": "",
      "byear": 0
    };
    options.name = "Name of User";
    options.username = "Username";
    options.email = "User Email";
    options.org = "User Organization";
    options.phone = "User Contact number";
    options.picture = "https://count.ly/images/logos/countly-logo.png";
    options.picturePath = "";
    options.gender = "User Gender";
    options.byear = 1989;
    Countly.setUserData(options);
  }
  setloggingenabled() {
    // example for setLoggingEnabled
    Countly.setLoggingEnabled();
  }

  testAndroidPush = function () {
    Countly.sendPushToken({
      "token": "1234567890",
      "messagingMode": Countly.messagingMode.DEVELOPMENT
    });;
  };

  testiOSPush = function () {
    Countly.sendPushToken({
      "token": "1234567890",
      "messagingMode": Countly.messagingMode.DEVELOPMENT
    });
  };


  onRegistrationId() {
    let self: any = this;
    var push = PushNotification.init({
      android: {
      },
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    });
    push.on('registration', function (data: any) {
      alert(data.registrationId);
      self.countly.sendPushToken({
        "token": data.registrationId,
        "messagingMode": self.countly.messagingMode.DEVELOPMENT
      });
    });

    push.on('notification', function (data) {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData
    });

    push.on('error', function (e) {
      // e.message
    });
    // Countly.messagingMode.TEST
    // Countly.messagingMode.PRODUCTION
    // Countly.mode = Countly.messagingMode.TEST;
    // Countly.Push.onRegisterPushNotification();
    // @depricated: The below commented method is depricated and no longer works.
    // Countly.initMessaging({
    //     "messageMode": Countly.messagingMode.TEST,
    //     "projectId": "881000050249"
    // });

    // Tesing purpose only

  }
  recordView = function (viewName) {
    Countly.recordView(viewName);
  }

  // 2017
  changeDeviceId() {
    Countly.changeDeviceId("123456");
  }
  enableParameterTamperingProtection() {
    Countly.enableParameterTamperingProtection("salt");
  }
  // startEvent() {
  //     Countly.startEvent("timedEvent");
  // }

  endEventBasic = function () {
    Countly.startEvent("Timed Event");
    setTimeout(function () {
      Countly.endEvent({ "eventName": "Timed Event" });
    }, 1000);
  }
  endEventWithSum = function () {
    Countly.startEvent("Timed Event With Sum");
    setTimeout(function () {
      Countly.endEvent({ "eventName": "Timed Event With Sum", "eventSum": "0.99" });
    }, 1000);
  }
  endEventWithSegment = function () {
    Countly.startEvent("Timed Event With Segment");
    setTimeout(function () {

      var events = {
        "eventName": "Timed Event With Segment",
        "segments": {}
      };
      events.segments = {
        "Country": "Turkey",
        "Age": "28"
      };
      Countly.endEvent(events);
    }, 1000);
  }
  endEventWithSumSegment = function () {
    Countly.startEvent("Timed Event With Segment, Sum and Count");
    setTimeout(function () {
      var events = {
        "eventName": "Timed Event With Segment, Sum and Count",
        "eventCount": 1,
        "eventSum": "0.99",
        "segments": {}
      };
      events.segments = {
        "Country": "Turkey",
        "Age": "28"
      };
      Countly.endEvent(events);
    }, 1000);
  }

  addCrashLog = function () {
    Countly.addCrashLog("User Performed Step A");
    setTimeout(function () {
      Countly.addCrashLog("User Performed Step B");
    }, 1000);
    setTimeout(function () {
      Countly.addCrashLog("User Performed Step C");
      console.log("Opps found and error");
      Countly.logException("My Customized error message");
    }, 1000);

  }

  // user details

  userData_setProperty() {
    Countly.setProperty("keyName", "keyValue");
  }
  userData_increment() {
    Countly.increment("keyName");
  }
  userData_incrementBy() {
    Countly.incrementBy("keyName", 10);
  }
  userData_multiply() {
    Countly.multiply("keyName", 20);
  }
  userData_saveMax() {
    Countly.saveMax("keyName", 100);
  }
  userData_saveMin() {
    Countly.saveMin("keyName", 50);
  }
  userData_setOnce() {
    Countly.setOnce("keyName", 200);
  }
}
