import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { GeneralTicketComponent, VipTicketComponent } from 'src/app/components';
import { Game, Ticket } from 'src/app/models';
import { Buyer } from 'src/app/models/buyer';
import { Data } from 'src/app/models/data';
import { TicketType } from 'src/app/models/ticket-type';
import { BuyerService } from 'src/app/modules/administration/services/buyer.service';
import { TicketService } from '../../services/ticket.service';
import { TicketDetail } from 'src/app/models/ticket-detail';


@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.css']
})
export class AddTicketFormComponent implements OnInit,OnDestroy{

  constructor(private fb: FormBuilder,private service: TicketService,private buyerService: BuyerService,private dialog:Dialog) {
    }
    created:boolean =false;
    ticketForm! : FormGroup;
    ticketID!: string;
    clients!: any[];
    clients$!:Subscription;
    clientCtrl = new FormControl('');
    filteredClients$!: Observable<any[]>;
    @Input() currentGame!:Game;
    @Output() ticket = new EventEmitter<TicketDetail>();

    ngOnInit(): void {
      this.ticketForm = this.fb.group({
        buyer : [null,[Validators.required]],
      })

      this.clients$ = this.buyerService.getAll().subscribe(
        (response: any) => {
          this.clients = response.content;
          this.setupFilteredClients()  
        }
      );
    }
    buyer!:Buyer;
    onSubmit() : void {
      if(this.ticketForm.valid){
        this.service.save(this.ticketForm.value as Ticket);
      }else{
        this.ticketForm.markAllAsTouched();
      }
      // const type = this.ticketForm.get('type')?.value;
      // if(this.ticketForm.invalid){return}

      // if(type === TicketType.GENERAL){
      //   const ticket: TicketRequest = {
      //     buyer: this.ticketForm.get('buyer')?.value,
      //     game: this.currentGame
      //   };
      //   this.service.createNormal(ticket).subscribe({
      //     next: (data:any) => {
      //       this.ticketID=data
      //       this.ticket.emit({type:TicketType.GENERAL,buyer:ticket.buyer, amount:ticket.game.price})
          
      //     },
      //     error: (err) => {console.log(err)},
      //     complete:()=>{this.buyer=ticket.buyer,this.created=true
      //     }
      //   });
      // }else{
      //   const ticket: TicketVipRequest = {
      //     buyer: this.ticketForm.get('buyer')?.value,
      //     price: 5000.0,
      //   };
      //   this.service.createVip(ticket).subscribe({
          
      //     next: (data:any) => {
      //       this.ticketID=data
      //       this.ticket.emit({type:TicketType.VIP,buyer:ticket.buyer, amount:ticket.price})
          
      //     }
          
      //     ,
      //     error: (err) => {console.log(err)},
      //     complete:()=>{this.buyer=ticket.buyer,this.created=true}
      //   });
      // }
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
            return value ? this.filterBuyers(value) : this.clients.slice();
          } else {
            return [];
          }
        })
      );
    }
    private filterBuyers(value: string): Buyer[] {
      const filterValue = value.toLowerCase();
      return this.clients.filter(
        (clients) =>
          (clients.dni && clients.dni.includes(filterValue)) ||
          (clients.name && clients.name.toLowerCase().includes(filterValue))
      );
    }
    showTicket(type:string):void{
      if(type === TicketType.GENERAL){
      const dialogRef = this.dialog.open(GeneralTicketComponent, {
        width: '80%',
        height: '50%',
        data:{
          buyer:this.buyer,
          ticketID:this.ticketID
        }
      });
    }else{
      const dialogRef = this.dialog.open(VipTicketComponent, {
        width: '80%',
        height: '50%',
        data:{
          buyer:this.buyer,
          ticketID:this.ticketID
        }
      });
    }
  }

  ngOnDestroy():void{

  }
}