import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Game, Ticket } from 'src/app/models';
import { Data } from 'src/app/models/data';
import { TicketType } from 'src/app/models/ticket-type';
import jspdf, { jsPDF } from 'jspdf';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryComponent implements OnChanges{
  @ViewChild('content') content!: ElementRef;
  @Input() currentGame!: Game;
  @Input() ticketData!: Data[];
  @Input() ticketCount:number = 0.0;
  total: number = 0;
  constructor(){
  console.log(this.content)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketData']) {
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = 0;
    if (this.ticketData) {
      for (const ticket of this.ticketData) {
        if (ticket.type === TicketType.VIP) {
          this.total += ticket.amount;
        } else {
          this.total += this.currentGame.price;
        }
      }
    }
  }

  displayPrice(ticket: Data): number {
    if (ticket.type === TicketType.VIP) {
      return ticket.amount;
    } else {
      return this.currentGame.price;
    }
  }
  
  generatePdf():void{
    let doc = new jsPDF();
    doc.html(this.content.nativeElement);
    doc.save('test.pdf')
    console.log(doc)
    console.log(this.content)

  }

  cancel(tickets:any[]):void{
    
  }
}
