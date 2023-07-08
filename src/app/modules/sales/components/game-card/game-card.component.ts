import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { Dialog } from '@angular/cdk/dialog';
import { GameFormComponent } from '../game-form/game-form.component';
import { DialogComponent } from 'src/app/modules/administration/components/dialog/dialog.component';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit{
  
  constructor(private service: GameService){};
  isHidden:boolean = false;
  @Input() game!:Game;
  @Output() edit = new EventEmitter<Game>()
  @Output() delete = new EventEmitter<Game>()
  ngOnInit(): void {

  }
  
  onEdit(game:Game){
    this.edit.emit(game)
  }
  onDelete(game:Game){
   this.delete.emit(game)
  }

}
