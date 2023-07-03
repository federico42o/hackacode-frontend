import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Game, User } from 'src/app/models';

import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from 'src/app/models/user/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  private currentGameSubject: BehaviorSubject<Game> = new BehaviorSubject<Game>({} as Game);
  private rolePermissions = {
    'ADMINISTRADOR': ['administration' ],
    'VENTAS': ['sales' ],
    'GERENTE': [ 'reports' ]
  };
  apiUrl = environment.apiUrl



  constructor(private http: HttpClient, private cookies: CookieService) {
    
  }
  
  initializeCurrentUser(): void {
    const tokenKey = 'token';
    const usernameKey = 'sub';
    
    if (this.cookies.check(tokenKey)) {
      const token = this.cookies.get(tokenKey);
      const decoded: any = jwt_decode(token);
      const username = decoded[usernameKey];

      this.getUserByUsername(username).subscribe({
        next: (user: User) => {
          this.setCurrentUser(user);
          if (user.employee && user.employee.game) {
            console.log(user.employee.game)
            this.setCurrentGame(user.employee.game || {} as Game);
          }
        },
        error: (err: any) => {
          console.log('Error retrieving user:', err);
          this.cookies.deleteAll();
        }
      });
    }
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }
  setCurrentGame(game: Game) {
    this.currentGameSubject.next(game);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl+"usuarios/por_nombre/" + username);
  }

  login(request:LoginRequest): Observable<any> {
    return this.http.post('http://localhost:8080/token', request).pipe(
      switchMap((res: any) => {
        this.cookies.set('token', res.token);
        const decoded: any = jwt_decode(res.token);
        return this.getUserByUsername(decoded.sub);
      }),
      tap((user: User) => {
        this.setCurrentUser(user);
      }),
      catchError((err: any) => {
        this.cookies.delete('token', '/');
        return throwError(()=> new Error('Usuario o contraseña incorrectos.'));
      })
    );
  }

  logout(): void {
    this.cookies.deleteAll();
    this.setCurrentUser({} as User);
  }



  getCurrentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }
  getCurrentGame(): Observable<Game> {
    return this.currentGameSubject.asObservable();
  }

  isLogged(): boolean {
    const token = this.cookies.get('token');
    return token !== '' && token !== null;
  }

  
  hasPermission(module: string,currentUser:User): boolean {
    const userRoles = (currentUser && currentUser.roles) ?  currentUser.roles.map((role) => role.role) : [];
    for (const role of userRoles) {
      const modules = this.rolePermissions[role as keyof typeof this.rolePermissions];
      if (modules && modules.includes(module)) {
        return true;
      }
    }
    return false;
  }
}