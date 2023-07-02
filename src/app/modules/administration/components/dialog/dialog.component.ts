import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(DIALOG_DATA) public data: any,
  private dialogRef: DialogRef<DialogComponent>
  ) {}

  @Output() accept = new EventEmitter();

  onAccept():void{
    this.accept.emit();
  }
  close():void{
    this.dialogRef.close();
  }

}
