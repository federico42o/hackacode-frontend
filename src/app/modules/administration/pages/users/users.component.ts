import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserEmployeeService } from '../../services/user-employee.service';
import { UserTable } from 'src/app/models/user-table';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private service: UserEmployeeService, public dialog : Dialog) { }

  headers: string[] = ["Nombre", "Apellido", "DNI", "Usuario", "Roles"];
  columns: string[] = ["nombre", "apellido", "dni", "usuario", "roles"];
  data: any[] = []

  ngOnInit(): void {
    this._updateTable()
  }

  setData(userList: User[]): UserTable[] {
    return userList.map((user) => {
      const usuario: UserTable = {
        nombre: user.employee.name,
        apellido: user.employee.surname,
        dni: user.employee.dni,
        usuario: user.username,
        roles: user.roles.map((role) => role.role).join("/")
      };
      return usuario;
    });
  }

  openDialog() : void{
    const dialogRef = this.dialog.open(UserFormComponent,{
      width: '60%',
      height: '50%',
    });
    dialogRef.closed.subscribe(result => {
      this._updateTable()
    });
  }

  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.data = this.setData(data.content)
        }
      })
  }
}
