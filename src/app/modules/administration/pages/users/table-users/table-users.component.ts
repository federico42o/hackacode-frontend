import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserRole } from 'src/app/models';
import { UserEmployeeService } from '../../../services/user-employee.service';
import { UserTable, UserUpdate } from 'src/app/models/user';
import { RoleService } from '../../../services/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableUsersComponent implements OnInit {


  @Input() roles!: UserRole[];
  dataSource!: MatTableDataSource<UserTable>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[]  = ['name','surname','dni','username','roles','enable','actions'];
  data: UserTable[] = []
  users!:User[];
  isEditMode:boolean = false;
  editRowId!: number | null;
  userForm!:FormGroup;
  constructor(private service:UserEmployeeService,private roleService:RoleService,public _MatPaginatorIntl: MatPaginatorIntl,private fb:FormBuilder,private authService:AuthService) {
    
      this._MatPaginatorIntl.itemsPerPageLabel = 'Items por página';

  }
  
  
  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next:(data:UserRole[])=>{
        this.roles = data
        this._updateTable()
      }
    });
    this.userForm = this.fb.group({
      username:['',[Validators.required,Validators.email]],
      roles:[[],[Validators.required]],
    })
  }
  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.users = data.content;
          this.dataSource = new MatTableDataSource(this.setData(data.content) )
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
        }
      })
  }


  setData(userList: User[]): UserTable[] {
    return userList.map((user) => {
      const usuario: UserTable = {
        id: user.id,
        enable:user.enable,
        name: user.employee.name,
        surname: user.employee.surname,
        employee: user.employee,
        dni: user.employee.dni,
        username: user.username,
        roles: user.roles
      };
      return usuario;
    });
  }
  enterEditMode(id:number) {
    this.isEditMode = true;
    this.editRowId = id;
    const user = this.users.find((user)=>user.id === id)
    this.userForm.patchValue({
      username:user?.username,
      roles:user?.roles
    })

    
  }
  exitEditMode() {
    this.isEditMode = false;
    this._updateTable()
  }
  confirmEdit(data:any){
    
    const editedRow:UserUpdate = {
      id : this.editRowId!,
      username : this.userForm.get('username')?.value,
      roles : this.userForm.get('roles')?.value,
      employee : data.employee

    }

    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
    }else{

      this.service.update(editedRow).subscribe({
        error:(err:any)=>{
       
        },
        complete:()=>{
          this.isEditMode = false;
          this._updateTable()
          this.authService.initializeCurrentUser();
        }
  
      })
    }
  }
  setEnable(data:any){
    if(data.enable){

      this.service.delete(data.id).subscribe({
        error:(err:any)=>{
         
        },
        complete:()=>{
          this._updateTable()
        }
      }
      )

    } else{
      const editedRow:UserUpdate = {
        id : data.id,
        username : data.username,
        roles : data.roles,
        employee : data.employee
  
      }
      this.service.update(editedRow).subscribe({
        error:(err:any)=>{
         
        },
        complete:()=>{
          this._updateTable()
        }
      }
      )
    }



  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
