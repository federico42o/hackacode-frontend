import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale, SaleRequest } from 'src/app/models/sale';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient) { }
  apiURL=environment.apiUrl+"ventas"
  save(request:SaleRequest):Observable<any>{
    return this.http.post(this.apiURL,request)
  }

  getAll():Observable<any>{
    return this.http.get(this.apiURL);
  }

  update(sale:Sale):Observable<any>{
    return this.http.put(this.apiURL,sale)
    
  }


  delete(id:number):Observable<any>{
    return this.http.delete(this.apiURL+"/"+id)
  }

}
