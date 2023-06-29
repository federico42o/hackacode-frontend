import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  
  ngOnInit(): void {
    
  }
  @Input() games!:Game[];
  @Input() headers!: string[];
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() actions!: boolean;
  isEditMode: boolean = false;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  editableRow:number = -1;
  emitDelete(id: number){
    this.delete.emit(id);
  }

  emitEdit(row: any){
    console.log(row)
    this.edit.emit(row);
  }
  editValue(row: any, column: string, value: any) {
    row[column] = value;
    console.log(value)
  }
  
  pageSize!: any;
  page!: any[];

  getDisplayValue(row: any, column: string): string {
    if (row[column] == null) {
      return 'No disponible';
    } else if (typeof row[column] === 'object' && row[column].name) {
      return row[column].name;
    } else {
      return row[column].toString();
    }
  }
  toggleEdit(id:number):void{
    this.editableRow = id;
    this.isEditMode = !this.isEditMode
  }

  confirmButton(id:number):void{


  }

}
