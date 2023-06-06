import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { BuyerComponent } from './pages/buyer';
import { EmployeeComponent } from './pages/employee/employee.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    BuyerComponent,
    EmployeeComponent,
    TableComponent,
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
