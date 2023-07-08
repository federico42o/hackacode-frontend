import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameRequest } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http : HttpClient) {}
  apiUrl = environment.apiUrl+'juegos'

  create(game : GameRequest): Observable<object> {
    return this.http.post(this.apiUrl, game)
  }

  getAll(): Observable<PaginationResponse<Game>> {
    return this.http.get<PaginationResponse<Game>>(this.apiUrl)
  }

  update(game : Game): Observable<object> {
    return this.http.put(this.apiUrl, game)
  }

  delete(id : number): Observable<object> {
    return this.http.delete(this.apiUrl+ "/" + id )
  }

}
