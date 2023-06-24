import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit{


  date= new Date();
  currentDay = this.date.getDate() + " de " + this.date.toLocaleDateString('es-ES', { month: 'short' }) + " del " + this.date.getFullYear() ;
  currentTime = this.date.toLocaleTimeString();
  total!:number;
  @Input() data!:Data[];

  ngOnInit(): void {
    if(this.data){
      this.data.map((e)=>{
        this.total += e.amount;
      })
    }
  }


}



