import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models';
import { Dialog } from '@angular/cdk/dialog';
import { EmployeeFormComponent } from '../../components';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy{ 
  
  employees$! : Subscription;
  constructor(private service : EmployeeService,public dialog: Dialog){}

  headers : string[] = ["Nombre", "Apellido", "Fecha de nacimiento", "DNI", "Juego asignado"];
  columns : string[] = ["name", "surname", "birthdate", "dni","game"];
  employees : Employee[] = [];
  ngOnInit(): void {
    this._updateTable()
    
  }

  openDialog(mode:string,id :number) : void{
    const dialogRef = this.dialog.open(EmployeeFormComponent,{
      width: '60%',
      height: '50%',
      data: {mode,id}
    });
    dialogRef.closed.subscribe(result => {
      this._updateTable()
    });
  }




  handleEdit(id: number): void {
    this.openDialog('update',id);
  }

  handleDelete(id:number): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height: '10%',
      data: {
        message: "¿Desea borrar este empleado?",
        id,
      }
      });
      dialogRef.componentInstance?.accept.subscribe({
        next: () => {
          console.log(id)
          this.service.delete(id).subscribe({
            next: (data:any) => {
              console.log(data)
            },
            complete: () => {
              this._updateTable();
            }

          });
          
        },
        error: (err:any) => {
          console.log(err);
        },
        complete: () => {
          this._updateTable();
        }
      });  
  }
  private _updateTable() : void{
    this.employees$ = this.service.getAll().subscribe(
      {
        next:(data:any) => {
          console.log(data)
          this.employees = data.content
        }
      })
  }

  ngOnDestroy(): void {
    this.employees$.unsubscribe();
  }
}
