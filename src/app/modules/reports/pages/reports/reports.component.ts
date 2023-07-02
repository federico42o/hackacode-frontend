import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, take } from 'rxjs';
import { Game } from 'src/app/models';
import { Dataset, GameWithMoreTickets, historicSales } from 'src/app/models/dataset';
import { ReportService } from 'src/app/modules/reports/services/report.service';
import { GameService } from 'src/app/modules/sales/services/game.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  
  constructor(private service:ReportService,private gameService:GameService,private fb:FormBuilder) { }

  today:Date = new Date();
  yesterday:Date = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-1);
    date!:FormGroup;
    targetValue: any;
    currentValue: any;
    labelData:string[] = [];
    mainData!:any[];
    dataset : Dataset = {};
    topGame!:GameWithMoreTickets;
    games!:Game[];
  
    ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next:(data:any)=>{
        this.games = data.content;
        this.games.forEach((game:Game)=>{
          this.labelData.push(game.name);
        })
        }
      }
      )
    console.log(this.labelData)
    this.date = this.fb.group({
      date:[''],
      game:['']
    });
    
  }
  selectedDate!:string;
  onDateSelected():void{
    const date = new Date(this.date.value.date);
    this.selectedDate = date.toISOString().substring(0, 10);
    
    this.fetchData();
  }
  fetchData() {

    
    if (this.selectedDate) {
      // this.dataset.date = this.selectedDate;
      this.service.getTicketsByDate(this.selectedDate).subscribe({
        next: (data: any) => {
          // console.log({"tickets por dia:":data.totalTicketsSold})
          this.dataset.ticketsSold = data.totalTicketsSold
          
        }
      });
  
      this.service.getTicketsByDateAndGame(this.selectedDate, 'Casa embrujada').subscribe({
        next: (data: any) => {
          // console.log({"tickets por juego": {"game":data.gameName,"tickets":data.totalTicketsSold}})
          const topGame: GameWithMoreTickets = {
            gameName: data.gameName,
            totalTicketsSold: data.totalTicketsSold
          }
          this.dataset.topGame=  topGame
          
          console.log(this.dataset)
        }
      });
  
      this.service.getSalesByDate(this.selectedDate).subscribe({
        next: (data: any) => {
          // console.log({"ventas por dia":data.totalAmountSaleDay})
          this.dataset.earningsInDate= data.totalAmountSaleDay
          

        }
      });
  
      const [year, month] = this.selectedDate.split('-');
      this.service.getSalesByMonthAndYear(year, month).subscribe({
        next: (data: any) => {
          // console.log({"ventas en un mes":data.totalAmountSaleMonthAndYear})
          this.dataset.earningsOnMonth= data.totalAmountSaleMonthAndYear
          
        }
      });
  
      this.service.getBuyerWithMoreTickets(year, month).subscribe({
        next: (data: any) => {
          // console.log({"comprador con mas entradas compradas en un mes":data})
          this.dataset.topBuyer= data
          
        }
      });
  
      this.service.getGameWithMoreTickets(this.selectedDate).subscribe({
        next: (data: any) => {
          // console.log({"juego con mas entradas vendidas":{game:data.gameName,"tickets":data.totalTicketsSold}})
          const topGame: GameWithMoreTickets = {
            gameName: data.gameName,
            totalTicketsSold: data.totalTicketsSold
          }
          this.dataset.topGame= topGame
          
        }
      });
  
      this.service.getHistoricSalesByDate(this.selectedDate).subscribe({
        next: (data: any) => {
          // console.log({"historico de ventas":{"$":data.totalAmountSaleYear,"tickets":data.totalTicketsSold}})
          const historicSales : historicSales = {
            earnings: data.totalAmountSaleYear,
            ticketsSold:data.totalTicketsSold
          }
          
          this.dataset.historicSales = historicSales
          
        }
      });
    }
    console.log(this.dataset)
  }


  // loadTicketsByDate(date:string):void{
  //   this.service.getTicketsByDate(date).subscribe(data=>{
  //     console.log(data);
  //   });
  // }

  // loadTicketsUntilDate(date:string):void{
  //   this.service.getHistoricSalesByDate(date).subscribe(data=>{
  //    this.currentValue = data.totalAmountSaleYear;
  //   });
  // }

  // loadTicketsByDateAndGame(date:string,game:string):void{
  //   this.service.getTicketsByDateAndGame(date,game).subscribe(data=>{
  //     console.log(data);
  //   });
  // }


    
  

  

}
