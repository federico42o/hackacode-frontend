import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/models';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {

  @Input() ticket!:Ticket;

  isHidden:boolean = false;

}
