import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Game } from 'src/app/models';
import { TicketDetail } from 'src/app/models/detail/ticket-detail';
import { SaleService } from '../../services/sale.service';
import { TicketDetailService } from '../../services/ticket-detail.service';
import { SaleRequest } from 'src/app/models/sale';

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
        this.saleService.save(saleDTO).subscribe({
          next: (data) => {
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
