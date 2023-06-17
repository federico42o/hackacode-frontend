import { Schedule } from "./schedule";


export interface Game {
    id:number,
    name:string,
    price:number,
    requiredAge:number,
    schedule:Schedule;
}
