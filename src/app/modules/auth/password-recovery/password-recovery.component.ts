import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordRecoveryService } from '../services/password-recovery.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit{



  constructor(private fb: FormBuilder,private route : Router,private router:ActivatedRoute,private passwordService:PasswordRecoveryService) { }
  recoveryForm!:FormGroup;
  expiration!:Date;
  sended:boolean = false;
  isLoading:boolean = false;
  errorMessage:string ='';
  ngOnInit(): void {

    this.recoveryForm = this.fb.group({
      username: ['',[Validators.required,Validators.email,Validators.minLength(8)]],
    });
    
  }

  onSubmit(){
    if(this.recoveryForm.invalid){
      return;
    }

    this.isLoading = true;
    this.passwordService.requestMail(this.recoveryForm.value).subscribe(
      {next:(data:any)=>{

        if(data.expiration){
          this.expiration = data.expiration
        }
      },

        error:(error:any)=>{
          this.isLoading = false;
          if(error.status == 404){
            console.log(error.error.message)
            this.errorMessage = error.error.message;
            
          }
        },
        complete:()=>{
          this.sended = true;
          this.isLoading = false;
          
          
        }
      }
    );
  }

}
