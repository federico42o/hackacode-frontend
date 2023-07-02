import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages';
import { GameComponent } from './pages/game/game.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ConfirmExitGuard } from 'src/app/shared/guard/confirm-exit.guard';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  {path:'new-ticket', component: TicketSelectorComponent,canDeactivate: [ConfirmExitGuard]},
  {path: 'game', component: GameComponent},
  {path: 'entrada', component: TicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ConfirmExitGuard]
})
export class SalesRoutingModule { }
