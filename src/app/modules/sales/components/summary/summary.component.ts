import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Game } from 'src/app/models';
import { TicketDetail } from 'src/app/models/detail/ticket-detail';
import { SaleService } from '../../services/sale.service';
import { TicketDetailService } from '../../services/ticket-detail.service';
import { SaleRequest } from 'src/app/models/sale';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SummaryComponent implements OnChanges,OnDestroy{
  @ViewChild('content') content!: ElementRef;
  @Input() currentGame!: Game;
  @Input() ticketData!: TicketDetail[];
  @Input() ticketCount:number = 0.0;
  tickets!:TicketDetail[];
  isLoading:boolean=false;
  total: number = 0;
  constructor(private detailService:TicketDetailService,private saleService:SaleService,private toastr:ToastrService){
  
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
  onSubmit(): void {
    if(this.ticketData.length ===0){
      this.toastr.info("Carrito vacio")
      return
    }
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
          error: (err:HttpErrorResponse) => {
            this.cancelTickets(this.tickets);
            this.toastr.error("Hubo un error al procesar la compra","Intente nuevamente");
            this.toastr.error(err.message);
          },
          complete:()=>{
            this.isLoading = false;
            this.toastr.success("Compra realizada con éxito");
            this.ticketData = [];
            this.tickets = []
          }

        });
      },
      error: () => {     
        this.isLoading = false;
      }
    });
  
  }
  cancel():void{
    this.ticketData = [];
    location.reload();
  }

  cancelTickets(detail:TicketDetail[]): void {
    detail.forEach((ticket: TicketDetail) => {
      this.detailService.delete(ticket.id).subscribe({
        next: () => {
          this.ticketData = this.ticketData.filter((t) => t.id !== ticket.id);
          this.calculateTotal();
        },
        complete:()=>{
          this.isLoading = false;
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.ticketData = []
  }

}
