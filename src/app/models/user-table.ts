import { Employee } from "./employee";
import { UserRole } from "./user-role";

export interface UserTable {
    id:number,
    password:string,
    name: string,
    surname: string,
    username:string,
    employee:Employee,
    dni: string,
    roles: UserRole[],
   
}
