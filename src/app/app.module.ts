import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MAT_DATE_LOCALE } from "@angular/material/core";
import { CookieService } from "ngx-cookie-service";
import { AuthModule, SalesModule } from "./modules";
import { AuthInterceptor } from "./modules/auth/auth.interceptor";
import { SharedModule } from './shared';
import { LoaderInterceptor } from "./shared/interceptor/loader.interceptor";
import { RoleGuard } from "./modules/auth/guard/role.guard";



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    SalesModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: "es-ES"},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    CookieService,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
