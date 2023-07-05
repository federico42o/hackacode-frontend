import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket, TicketRequest } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  @Input() ticket!: Ticket;
  constructor(
    private service: TicketService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      description: ['',[Validators.required,Validators.maxLength(60),Validators.minLength(5),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*')]],
      price: [0, [Validators.required, Validators.min(0)]],
      vip: [false]
    });
    if (this.ticket) {
      this.ticketForm.patchValue({
        description: this.ticket.description,
        price: this.ticket.price,
        vip: this.ticket.vip,
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      return;
    }
    if (this.ticket) {
      const ticket: Ticket = {
        id: this.ticket.id,
        description: this.ticketForm.value.description,
        price: this.ticketForm.value.price,
        vip: this.ticketForm.value.vip,
      };
      console.log(ticket)
      console.log(this.ticketForm.value)
      this.service.update(ticket).subscribe({
        error: (err: any) => {
          this.toastr.error(
            'Error al actualizar la entrada',
            'Intente nuevamente'
          );
        },
        complete: () => {
          this.toastr.success('Entrada actualizada con éxito');
          this.ticketForm.reset();
        },
      });
    } else {
      const ticket: TicketRequest = {
        
        description: this.ticketForm.value.description,
        price: this.ticketForm.value.price,
        vip: this.ticketForm.value.vip,
      };
      this.service.save(this.ticketForm.value).subscribe({
        error: (error) => {
          this.toastr.error('Error al crear el ticket', 'Intente nuevamente');
        },
        complete: () => {
          this.toastr.success('Ticket creado con éxito', 'Ticket creado');
          this.ticketForm.reset();
        },
      });
    }
  }
}
