import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { HomeComponent } from './shared/components/home/home.component';
import { InvoiceComponent } from './shared/components/invoice/invoice.component';
import { RoleGuard } from './modules/auth/guard/role.guard';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'sales',
    loadChildren: () =>
      import('./modules/sales/sales.module').then((m) => m.SalesModule),
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    
    data: { module: 'sales' },
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./modules/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { module: 'administration' },
    
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: { module: 'reports' },
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
