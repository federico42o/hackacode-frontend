import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from 'src/app/models';
import { Dataset, GameWithMoreTickets } from 'src/app/models/dataset';
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
    filter!:FormGroup;
    targetValue: any;
    currentValue: any;
    data!:any[];
    dataset : Dataset = {};
    topGame!:GameWithMoreTickets;
    games!:Game[];
  
    ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next:(data:any)=>{
        this.games = data.content;
      }
    })
      
    this.service.ticketsCountForGamesInDate(this.yesterday.toISOString().substring(0, 10)).subscribe({
        next:(data:any)=>{
          this.data = data;
          
        }
      })
    
    this.filter = this.fb.group({
      date:[''],
      game:['']
    });
    
  }

  onDateSelected():void{
    const gameName = this.filter.value.game.name;    
    const date = new Date(this.filter.value.date).toISOString().substring(0, 10)
    if(gameName && date){
      this.service.fetchData(date,gameName).subscribe({
        next:(data:Dataset)=>{
          this.dataset = data;
          console.log(this.dataset)
        }})
    }
  }
  

}
