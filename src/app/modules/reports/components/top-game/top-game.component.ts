import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { GameWithMoreTickets } from 'src/app/models/dataset';

@Component({
  selector: 'app-top-game',
  templateUrl: './top-game.component.html',
  styleUrls: ['./top-game.component.css']
})
export class TopGameComponent implements OnInit{


  
  topGame!:GameWithMoreTickets;
  isLoading: boolean = false;
  today = new Date().toISOString().substring(0, 10);
  currentYear = new Date().toISOString().substring(0, 4);
  currentMonth = new Date().toISOString().substring(5, 7);
  currentMonthAndYear = new Date().toISOString().substring(0, 7);
  currentMonthStr = new Date().toLocaleString('default', { month: 'long' });
  constructor(private service:ReportService) { }
  ngOnInit(): void {
    this.service.getGameWithMoreTickets(this.today).subscribe({
      next: (data: any) => {

        const topGame: GameWithMoreTickets = {
          gameName: data.game,
          totalTicketsSold: data.totalTicketsSold
        }
        this.topGame= topGame
        
      }});

  }

  applyFilter(event:Event):void{
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    const newD = new Date(filterValue).toISOString().split('T')[0];
    const today = new Date().getDate();
    const month = newD.split('-')[1];
    const year = newD.split('-')[0];
    const newDate = new Date(`${year}-${month}-${today}`).toISOString().split('T')[0];

    
    console.log(new Date().toISOString().split('T')[0]);
    this.loadTopBuyer(newDate);
  }

  loadTopBuyer(date:string){
    
    this.service.getGameWithMoreTickets(date).subscribe({
      next: (data: any) => {
        const topGame: GameWithMoreTickets = {
          gameName: data.game,
          totalTicketsSold: data.totalTicketsSold
        }
        this.topGame= topGame
      }
    });
  }

}