import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }
  apiUrl = environment.apiUrl;

  getAll():Observable<PaginationResponse<Schedule>>{
    return this.http.get<PaginationResponse<Schedule>>(`${this.apiUrl}horarios`)
  }

  create(schedule:Schedule):Observable<object>{
    return this.http.post(`${this.apiUrl}horarios`,schedule)
  }


  


}
