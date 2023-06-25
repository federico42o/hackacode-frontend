import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordRecoveryService } from '../services/password-recovery.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,private route : Router,private router:ActivatedRoute,private passwordService:PasswordRecoveryService) { }
  changeForm!:FormGroup;
  token!:string;
  weak!:boolean;
  safe!:boolean;
  good!:boolean;

  strength!:any;
  ngOnInit(): void {
    this.router.params.subscribe((params)=>{
      const token = params['token'];
      this.token = token;
      console.log(this.token)
    })
    this.changeForm = this.fb.group({
      password: ['',[Validators.required,Validators.email,Validators.minLength(8)]],
      confirm: ['',[Validators.required,Validators.email,Validators.minLength(8)]],
    });
    
  }

  onSubmit(){
    console.log(this.changeForm.value)
    this.passwordService.changePassword({password:this.changeForm.value.password,confirm:this.changeForm.value.confirm,token:this.token},this.token).subscribe(
      {next:(data:any)=>{
        
      },

        error:(error:any)=>{
          console.log(error);
        },
        complete:()=>{
          this.route.navigate(['/auth/login']);
          
        }
      }
    );
  }

  passwordCheck() {
    this.changeForm.get('password')!.valueChanges.subscribe(input => {
      console.log(input);
  
      const passwordLength = input.length;
  
      this.weak = passwordLength < 5;
      this.safe = passwordLength >= 5 && passwordLength < 8;
      this.good = passwordLength >= 8;
    });
  }
}
