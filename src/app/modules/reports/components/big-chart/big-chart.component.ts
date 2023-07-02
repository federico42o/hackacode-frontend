import { Component, Input, OnInit } from '@angular/core';
import { Chart,ChartData,registerables } from 'chart.js';
import { ReportService } from '../../services/report.service';
Chart.register(...registerables);


@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.css']
})
export class BigChartComponent implements OnInit {
  constructor(private service:ReportService) {}
  dataLoaded: boolean = false;
  labelData!: any;
  mainData!: any;
  chart!: any;
  colors!: string[];
  today:Date = new Date();
  ctx:string = 'pie-chart'
  yesterday:Date = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-1);
  ngOnInit(): void {

      this.loadData();
      console.log(this.mainData)
      
        

    }
  
  createChart(labels:any,data:any,id:any): void {
    new  Chart(id, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# tickets vendidos',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
  }
  setLabels(data: any[]): void {
    this.labelData = data.map((d: any) => d.game);
    console.log(this.labelData)
  }

  setMainData(data: any[]): void {
    this.mainData = data.map((d: any) => d.totalTicketsSold);
    console.log(this.mainData)
  }
  loadData(): void {
    this.service.ticketsCountForGamesInDate(this.yesterday.toISOString().substring(0, 10)).subscribe({
      next:(data:any)=>{
        this.setMainData(data);
        this.setLabels(data);
        this.createChart(this.labelData,this.mainData,this.ctx);
      },
      complete:()=>{
        this.createChart(this.labelData,this.mainData,this.ctx);
       
        
      }
    })
  }
  
}
