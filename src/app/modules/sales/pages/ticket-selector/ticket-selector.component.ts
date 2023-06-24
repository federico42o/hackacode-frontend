import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models';
import { Data } from 'src/app/models/data';
import { Game } from 'src/app/models/game';
import { TicketVip } from 'src/app/models/ticket-vip';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-ticket-selector',
  templateUrl: './ticket-selector.component.html',
  styleUrls: ['./ticket-selector.component.css']
})
export class TicketSelectorComponent implements OnInit{
 constructor(private authService : AuthService) { }
 tickets: any[] = [];
 input!: any;
 show: boolean = false;
 game!: Game;
 game$!: Subscription;
 ngOnInit(): void {
   this.game$ = this.authService.getCurrentGame().subscribe({
      next: game => {
        this.game = game;
      }
   });

 }
 
 addTicketForms() {
  
   this.tickets = Array(this.input).fill(0).map((x, i) => i);
    this.show = !this.show;
 }
 ticketData:Data[] = [];
 send(data : Data){
  
  this.ticketData = [...this.ticketData, data];
 }

}
