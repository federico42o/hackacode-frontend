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

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl+'juegos';

  getAll(): Observable<PaginationResponse<Game>> {
    return this.http.get<PaginationResponse<Game>>(this.baseUrl);
  }

  create(game: GameRequest): void {
    this.http.post(this.baseUrl, game);

  }

  delete(id: number): void {
    this.http.delete(this.baseUrl+"/" + id);
  }

  update(game: Game, id: number): void {
    this.http.put(this.baseUrl +"/"+ id, game);
  }
  
}
