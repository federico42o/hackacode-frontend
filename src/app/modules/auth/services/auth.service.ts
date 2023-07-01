import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Game, User } from 'src/app/models';

import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

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
    const token = cookies.get('token');
    if (token !== '' && token !== null) {
      const decoded: any = jwt_decode(token);
      this.getUserByUsername(decoded.sub).subscribe({
        next: (user: User) => {
          if(user.employee.game !== null){this.setCurrentGame(user.employee.game||{} as Game)}
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
  setCurrentGame(game: Game) {
    this.currentGameSubject.next(game);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.apiUrl+"usuarios/por_nombre/" + username);
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
  getCurrentGame(): Observable<Game> {
    return this.currentGameSubject.asObservable();
  }

  isLogged(): boolean {
    const token = this.cookies.get('token');
    return token !== '' && token !== null;
  }
  getUserRoles():string[]{

  const currentUser:User = this.currentUserSubject.value;

  if (currentUser && currentUser.roles) {
    return currentUser.roles.map((role) => role.role);
  } else {
    return [];
  }
  }

  hasPermission(module: string): boolean {
    const userRoles = this.getUserRoles();

    for (const role of userRoles) {

      const modules = this.rolePermissions[role as keyof typeof this.rolePermissions];

      if (modules && modules.includes(module)) {
        return true;
      }
    }
    return false;
  }
}