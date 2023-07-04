import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(private http: HttpClient) { }
  tokenUrl = environment.tokenUrl;

  requestMail(request:any): Observable<any>{
    return this.http.post(this.tokenUrl+'recuperar_pass',request);
  }

  changePassword(request:any):Observable<any>{
    return this.http.post(this.tokenUrl+"cambiar_pass",request)
  }
}
