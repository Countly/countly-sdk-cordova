import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

declare var PushNotification;
declare var Countly;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public events: Events) {
    events.subscribe('countly:notification', (notification: any, time: Date) => {
      console.log(notification);
    });
  }
  ionViewDidEnter(){
    const self = this;
    Countly.onNotification(function(notification: any){
      self.events.publish('countly:notification', notification, Date.now());
    });
  }
}

// Note: This example is based on ionic event documentation
// https://ionicframework.com/docs/v3/api/util/Events/