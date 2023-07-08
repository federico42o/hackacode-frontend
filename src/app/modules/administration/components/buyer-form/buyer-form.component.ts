import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuyerService } from '../../services/buyer.service';
import { BuyerRequest } from 'src/app/models';
import { DateValidator } from 'src/app/shared/utils/date-validator';


@Component({
  selector: 'app-buyer-form',
  templateUrl: './buyer-form.component.html',
  styleUrls: ['./buyer-form.component.css']
})
export class BuyerFormComponent implements OnInit{

  constructor(private fb: FormBuilder, private service: BuyerService) { }
  @Output() clientAdded: EventEmitter<void> = new EventEmitter<void>();
  clientForm! : FormGroup;
  date!:Date;
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name:["", [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*")]],
      surname:["",[Validators.required,Validators.minLength(3),Validators.maxLength(50), Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*")]],
      birthdate:["",[Validators.required,DateValidator.isAfter]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
    });
    this.date = new Date();
  }

  showPw():void{
    const input = document.getElementById("password") as HTMLInputElement;
    if(input.type === "password"){
      input.type = "text";
    }else{
      input.type = "password";
    }
  }


  onSubmit():void{
    const buyer :BuyerRequest = {
      name : this.clientForm.get('name')?.value,
      surname : this.clientForm.get('surname')?.value,
      dni : this.clientForm.get('dni')?.value,
      birthdate : this.clientForm.get('birthdate')?.value,

    }
    if(this.clientForm.invalid){
      return;
    }else{

    this.service.create(buyer).subscribe(
      {
      complete: () =>{
        this.clientForm.reset();
        this.clientAdded.emit();
      }

    });
    }
  }


}
