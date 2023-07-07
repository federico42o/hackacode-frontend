import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/models';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  currentUser!:User;
  constructor(private authService: AuthService, private router: Router) {
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const module = childRoute.data['module'];

      return this.authService.getCurrentUser().pipe(
        switchMap((value: User) => {
          this.currentUser = value;
          console.log(this.currentUser)
          if (module && !this.authService.hasPermission(module, this.currentUser)) {
           
            this.router.navigate(['/forbidden']);
            return of(false);
          }
          
          return of(true);
        }))
      
  }
  
}
