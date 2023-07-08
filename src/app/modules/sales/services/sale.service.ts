import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { Sale, SaleRequest } from 'src/app/models/sale';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient) { }
  apiURL=environment.apiUrl+"ventas"
  save(request:SaleRequest):Observable<object>{
    return this.http.post(this.apiURL,request)
  }

  getAll():Observable<PaginationResponse<Sale>>{
    return this.http.get<PaginationResponse<Sale>>(this.apiURL);
  }

  update(sale:Sale):Observable<object>{
    return this.http.put(this.apiURL,sale)
    
  }


  delete(id:number):Observable<object>{
    return this.http.delete(this.apiURL+"/"+id)
  }

  getByGame(gameId:number):Observable<Sale>{
    return this.http.get<Sale>(`${this.apiURL}ventas/juego/${gameId}`)
  }

}
