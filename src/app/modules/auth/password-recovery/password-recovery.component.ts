import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '../services/password-recovery.service';
import { RecoveryResponse } from 'src/app/models/password/recovery-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit{



  constructor(private fb: FormBuilder,private passwordService:PasswordRecoveryService) { }
  recoveryForm!:FormGroup;
  expiration!:Date;
  sended = false;
  isLoading = false;
  errorMessage ='';
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
      {next:(data:RecoveryResponse)=>{

        if(data.expiration){
          this.expiration = data.expiration
        }
      },

        error:(error:HttpErrorResponse)=>{
          this.isLoading = false;
          if(error.status == 404){

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
