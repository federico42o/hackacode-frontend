import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages/ticket-selector/ticket-selector.component';
import { VipTicketComponent } from './components/vip-ticket/vip-ticket.component';
import { GeneralTicketComponent } from './components/general-ticket/general-ticket.component';

const routes: Routes = [
  {path:'', redirectTo: '/', pathMatch: 'full'},
  {path:'new-ticket', component: TicketSelectorComponent},
  {path:'ticket', component: GeneralTicketComponent},
  {path:'vip-ticket', component: VipTicketComponent},
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
