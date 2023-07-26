import { Component, OnInit } from '@angular/core';
import { TopBuyer } from 'src/app/models/buyer/top-buyer';
import { ReportService } from '../../services/report.service';
import { Buyer } from 'src/app/models';

@Component({
  selector: 'app-best-buyer',
  templateUrl: './best-buyer.component.html',
  styleUrls: ['./best-buyer.component.css']
})
export class BestBuyerComponent implements OnInit{


  
  topBuyer!:Buyer;
  tickets!:number;
  isLoading: boolean = false;
  today = new Date().toISOString().substring(0, 10);
  currentYear = new Date().toISOString().substring(0, 4);
  currentMonth = new Date().toISOString().substring(5, 7);
  currentMonthAndYear = new Date().toISOString().substring(0, 7);
  currentMonthStr = new Date().toLocaleString('default', { month: 'long' });
  fullName!:string;
  lastVisit!:string | Date;
  constructor(private service:ReportService) { }
  ngOnInit(): void {
    this.loadTopBuyer(this.today);

  }

  applyFilter(event:Event):void{
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.loadTopBuyer(filterValue);
  }

  loadTopBuyer(date:string){
    const [year, month] = date.split('-');
    this.service.getBuyerWithMoreTickets(year,month).subscribe({
      next: (data: any) => {
        this.topBuyer = data.buyer;
        this.fullName = `${this.topBuyer.name} ${this.topBuyer.surname}`
        this.tickets = data.totalTicketsSold;
      }
    });
  }

}
