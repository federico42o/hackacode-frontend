import { Schedule } from "./schedule";

export interface GameRequest {
    name:string,
    price:number,
    requiredAge:number,
    schedule?:Schedule;
}
