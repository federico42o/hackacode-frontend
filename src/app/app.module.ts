import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { SharedModule } from './shared';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBuyerComponent } from './pages/add-buyer/add-buyer.component';
import { TicketSelectorComponent } from './pages/ticket-selector/ticket-selector.component';
import { AddTicketFormComponent } from './pages/ticket-selector/add-ticket-form/add-ticket-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralTicketComponent } from './components/general-ticket/general-ticket.component';
import { VipTicketComponent } from './components/vip-ticket/vip-ticket.component';



@NgModule({
  declarations: [
    AppComponent,
    AddBuyerComponent,
    TicketSelectorComponent,
    AddTicketFormComponent,
    GeneralTicketComponent,
    VipTicketComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
