import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerComponent } from './pages/buyer';
import { EmployeeComponent } from './pages/employee/employee.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from 'src/app/shared';
import { UsersComponent } from './pages/users/users.component';


@NgModule({
  declarations: [
    BuyerComponent,
    EmployeeComponent,
    TableComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    BuyerComponent,
    EmployeeComponent,
    TableComponent,
  ]
})
export class AdministrationModule { }
