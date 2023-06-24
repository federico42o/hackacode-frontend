import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent,BuyerComponent,UsersComponent } from './pages';
import { TableComponent,EmployeeFormComponent } from './components';
import { SharedModule } from 'src/app/shared';
import { DialogComponent } from './components/dialog/dialog.component';
import { TableUsersComponent } from './pages/users/table-users/table-users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { BuyerFormComponent } from './components/buyer-form/buyer-form.component';
import { MatExpansionModule } from '@angular/material/expansion';


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
    TableUsersComponent
  ]
})
export class AdministrationModule { }
