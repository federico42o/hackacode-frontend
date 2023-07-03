import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-line-sales-chart',
  templateUrl: './line-sales-chart.component.html',
  styleUrls: ['./line-sales-chart.component.css']
})
export class LineSalesChartComponent implements OnInit {
  constructor(private service:ReportService) {}
  allMonthsData: any;
  dataLoaded: boolean = false;
  labelData!: any;
  mainData!: any;
  chart!: any;
  colors!: string[];
  today:Date = new Date();
  ctx:string = 'line-chart'
  years:string[] = Array.from({length: 5}, (v, k) => (this.today.getFullYear()-k).toString());
  yesterday:Date = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-1);
  ngOnInit(): void {

      this.loadData(this.today.getFullYear().toString());
    }
  
  createChart(labels:any,data:any,id:any): void {
    this.chart = new Chart(id, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas',
          data: data,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        locale: 'es',

      }
    });
    
  }
  applyFilter(event:Event):void{
    this.chart.destroy();
    const year = (event.target as HTMLInputElement).value;
    this.loadData(year);
  }

  _updateData(date:string){
    const newDate = new Date(date);
    this.loadData(newDate.getFullYear().toString());
  }
  setLabels(data: any[]): void {
    this.labelData = data.map((d: any) => {
      const month = new Date(d.month).toLocaleString('es', { month: 'long' });
      return month;
    });
  }
  setMainData(data: any[]): void {
    this.mainData = data.map((d: any) => d.totalAmountSaleMonthAndYear);
  }
  loadData(date:string): void {
    this.service.fetchDataForAllMonths(date).subscribe({
      next:(data:any)=>{
        this.setLabels(data);
        this.setMainData(data);
    },complete:()=>{
      this.createChart(this.labelData,this.mainData,this.ctx);
    }
  })
  }
  
}