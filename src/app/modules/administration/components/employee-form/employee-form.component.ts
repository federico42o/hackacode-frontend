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
  buyerForm! : FormGroup;
  ngOnInit(): void {
    this.buyerForm = this.fb.group({
      name:["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      surname:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      birthdate:["",[Validators.required]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
    });
  }




  onSubmit():void{
    if(this.buyerForm.invalid){
      return;
    }

    this.service.create(this.buyerForm.value as Employee).subscribe(
      {
        error: error => console.error('There was an error!', error),
        complete: () => {
          this.buyerForm.reset();
          console.log('Employee created')}
      });
  }
}
