import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookies : CookieService,private userService: UserService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/token', { username, password }).pipe(
      tap((res: any) => {
        this.cookies.set('token', res.token);
      })
    );
  }

  logout(): void {
    this.cookies.delete('token');
    this.userService.setCurrentUser({} as User);
  }



}
