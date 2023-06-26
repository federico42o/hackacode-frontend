import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

  constructor(private service:TicketService) { }
  tickets$!:Subscription;
  tickets!: Ticket[];
  ngOnInit(): void {
    this._loadTickets();
  }

  private _loadTickets():void{
    this.tickets$ = this.service.getAll().subscribe(
      (data:any) => {
        this.tickets = data.content;
      }
    )
  }

}
