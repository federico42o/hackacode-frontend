import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  
  ticketForm! : FormGroup;
  constructor(private service: TicketService,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      description: ['',[Validators.required],Validators.maxLength(60)],
      price: [0,[Validators.required,Validators.min(0)]],
      vip: ['false',[Validators.required]],
    })
  }

  onSubmit():void{
    if(this.ticketForm.invalid){
      return;
    }
    this.service.save(this.ticketForm.value).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
