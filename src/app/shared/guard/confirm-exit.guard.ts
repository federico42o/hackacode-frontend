import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-component-deactivate';

@Injectable({
  providedIn: 'root'
})
export class ConfirmExitGuard {
  canDeactivate(
    component: CanComponentDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }
  
}
