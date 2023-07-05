import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models';
import { Dialog } from '@angular/cdk/dialog';
import { CreateTicketComponent } from '../../components/create-ticket/create-ticket.component';
import { DialogComponent } from 'src/app/modules/administration/components/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit,OnDestroy{


  tickets$! : Subscription;
  currentPage: number = 1;

  
  tickets : Ticket[] = [];
  pageableTickets: Ticket[] = [];
  isHidden:boolean = false;
  editMode:boolean = false;
  selectedTicket!: Ticket;
  constructor(private service:TicketService,public dialog: Dialog,private toastr:ToastrService){}
  ngOnInit(): void {
    this.service.getAll().subscribe({
      next:(data:any) => {
        this.tickets = data.content
        this.array = this.tickets;
        this.pageableTickets = this.getItemsForCurrentPage();
      }
    });
  }
  array: Ticket[] = []; 
  itemsPerPage = 5; 
  currentTab:string = 'view';


  get totalPages(): number {
    return Math.ceil(this.array.length / this.itemsPerPage);
  }

  getItemsForCurrentPage(): Ticket[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.array.slice(startIndex, endIndex);
  }

  handleDelete(data:any){
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
        error: (err:any) => {
          this.toastr.error('Error, intente nuevamente')
        },
        complete: () => {
          this.toastr.success('Juego eliminado con exito')
          this._updateTickets()
          
        }
      }); 
      dialogRef.closed.subscribe(result => {
        this._updateTickets()
      });
    
  }
  onTicketAdded():void{

  }


  openDialog(mode:string,id :number) : void{
    
    const dialogRef = this.dialog.open(CreateTicketComponent,{
      width: '60%',
      height: '50%',
      data: {mode,id}
    });
    dialogRef.closed.subscribe(result => {
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
        next:(data:any) => {
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

  ngOnDestroy(): void {
  }

}
