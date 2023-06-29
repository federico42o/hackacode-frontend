import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent,BuyerComponent,UsersComponent } from './pages';
import { TableComponent,EmployeeFormComponent } from './components';
import { SharedModule } from 'src/app/shared';
import { TableUsersComponent } from './pages/users/table-users/table-users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BuyerFormComponent } from './components/buyer-form/buyer-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BuyerEditFormComponent } from './components/buyer-edit-form/buyer-edit-form.component';
import { EmployeeTableComponent } from './pages/employee/employee-table/employee-table.component';
import { BuyerTableComponent } from './pages/buyer/buyer-table/buyer-table.component';


@NgModule({
  declarations: [
    BuyerComponent,
    EmployeeComponent,
    TableComponent,
    UsersComponent,
    EmployeeFormComponent,
    TableUsersComponent,
    UserFormComponent,
    BuyerFormComponent,
    BuyerEditFormComponent,
    EmployeeTableComponent,
    BuyerTableComponent,
    
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule
  ],
  exports:[
    BuyerComponent,
    EmployeeComponent,
    TableComponent,
    UsersComponent,
    EmployeeFormComponent,
    TableUsersComponent,
    UserFormComponent,
    BuyerFormComponent,
    BuyerEditFormComponent,
    EmployeeTableComponent,
    BuyerTableComponent,
  ]
})
export class AdministrationModule { }
