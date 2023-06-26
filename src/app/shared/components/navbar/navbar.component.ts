import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserRole } from 'src/app/models/user-role';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  
  
  user!: User;
  roles : string[] = [];
  currentTab!:string;
  constructor(private route: Router,private service : AuthService,private router: ActivatedRoute) { }
  ngOnInit(): void {

      console.log(this.router.snapshot.url)

      this.service.getCurrentUser().subscribe((user:User)=>{
        this.user = user;
        if(this.user.roles){

          this.user.roles.forEach((role:UserRole)=>{
            this.roles.push(role.role)});
        }
      }
      );
      
  }

  tabFromUrl():void{
    const segments = this.router.snapshot.url;
    if (segments.length > 0) {
      const role = segments[segments.length - 1].path;
      console.log(role);
  
      switch (role) {
        case 'employee':
          this.currentTab = 'EMPLEADO';
          break;
        case 'new-ticket':
          this.currentTab = 'VENTAS';
          break;
        case 'users':
          this.currentTab = 'USUARIOS';
          break;
        case 'buyer':
          this.currentTab = 'CLIENTES';
          break;
        case 'game':
          this.currentTab = 'JUEGOS';
          break;
        default:
          this.currentTab = ''; 
          break;
      }
    }
}

  selectTab(tab:string):void{
    this.currentTab = tab;
  }
  logout() {
    this.service.logout();
    this.route.navigate(['/auth/login']);
  }
}
