import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Buyer } from 'src/app/models/buyer';

@Component({
  selector: 'app-vip-ticket',
  templateUrl: './vip-ticket.component.html',
  styleUrls: ['./vip-ticket.component.css']
})
export class VipTicketComponent implements OnInit{
  constructor(
    public dialogRef: DialogRef<VipTicketComponent>,
    @Inject(DIALOG_DATA) public data: any){}
  price:number = 10000
  date = new Date();
  day = this.date.getDate();
  month = this.date.toLocaleDateString('es-ES', { month: 'short' });
  year = this.date.getFullYear();
  currentTime = this.date.toLocaleTimeString();
  // @Input() buyer: Buyer = buyer1;
  buyer!: Buyer;
  ticketID:string = "asdasdsadas";
  ngOnInit(): void { }

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
