import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee, Game } from 'src/app/models';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent { 
  
  employees$! : Subscription;
  constructor(private service : EmployeeService,public dialog: Dialog){}
  employees : Employee[] = [];
  currentTab = 'view';
  games!:Game[]

  

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
            complete: () => {
              this.dialog.closeAll();
            }

          });
          
        }
      });  
  }
  
  changeTab(tab:string){
    this.currentTab = tab
  }
}
