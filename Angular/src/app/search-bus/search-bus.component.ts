import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusRecord } from '../BusRecord.model';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  @Input() searchType: string;

  http: HttpClient;
  serverData: Object | null;
  serverDataArr: any;
  url: string;
  searchBusForm: FormGroup;

  busRecord: BusRecord = {
    routeNumber: "",
    fare: "",
    startPoint: "",
    endPoint: ""
  }

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;
    this.url = "";
    this.searchType = "";
    this.searchBusForm = fb.group(
      {
        'searchKey': ['', Validators.required]
      }
    );
  }

  onSubmit(formValue: any): void {
    this.serverData = null;

    if (this.searchType === "By Route") {
      this.url = "http://localhost/atwd/index.php/"+'route'+'/' +'ROUTE_NAMEE' +'/' + formValue['searchKey'];
    } else if (this.searchType === "By Fare") {
      this.url = "http://localhost/ATWD/index.php/" +'route'+'/' +'FULL_FARE' +'/' + formValue['searchKey'];
    } else if (this.searchType === "By Start Point") {
      this.url = "http://localhost/ATWD/index.php/" +'route'+'/' +'LOC_START_NAMEE' +'/' + formValue['searchKey'];
    } else if (this.searchType === "By End Point") {
      this.url = "http://localhost/ATWD/index.php/" +'route'+'/' +'LOC_END_NAMEE' +'/' + formValue['searchKey'];
    }

    this.http.get<any>(
      this.url
    ).subscribe(
      res => {
        console.log("Server return: " + res);
        this.serverData = res;
        this.serverDataArr = JSON.parse(JSON.stringify(res));
      },  
      res => {
        console.log("Server error: " + res);
      }
    );

  }

  ngOnInit(): void {
    console.log("searchType:" + this.searchType);
  }

  
  @Output() deleteEvent = new EventEmitter<BusRecord>();

  deleteButtonHandler(routeNumber: string) {
    console.log("Search: delete button: " + routeNumber);
    console.log("Search: Emitting deleteEvent");

    for (let bus of this.serverDataArr) {
      if (routeNumber === bus.routeNumber) {
        this.busRecord.routeNumber = bus.routeNumber;
        this.busRecord.fare = bus.fare;
        this.busRecord.startPoint = bus.startPoint;
        this.busRecord.endPoint = bus.endPoint;
      }
    }

    this.deleteEvent.emit(this.busRecord);
  }


}
