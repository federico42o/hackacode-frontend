import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';
import { BuyerService } from '../../services/buyer.service';
import { Subscription } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { BuyerFormComponent } from '../../components/buyer-form/buyer-form.component';

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

  subscription$! : Subscription;
  buyerForm! : FormGroup;
  clients : any;
  page : any;
  headers : string[] = ["Nombre", "Apellido", "Fecha de nacimiento", "DNI"];
  columns : string[] = ["name", "surname", "birthdate", "dni"];
  pageSize: number = 5;

  ngOnInit(): void {
    this._updatePage()
    this._updateTable()
  }


  onSubmit():void{
    console.log(this.buyerForm.value)
    if(this.buyerForm.invalid){
     console.log("invalid form")
    }else{

    this.buyerService.create(this.buyerForm.value as BuyerRequest).subscribe(
      {next:(data:any) => {
        this._updatePage()
      },
      error:(error:any) => {
        console.log(error)
      }

    });
    this.buyerForm.reset();
    }
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
    ngOnDestroy(): void {
      if(this.subscription$){
        this.subscription$.unsubscribe();
      }
    }


    openDialog() : void{
      const dialogRef = this.dialog.open(BuyerFormComponent,{
        width: '60%',
        height: '50%',
      });
      dialogRef.closed.subscribe(result => {
        this._updateTable()
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
}
