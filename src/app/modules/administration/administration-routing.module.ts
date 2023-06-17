import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BuyerComponent } from './pages/buyer';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes: Routes = [
  {path:'buyer', component:BuyerComponent},
  {path:'employee', component:EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
