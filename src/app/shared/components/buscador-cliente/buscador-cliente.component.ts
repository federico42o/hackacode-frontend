import { Component, OnInit } from '@angular/core';
import { Observable, map, of, startWith } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { FormControl } from '@angular/forms';
import { BuyerService } from 'src/app/modules/administration/services/buyer.service';

@Component({
  selector: 'app-buscador-cliente',
  templateUrl: './buscador-cliente.component.html',
  styleUrls: ['./buscador-cliente.component.css']
})
export class BuscadorClienteComponent implements OnInit {
  clients!: any[];
  clientCtrl = new FormControl('');
  filteredClients$!: Observable<any[]>;

  constructor(private service: BuyerService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (response: any) => {
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

  private _filterClients$(value: string): any[] {
    if (this.clients) {
      return this.clients.filter(client => client.dni && client.dni.includes(value.toString())|| client.name && client.name.toLowerCase().includes(value.toString().toLowerCase()));
    } else {
      return [];
    }
  }
}