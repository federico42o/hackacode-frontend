import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from 'src/app/models';

@Component({
  selector: 'app-ticket-card',
  templateUrl:'./ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent implements OnInit{


  @Input() ticket:Ticket = {id:0,description:'',price:0,vip:false};
  @Output() edit = new EventEmitter<Ticket>()
  @Output() delete = new EventEmitter<Ticket>()
  isHidden:boolean = false;
  currentTicket!:Ticket;
  ngOnInit(): void {

  }
  
  onEdit(game:Ticket){
    this.edit.emit(game)
  }
  onDelete(game:Ticket){
   this.delete.emit(game)
  }
}
