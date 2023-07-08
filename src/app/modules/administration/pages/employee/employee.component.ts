import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee, Game } from 'src/app/models';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EmployeeService } from '../../services/employee.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy{ 
  
  employees$! : Subscription;
  constructor(private service : EmployeeService,public dialog: Dialog,private gameService: GameService,){}
  employees : Employee[] = [];
  currentTab:string = 'view';
  games!:Game[]
  ngOnInit(): void {}
  

  onDelete(id:number){
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
            error:(err:any)=>{
             
            }
              ,
            complete: () => {
              this.dialog.closeAll();
            }

          });
          
        },
        error: (err:any) => {
          
        },
        complete: () => {
        }
      });  
  }
  
  changeTab(tab:string){
    this.currentTab = tab
  }
  ngOnDestroy(): void {
  
  }
}
