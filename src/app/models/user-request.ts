import { Employee } from "./employee";
import { UserRole } from "./user-role";

export interface UserRequest {
    username: string
    password : string
    roles: UserRole[]
    employee: Employee
}
