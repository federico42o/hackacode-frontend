import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  
  isHidden = false;
  @Input() game!:Game;
  @Output() edit = new EventEmitter<Game>()
  @Output() delete = new EventEmitter<Game>()
  
  onEdit(game:Game){
    this.edit.emit(game)
  }
  onDelete(game:Game){
   this.delete.emit(game)
  }

}
