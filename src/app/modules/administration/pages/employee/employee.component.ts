import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee, Game } from 'src/app/models';
import { Dialog } from '@angular/cdk/dialog';
import { EmployeeFormComponent } from '../../components';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy{ 
  
  employees$! : Subscription;
  constructor(private service : EmployeeService,public dialog: Dialog,private gameService: GameService,){}

  headers : string[] = ["Nombre", "Apellido","DNI", "Fecha de nacimiento",  "Juego asignado"];
  columns1: string[] = ["name", "surname","dni", "birthdate", "game"];
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
      key: "birthdate",
      type: "date",
      label: "Fecha de nacimiento"
  },
  {
    key: "game",
    type: "select",
    label: "Juego asignado"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: "Acciones"
  }
  ]



  employees : Employee[] = [];
  currentTab:string = 'add';
  games!:Game[]
  ngOnInit(): void {
    this._updateTable()
    this._loadGames();
    
  }


  onDataSave(data:any){
    this.service.update(data,data.id).subscribe({
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this._updateTable()
      }
    })
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
          this.employees = data.content
        }
      })
  }
  private _loadGames():void{
    this.gameService.getAll().subscribe({
      next:(data:any) =>{this.games= data.content}
    });
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
