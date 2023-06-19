import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../../components';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  
  constructor(private service : EmployeeService,public dialog: MatDialog){}

  headers : string[] = ["Nombre", "Apellido", "Fecha de nacimiento", "DNI"];
  columns : string[] = ["name", "surname", "birthdate", "dni"];
  employees : Employee[] = [];
  ngOnInit(): void {
    this._updateTable()
  }

  openDialog() : void{
    const dialogRef = this.dialog.open(EmployeeFormComponent,{
      width: '50%',
      height: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this._updateTable()
    });
  }


  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next:(data:any) => {
          this.employees = data.content
        }
      })
  }

}
