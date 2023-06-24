import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Game, Ticket } from 'src/app/models';
import { TicketVip } from 'src/app/models/ticket-vip';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryComponent implements OnChanges{
  
  @Input() currentGame!: Game;
  @Input() ticketData!: any[];
  @Input() ticketCount:number = 0.0;
  total: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketData']) {
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = 0;
    if (this.ticketData) {
      for (const ticket of this.ticketData) {
        if ('price' in ticket) {
          this.total += ticket.price;
        } else if (ticket.game && 'price' in ticket.game) {
          this.total += ticket.game.price;
        }
      }
    }
  }

  displayPrice(ticket: Ticket | TicketVip): number {
    if ('price' in ticket) {
      return ticket.price;
    } else {
      return ticket.game.price;
    }
  }

  generatePdf(tickets:any[]):void{

  }

  cancel(tickets:any[]):void{
    
  }
}
