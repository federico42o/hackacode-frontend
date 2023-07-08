import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Buyer } from 'src/app/models/buyer';
import { BuyerUpdate } from 'src/app/models/buyer/buyer-udate';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { DateValidator } from 'src/app/shared/utils/date-validator';
import { restrictionDate } from 'src/app/shared/utils/invalidDate';
import { BuyerService } from '../../../services/buyer.service';


@Component({
  selector: 'app-buyer-table',
  templateUrl: './buyer-table.component.html',
  styleUrls: ['./buyer-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BuyerTableComponent implements OnInit,AfterViewInit,AfterViewChecked,OnChanges{

  @Input() isRowDeleted!: boolean;
  @Output() deleteConfirm = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource!: MatTableDataSource<Buyer>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('birthdate', { static: true }) birthdate!: ElementRef;
  displayedColumns: string[]  = ['name','surname','dni','birthdate','lastVisit','actions'];
  buyers: Buyer[] = []
  buyerForm!:FormGroup;
  isEditMode = false;
  editRowId!:number | null;
  date!:Date;
  constructor(private service:BuyerService,public _MatPaginatorIntl: MatPaginatorIntl,private fb:FormBuilder) {
    
      this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página';
      
      
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isRowDeleted'] && changes['isRowDeleted'].currentValue === true) {
      this._updateTable()
      this.isRowDeleted = false;
    }
  }
  ngAfterViewChecked(): void {
    if(this.birthdate){

      restrictionDate(this.birthdate);
      
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
        next: (data: PaginationResponse<Buyer>) => {
          this.buyers = data.content.filter((client: Buyer) => !client.banned);
          this.dataSource = new MatTableDataSource(data.content.filter((client: Buyer) => !client.banned))
          
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

  delete(data:Buyer){
    this.service.delete(data.id).subscribe({
      next:()=>{
        this._updateTable()
      }
    })

  }


}
