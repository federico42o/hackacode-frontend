import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { User, UserRole, UserTable } from 'src/app/models';
import { RoleService } from '../../services/role.service';
import { UserEmployeeService } from '../../services/user-employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(public dialog : Dialog,private roleService:RoleService) { }
  data: UserTable[] = []
  users!:User[];
  currentTab:string = 'add';
  roles!:UserRole[]
  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next:(data:UserRole[])=>{
        this.roles = data
      }
    });
    
  }

}

