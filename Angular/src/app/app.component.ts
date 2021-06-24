import { Component, ViewChild } from '@angular/core';
import { BusRecord } from './BusRecord.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'bus';
  deleteEventTriggered: boolean = false;

  busRecord!: BusRecord;

  deleteEventReceiver(busRecord: BusRecord) {
    console.log("App: delete event received");
    console.log("App: busRecord received from delete event:");

    // save busRecord received from SearchBusComponent via event
    //this.busRecord = busRecord;
    var newBusRecord: BusRecord = {
      "routeNumber": busRecord.routeNumber,
      "fare": busRecord.fare,
      "startPoint": busRecord.startPoint,
      "endPoint": busRecord.endPoint
    };
    this.busRecord = newBusRecord;

    console.log("routeNumber: " + this.busRecord.routeNumber);
    console.log("fare: " + this.busRecord.fare);
    console.log("startPoint: " + this.busRecord.startPoint);
    console.log("endPoint: " + this.busRecord.endPoint);

    this.deleteEventTriggered = true;
  }

  cancelDeleteEventReceiver() {
    console.log("App: cancel event received");
    this.deleteEventTriggered = false;
  }
}
