import { Schedule } from "./schedule";

export interface GameRequest {
    name:string,
    requiredAge:number,
    schedule?:Schedule;
}
