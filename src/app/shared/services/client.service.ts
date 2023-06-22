import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  

  getClients() {
    return this.http.get('/assets/data/clients.json');
  }

  create(client: any) {
    return this.http.post('/assets/data/clients.json', client);
  }

}
