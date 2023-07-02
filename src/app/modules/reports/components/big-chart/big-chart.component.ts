import { Component, Input, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { ReportService } from '../../services/report.service';
Chart.register(...registerables);


@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.css']
})
export class BigChartComponent implements OnInit {
  constructor(private service:ReportService) {}

  labelData!: any;
  mainData!: any;
  colors!: string[];
  today:Date = new Date();
  yesterday:Date = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()-1);
  ngOnInit(): void {

      this.loadData();
    

    this.RenderChart(this.labelData, '# de tickets vendidos', this.mainData, 'bar', 'piechart');

  }

  RenderChart(labels: any, label: string, data: any, type: any, id: string): void {
    new Chart(id, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
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
        this.setLabels(data);
        this.setMainData(data);
      }
    })
  }
}
