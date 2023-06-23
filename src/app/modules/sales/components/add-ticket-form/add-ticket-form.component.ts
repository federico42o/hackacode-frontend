import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Buyer } from 'src/app/models/buyer';
import { Ticket } from 'src/app/models/ticket';
import { TicketType } from 'src/app/models/ticket-type';
import { TicketService } from '../../services/ticket.service';
import { Observable, map, startWith } from 'rxjs';
import { BuyerService } from 'src/app/modules/administration/services/buyer.service';
import { TicketVip } from 'src/app/models/ticket-vip';
import { TicketRequest } from 'src/app/models/ticket-request';
import { TicketVipRequest } from 'src/app/models/ticket-vip-request';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.css']
})
export class AddTicketFormComponent implements OnInit{

    currentGame!: Game;
    constructor(private fb: FormBuilder,private service: TicketService,private buyerService: BuyerService,private authService : AuthService) {
      authService.getCurrentGame().subscribe(
        (data) => this.currentGame = data 
      );
     }
    ticketType!: TicketType;
    buyer!: Buyer;
    ticketForm! : FormGroup;
    clients!: any[];
    clientCtrl = new FormControl('');
    filteredClients$!: Observable<any[]>;
    ngOnInit(): void {
      this.ticketForm = this.fb.group({
        buyer : [null,[Validators.required]],
      })
      this.buyerService.getAll().subscribe(
        (response: any) => {
          this.clients = response.content;
          this.setupFilteredClients()
          
        }
      );
    }
    

    setType(event: any){
      console.log(event.target.value)
      event.target.value === 'GENERAL' ?  this.ticketType = TicketType.GENERAL : this.ticketType = TicketType.VIP;
    }

    onSubmit() : void {

      if(this.ticketForm.invalid){
        console.log(this.ticketForm.value)
        return;
      }
      if(this.ticketType === TicketType.GENERAL){
        const ticket: TicketRequest = {
          buyer: this.ticketForm.get('buyer')?.value,
          game: this.currentGame
        };
        this.service.createNormal(ticket).subscribe({
          next: (data:any) => {console.log(data)},
          error: (err) => {console.log(err)},
        });
      }else{
        const ticket: TicketVipRequest = {
          buyer: this.ticketForm.get('buyer')?.value,
          price: 5000,
        };
        this.service.createVip(ticket).subscribe({
          error: (err) => console.log(err),
        });
      }
    }

    displayEmployee(buyer: Buyer | null): string {
      if (buyer && typeof buyer !== 'string') {
        return `${buyer.name} ${buyer.surname} (${buyer.dni})`;
      }
      return '';
    }

  


    
  
    private setupFilteredClients(): void {
      this.filteredClients$ = this.ticketForm.get("buyer")!.valueChanges.pipe(
        startWith(""),
        map((value: string | Buyer) => {
          if (typeof value === "string") {
            return value ? this.filterEmployees(value) : this.clients.slice();
          } else {
            return [value];
          }
        })
      );
    }
  
    private filterEmployees(value: string): Buyer[] {
      const filterValue = value.toLowerCase();
      return this.clients.filter(
        (clients) =>
          (clients.dni && clients.dni.includes(filterValue)) ||
          (clients.name && clients.name.toLowerCase().includes(filterValue))
      );
    }

    

}


