import { Component, OnInit } from '@angular/core';
import { User, UserRole } from 'src/app/models';
import { UserEmployeeService } from '../../services/user-employee.service';
import { UserTable } from 'src/app/models/user-table';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private service: UserEmployeeService, public dialog : Dialog,private roleService:RoleService) { }

  columns = [
    {
      key: "name",
      type: "text",
      label: "Nombre"
  },
  {
      key: "surname",
      type: "text",
      label: "Apellido"
  },
  {
      key: "dni",
      type: "text",
      label: "DNI"
  },
  {
      key: "username",
      type: "text",
      label: "Usuario"
  },
  {
    key: "roles",
    type: "role",
    label: "Roles"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: "Acciones"
  }
  ]
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
    this._updateTable()
  }
  onDataSave(data:UserTable):void{

      if (data) {
        this.service.update(data).subscribe({
          next: () => {
            this._updateTable();
          }
        });
      }

  }

  setData(userList: User[]): UserTable[] {
    return userList.map((user) => {
      const usuario: UserTable = {
        id: user.id,
        password: "",
        name: user.employee.name,
        surname: user.employee.surname,
        employee: user.employee,
        dni: user.employee.dni,
        username: user.username,
        roles: user.roles
      };
      return usuario;
    });
  }



  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.users = data.content;
          this.data = this.setData(data.content)
        }
      })
  }

  onClientAdded():void{
    this._updateTable();
  }


}
