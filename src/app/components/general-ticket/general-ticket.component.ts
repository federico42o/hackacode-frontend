import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models';
import { Buyer } from 'src/app/models/buyer';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-general-ticket',
  templateUrl: './general-ticket.component.html',
  styleUrls: ['./general-ticket.component.css']
})
export class GeneralTicketComponent implements OnInit{

  constructor(private auth : AuthService,
    public dialogRef: DialogRef<GeneralTicketComponent>,
    @Inject(DIALOG_DATA) public data: any){}
  date = new Date();
  day = this.date.getDate();
  month = this.date.toLocaleDateString('es-ES', { month: 'short' });
  year = this.date.getFullYear();
  currentDay = this.date.getDate() + " de " + this.date.toLocaleDateString('es-ES', { month: 'short' }) + " del " + this.date.getFullYear() ;
  currentTime = this.date.toLocaleTimeString();
  game!:Game;
  // @Input() buyer: Buyer = buyer1;
  // @Input() ticketID:string = "asdasdsadas";
  buyer: Buyer = buyer1;
  ticketID:string = "asdasdsadas";
  ngOnInit(): void {
    this.auth.getCurrentGame().subscribe(
      (data) =>{
        this.game = data
        console.log(data)
      
      }
    );    
  }

  getAge(birthDate: string): number {
    const today = new Date();
    const birth=  new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  close():void{this.dialogRef.close()}
  }
  

export const buyer1 : Buyer = {
  id:1,
  dni:"12312312",
  name:"nombre",
  surname:"apellido",
  birthdate:"2012-12-12"
}