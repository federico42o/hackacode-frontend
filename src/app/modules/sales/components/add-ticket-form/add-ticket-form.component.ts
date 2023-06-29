import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Game, Ticket } from 'src/app/models';
import { Buyer } from 'src/app/models/buyer';
import { TicketDetail } from 'src/app/models/ticket-detail';


@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.css']
})
export class AddTicketFormComponent implements OnInit,OnDestroy{

  constructor(private fb: FormBuilder) {
    }
    created:boolean =false;
    ticketForm! : FormGroup;
    ticketID!: string;
    @Input() buyers!: Buyer[];
    @Input() tickets!:Ticket[];
    clientCtrl = new FormControl('');
    filteredClients$!: Observable<any[]>;
    @Input() currentGame!:Game;
    @Output() ticket = new EventEmitter<TicketDetail>();

    ngOnInit(): void {
      this.ticketForm = this.fb.group({
        buyer : [null,[Validators.required]],
        ticket : [null,[Validators.required]]
      })
      this.setupFilteredClients()
    }
    buyer!:Buyer;
    onSubmit() : void {
      const detail:TicketDetail = {
        id:'',
        ticket: this.ticketForm.get('ticket')?.value,
        buyer: this.ticketForm.get('buyer')?.value
      }
      if(this.ticketForm.valid){


        this.ticket.emit(detail)

      }else{
        console.log('error')
        this.ticketForm.markAllAsTouched();
      }

    }

    displayBuyer(buyer: Buyer | null): string {
      if (buyer && typeof buyer !== 'string') {
        return buyer.dni;
      }
      return '';
    }

    private setupFilteredClients(): void {
      this.filteredClients$ = this.ticketForm.get("buyer")!.valueChanges.pipe(
        startWith(""),
        map((value: string | Buyer) => {
          if (typeof value === "string") {
            return value ? this.filterBuyers(value) : this.buyers.slice();
          } else {
            return [];
          }
        })
      );
    }
    private filterBuyers(value: string): Buyer[] {
      const filterValue = value.toLowerCase();
      return this.buyers.filter(
        (buyers) =>
          (buyers.dni && buyers.dni.includes(filterValue)) ||
          (buyers.name && buyers.name.toLowerCase().includes(filterValue))
      );
    }

  ngOnDestroy():void{

  }
}