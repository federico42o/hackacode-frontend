import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuyerRequest } from '../pages';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/compradores';

  getAll(): any {
    return this.http.get(this.baseUrl);
  }

  create(buyer: BuyerRequest): Observable<any> {
    return this.http.post(this.baseUrl, buyer);

  }

  delete(id: number): void {
    this.http.delete(this.baseUrl +"/"+ id);
  }

  update(buyer: any, id: number): void {
    this.http.put(this.baseUrl +"/"+ id, buyer);
  }


}