import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb: FormBuilder,private route : Router) { }
  loginForm!:FormGroup;

  

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email,Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    });
    
  }

  onSubmit(){
    this.route.navigate(['/']);
  }
}
