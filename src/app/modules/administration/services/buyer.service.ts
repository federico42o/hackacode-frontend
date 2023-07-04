import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuyerRequest } from 'src/app/models';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'compradores';

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  create(buyer: BuyerRequest): Observable<any> {
    return this.http.post(this.baseUrl, buyer);

  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl +"/"+ id);
  }

  update(user:BuyerRequest):Observable<any>{
    return this.http.put(this.baseUrl, user);
  }


}
