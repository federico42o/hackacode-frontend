import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReportService } from '../../services/report.service';
import { GameWithMoreTickets } from 'src/app/models/dataset';
Chart.register(...registerables);

@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.css'],
})
export class BigChartComponent implements OnInit {
  constructor(private service: ReportService) {}
  dataLoaded = false;
  labelData!: string[];
  mainData!: number[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart!: any;
  colors!: string[];
  today: Date = new Date();
  ctx = 'pie-chart';
  todayString: string = this.today.toISOString().substring(0, 10);
  yesterday: Date = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() - 1
  );
  ngOnInit(): void {
    this.loadData(this.today);
  }

  createChart(labels: string[], data: number[], id: string): void {
    this.chart = new Chart(id, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '# tickets vendidos',
            data: data,
            borderWidth: 1,
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        locale: 'es',
      },
    });
  }
  applyFilter(event: Event): void {
    this.chart.destroy();
    const filterValue = (event.target as HTMLInputElement).value;
    const date = new Date(filterValue);
    this.loadData(date);
  }

  _updateData(date: string) {
    const newDate = new Date(date);
    this.loadData(newDate);
  }
  setLabels(data: GameWithMoreTickets[]): void {
    this.labelData = data.map((d) => d.game);
  }

  setMainData(data: GameWithMoreTickets[]): void {
    this.mainData = data.map((d) => d.totalTicketsSold);
  }
  loadData(date: Date): void {
    this.service
      .ticketsCountForGamesInDate(date.toISOString().substring(0, 10))
      .subscribe({
        next: (data: GameWithMoreTickets[]) => {
          this.setMainData(data);
          this.setLabels(data);
        },
        complete: () => {
          this.createChart(this.labelData, this.mainData, this.ctx);
        },
      });
  }
}
