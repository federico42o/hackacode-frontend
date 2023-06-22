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
    public dialogRef: DialogRef<EmployeeFormComponent>,
    @Inject(DIALOG_DATA) public data: any
    ){}

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

    

    if (this.data.mode === 'update') {
      this.service.getByID(this.data.id).subscribe({
        next: (data: any) => {
          console.log(data);
          this.employee = data;
          this.employeeForm.patchValue({
            name: this.employee.name,
            surname: this.employee.surname,
            dni: this.employee.dni,
            birthdate: this.employee.birthdate,
            game: this.employee.game,
          });
        },
      });
    }
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
    if(this.data.mode === "create"){
    if(this.employeeForm.value.game == "none"){
      this.employeeForm.value.game = null;
    }

    this.service.create(this.employeeForm.value as Employee).subscribe(
      {
        error: error => console.error('There was an error!', error),
        complete: () => {
          this.employeeForm.reset();}
      });
    }else if(this.data.mode === 'update'){

      const newData: Employee = {
        id: this.data.id,
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        dni: this.employeeForm.value.dni,
        birthdate: this.employeeForm.value.birthdate,
        game: this.employeeForm.value.game ? JSON.parse(this.employeeForm.value.game) : 'null',
      };
      this.service.update(newData, this.data.id).subscribe({
        next: (data: any) => {
          console.log(data);
        },
      });

      
    }
  }
  ngOnDestroy(): void {
    this.games$.unsubscribe();
  }
}
