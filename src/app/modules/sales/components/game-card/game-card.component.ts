import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit{
  
  constructor(private service: GameService){};
  games$!:Subscription;
  games!:Game[];
  ngOnInit(): void {
    this.games$ = this.service.getAll().subscribe({
      next: (data:any) =>{
        this.games = data.content;
      }
    }); 
  }

}
