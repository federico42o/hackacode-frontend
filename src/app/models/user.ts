import { Employee } from "./employee";
import { UserRole } from "./user-role";

export interface User {
    id: number;
    username: string;
    roles: UserRole[];
    employee: Employee;

}
