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

  headers : string[] = ["ID","Nombre", "Apellido","DNI", "Fecha de nacimiento",  "Juego asignado"];
  columns : string[] = ["id","name", "surname","dni", "birthdate", "game"];
  employees : Employee[] = [];
  currentTab:string = 'add';
  ngOnInit(): void {
    this._updateTable()
    
  }




  handleEdit(id: number): void {}

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
            },
            complete: () => {
              this._updateTable();
              this.dialog.closeAll();
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
  onClientAdded():void{
    this._updateTable()
  }

  setTab(tab:string){
    this.currentTab = tab
  }
  ngOnDestroy(): void {
    this.employees$.unsubscribe();
  }
}
