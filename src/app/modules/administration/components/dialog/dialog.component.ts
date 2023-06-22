import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(DIALOG_DATA) public data: any) {}

  @Output() accept = new EventEmitter();

  onAccept():void{
    this.accept.emit();
  }

}
