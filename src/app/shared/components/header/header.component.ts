import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class HeaderComponent implements OnInit,OnDestroy{
  
  constructor(private service : AuthService,private route: Router) {}
  user!:User;
  subscription$!: Subscription;
  logged!:boolean;
  menuOpen!:boolean;
  
  ngOnInit(): void {
    this.menuOpen=false;
    this.subscription$ = this.service.getCurrentUser().subscribe({
      next:(user:User)=>{
        this.user = user;  
        this.logged = this.service.isLogged();
    },complete:()=>{

    }
  });
  }


  logout():void{
    this.logged = false;
    this.service.logout();
    this.route.navigate(['/auth/login']);
    

  }

  toggleTab():void{
    this.menuOpen = !this.menuOpen;
  }

  ngOnDestroy():void{
    if(this.subscription$){
      this.subscription$.unsubscribe();
    }
    this.menuOpen = false;
  }

}
