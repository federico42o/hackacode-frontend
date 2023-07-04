import { Component, OnInit } from '@angular/core';
import { TooltipComponent, TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from 'src/app/models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  
  
  user!: User;
  roles : string[] = [];
  currentTab:string = '';
  tooltipPosition! : TooltipPosition;
  constructor(private route: Router,private service : AuthService,private router: ActivatedRoute) {
    this.tooltipPosition = 'right';
    this.adjustTooltipPosition();
    this.service.initializeCurrentUser();
   }
   adjustTooltipPosition() {
    if (window.innerWidth <= 768) {
      this.tooltipPosition = 'below';
    }
  }
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



  selectTab(tab:string):void{
    switch (tab) {
      case 'EMPLEADO':
        this.currentTab = 'EMPLEADO';

        break;
        case 'VENTAS':
          this.currentTab = 'VENTAS';
          break;
          case 'USUARIOS':
            this.currentTab = 'USUARIOS';
            break;
      case 'CLIENTES':
        this.currentTab = 'CLIENTES';
        break;
      case 'JUEGOS':
        this.currentTab = 'JUEGOS';
        break;
      default:
        this.currentTab = ''; 
    }
  }
  logout() {
    this.service.logout();
    this.route.navigate(['/auth/login']);
  }
}
