import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { Employee, UserRole,UserRequest, User } from 'src/app/models';
import { randomPassword } from 'src/app/shared/utils/genPw';
import { EmployeeService } from '../../services/employee.service';
import { RoleService } from '../../services/role.service';
import { UserEmployeeService } from '../../services/user-employee.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private userService: UserEmployeeService,private roleService:RoleService) {}

  userForm!: FormGroup;
  employees!: Employee[];
  filteredEmployees$!: Observable<Employee[]>;
  roles!: UserRole[]
  users!:User[]
  view:boolean = false;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ["", [Validators.required,  Validators.minLength(4),Validators.maxLength(10),Validators.pattern("[a-zA-Z0-9._-]*")]],
      password: [randomPassword(), [Validators.required, Validators.minLength(8)]],
      employee: [null, [Validators.required]],
      roles: [[], [Validators.required, Validators.minLength(0)]],
    });

    this.loadEmployees();
    this.loadRoles();
  }

  onSubmit(): void {
    const user: UserRequest = {
      username: this.userForm.get("username")?.value.concat("@gmail.com"),
      password: this.userForm.get("password")?.value,
      employee: this.userForm.get("employee")?.value,
      roles: this.userForm.get("roles")?.value,
    };

      this.userService.create(user).subscribe({
        next: () => {
          this.userForm.reset();
        },
        error: (err:any) =>{
          console.log(err)
        },
        complete:()=> {
          this.loadEmployees();
          location.reload();

        }
      });
    
  }



  loadEmployees(): void {
    forkJoin([
      this.userService.getAll(),
      this.employeeService.getAll()
    ]).subscribe({
      next: ([userData, employeeData]) => {
        this.users = userData.content;
        this.employees = employeeData.content.filter((employee: Employee) => !this.users.some((user: User) => user.employee?.id === employee.id));
        this.setupFilteredEmployees();
      },
      error: (error) => {
        console.error('Error loading employees', error);
      }
    });
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe({
      next: (data: any) => {
        this.roles = data;
      }
    });
  }

  private setupFilteredEmployees(): void {
    this.filteredEmployees$ = this.userForm.get("employee")!.valueChanges.pipe(
      startWith(""),
      map((value: string | Employee) => {
        if (typeof value === "string") {
          return value ? this.filterEmployees(value) : this.employees.slice();
        } else {
          return [value];
        }
      })
    );
  }

  private filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(
      (employee) =>
        (employee.dni && employee.dni.includes(filterValue)) ||
        (employee.name && employee.name.toLowerCase().includes(filterValue))
    );
  }
  
  displayEmployee(employee: Employee | null): string {
    if (employee && typeof employee !== 'string') {
      return `${employee.name} ${employee.surname} (${employee.dni})`;
    }
    return '';
  }
}

