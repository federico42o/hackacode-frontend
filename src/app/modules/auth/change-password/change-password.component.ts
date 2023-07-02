import { Component, Input, OnInit } from '@angular/core';
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
  isLoading:boolean = false;
  errorMessage:string ='';
  @Input() expirationTime!:Date;

  strength!:any;
  ngOnInit(): void {
    this.router.params.subscribe((params)=>{
      const token = params['token'];
      this.token = token;

    })
    this.changeForm = this.fb.group({
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirm: ['',[Validators.required,Validators.minLength(8)]],
    });
    
  }

  onSubmit(){
    if(this.changeForm.invalid){
      return;
    }
    this.isLoading = !this.isLoading;
    this.passwordService.changePassword({password:this.changeForm.value.password,repeatPassword:this.changeForm.value.confirm,token:this.token}).subscribe(
      {next:(data:any)=>{
        
      },

        error:(error:any)=>{
          this.isLoading = false;
          this.errorMessage = "El link ha expirado. Por favor, solicite un nuevo link de recuperación de contraseña";
          
        },
        complete:()=>{
          this.route.navigate(['/auth/login']);
          
        }
      }
    );
  }

}
