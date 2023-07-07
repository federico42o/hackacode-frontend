import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecoveryResponse } from 'src/app/models/password/recovery-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(private http: HttpClient) { }
  tokenUrl = environment.tokenUrl;

  requestMail(request:any): Observable<RecoveryResponse>{
    return this.http.post<RecoveryResponse>(this.tokenUrl+'/recuperar_pass',request);
  }

  changePassword(request:any):Observable<any>{
    return this.http.post(this.tokenUrl+"/cambiar_pass",request)
  }
}
