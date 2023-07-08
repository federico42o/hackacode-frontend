import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportService, SalesAllMonths } from '../../services/report.service';

@Component({
  selector: 'app-line-sales-chart',
  templateUrl: './line-sales-chart.component.html',
  styleUrls: ['./line-sales-chart.component.css']
})
export class LineSalesChartComponent implements OnInit {
  constructor(private service:ReportService) {}
  dataLoaded = false;
  labelData!: string[];
  mainData!: number[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart!: any;
  today:Date = new Date();
  ctx = 'line-chart'
  isLoading = false;
  years:string[] = Array.from({length: 5}, (v, k) => (this.today.getFullYear()-k).toString());
  yesterday:Date = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-1);
  ngOnInit(): void {

    this.loadData(this.today.getFullYear().toString());
  }
  
  
  createChart(labels:string[],data:number[]): void {
    this.chart = new Chart(this.ctx, {
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
    this.isLoading = true;
    const year = (event.target as HTMLInputElement).value;
    this.loadData(year);
  }

  _updateData(date:string){
    const newDate = new Date(date);
    this.loadData(newDate.getFullYear().toString());
  }
  setLabels(data: SalesAllMonths[]): void {
    this.labelData = data.map((d: SalesAllMonths) => {
      const month = new Date(d.month).toLocaleString('es', { month: 'long' });
      return month;
    });
  }
  setMainData(data: SalesAllMonths[]): void {
    this.mainData = data.map(s => s.totalAmountSaleMonthAndYear);
  }
  loadData(date:string): void {
    this.isLoading = true;
    this.service.fetchDataForAllMonths(date).subscribe({
      next:(data:SalesAllMonths[])=>{
        this.setLabels(data);
        this.setMainData(data);
    },complete:()=>{
      this.createChart(this.labelData,this.mainData);
      this.isLoading = false;
    }
  })
  }
  
}