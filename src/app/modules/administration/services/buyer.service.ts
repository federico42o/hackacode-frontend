import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Buyer, BuyerRequest } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'compradores';

  getAll(): Observable<PaginationResponse<Buyer>> {
    return this.http.get<PaginationResponse<Buyer>>(this.baseUrl);
  }

  create(buyer: BuyerRequest): Observable<object> {
    return this.http.post(this.baseUrl, buyer);

  }

  delete(id: number): Observable<object> {
    return this.http.delete(this.baseUrl +"/"+ id);
  }

  update(user:BuyerRequest):Observable<object>{
    return this.http.put(this.baseUrl, user);
  }


}
