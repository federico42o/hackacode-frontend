import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }
  apiUrl = environment.apiUrl;

  getAll():Observable<any>{
    return this.http.get(`${this.apiUrl}horarios`)
  }

  create(schedule:Schedule):Observable<any>{
    return this.http.post(`${this.apiUrl}horarios`,schedule)
  }


  


}
