import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  currentUser!:User;
  constructor(private authService: AuthService, private router: Router) {
    
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const module = childRoute.data['module'];

      return this.authService.getCurrentUser().pipe(
        switchMap((value: User) => {
          this.currentUser = value;
          
          if (module && !this.authService.hasPermission(module, this.currentUser)) {
           
            this.router.navigate(['/forbidden']);
            return of(false);
          }
          
          return of(true);
        }))
      
  }
  
}
