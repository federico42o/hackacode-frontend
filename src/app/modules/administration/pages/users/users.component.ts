import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserEmployeeService } from '../../services/user-employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{


  constructor(private service: UserEmployeeService){}

  headers : string[] = ["Nombre", "Apellido", "Fecha de nacimiento", "DNI"];
  columns : string[] = ["name", "surname", "birthdate", "dni"];
  employees : User[] = [];
  ngOnInit(): void {
    this.service.getAll().subscribe(
      {
        next:(data:any) => {
          this.employees = data.content
        }
      })
  }

}
