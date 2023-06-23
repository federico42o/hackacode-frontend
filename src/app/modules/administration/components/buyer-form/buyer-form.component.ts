import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';
import { BuyerService } from '../../services/buyer.service';
import { BuyerRequest } from '../../pages';

@Component({
  selector: 'app-buyer-form',
  templateUrl: './buyer-form.component.html',
  styleUrls: ['./buyer-form.component.css']
})
export class BuyerFormComponent implements OnInit{

  constructor(private fb: FormBuilder, private service: BuyerService) { }
  @Output() clientAdded: EventEmitter<void> = new EventEmitter<void>();
  clientForm! : FormGroup;
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name:["",[Validators.required]],
      surname:["",[Validators.required]],
      birthdate:["",[Validators.required]],
      dni:["",[Validators.required]],
    });
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
    const buyer : BuyerRequest = {
      name : this.clientForm.get('name')?.value,
      surname : this.clientForm.get('surname')?.value,
      dni : this.clientForm.get('dni')?.value,
      birthdate : this.clientForm.get('birthdate')?.value,

    }
    console.log(this.clientForm.value)
    if(this.clientForm.invalid){
     console.log("invalid form")
    }else{

    this.service.create(this.clientForm.value).subscribe(
      {next:(data:any) => {
        console.log(data)
      },
      error:(error:any) => {
        console.log(error)
      },
      complete: () =>{
        this.clientForm.reset();
        this.clientAdded.emit();
      }

    });
    }
  }


}
