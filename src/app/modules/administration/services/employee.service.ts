import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'empleados';


  getAll(): Observable<any>  {
    return this.http.get(this.baseUrl);
  }

  create(employee:Employee):Observable<any>{
    return this.http.post(this.baseUrl, employee);

  }

  delete(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id);
  }

  update(employee:any, id:number):Observable<any>{
    return this.http.put(this.baseUrl, employee);
  }

  getByID(id:number):Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

}
