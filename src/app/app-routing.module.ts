import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VipTicketComponent } from './components/vip-ticket/vip-ticket.component';
import { GeneralTicketComponent } from './components/general-ticket/general-ticket.component';

const routes: Routes = [
  {path:'', redirectTo: '/', pathMatch: 'full'},
  {path:'ticket', component: GeneralTicketComponent},
  {path:'vip-ticket', component: VipTicketComponent},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
