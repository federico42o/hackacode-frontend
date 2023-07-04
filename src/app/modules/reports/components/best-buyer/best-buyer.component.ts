import { Component, Input, OnInit } from '@angular/core';
import { Buyer } from 'src/app/models';
import { ReportService } from '../../services/report.service';
import { TopBuyer } from 'src/app/models/buyer/top-buyer';

@Component({
  selector: 'app-best-buyer',
  templateUrl: './best-buyer.component.html',
  styleUrls: ['./best-buyer.component.css']
})
export class BestBuyerComponent implements OnInit{


  
  topBuyer!:TopBuyer;
  isLoading: boolean = false;
  today = new Date().toISOString().substring(0, 10);
  currentYear = new Date().toISOString().substring(0, 4);
  currentMonth = new Date().toISOString().substring(5, 7);
  currentMonthAndYear = new Date().toISOString().substring(0, 7);
  currentMonthStr = new Date().toLocaleString('default', { month: 'long' });
  constructor(private service:ReportService) { }
  ngOnInit(): void {
    this.service.getBuyerWithMoreTickets(this.currentYear,this.currentMonth).subscribe({
      next: (data: TopBuyer) => {
        this.topBuyer = data;
      }
    });

  }

  applyFilter(event:Event):void{
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    
    // const date = new Date(filterValue).toISOString().substring(0, 10);
    this.loadTopBuyer(filterValue);
  }

  loadTopBuyer(date:string){
    const [year, month] = date.split('-');
    this.service.getBuyerWithMoreTickets(year,month).subscribe({
      next: (data: any) => {
        this.topBuyer = data;
      }
    });
  }

}
