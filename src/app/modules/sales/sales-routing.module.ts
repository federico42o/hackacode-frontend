import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages';
import { GameComponent } from './pages/game/game.component';

const routes: Routes = [
  {path:'new-ticket', component: TicketSelectorComponent},
  {path: 'game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
