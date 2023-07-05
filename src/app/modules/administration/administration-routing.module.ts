import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent, BuyerComponent, EmployeeComponent} from './pages';
import { RoleGuard } from '../auth/guard/role.guard';

const routes: Routes = [
  
  {path:'compradores', component:BuyerComponent,canActivateChild:[RoleGuard]},
  {path:'empleados', component:EmployeeComponent,canActivateChild:[RoleGuard]},
  {path:'usuarios', component:UsersComponent,canActivateChild:[RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
