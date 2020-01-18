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
    Countly.init("https://trinisoft.count.ly", "f0b2ac6919f718a13821575db28c0e2971e05ec5", "");
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
    options.name = "Trinisoft Technologies";
    options.username = "trinisofttechnologies";
    options.email = "trinisofttechnologies@gmail.com";
    options.org = "Trinisoft Technologies Pvt. Ltd.";
    options.phone = "+91 812 840 2946";
    options.picture = "http://www.trinisofttechnologies.com/images/logo.png";
    options.picturePath = "";
    options.gender = "M"; // "F"
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
