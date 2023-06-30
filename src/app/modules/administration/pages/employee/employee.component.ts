import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
  employees : Employee[] = [];
  currentTab:string = 'add';
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
              console.log(err)
            }
              ,
            complete: () => {
              this.dialog.closeAll();
            }

          });
          
        },
        error: (err:any) => {
          console.log(err);
        },
        complete: () => {
        }
      });  
  }

  setTab(tab:string){
    this.currentTab = tab
  }
  ngOnDestroy(): void {
  
  }
}
