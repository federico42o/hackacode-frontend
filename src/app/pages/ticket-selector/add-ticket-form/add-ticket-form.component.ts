import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { generateCode } from 'src/app/shared/utils/code';

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
        id : '',
        buyer : this.buyer,
        type : this.ticketType,
        game : '',
        shift : '',
        total : 0.0,
      })


    }

    setType(event: any){
      event.target.value === 'GENERAL' ?  this.ticketType = TicketType.GENERAL : this.ticketType = TicketType.VIP;
    }

    onSubmit() : void {

      this.ticketForm = this.fb.group({
        id : generateCode(),
        buyer : this.buyer,
        type : this.ticketType,
        game : this.ticketForm.value.game,
        shift : this.ticketForm.value.shift,
        total : 4321.0,
      })
      console.log(this.ticketForm.value as Ticket)
    }



}

export interface Ticket {
  id: string;
  buyer: Buyer;
  total: number;
  type: TicketType;
  game?: string;
  shift?: string;
}
export enum TicketType {
  GENERAL= 'GENERAL',
  VIP= 'VIP',
}
export interface Buyer{
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: Date;
}
