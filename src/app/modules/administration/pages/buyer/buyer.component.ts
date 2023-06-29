import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BuyerFormComponent } from '../../components/buyer-form/buyer-form.component';
import { BuyerService } from '../../services/buyer.service';
import { Buyer } from 'src/app/models/buyer';

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
  clients!: Buyer[];
  page : any;
  columns = [
    {
      key: "name",
      type: "text",
      label: "Nombre"
  },
  {
      key: "surname",
      type: "text",
      label: "Apellido"
  },
  {
      key: "dni",
      type: "text",
      label: "DNI"
  },
  {
      key: "birthdate",
      type: "date",
      label: "Fecha de nacimiento"
  },
  {
    key: "lastVisit",
    type: "lastVisit",
    label: "Ult. visita"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: "Acciones"
  }
  ]


  pageSize: number = 5;

  ngOnInit(): void {
    this._updateTable()
  }

  onClientAdded(): void {
    this._updateTable();
  }

  onEdit(data:any):void {
    console.log(data)
  }
  onDelete(data:any):void{
    console.log(data)
  }

  onDataSave(data:Buyer):void{

    this.buyerService.update(data).subscribe({
      next:()=>{
        this._updateTable()
      },
      error:(err:any)=>{
        console.log(err)
      }


    });
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
