import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Employee, UserRole } from 'src/app/models';
import { UserRequest } from 'src/app/models/user-request';
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

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: [randomPassword(), [Validators.required]],
      employee: [null, [Validators.required]],
      roles: ["", [Validators.required]],
    });

    this.loadEmployees();
    this.loadRoles();
  }

  onSubmit(): void {
    const user: UserRequest = {
      username: this.userForm.get("username")?.value.concat("@crazyland.com"),
      password: this.userForm.get("password")?.value,
      employee: this.userForm.get("employee")?.value,
      roles: this.userForm.get("roles")?.value,
    };
    if(this.userForm.valid){
      this.userService.create(user).subscribe({
        next: () => {
          this.userForm.reset();
        },
        error: (err:any) =>{
          console.log(err)
        },
        complete:()=> {
          console.log("complete")

        }
      });
    }
  }

  showPw():void{
    const input = document.getElementById("password") as HTMLInputElement;
    if(input.type === "password"){
      input.type = "text";
    }else{
      input.type = "password";
    }
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data: any) => {
        this.employees = data.content;
        this.setupFilteredEmployees();
      },
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

