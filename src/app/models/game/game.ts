import { Schedule } from "./schedule";


export interface Game {
    id:number,
    name:string,
    requiredAge:number,
    schedule?:Schedule;
}
