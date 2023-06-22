import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models';
import { EmployeeService } from '../../services/employee.service';
import { Observable, map, startWith } from 'rxjs';
import { UserRequest } from 'src/app/models/user-request';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  userForm!: FormGroup
  employees!: Employee[]
  employeeCtrl = new FormControl('');
  filteredEmployees$!: Observable<any[]>;

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        username: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required,]],
        employee: [, [Validators.required,]],
        roles: ["", [Validators.required,]]
      }
    )
    this.loadEmployees()
  }

  onSubmit(): void {
    const user: UserRequest = {
      username: this.userForm.get("username")?.value,
      password : this.userForm.get("password")?.value,
      employee : this.userForm.get("employee")?.value,
      roles : this.userForm.get("roles")?.value
    };
    console.log(user)
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data: any) => {
        this.employees = data.content
        this.setupFilteredClients()
      }
    })
  }

  private setupFilteredClients(): void {
    this.filteredEmployees$ = this.employeeCtrl.valueChanges.pipe(
      startWith(''),
      map(employee => (employee ? this._filterClients$(employee) : []))
    );
  }

  private _filterClients$(value: string): any[] {
    if (this.employees) {
      return this.employees.filter(employee => employee.dni && employee.dni.includes(value.toString()) || employee.name && employee.name.toLowerCase().includes(value.toString().toLowerCase()));
    } else {
      return [];
    }
  }

}
