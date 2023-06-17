import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient,private cookies : CookieService) {
    const token = this.cookies.get('token');
        if (token) {
            const decoded: any = jwt_decode(token);
            this.getUserByUsername(decoded.sub).subscribe({
              next: (user:User)=> {
                this.setCurrentUser(user);
              },
              error: (err:any) => {
                console.log('Error retrieving user:', err);
              }}
            );
          }
   }
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/users/username/" + username);
  }
  islogged() {
      const token = this.cookies.get('token');
      return token !== '' && token !== null;
  }

  getCurrentUser(): Observable<User> {
      return this.currentUserSubject.asObservable();
  }
}

