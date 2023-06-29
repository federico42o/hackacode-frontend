import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Buyer } from 'src/app/models/buyer';
import { BuyerService } from '../../../services/buyer.service';

@Component({
  selector: 'app-buyer-table',
  templateUrl: './buyer-table.component.html',
  styleUrls: ['./buyer-table.component.css']
})
export class BuyerTableComponent implements OnInit{

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource!: MatTableDataSource<Buyer>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[]  = ['name','surname','dni','birthdate','lastVisit','actions'];
  buyers: Buyer[] = []



  constructor(private service:BuyerService) {
    
  }
  
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  ngOnInit(): void {
    this._updateTable()
  }
  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.buyers = data.content;
          this.dataSource = new MatTableDataSource(data.content)
          
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort; 
        }
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  emitEdit(data:Buyer):void{
    this.edit.emit(data)
  }

  emitDelete(id:number):void{
    this.delete.emit(id)
  }
}
