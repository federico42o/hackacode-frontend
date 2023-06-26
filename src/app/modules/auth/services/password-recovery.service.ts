import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/token/recuperar_pass'

  requestMail(request:any): Observable<any>{
    return this.http.post(this.baseUrl,request);
  }

  changePassword(request:any):Observable<any>{
    return this.http.post("http://localhost:8080/token/cambiar_pass",request)
  }
}
