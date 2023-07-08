import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket, TicketRequest } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'tickets';

  save(ticket:TicketRequest) : Observable<object>{
    return this.http.post(this.baseUrl, ticket);
  }

  getAll():Observable<PaginationResponse<Ticket>>{
    return this.http.get<PaginationResponse<Ticket>>(this.baseUrl);
  }

  delete(id:number): Observable<object>{
    return this.http.delete(this.baseUrl+"/"+id)
  }

  update(request:Ticket):Observable<object>{
    return this.http.put(this.baseUrl,request)
  }

}
