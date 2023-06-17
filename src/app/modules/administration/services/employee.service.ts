import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/empleados';


  getAll(): Observable<any>  {
    return this.http.get(this.baseUrl);
  }

  create(employee:any):void{
    this.http.post(this.baseUrl, employee);

  }

  delete(id:number):void{
    this.http.delete(this.baseUrl+id);
  }

  update(employee:any, id:number):void{
    this.http.put(this.baseUrl+id, employee);
  }

}
