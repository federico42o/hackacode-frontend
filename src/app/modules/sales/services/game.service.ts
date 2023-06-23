import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models';
import { GameRequest } from 'src/app/models/game-request';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http : HttpClient) {}
  baseUrl = 'http://localhost:8080/api/juegos'

  create(game : GameRequest): Observable<any> {
    return this.http.post(this.baseUrl, game)
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  update(game : Game): Observable<any> {
    return this.http.put(this.baseUrl, game)
  }

  delete(id : number): Observable<any> {
    return this.http.delete(this.baseUrl+ "/" + id )
  }

}
