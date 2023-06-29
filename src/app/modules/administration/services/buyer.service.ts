import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuyerRequest } from '../pages';
import { Observable } from 'rxjs';
import { Buyer } from 'src/app/models/buyer';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'compradores';

  getAll(): any {
    return this.http.get(this.baseUrl);
  }

  create(buyer: BuyerRequest): Observable<any> {
    return this.http.post(this.baseUrl, buyer);

  }

  delete(id: number): void {
    this.http.delete(this.baseUrl +"/"+ id);
  }

  update(user:Buyer):Observable<any>{
    return this.http.put(this.baseUrl, user);
  }


}
