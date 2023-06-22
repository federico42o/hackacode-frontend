import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/roles';

  create(role:UserRole):Observable<any>{ 
    return this.http.post(this.baseUrl, role);
  }
  
  getAll():Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
