import { Employee } from "../employee"
import { UserRole } from "./user-role"

export interface UserUpdate {
    id:number,
    username: string
    roles: UserRole[]
    employee: Employee
}
