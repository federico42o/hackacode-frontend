import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent,BuyerComponent,UsersComponent } from './pages';
import { TableComponent,EmployeeFormComponent } from './components';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    BuyerComponent,
    EmployeeComponent,
    TableComponent,
    UsersComponent,
    EmployeeFormComponent,
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
    UsersComponent,
    EmployeeFormComponent,
  ]
})
export class AdministrationModule { }
