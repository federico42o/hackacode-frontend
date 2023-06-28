import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleRequest } from 'src/app/models/sale-request';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient) { }
  apiURL="http://localhost:8080/api/ventas"
  save(request:SaleRequest):Observable<any>{
    return this.http.post(this.apiURL,request)
  }
}
