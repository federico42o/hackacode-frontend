import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent, BuyerComponent, EmployeeComponent} from './pages';

const routes: Routes = [
  
  {path:'buyer', component:BuyerComponent},
  {path:'employee', component:EmployeeComponent},
  {path:'users', component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
