import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent {

  @Input() headers!: string[];
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() actions!: boolean;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  emitDelete(id: number){
    this.delete.emit(id);
  }

  emitEdit(id: number){
    this.edit.emit(id);
  }

}
