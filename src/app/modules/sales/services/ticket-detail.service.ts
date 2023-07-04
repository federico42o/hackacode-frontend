import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketDetailRequest } from 'src/app/models';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class TicketDetailService {

  constructor(private http: HttpClient) { }
  apiURL = environment.apiUrl+"ticket-details"
  save(request:TicketDetailRequest):Observable<any>{
    return this.http.post(this.apiURL,request)
  }
  getAll():Observable<any>{
    return this.http.get(this.apiURL)
  }
  delete(id:string):Observable<any>{
    return this.http.delete(this.apiURL+"/"+id)
  }
}
