import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from 'src/app/shared';
import { EmployeeFormComponent } from './components';
import { BuyerFormComponent } from './components/buyer-form/buyer-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BuyerComponent, EmployeeComponent, UsersComponent } from './pages';
import { BuyerTableComponent } from './pages/buyer/buyer-table/buyer-table.component';
import { EmployeeTableComponent } from './pages/employee/employee-table/employee-table.component';
import { TableUsersComponent } from './pages/users/table-users/table-users.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    BuyerComponent,
    EmployeeComponent,
    UsersComponent,
    EmployeeFormComponent,
    TableUsersComponent,
    UserFormComponent,
    BuyerFormComponent,
    EmployeeTableComponent,
    BuyerTableComponent,
    
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule,
  ],
  exports:[
    BuyerComponent,
    EmployeeComponent,
    UsersComponent,
    EmployeeFormComponent,
    TableUsersComponent,
    UserFormComponent,
    BuyerFormComponent,
    EmployeeTableComponent,
    BuyerTableComponent,
  ]
})
export class AdministrationModule { }
