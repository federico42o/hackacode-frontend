import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages';

const routes: Routes = [
  {path:'new-ticket', component: TicketSelectorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
