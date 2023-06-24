import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TicketSelectorComponent } from './pages';
import { AddTicketFormComponent } from './components';
import { SharedModule } from 'src/app/shared';
import { GameComponent } from './pages/game/game.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { AdministrationModule } from '../administration';
import { SummaryComponent } from './components/summary/summary.component';


@NgModule({
  declarations: [
    TicketSelectorComponent,
    AddTicketFormComponent,
    GameComponent,
    GameFormComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AdministrationModule
  ],
  exports: [
    TicketSelectorComponent,
    AddTicketFormComponent,
    GameFormComponent,
    GameComponent
  ]
})
export class SalesModule { }
