import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { DialogComponent } from 'src/app/modules/administration/components/dialog/dialog.component';
import { CreateTicketComponent } from '../../components/create-ticket/create-ticket.component';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{


  tickets$! : Subscription;
  currentPage = 1;

  
  tickets : Ticket[] = [];
  pageableTickets: Ticket[] = [];
  isHidden = false;
  editMode = false;
  selectedTicket!: Ticket;
  constructor(private service:TicketService,public dialog: Dialog,private toastr:ToastrService){}
  ngOnInit(): void {
    this.service.getAll().subscribe({
      next:(data: PaginationResponse<Ticket>) => {
        this.tickets = data.content
        this.array = this.tickets;
        this.pageableTickets = this.getItemsForCurrentPage();
      }
    });
  }
  array: Ticket[] = []; 
  itemsPerPage = 5; 
  currentTab = 'view';


  get totalPages(): number {
    return Math.ceil(this.array.length / this.itemsPerPage);
  }

  getItemsForCurrentPage(): Ticket[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.array.slice(startIndex, endIndex);
  }

  handleDelete(data:Ticket){
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height: '10%',
      data: {
        message: "¿Desea borrar esta entrada?",
      }
      });
      dialogRef.componentInstance?.accept.subscribe({
        next: () => {

          this.service.delete(data.id).subscribe({
            complete: () => {
              this.dialog.closeAll();
            }
          });
          
        },
        error: () => {
          this.toastr.error('Error, intente nuevamente')
        },
        complete: () => {
          this.toastr.success('Juego eliminado con exito')
          this._updateTickets()
          
        }
      }); 
      dialogRef.closed.subscribe( () => {
        this._updateTickets()
      });
    
  }

  openDialog(mode:string,id :number) : void{
    
    const dialogRef = this.dialog.open(CreateTicketComponent,{
      width: '60%',
      height: '50%',
      data: {mode,id}
    });
    dialogRef.closed.subscribe( ()=> {
      this._updateTickets()
    });
  }


  handleEdit(data:Ticket) {
    this.selectedTicket = data;
    this.changeTab('form')
    
  }

private _updateTickets() : void{
    this.tickets$ = this.service.getAll().subscribe(
      {
        next:(data:PaginationResponse<Ticket>) => {
          this.tickets = data.content
          this.array = this.tickets;
          this.pageableTickets = this.getItemsForCurrentPage();
        }
    
      })
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageableTickets = this.getItemsForCurrentPage();
    }
  }
  
  nextPage(): void {
    const totalPages = this.totalPages;
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.pageableTickets = this.getItemsForCurrentPage();
    }
  }
  changeTab(tab:string):void{
    this.currentTab = tab;

  }

}
