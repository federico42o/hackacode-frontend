import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketDetail } from 'src/app/models/ticket-detail';
import { TicketDetailRequest } from 'src/app/models/ticket-detail-request';

@Injectable({
  providedIn: 'root'
})
export class TicketDetailService {

  constructor(private http: HttpClient) { }
  apiURL = "http://localhost:8080/api/ticket-details"
  save(request:TicketDetailRequest):Observable<any>{
    return this.http.post(this.apiURL,request)
  }
  getAll():Observable<any>{
    return this.http.get(this.apiURL)
  }
}
