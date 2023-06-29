import { Employee } from "../employee/employee";
import { UserRole } from "./user-role";

export interface User {
    id: number;
    password: string;
    username: string;
    roles: UserRole[];
    employee: Employee;

}
