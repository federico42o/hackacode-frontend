import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TicketSelectorComponent } from './pages';
import { AddTicketFormComponent } from './components';
import { SharedModule } from 'src/app/shared';


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
