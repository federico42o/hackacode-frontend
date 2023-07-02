import { Component, Input, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.css']
})
export class BigChartComponent implements OnInit{

  constructor() { }
  @Input() labelData! : string[];
  @Input() mainData! : any[];
  colors!: string[];
  ngOnInit(): void {
    this.RenderChart(this.labelData,'# de tickets vendidos',this.mainData,'bar','piechart');
  }

  RenderChart(labelData:string[],label:string,data:string[],type:any,id:string):void{
    new Chart(id, {
      type: type,
      data: {
        labels: labelData,
        datasets: [{
          label: label,
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



}
