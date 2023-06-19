import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subscription, catchError, switchMap, tap, throwError } from 'rxjs';
import { User } from 'src/app/models';

import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  constructor(private http: HttpClient, private cookies: CookieService) { 
    const token = cookies.get('token');
    if (token !== '' && token !== null) {
      const decoded: any = jwt_decode(token);
      this.getUserByUsername(decoded.sub).subscribe({
        next: (user: User) => {
          this.setCurrentUser(user);
        },
        error: (err: any) => {
          console.log('Error retrieving user:', err);
          cookies.delete('token');
        }
      });
    }
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/usuarios/por_nombre/" + username);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/token', { username, password }).pipe(
      switchMap((res: any) => {
        this.cookies.set('token', res.token);
        const decoded: any = jwt_decode(res.token);
        return this.getUserByUsername(decoded.sub);
      }),
      tap((user: User) => {
        this.setCurrentUser(user);
      }),
      catchError((err: any) => {
        console.log('Error retrieving user:', err);
        this.cookies.delete('token');
        return throwError(()=> new Error('Error retrieving user'));
      })
    );
  }

  logout(): void {
    this.cookies.delete('token');
    this.setCurrentUser({} as User);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  isLogged(): boolean {
    const token = this.cookies.get('token');
    return token !== '' && token !== null;
  }
}