import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralTicketComponent } from './components/general-ticket/general-ticket.component';
import { VipTicketComponent } from './components/vip-ticket/vip-ticket.component';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { HomeComponent } from './shared/components/home/home.component';
import { InvoiceComponent } from './shared/components/invoice/invoice.component';
import { RoleGuard } from './modules/auth/guard/role.guard';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {path:'invoice',component: InvoiceComponent},
  {path:'ticket', component: GeneralTicketComponent, canActivate: [AuthGuard]},
  {path:'vip-ticket', component: VipTicketComponent, canActivate: [AuthGuard]},
  {path:'forbidden', component:ForbiddenComponent},
  { path: 'sales', 
  loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule),
  canActivate: [AuthGuard],
  data:{module:'sales'},
  canActivateChild : [RoleGuard]
},
  { path: 'administration', 
  loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule), 
  canActivate: [AuthGuard],
  data:{module:'administration'},
  canActivateChild : [RoleGuard] 
   
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
