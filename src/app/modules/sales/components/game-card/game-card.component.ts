import { Component, Input, OnInit } from '@angular/core';
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
  isHidden:boolean = false;
  @Input() game!:Game;
  ngOnInit(): void {

  }

}
