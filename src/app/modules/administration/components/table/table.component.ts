import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  ngOnInit(): void {
  }
  
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
  
  pageSize!: any;
  page!: any[];



}
