import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/auth.guard';
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
    path: '',
    loadChildren: () =>
      import('./modules/sales/sales.module').then((m) => m.SalesModule),
    canActivate: [AuthGuard],
    
    
    data: { module: 'sales' },
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
    canActivate: [AuthGuard],
    
    data: { module: 'administration' },
    
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard],
    
    data: { module: 'reports' },
    
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
