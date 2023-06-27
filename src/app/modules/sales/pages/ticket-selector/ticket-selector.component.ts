import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { TicketDetail } from 'src/app/models/ticket-detail';
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
 ticketData:TicketDetail[] = [];
 send(data : TicketDetail){
  
  this.ticketData = [...this.ticketData, data];
 }

}
