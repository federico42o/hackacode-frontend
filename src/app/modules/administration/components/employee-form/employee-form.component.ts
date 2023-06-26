import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Game } from 'src/app/models';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';


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
  ngOnInit(): void {
    this.games$ = this.gameService.getAll().subscribe({
      next: (data: any) => {
        this.games = data.content;
      },
    });
    this.employeeForm = this.fb.group({
      name:["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      surname:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      birthdate:["",[Validators.required]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
      game:[null,]
    });
  }



  onSubmit():void{
    if(this.employeeForm.invalid){
      return;
    }      
    }
  ngOnDestroy(): void {
    this.games$.unsubscribe();
  }
}
