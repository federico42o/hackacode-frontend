import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'src/app/models';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { Sale } from 'src/app/models/sale';
import { SaleTable } from 'src/app/models/sale/sale-table';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit,AfterViewInit{


  dataSource!: MatTableDataSource<SaleTable>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[]  = ['id','game','purchaseDate','ticketsDetail','totalPrice','actions'];
  isEditMode = false;
  editRowId!:number | null;
  date!:Date;
  sales!:Sale[];
  currentGame!:Game;
@Input() game!:Game;
  constructor(private service:SaleService,public _MatPaginatorIntl: MatPaginatorIntl) {
    
      this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página';
      
      
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

    ngOnInit(): void {
      if(this.game){
      
        this.currentGame = this.game;
        this._updateTable()
      }
    this.date = new Date();
  }

  private _updateTable() : void{
    this.service.getAll().subscribe({
      next:(data:PaginationResponse<Sale>)=>{
        this.sales = data.content;
        this.dataSource = new MatTableDataSource(this.setData(data.content))
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  setData(data: Sale[]): SaleTable[] {
    return data
      .filter((sale) => sale.game.id === this.game.id)
      .map((sale) => {
        const saleTable: SaleTable = {
          id: sale.id,
          game: sale.game.name,
          purchaseDate: sale.purchaseDate,
          ticketsDetail: sale.ticketsDetail,
          totalPrice: sale.totalPrice,
        };
        return saleTable;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

  cancel(id:number):void{
    this.service.delete(id).subscribe({
      next:()=>{
        this._updateTable()
      }
    })

  }

}

