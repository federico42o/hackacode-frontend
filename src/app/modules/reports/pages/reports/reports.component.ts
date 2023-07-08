import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { Buyer, Game } from 'src/app/models';
import { Dataset, GameWithMoreTickets } from 'src/app/models/dataset';
import { DataThisMonth, ReportService } from 'src/app/modules/reports/services/report.service';
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
    filter!:FormGroup;
    widgetData:DataThisMonth = {
      earningsOnMonth:0,
      earningsPastMonth:0,
      salesCount:0,
      salesCountPastMonth:0,
      ticketsCount:0,
      ticketsCountPastMonth:0,
      clientsCount:0,
      clientsCountPastMonth:0

    };
    data!:Dataset;
    dataset : Dataset = {};
    topGame!:GameWithMoreTickets;
    games!:Game[];
    buyer!:Buyer;
    allMonthsData!:any;
    isLoading:boolean = false;
    pastMonthISOString!: string;
    currentTab:string = 'buyers';
    oneMonthAgo : Date = new Date(this.today.getFullYear(),this.today.getMonth()-1,this.today.getDate());
    pastMonthData:any;
    year :string = this.today.toISOString().substring(0, 10).split('-')[0];
    ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next:(data:any)=>{
        this.games = data.content;
      }
    })


  }

  

}
