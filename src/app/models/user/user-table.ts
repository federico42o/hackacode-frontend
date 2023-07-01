import { Employee } from "../employee";
import { UserRole } from "./user-role";


export interface UserTable {
    id:number,
    name: string,
    surname: string,
    username:string,
    employee:Employee,
    enable:boolean;
    dni: string,
    roles: UserRole[],
   
}
