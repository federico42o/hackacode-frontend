import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/models';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'roles';

  create(role:UserRole):Observable<object>{ 
    return this.http.post(this.baseUrl, role);
  }
  
  getAll():Observable<UserRole[]>{
    return this.http.get<UserRole[]>(this.baseUrl);
  }
}
