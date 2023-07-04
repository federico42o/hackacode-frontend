import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, Game } from 'src/app/models';
import { EmployeeService } from '../../../services/employee.service';
import { GameService } from '../../../services/game.service';
import { DateValidator } from 'src/app/shared/utils/date-validator';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeTableComponent implements AfterViewInit,OnInit{

  games!: Game[]
  dataSource!: MatTableDataSource<Employee>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[]  = ['name','surname','dni','birthdate','game','actions'];
  employees: Employee[] = []
  isDarkMode!: boolean;
  isEditMode:boolean = false;
  editRowId!: number | null;
  employeeForm!:FormGroup;
  date!:Date;
  constructor(private service:EmployeeService,private gameService:GameService,public fb:FormBuilder,
    public _MatPaginatorIntl: MatPaginatorIntl
    ) {
    
      this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página';
      
    
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
      },
      complete:()=>{
        
        this._updateTable()
      }
    });
    this.employeeForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*')]],
      surname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*')]],
      dni:['',[Validators.required,Validators.minLength(7),Validators.maxLength(8),Validators.pattern('[0-9]*')]],
      birthdate:['',[Validators.required,DateValidator.isAfter]],
      game:[],
    })
    this.date = new Date();
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

  enterEditMode(data:Employee):void{
    this.isEditMode = true;
    this.editRowId = data.id;
    const employee = this.employees.find((employee)=>employee.id === this.editRowId)

    this.employeeForm.patchValue({
      name:employee?.name,
      surname:employee?.surname,
      dni:employee?.dni,
      birthdate:employee?.birthdate,
      game: data.game?.name
    })
  }
  exitEditMode() :void {
    this.isEditMode = false;
    this.editRowId = null;
  }
  confirmEdit(data:Employee):void{
    const edited: Employee = {
      id: data.id,
      name: this.employeeForm.get('name')?.value,
      surname: this.employeeForm.get('surname')?.value,
      dni: this.employeeForm.get('dni')?.value,
      birthdate: this.employeeForm.get('birthdate')?.value,
      game: this.employeeForm.get('game')?.value
    }
    if(this.employeeForm.invalid){
      return
    }

    this.service.update(edited).subscribe({
      next:()=>{
        this._updateTable()
        this.exitEditMode()
      }
    })




  }

  delete(data:any){
    this.service.delete(data.id).subscribe({
      next:()=>{
        this._updateTable()
      }
    })

  }

}
