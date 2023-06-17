import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/games/';

  getAll(): any {
    return this.http.get(this.baseUrl);
  }

  create(game: any): void {
    this.http.post(this.baseUrl, game);

  }

  delete(id: number): void {
    this.http.delete(this.baseUrl + id);
  }

  update(game: any, id: number): void {
    this.http.put(this.baseUrl + id, game);
  }
  
}
