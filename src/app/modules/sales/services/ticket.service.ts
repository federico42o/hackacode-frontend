import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketRequest } from 'src/app/models/ticket-request';
import { TicketVip } from 'src/app/models/ticket-vip';
import { TicketVipRequest } from 'src/app/models/ticket-vip-request';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/tickets';

  createNormal(ticket:TicketRequest) : Observable<any>{
    return this.http.post(this.baseUrl, ticket);
  }
  createVip(ticket:TicketVipRequest) : Observable<any>{
    return this.http.post(this.baseUrl.concat("vip"), ticket);
  }

  getAllNormals():Observable<any>{
    return this.http.get(this.baseUrl);
  }
  getAllVips():Observable<any>{
    return this.http.get(this.baseUrl.concat("vip"));
  }


}
