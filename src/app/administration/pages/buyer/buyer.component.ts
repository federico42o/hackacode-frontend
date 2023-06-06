import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit{
  
  constructor(private fb : FormBuilder, private service : ClientService){}
  buyerForm! : FormGroup;
  clients : any;
  page : any;
  headers : string[] = ["Nombre", "Apellido", "Fecha de nacimiento", "DNI"];
  columns : string[] = ["name", "surname", "birthdate", "dni"];
  pageSize: number = 5;
  ngOnInit(): void {
    this.service.getClients().subscribe(
      (data:any) => {
        this.clients = data.clients;
        this.setPageSize();
      });

    this.buyerForm = this.fb.group({
      name:["", [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      surname:["",[Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      birthdate:["",[Validators.required]],
      dni:["",[Validators.required, Validators.pattern("[0-9]{8}")]],
    });
  }


  onSubmit():void{

    if(this.buyerForm.invalid){
      return;
    }else{

    console.log(this.buyerForm.value)
    }
  }

  setPageSize():void{
    if(this.pageSize > this.clients.length){
      this.pageSize = this.clients.length;
    }
    this.page = this.clients.slice(0,this.pageSize);

  }
}
