import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages';
import { GameComponent } from './pages/game/game.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { ConfirmExitGuard } from 'src/app/shared/guard/confirm-exit.guard';
import { RoleGuard } from '../auth/guard/role.guard';

const routes: Routes = [
  {path:'ventas', component: TicketSelectorComponent,canDeactivate: [ConfirmExitGuard],canActivateChild:[RoleGuard]},
  {path: 'juegos', component: GameComponent,canActivateChild:[RoleGuard]},
  {path: 'entradas', component: TicketComponent,canActivateChild:[RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ConfirmExitGuard]
})
export class SalesRoutingModule { }
