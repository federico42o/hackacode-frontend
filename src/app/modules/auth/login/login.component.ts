import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder,private route : Router, private loginService : AuthService) { }
  loginForm!:FormGroup;
  

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email,Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    });
    
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      {next:(data:any)=>{
        
      },

        error:(error:any)=>{
          console.log(error);
        },
        complete:()=>{
          this.route.navigate(['/']);
          
        }
      }
    );
  }
}
