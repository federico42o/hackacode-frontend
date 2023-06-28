import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Game, Ticket } from 'src/app/models';
import { Data } from 'src/app/models/data';
import { TicketDetail } from 'src/app/models/ticket-detail';
import { TicketType } from 'src/app/models/ticket-type';
import { TicketDetailService } from '../../services/ticket-detail.service';
import { SaleService } from '../../services/sale.service';
import { SaleRequest } from 'src/app/models/sale-request';
import { TicketDetailRequest } from 'src/app/models/ticket-detail-request';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryComponent implements OnChanges{
  @ViewChild('content') content!: ElementRef;
  @Input() currentGame!: Game;
  @Input() ticketData!: TicketDetail[];
  @Input() ticketCount:number = 0.0;
  isLoading:boolean=false;
  total: number = 0;
  constructor(private detailService:TicketDetailService,private saleService:SaleService){
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketData']) {
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = 0;
    if (this.ticketData) {
      for (const detail of this.ticketData) {
        this.total += detail.ticket.price
    }
  }
  }
  displayPrice(ticket: TicketDetail): number {
    return 0
  }
  tickets!:TicketDetail[];
  onSubmit(): void {
    this.tickets = [];
    this.isLoading = true;
    console.log(this.tickets);
  
    const saveTicketDetailsObservables = this.ticketData.map((detail: TicketDetail) =>
      this.detailService.save(detail)
    );
  
    forkJoin(saveTicketDetailsObservables).subscribe({
      next: (data: string[]) => {
        data.forEach((ticketId: string, i: number) => {
          const detail: TicketDetail = this.ticketData[i];
          detail.id = ticketId;
          this.tickets.push(detail);
        });
        const saleDTO: SaleRequest = {
          ticketsDetail: this.tickets,
          game: this.currentGame
        };
        console.log(saleDTO);
        this.saleService.save(saleDTO).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
          complete:()=>{
            this.isLoading = false;
          }
        });
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
  cancel():void{
    this.ticketData = [];
    location.reload();
  }


}
