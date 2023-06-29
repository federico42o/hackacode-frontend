import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserRole } from 'src/app/models';
import { UserEmployeeService } from '../../../services/user-employee.service';
import { UserTable } from 'src/app/models/user-table';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit {


  @Input() roles!: UserRole[];
  
  @Output() save = new EventEmitter();
  @Output() edit = new EventEmitter();
  dataSource!: MatTableDataSource<UserTable>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[]  = ['name','surname','dni','username','roles'];
  data: UserTable[] = []
  users!:User[];
  currentTab:string = 'add';


  constructor(private service:UserEmployeeService,private roleService:RoleService) {
    
  }
  
  
  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next:(data:UserRole[])=>{
        console.log(data)
        this.roles = data
        this._updateTable()
      }
    });
  }
  private _updateTable() : void{
    this.service.getAll().subscribe(
      {
        next: (data: any) => {
          this.users = data.content;
          this.dataSource = new MatTableDataSource(this.setData(data.content))
          this.dataSource.paginator = this.paginator; 
          this.dataSource.sort = this.sort; 
        }
      })
  }

  setData(userList: User[]): UserTable[] {
    return userList.map((user) => {
      const usuario: UserTable = {
        id: user.id,
        password: "",
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

  emitSave(user:User){
    this.save.emit(user);
  }

  emitEdit(id: number){
    this.edit.emit(id);
  }








  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
