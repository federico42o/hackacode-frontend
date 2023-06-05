import { Component } from '@angular/core';

@Component({
  selector: 'app-general-ticket',
  templateUrl: './general-ticket.component.html',
  styleUrls: ['./general-ticket.component.css']
})
export class GeneralTicketComponent {
  totalPrice : number = 4500;
  date = new Date();
  currentDay = this.date.getDate() + " de " + this.date.toLocaleDateString('es-ES', { month: 'long' }) + " del " + this.date.getFullYear() ;
  currentTime = this.date.toLocaleTimeString();

}
