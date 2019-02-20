import { Component } from '@angular/core';
import { Countly } from './ionic.countly';

declare var PushNotification;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Countly]
})
export class HomePage {

  constructor(public countly: Countly) {
  }

  init() {
    this.countly.init("https://try.count.ly", "0e8a00e8c01395a0af8be0e55da05a404bb23c3e", "");
  };

  test() {
    this.onRegistrationId();
    this.sendSampleEvent();
  }

  setOptionalParametersForInitialization = function () {
    this.countly.setOptionalParametersForInitialization({
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
    this.countly.start();
  }
  stop() {
    this.countly.stop();
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
    this.countly.sendEvent(events);
  }
  eventWithSum() {
    // example for event with sum
    var events = {
      "eventName": "event_sum",
      "eventCount": 1,
      "eventSum": "0.99"
    };
    this.countly.sendEvent(events);
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
    this.countly.sendEvent(events);
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
    this.countly.sendEvent(events);
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
    this.countly.setUserData(options);
  }
  setloggingenabled() {
    // example for setLoggingEnabled
    this.countly.setLoggingEnabled();
  }

  testAndroidPush = function () {
    this.countly.sendPushToken({
      "token": "1234567890",
      "messagingMode": this.countly.messagingMode.DEVELOPMENT
    });;
  };

  testiOSPush = function () {
    this.countly.sendPushToken({
      "token": "1234567890",
      "messagingMode": this.countly.messagingMode.DEVELOPMENT
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
    // this.countly.messagingMode.TEST
    // this.countly.messagingMode.PRODUCTION
    // this.countly.mode = this.countly.messagingMode.TEST;
    // this.countly.Push.onRegisterPushNotification();
    // @depricated: The below commented method is depricated and no longer works.
    // this.countly.initMessaging({
    //     "messageMode": this.countly.messagingMode.TEST,
    //     "projectId": "881000050249"
    // });

    // Tesing purpose only

  }
  recordView = function (viewName) {
    this.countly.recordView(viewName);
  }

  // 2017
  changeDeviceId() {
    this.countly.changeDeviceId("123456");
  }
  enableParameterTamperingProtection() {
    this.countly.enableParameterTamperingProtection("salt");
  }
  // startEvent() {
  //     this.countly.startEvent("timedEvent");
  // }

  endEventBasic = function () {
    this.countly.startEvent("Timed Event");
    setTimeout(function () {
      this.countly.endEvent({ "eventName": "Timed Event" });
    }, 1000);
  }
  endEventWithSum = function () {
    this.countly.startEvent("Timed Event With Sum");
    setTimeout(function () {
      this.countly.endEvent({ "eventName": "Timed Event With Sum", "eventSum": "0.99" });
    }, 1000);
  }
  endEventWithSegment = function () {
    this.countly.startEvent("Timed Event With Segment");
    setTimeout(function () {

      var events = {
        "eventName": "Timed Event With Segment",
        "segments": {}
      };
      events.segments = {
        "Country": "Turkey",
        "Age": "28"
      };
      this.countly.endEvent(events);
    }, 1000);
  }
  endEventWithSumSegment = function () {
    this.countly.startEvent("Timed Event With Segment, Sum and Count");
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
      this.countly.endEvent(events);
    }, 1000);
  }

  addCrashLog = function () {
    this.countly.addCrashLog("User Performed Step A");
    setTimeout(function () {
      this.countly.addCrashLog("User Performed Step B");
    }, 1000);
    setTimeout(function () {
      this.countly.addCrashLog("User Performed Step C");
      console.log("Opps found and error");
      this.countly.logException("My Customized error message");
    }, 1000);

  }

  // user details

  userData_setProperty() {
    this.countly.setProperty("keyName", "keyValue");
  }
  userData_increment() {
    this.countly.increment("keyName");
  }
  userData_incrementBy() {
    this.countly.incrementBy("keyName", 10);
  }
  userData_multiply() {
    this.countly.multiply("keyName", 20);
  }
  userData_saveMax() {
    this.countly.saveMax("keyName", 100);
  }
  userData_saveMin() {
    this.countly.saveMin("keyName", 50);
  }
  userData_setOnce() {
    this.countly.setOnce("keyName", 200);
  }
}
