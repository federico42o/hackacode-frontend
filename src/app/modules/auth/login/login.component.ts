import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from 'src/app/models/user/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder,private route : Router, private loginService : AuthService) { }
  loginForm!:FormGroup;
  isLoading:boolean = false;
  errorMessage:string ='';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required,Validators.email,Validators.minLength(8),Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}')]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    });
    
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.isLoading = !this.isLoading;

    const loginRequest:LoginRequest = {
      username:this.loginForm.value.username,
      password:this.loginForm.value.password
    }

    this.loginService.login(loginRequest).subscribe({
      next: () => {
        this.loginService.initializeCurrentUser();
        this.route.navigate(['/']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    });
  }
}
