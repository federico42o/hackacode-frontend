import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { GameService } from '../../../services/game.service';
import { Employee, Game } from 'src/app/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements AfterViewInit,OnInit{

  games!: any
  
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource!: MatTableDataSource<Employee>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[]  = ['name','surname','dni','birthdate','game','actions'];
  employees: Employee[] = []



  constructor(private service:EmployeeService,private gameService:GameService) {
    
  }
  
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  ngOnInit(): void {
    this.gameService.getAll().subscribe({
      next:(data:any)=>{
        this.games = data.content
        this._updateTable()
      }
    });
  }
  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.employees = data.content;
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

  emitDelete(id: number) {
    this.delete.emit(id);
  }
  emitEdit(data: Employee) {
    this.edit.emit(data);
  }
}
