import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRequest, UserUpdate } from 'src/app/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserEmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'usuarios';
  getAll() : Observable<any>{
    return this.http.get(this.baseUrl);
  }

  create(user:UserRequest):Observable<any>{
    return this.http.post(this.baseUrl, user);
  }

  update(user:UserUpdate):Observable<any>{
    return this.http.put(this.baseUrl, user);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id);
  }
}
