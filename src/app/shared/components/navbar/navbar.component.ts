import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserRole } from 'src/app/models/user-role';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  
  user!: User;
  roles : string[] = [];
  constructor(private route: Router,private service : AuthService) { }
  ngOnInit(): void {
    
      this.service.getCurrentUser().subscribe((user:User)=>{
        this.user = user;
        if(this.user.roles){

          this.user.roles.forEach((role:UserRole)=>{
            this.roles.push(role.role)});
        }
      }
      );
      
  }


  logout() {
    this.service.logout();
    this.route.navigate(['/auth/login']);
  }
}
