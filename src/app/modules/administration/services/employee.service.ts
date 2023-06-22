import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/empleados';


  getAll(): Observable<any>  {
    return this.http.get(this.baseUrl);
  }

  create(employee:Employee):Observable<any>{
    return this.http.post(this.baseUrl, employee);

  }

  delete(id:number):void{
    this.http.delete(this.baseUrl+"/"+id);
  }

  update(employee:any, id:number):Observable<any>{
    return this.http.put(this.baseUrl+"/"+id, employee);
  }

  getByID(id:number):Observable<any>{
    return this.http.get(this.baseUrl+"/"+id);
  }

}
