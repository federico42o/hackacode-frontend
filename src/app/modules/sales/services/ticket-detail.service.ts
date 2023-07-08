import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketDetail, TicketDetailRequest } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TicketDetailService {

  constructor(private http: HttpClient) { }
  apiURL = environment.apiUrl+"ticket-details"
  save(request:TicketDetailRequest):Observable<string>{
    return this.http.post<string>(this.apiURL,request)
  }
  getAll():Observable<PaginationResponse<TicketDetail>>{
    return this.http.get<PaginationResponse<TicketDetail>>(this.apiURL)
  }
  delete(id:string):Observable<object>{
    return this.http.delete(this.apiURL+"/"+id)
  }
}
