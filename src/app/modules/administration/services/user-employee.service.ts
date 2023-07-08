import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRequest, UserUpdate } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'usuarios';
  getAll() : Observable<PaginationResponse<User>>{
    return this.http.get<PaginationResponse<User>>(this.baseUrl);
  }

  create(user:UserRequest):Observable<object>{
    return this.http.post(this.baseUrl, user);
  }

  update(user:UserUpdate):Observable<object>{
    return this.http.put(this.baseUrl, user);
  }

  delete(id:number):Observable<object>{
    return this.http.delete(this.baseUrl+"/"+id);
  }
}
