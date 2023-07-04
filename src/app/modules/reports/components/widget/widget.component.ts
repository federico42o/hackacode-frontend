import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Dataset } from 'src/app/models/dataset';
import { DataThisMonth, ReportService } from '../../services/report.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
 
  
})
export class WidgetComponent implements OnInit,AfterViewInit {


  
  
  data: Dataset = {};
  view: string = 'historic';
  isLoading: boolean = false;
  date = new Date();
  currentMonth = this.date.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
  formattedDate = this.date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase();
  historicEarnings = 0;
  dataLoaded: boolean = false;
  sales: number = 0;
  earnings: number = 0;
  tickets: number = 0;

  constructor(private service: ReportService) {}

  ngOnInit(): void {
    this.service.fetchData(this.date.toISOString().substring(0, 10)).subscribe({
      next: (data: Dataset) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (error: any) => {

        this.isLoading = false;
      },
      complete: () => {
        this.dataLoaded = true;
        this.isLoading = false;
      }
    });
  }

  handleChange(event: any) {
    this.view = event.target.value
  }

  ngAfterViewInit(): void {

  }

  fetchData() {
    this.isLoading = true;
    const dateString = this.date.toISOString().substring(0, 10);

    this.service.fetchData(dateString).subscribe({
      next: (data: Dataset) => {
        this.data = data;
        this.isLoading = false;
      },
      error: (error: any) => {
       
        this.isLoading = false;
      },
      complete: () => {
        this.dataLoaded = true;
        this.isLoading = false;
      }
    });
  }

}
