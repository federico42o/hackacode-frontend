import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket, TicketRequest } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/tickets';

  save(ticket:TicketRequest) : Observable<any>{
    return this.http.post(this.baseUrl, ticket);
  }

  getAll():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  delete(id:number):void{
    this.http.delete(this.baseUrl+"/"+id)
  }

  update(request:Ticket):Observable<any>{
    return this.http.put(this.baseUrl,request)
  }

}
