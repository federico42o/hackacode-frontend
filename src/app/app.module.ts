import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrationModule } from './administration/administration.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { GeneralTicketComponent } from './components/general-ticket/general-ticket.component';
import { VipTicketComponent } from './components/vip-ticket/vip-ticket.component';
import { SalesModule } from './sales/sales.module';
import { SharedModule } from './shared';



@NgModule({
  declarations: [
    AppComponent,
    GeneralTicketComponent,
    VipTicketComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    SalesModule,
    AdministrationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
