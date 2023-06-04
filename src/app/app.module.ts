import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { SharedModule } from './shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBuyerComponent } from './pages/add-buyer/add-buyer.component';
import { TicketSelectorComponent } from './pages/ticket-selector/ticket-selector.component';
import { AddTicketFormComponent } from './pages/ticket-selector/add-ticket-form/add-ticket-form.component';



@NgModule({
  declarations: [
    AppComponent,
    AddBuyerComponent,
    TicketSelectorComponent,
    AddTicketFormComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
