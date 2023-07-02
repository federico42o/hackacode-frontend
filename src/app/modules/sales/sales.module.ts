import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TicketSelectorComponent } from './pages';
import { AddTicketFormComponent } from './components';
import { SharedModule } from 'src/app/shared';
import { GameComponent } from './pages/game/game.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { SummaryComponent } from './components/summary/summary.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { SalesComponent } from './pages/sales/sales.component';



@NgModule({
  declarations: [
    TicketSelectorComponent,
    AddTicketFormComponent,
    GameComponent,
    GameFormComponent,
    SummaryComponent,
    GameCardComponent,
    TicketComponent,
    CreateTicketComponent,
    TicketCardComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    
    
  ],
  exports: [
    TicketSelectorComponent,
    AddTicketFormComponent,
    GameFormComponent,
    GameComponent,
    GameCardComponent,
    TicketComponent,
    CreateTicketComponent,
    TicketCardComponent,
    SalesComponent
  ]
})
export class SalesModule { }
