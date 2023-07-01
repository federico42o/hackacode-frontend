import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Game } from 'src/app/models';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { DateValidator } from 'src/app/shared/utils/date-validator';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit,OnDestroy{

  constructor(private fb : FormBuilder,
    private gameService: GameService,
    private service : EmployeeService,
    ){}

  @Output() employeeAdded : EventEmitter<void> = new EventEmitter<void>();  
  employeeForm! : FormGroup;
  employee! : Employee;
  games$!: Subscription;
  games!: Game[];
  date!: Date;
  ngOnInit(): void {
    this.games$ = this.gameService.getAll().subscribe({
      next: (data: any) => {
        this.games = data.content;
      },
    });
    this.employeeForm = this.fb.group({
      name:["", [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*")]],
      surname:["",[Validators.required,Validators.minLength(3),Validators.maxLength(50), Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*")]],
      birthdate:["",[Validators.required,DateValidator.isAfter]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
      game:[null,]
    });
    this.date = new Date();
  }



  onSubmit():void{
    if(this.employeeForm.invalid){
      console.log(this.employeeForm.errors)
    }
    this.service.create(this.employeeForm.value).subscribe({
      next: (data:any) => {
      },
      error: (err:any) => {
        console.log(err);
      },
      complete: () => {
        this.employeeAdded.emit();
        this.employeeForm.reset();
      }
    });
  }
  ngOnDestroy(): void {
    this.games$.unsubscribe();
  }
}
