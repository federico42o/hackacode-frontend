import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Game, User } from 'src/app/models';
import { environment } from 'src/environments/environment.development';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {


}
