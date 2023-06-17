import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  
  user!: User;
  constructor(private route: Router,private service : AuthService,private userService : UserService) { }
  ngOnInit(): void {
      this.userService.getCurrentUser().subscribe((user:User)=>{
        this.user = user;
      }
      );
  }

  logout() {
    this.service.logout();
    this.route.navigate(['/login']);
  }
}
