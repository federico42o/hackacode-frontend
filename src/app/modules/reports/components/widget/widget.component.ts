import { Component, OnInit } from '@angular/core';
import { Dataset } from 'src/app/models/dataset';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
 
  
})
export class WidgetComponent implements OnInit {


  
  
  data: Dataset = {};
  view = 'historic';
  isLoading = false;
  date = new Date();
  currentMonth = this.date.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
  formattedDate = this.date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase();
  historicEarnings = 0;
  dataLoaded = false;
  sales = 0;
  earnings = 0;
  tickets = 0;

  constructor(private service: ReportService) {}

  ngOnInit(): void {
    this.service.fetchData(this.date.toISOString().substring(0, 10)).subscribe({
      next: (data: Dataset) => {
        this.data = data;
        this.isLoading = false;
      },
      error: () => {

        this.isLoading = false;
      },
      complete: () => {
        this.dataLoaded = true;
        this.isLoading = false;
      }
    });
  }

  handleChange(event: Event) {
    const view = (event.target as HTMLButtonElement).value;
    this.view = view
  }


  fetchData() {
    this.isLoading = true;
    const dateString = this.date.toISOString().substring(0, 10);

    this.service.fetchData(dateString).subscribe({
      next: (data: Dataset) => {
        this.data = data;
        this.isLoading = false;
      },
      error: () => {
       
        this.isLoading = false;
      },
      complete: () => {
        this.dataLoaded = true;
        this.isLoading = false;
      }
    });
  }

}
