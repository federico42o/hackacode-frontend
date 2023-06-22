import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from 'src/app/models/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserEmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/usuarios';
  getAll() : Observable<any>{
    return this.http.get(this.baseUrl);
  }

  create(user:UserRequest):Observable<any>{
    return this.http.post(this.baseUrl, user);
  }
}
