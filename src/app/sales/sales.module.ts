import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { AddTicketFormComponent, TicketSelectorComponent } from '../pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    TicketSelectorComponent,
    AddTicketFormComponent,
  ],
  imports: [
    CommonModule,

    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    TicketSelectorComponent,
    AddTicketFormComponent,
  ]
})
export class SalesModule { }
