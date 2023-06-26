import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BuyerFormComponent } from '../../components/buyer-form/buyer-form.component';
import { BuyerService } from '../../services/buyer.service';

export interface BuyerRequest {
  name: string;
  surname: string;
  birthdate: string;
  dni: string;
}
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit,OnDestroy{
  
  constructor(private fb : FormBuilder, private buyerService: BuyerService, public dialog : Dialog){}
  currentTab = 'add';
  subscription$! : Subscription;
  buyerForm! : FormGroup;
  clients : any;
  page : any;
  headers : string[] = ["Nombre", "Apellido", "Fecha de nacimiento", "DNI"];
  columns : string[] = ["name", "surname", "birthdate", "dni"];
  pageSize: number = 5;

  ngOnInit(): void {
    this._updateTable()
  }

  onClientAdded(): void {
    this._updateTable();
  }

  onEdit(data:any){

  }

  private _updateTable() : void{
       this.buyerService.getAll().subscribe(
        {
          next:(data:any) => {
            this.clients = data.content
          }
        })
    }
    setPageSize(): void {
      if (this.pageSize > this.clients.length) {
        this.pageSize = this.clients.length;
      }
    
      this.page = this.clients.slice(0, this.pageSize);
    }
    
    prevPage(): void {
  
    }
    
    nextPage(): void {
  
    }
  
    private _updatePage(): void {
      this.subscription$ = this.buyerService.getAll().subscribe(
        (data:any) => {
          this.clients = data.content;
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
