import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent, BuyerComponent, EmployeeComponent} from './pages';
import { RoleGuard } from '../auth/guard/role.guard';

const routes: Routes = [
  
  {path:'buyer', component:BuyerComponent,canActivateChild:[RoleGuard]},
  {path:'employee', component:EmployeeComponent,canActivateChild:[RoleGuard]},
  {path:'users', component:UsersComponent,canActivateChild:[RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
