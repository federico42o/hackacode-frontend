import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'empleados';


  getAll(): Observable<PaginationResponse<Employee>>  {
    return this.http.get<PaginationResponse<Employee>>(this.baseUrl);
  }

  create(employee:Employee):Observable<object>{
    return this.http.post(this.baseUrl, employee);

  }

  delete(id:number):Observable<object>{
    return this.http.delete(this.baseUrl+"/"+id);
  }

  update(employee:Employee):Observable<object>{
    return this.http.put(this.baseUrl, employee);
  }

  getByID(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl+"/"+id);
  }

}
