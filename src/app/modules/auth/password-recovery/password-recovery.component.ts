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

  ngOnInit(): void {

    this.recoveryForm = this.fb.group({
      username: ['',[Validators.required,Validators.email,Validators.minLength(8)]],
    });
    
  }

  onSubmit(){
    this.passwordService.requestMail(this.recoveryForm.value).subscribe(
      {next:(data:any)=>{

        if(data.expiration){
          this.expiration = data.expiration
          console.log(this.expiration)
        }
      },

        error:(error:any)=>{
          console.log(error);
        },
        complete:()=>{
          
          
          
        }
      }
    );
  }

}
