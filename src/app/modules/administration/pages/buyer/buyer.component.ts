import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BuyerFormComponent } from '../../components/buyer-form/buyer-form.component';
import { BuyerService } from '../../services/buyer.service';
import { Buyer } from 'src/app/models/buyer';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit,OnDestroy{
  
  constructor(private fb : FormBuilder, private buyerService: BuyerService, public dialog : Dialog,private toastr:ToastrService){}
  currentTab = 'view';
  subscription$! : Subscription;
  buyerForm! : FormGroup;
  clients!: Buyer[];
  page : any;
  isRowDeleted:boolean = false;
  
  changeTab(tab:string){
    this.currentTab = tab;
  }

  pageSize: number = 5;

  ngOnInit(): void {
    this._updateTable()
  }

  onClientAdded(): void {
    this._updateTable();
  }

  onEdit(data:any):void {
    
  }
  onDelete(data:any):void{
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height: '10%',
      data: {
        message: "¿Desea borrar este cliente?",
      }
      });
      dialogRef.componentInstance?.accept.subscribe({
        next: () => {

          this.buyerService.delete(data.id).subscribe({
          
            complete: () => {
              this.dialog.closeAll();
            }

          });
          
        },
        error: () => {
          this.toastr.error('Error, intente nuevamente'),this._updateTable()
        },
        complete: () => {
          this.toastr.success('Cliente eliminado con exito'),this._updateTable()
          this.isRowDeleted =  true;
          location.reload();
        }
      });  

  }

  onDataSave(data:Buyer):void{

    this.buyerService.update(data).subscribe({
      next:()=>{
        this._updateTable()
      },
      error:()=>{
       this.toastr.error('Error, intente nuevamente'); 
      },
      complete:()=>{

        this.toastr.success('Cliente actualizado con exito');
      }


    });
  }

  private _updateTable() : void{
       this.buyerService.getAll().subscribe(
        {
          next:(data:any) => {
            this.clients = data.content.filter((client: Buyer) => !client.banned);
           
          }
        })
    }
    setPageSize(): void {
      if (this.pageSize > this.clients.length) {
        this.pageSize = this.clients.length;
      }
    
      this.page = this.clients.slice(0, this.pageSize);
    }
    
  
    private _updatePage(): void {
      this.subscription$ = this.buyerService.getAll().subscribe(
        (data:any) => {
          this.clients = data.content.filter((client: Buyer) => !client.banned);
          this.page = this.clients;
          this.setPageSize();
        });
      }


      setTab(tab:string){
        this.currentTab = tab
      }
      ngOnDestroy(): void {
        if(this.subscription$){
          this.subscription$.unsubscribe();
        }
      }
}
