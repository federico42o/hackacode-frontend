import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages';
import { GameComponent } from './pages/game/game.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

const routes: Routes = [
  {path:'new-ticket', component: TicketSelectorComponent},
  {path: 'game', component: GameComponent},
  {path: 'entrada', component: TicketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
