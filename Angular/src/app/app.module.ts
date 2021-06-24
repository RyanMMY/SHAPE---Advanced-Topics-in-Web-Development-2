import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchBusComponent } from './search-bus/search-bus.component';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateBusComponent } from './create-bus/create-bus.component';
import { DeleteBusComponent } from './delete-bus/delete-bus.component';
import { UpdateBusComponent } from './update-bus/update-bus.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBusComponent,
    CreateBusComponent,
    DeleteBusComponent,
    UpdateBusComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
