import { Schedule } from "./schedule";


export interface Game {
    name:string;
    price:number;
    requiredAge:number;
    schedule:Schedule;
}
