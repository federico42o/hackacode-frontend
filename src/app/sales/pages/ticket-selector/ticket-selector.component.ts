import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

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
 game!: Game;
 orderNumber: number = Math.ceil(Math.random() * 100000);
 ngOnInit(): void {
   this.game = {
      name: "Roller Coaster",
      price: 10000,
      requiredAge: 12,
      schedule: {
        startTime: "10:00",
        endTime: "18:00"
      }
    }

 }
 
 addTicketForms() {
  
   this.tickets = Array(this.input).fill(0).map((x, i) => i);
    this.show = !this.show;

 }



}
