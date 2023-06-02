import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.css']
})
export class AddTicketFormComponent implements OnInit{
  
    constructor(private fb: FormBuilder) { }
    ticketType!: TicketType;
    buyer: Buyer = {
      id: 1,
      name: 'John Doe',
      email: 'example@gmail.com',
      phone: '1234567890',
      birthdate: new Date(1990, 1, 1),
    }
    ticketForm! : FormGroup;
    ngOnInit(): void {

      this.ticketForm = this.fb.group({
        buyer : this.buyer,
        total : 4321.0,
        type : {id: 1, type: 'General'},
        game : ''
      })
    }

    setType(event: any){
      event.target.value === 'general' ?  this.ticketType = TicketType.GENERAL : this.ticketType = TicketType.VIP;
    }



}

export interface Ticket {
  id: number;
  buyer: Buyer;
  total: number;
  type: TicketType;
  game?: string;
}
export enum TicketType {
  GENERAL = 1,
  VIP = 2,
}
export interface Buyer{
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: Date;
}
