import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-selector',
  templateUrl: './ticket-selector.component.html',
  styleUrls: ['./ticket-selector.component.css']
})
export class TicketSelectorComponent implements OnInit{
 constructor() { }
 tickets: any[] = [];
 input!: any;
 totalPrice: number = 10000;
 show: boolean = false;
 
 ngOnInit(): void {
   console.log(this.tickets);
 }
 
 addTicketForms() {
   this.tickets = Array(this.input).fill(0).map((x, i) => i);
    this.show = !this.show;

 }

}
