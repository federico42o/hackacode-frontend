import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, combineLatest, map, startWith } from 'rxjs';
import { Game, Ticket } from 'src/app/models';
import { Buyer } from 'src/app/models/buyer';
import { TicketDetail } from 'src/app/models/detail/ticket-detail';
import { BuyerService } from 'src/app/modules/administration/services/buyer.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { TicketService } from '../../services/ticket.service';


@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.css']
})
export class AddTicketFormComponent implements OnInit{

  constructor(private fb: FormBuilder,private authService:AuthService,private buyerService: BuyerService,private ticketService:TicketService,private toastr: ToastrService) { }
    created =false;
    ticketForm! : FormGroup;
    ticketID!: string;
    buyers!: Buyer[];
    buyers$!:Subscription;
    tickets!:Ticket[];
    clientCtrl = new FormControl('');
    filteredClients$!: Observable<Buyer[]>;
    currentGame!:Game;
    game$!:Subscription;
    @Output() ticket = new EventEmitter<TicketDetail>();

    ngOnInit(): void {
      this.authService.initializeCurrentUser();
      this.ticketForm = this.fb.group({
        buyer: [null, [Validators.required]],
        ticket: [null, [Validators.required]]
      });
    
      combineLatest([
        this.authService.getCurrentGame(),
        this.buyerService.getAll(),
        this.ticketService.getAll()
      ]).subscribe(([game, buyers, tickets]) => {
        this.currentGame = game;
        this.buyers = buyers.content;
        this.setupFilteredClients();
        this.tickets = tickets.content;
      });
    }
    
    onSubmit() : void {
      const detail:TicketDetail = {
        id:'',
        ticket: this.ticketForm.get('ticket')?.value,
        buyer: this.ticketForm.get('buyer')?.value
      }
      if(this.ticketForm.valid){
        this.ticket.emit(detail)
        this.created = !this.created;
        this.ticketForm.reset();
        this.setupFilteredClients();
        
      }else{
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

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.filteredClients$ = this.ticketForm.get("buyer")!.valueChanges.pipe(
        startWith(""),
        map((value: string | Buyer) => {
          if (typeof value === "string") {
            return value ? this.filterBuyers(value) : [...this.buyers];
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

}