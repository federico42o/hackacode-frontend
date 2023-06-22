import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserEmployeeService } from '../../services/user-employee.service';
import { UserTable } from 'src/app/models/user-table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private service: UserEmployeeService) { }

  headers: string[] = ["Nombre", "Apellido", "DNI", "Usuario", "Roles"];
  columns: string[] = ["nombre", "apellido", "dni", "usuario", "roles"];
  data: any[] = []
  ngOnInit(): void {
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.data = this.setData(data.content)
        }
      })
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

}
