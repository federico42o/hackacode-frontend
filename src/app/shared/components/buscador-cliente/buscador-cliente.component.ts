import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Buyer } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { BuyerService } from 'src/app/modules/administration/services/buyer.service';

@Component({
  selector: 'app-buscador-cliente',
  templateUrl: './buscador-cliente.component.html',
  styleUrls: ['./buscador-cliente.component.css']
})
export class BuscadorClienteComponent implements OnInit {
  clients!: Buyer[];
  clientCtrl = new FormControl('');
  filteredClients$!: Observable<Buyer[]>;

  constructor(private service: BuyerService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (response: PaginationResponse<Buyer>) => {
        this.clients = response.content;
        this.setupFilteredClients()
        
      }
    );
    }
  

  private setupFilteredClients(): void {
    this.filteredClients$ = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      map(client => (client ? this._filterClients$(client) : []))
    );
  }

  private _filterClients$(value: string): Buyer[] {
    if (this.clients) {
      return this.clients.filter(client => client.dni && client.dni.includes(value.toString())|| client.name && client.name.toLowerCase().includes(value.toString().toLowerCase()));
    } else {
      return [];
    }
  }
}