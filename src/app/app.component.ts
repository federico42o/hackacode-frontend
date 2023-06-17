import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './modules/auth/services/user.service';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hackacode-theme-park';
  constructor(public route: Router,private service : UserService) {}
  ngOnInit(): void { }
  
}
