import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.css']
})
export class UpdateBusComponent implements OnInit {
  http: HttpClient;
  serverData: Object | null;
  url: string;
  updateBusForm: FormGroup;
  errormessage: string = "Missing Data";
  successmessage: string = "Update Success";

  constructor(fb: FormBuilder, http: HttpClient) { 
    this.http = http;
    this.serverData = null;
    this.url = "";

    this.updateBusForm = fb.group(
      {
        'ROUTE_ID': ['', Validators.required],
        'COMPANY_CODE': ['', Validators.required],
        'ROUTE_NAMEE': ['', Validators.required],
        'ROUTE_TYPE': ['', Validators.required],
        'SERVICE_MODE': ['', Validators.required],
        'JOURNEY_TIME': ['', Validators.required],
        'LOC_START_NAMEE': ['', Validators.required],
        'LOC_END_NAMEE': ['', Validators.required],
        'HYPERLINK_E': ['', Validators.required],
        'FULL_FARE': ['', Validators.required],
        'LAST_UPDATE_DATE': ['', Validators.required]     
      }
    );
  }

  onSubmit(formValue: any): void {
    this.serverData = null;
    this.url = "http://localhost/ATWD/index.php/" + 'route' + '/' + formValue['ROUTE_ID'] + '/' +formValue['COMPANY_CODE'] + '/' + formValue['ROUTE_NAMEE'] + '/' + formValue['ROUTE_TYPE'] + '/' 
    + formValue['SERVICE_MODE'] + '/'  + formValue['JOURNEY_TIME'] + '/'  + formValue['LOC_START_NAMEE'] + '/' 
    + formValue['LOC_END_NAMEE'] + '/'  + formValue['HYPERLINK_E'] + '/'  + formValue['FULL_FARE'] + '/'
    + formValue['LAST_UPDATE_DATE'];

    this.http.put<any>(
      this.url, 
      {
        ROUTE_ID: formValue['ROUTE_ID'], 
        COMPANY_CODE: formValue['COMPANY_CODE'], 
        ROUTE_NAMEE: formValue['ROUTE_NAMEE'], 
        ROUTE_TYPE: formValue['ROUTE_TYPE'],
        SERVICE_MODE: formValue['SERVICE_MODE'], 
        JOURNEY_TIME: formValue['JOURNEY_TIME'], 
        LOC_START_NAMEE: formValue['LOC_START_NAMEE'], 
        LOC_END_NAMEE: formValue['LOC_END_NAMEE'], 
        HYPERLINK_E: formValue['HYPERLINK_E'], 
        FULL_FARE: formValue['FULL_FARE'],         
        LAST_UPDATE_DATE: formValue['LAST_UPDATE_DATE']
      },
     
    ).subscribe(
      res => {
        console.log("Server return: " + res);
        this.serverData = this.errormessage;
      },  
      res => {
        console.log("Server error: " + res);
        this.serverData = this.successmessage;
      }
    );
  }

  ngOnInit(): void {
  }

}
