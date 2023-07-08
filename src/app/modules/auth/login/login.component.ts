import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/user/login-request';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder,private loginService : AuthService) { }
  loginForm!:FormGroup;
  isLoading = false;
  errorMessage ='';
  viewPassword = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required,Validators.email,Validators.minLength(8),Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}')]],
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
      },
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },complete:()=>{
        this.isLoading = false;
      }

    });
  }
}
