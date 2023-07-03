import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, tap } from 'rxjs';
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
    widgetData!:Dataset;
    data!:Dataset;
    dataset : Dataset = {};
    topGame!:GameWithMoreTickets;
    games!:Game[];
    allMonthsData!:any;
    isLoading:boolean = false;
    pastMonthISOString!: string;
    currentTab:string = 'tickets';
    oneMonthAgo : Date = new Date(this.today.getFullYear(),this.today.getMonth()-1,this.today.getDate());
    pastMonthData:any;
    year :string = this.today.toISOString().substring(0, 10).split('-')[0];
    ngOnInit(): void {
    this.pastMonthISOString = this.oneMonthAgo.toISOString().substring(0, 10);
    this.gameService.getAll().subscribe({
      next:(data:any)=>{
        this.games = data.content;
      }
    })
    
    this.service.fetchData(this.today.toISOString().substring(0, 10)).subscribe({
      next:(data:Dataset)=>{
        
        this.widgetData = data;
        
      },
      complete:()=>{
        this.isLoading = false;
    }
  })
  this.service.fetchData(this.pastMonthISOString).subscribe({
    next:(data:Dataset)=>{
      
      this.pastMonthData = data;
      
    },
    complete:()=>{
      this.isLoading = false;
  }
})

    
    this.filter = this.fb.group({
      date:[this.today.toISOString().substring(0, 10)],
      game:[null]
    });
  }

  applyFilter(event:Event):void{
    this.isLoading = true;
    const filterValue = (event.target as HTMLInputElement).value;
    const date = new Date(filterValue).toISOString().substring(0, 10);
    this._updateData(date);
  }

  _updateData(date:string){
    this.service.fetchData(date).subscribe({
      next:(data:Dataset)=>{
        this.data = data;
      },
      complete:()=>{
        this.isLoading = false;
      }
    }
      )
  }


  onDateSelected():void{
    const gameName = this.filter.value.game !== null ? this.filter.value.game.name : null;    
    const date = new Date(this.filter.value.date).toISOString().substring(0, 10)
    if(gameName && date){
      this.service.fetchData(date,gameName).subscribe({
        next:(data:Dataset)=>{
          this.dataset = data;
          
        }})
    }
  }
  

}
