import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit{
  
  constructor(private fb : FormBuilder){}
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
    }else{

    console.log(this.buyerForm.value)
    }
  }
}
