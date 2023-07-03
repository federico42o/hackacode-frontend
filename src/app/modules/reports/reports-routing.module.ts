import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { RoleGuard } from '../auth/guard/role.guard';

const routes: Routes = [
  {path: '', component: ReportsComponent,canActivateChild: [RoleGuard],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
