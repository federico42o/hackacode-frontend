import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Game, User, UserRole } from 'src/app/models';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css']
})
export class SharedTableComponent implements OnInit {
  
  @Input() dataSource:any[] = [];
  @Input() columnsSchema!:any[];
  @Input() games!:Game[];
  @Input() roles!:UserRole[];

  @Output() save = new EventEmitter<any>(); 
  displayedColumns!:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  rowCtrl = new FormControl('');
  filteredRows$!: Observable<any[]>;
  ngOnInit(): void {
    if(this.columnsSchema){ 
      this.displayedColumns = this.columnsSchema.map(c => c.key);
    }
    console.log(this.dataSource);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      this.updateTableData();
    }
  }

  updateTableData() {
    this.displayedColumns = this.columnsSchema.map((c: any) => c.key);
    this.setupFilteredRows();
    this.table.renderRows();
  }

  setupFilteredRows() {
    this.filteredRows$ = this.rowCtrl.valueChanges.pipe(
      startWith(''),
      map(row => (row ? this._filterRows(row) : this.dataSource))
    );
  }

  ngAfterViewInit() {
    if (this.dataSource && this.dataSource.length > 0) {
      this.updateTableData();
    }
  }


  emitSave(row:any){
    row.isEdit = false;
    this.save.emit(row);
  }

  compareGames(game1: any, game2: any): boolean {
    return game1 && game2 ? game1.name === game2.name : game1 === game2;
  }

  private setupFilteredClients(): void {
    this.filteredRows$ = this.rowCtrl.valueChanges.pipe(
      startWith(''),
      map(row => (row ? this._filterRows(row) : []))
    );
  }

  private _filterRows(value: string): any[] {
    return this.dataSource.filter((row: any) => {
      for (const col of this.columnsSchema) {
        const cellValue = row[col.key];
        if (cellValue && cellValue.toString().toLowerCase().includes(value.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  getDisplayValue(row: any, column: string): string {
    if (row[column] == null) {
      return 'Sin asignar';
    } else if (typeof row[column] === 'object' && row[column].name) {
      return row[column].name;
    } else {
      return row[column].toString();
    }
  }
  
}
