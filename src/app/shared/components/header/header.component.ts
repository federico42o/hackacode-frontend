import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideDown', [
      state('in', style({ height: '*', opacity: 1 })),
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-out', style({ height: 0, opacity: 0 }))
      ])
    ])
  ],
})
export class HeaderComponent implements OnInit{
  
  constructor(private service : AuthService,private route: Router) {}
  user!:User;
  menuOpen:boolean = false;
  
  
  ngOnInit(): void {
    this.service.getCurrentUser().subscribe((user)=>{
      this.user = user;
    });
  }


  logout():void{
    this.service.logout();
    this.route.navigate(['/auth/login']);
    

  }

  toggleTab():void{
    this.menuOpen = !this.menuOpen;
   
  }

}
