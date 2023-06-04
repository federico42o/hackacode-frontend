import { Component, OnInit } from '@angular/core';
import { Observable, map, of, startWith } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscador-cliente',
  templateUrl: './buscador-cliente.component.html',
  styleUrls: ['./buscador-cliente.component.css']
})
export class BuscadorClienteComponent implements OnInit {
  clients!: any[];
  clientCtrl = new FormControl('');
  filteredClients$!: Observable<any[]>;

  constructor(private service: ClientService) {}

  ngOnInit(): void {
    this.service.getClients().subscribe(
      (response: any) => {
        console.log(response)
        this.clients = response.clients;
        this.setupFilteredClients()
        
      }
    );
    }
  

  private setupFilteredClients(): void {
    this.filteredClients$ = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      map(client => (client ? this._filterClients$(client) : this.clients))
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