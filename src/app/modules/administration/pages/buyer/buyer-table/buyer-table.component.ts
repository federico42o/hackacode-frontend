import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Buyer, BuyerRequest } from 'src/app/models/buyer';
import { BuyerService } from '../../../services/buyer.service';
import { BuyerUpdate } from 'src/app/models/buyer/buyer-udate';
import { restrictionDate } from 'src/app/shared/utils/invalidDate';
import { DateValidator } from 'src/app/shared/utils/date-validator';


@Component({
  selector: 'app-buyer-table',
  templateUrl: './buyer-table.component.html',
  styleUrls: ['./buyer-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BuyerTableComponent implements OnInit,OnDestroy,AfterViewInit,AfterViewChecked{

  @Output() deleteConfirm = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource!: MatTableDataSource<Buyer>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('birthdate', { static: true }) birthdate!: ElementRef;
  displayedColumns: string[]  = ['name','surname','dni','birthdate','lastVisit','actions'];
  buyers: Buyer[] = []
  buyerForm!:FormGroup;
  isEditMode:boolean = false;
  editRowId!:number | null;
  date!:Date;
  constructor(private service:BuyerService,public _MatPaginatorIntl: MatPaginatorIntl,private fb:FormBuilder) {
    
      this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página';
      
      
  }
  ngAfterViewChecked(): void {
    if(this.birthdate){

      restrictionDate(this.birthdate);
      console.log(this.birthdate)
    }
  }
  
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
    this._updateTable()
    this.buyerForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*')]],
      surname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*')]],
      dni:['',[Validators.required,Validators.minLength(7),Validators.maxLength(8),Validators.pattern('[0-9]*')]],
      birthdate:['',[Validators.required,DateValidator.isAfter]],
    })
    this.date = new Date();
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


  emitDelete(id:number):void{
    this.deleteConfirm.emit(id)
  }


  enterEditMode(data:Buyer):void{
    this.isEditMode = true;
    this.editRowId = data.id;
    const buyer = this.buyers.find((buyer)=>buyer.id === this.editRowId)
    console.log(buyer)
    this.buyerForm.patchValue({
      name:buyer?.name,
      surname:buyer?.surname,
      dni:buyer?.dni,
      birthdate:buyer?.birthdate,
    })
  }
  exitEditMode() :void {
    this.isEditMode = false;
    this.editRowId = null;
  }
  confirmEdit(data:Buyer):void{
    const edited: BuyerUpdate = {
      id: data.id,
      name: this.buyerForm.get('name')?.value,
      surname: this.buyerForm.get('surname')?.value,
      dni: this.buyerForm.get('dni')?.value,
      birthdate: this.buyerForm.get('birthdate')?.value,
    }
    if(this.buyerForm.invalid){
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
  ngOnDestroy(): void {
    
  }

}
