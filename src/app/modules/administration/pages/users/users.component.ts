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
  users: User[] = [];
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
    let usuario = {
      nombre: "",
      apellido: "",
      dni: "",
      usuario: "",
      roles: ""
    }
    let usuarios = []
    for (const user of userList) {
      
        usuario.nombre = user.employee.name
        usuario.apellido = user.employee.surname
        usuario.dni = user.employee.dni
        usuario.usuario = user.username
        for (const roles of user.roles) {
          usuario.roles = roles.role + " "
        }
        usuarios.push(usuario)      
    }
    return usuarios
  }

}
