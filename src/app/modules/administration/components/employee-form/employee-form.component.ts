import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit{


  constructor(private fb : FormBuilder,private service : EmployeeService){}
  employeeForm! : FormGroup;
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name:["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      surname:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      birthdate:["",[Validators.required]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
      game:["none",]
    });
  }




  onSubmit():void{
    if(this.employeeForm.invalid){
      return;
    }
    if(this.employeeForm.value.game == "none"){
      this.employeeForm.value.game = null;
    }
    this.service.create(this.employeeForm.value as Employee).subscribe(
      {
        error: error => console.error('There was an error!', error),
        complete: () => {
          this.employeeForm.reset();
          console.log('Employee created')}
      });
  }
}
