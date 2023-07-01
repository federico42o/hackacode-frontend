import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ticket } from 'src/app/models';
import { Buyer } from 'src/app/models/buyer';
import { Game } from 'src/app/models/game';
import { TicketDetail } from 'src/app/models/detail/ticket-detail';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CanComponentDeactivate } from 'src/app/shared';
import { TicketService } from '../../services/ticket.service';
import { BuyerService } from 'src/app/modules/administration/services/buyer.service';

@Component({
  selector: 'app-ticket-selector',
  templateUrl: './ticket-selector.component.html',
  styleUrls: ['./ticket-selector.component.css']
})
export class TicketSelectorComponent implements OnInit, CanComponentDeactivate{
 constructor(private authService : AuthService,private service: TicketService) { }

 tickets$!:Subscription;
 tickets!:Ticket[];
 formTickets:any[] =[];
 input!: any;
 show: boolean = false;
 game!: Game;
 game$!: Subscription;
 changes:boolean = true;
 tab:string = 'ticket';
 ngOnInit(): void {
   this.game$ = this.authService.getCurrentGame().subscribe({
      next: game => {
        this.game = game;
      }
   });
  this.tickets$ = this.service.getAll().subscribe({
    next: (data:any)=>{
      this.tickets = data.content;
    }
  });

 }
 
 addTicketForms() {
    
    this.formTickets = Array(this.input).fill(0).map((x, i) => i);

    this.show = !this.show;
 }
 ticketData:TicketDetail[] = [];
 send(data : TicketDetail){
  
  this.ticketData = [...this.ticketData, data];
 }

 canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (this.changes) {
    return confirm('¿Estás seguro de que deseas salir? Se perderán los cambios sin guardar.');
  }
  return true;
}

changeTab(tab:string){
  if(this.canDeactivate()){

    this.tab = tab;
  }
}
}
