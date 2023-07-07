import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employee, Game } from 'src/app/models';
import { DateValidator } from 'src/app/shared/utils/date-validator';
import { EmployeeService } from '../../services/employee.service';
import { GameService } from '../../services/game.service';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';


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
      next: (data: PaginationResponse<Game>) => {
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
      return
    }
    this.service.create(this.employeeForm.value).subscribe({
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
