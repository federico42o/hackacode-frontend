import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameRequest } from 'src/app/models';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http : HttpClient) {}
  apiUrl = environment.apiUrl+'juegos'

  create(game : GameRequest): Observable<any> {
    return this.http.post(this.apiUrl, game)
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  update(game : Game): Observable<any> {
    return this.http.put(this.apiUrl, game)
  }

  delete(id : number): Observable<any> {
    return this.http.delete(this.apiUrl+ "/" + id )
  }

}
