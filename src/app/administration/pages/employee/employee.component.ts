import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  constructor(private fb : FormBuilder){}
  buyerForm! : FormGroup;
  ngOnInit(): void {
    this.buyerForm = this.fb.group({
      name:["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      surname:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required, Validators.email]],
      birthdate:["",[Validators.required]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
    });
  }


  onSubmit():void{
    if(this.buyerForm.invalid){
      return;
    }else{

    console.log(this.buyerForm.value)
    }
  }

}
