import { Game } from "./game";

export interface Employee {
    id: number,
    name: string,
    surname: string,
    dni: string,
    birthdate: Date,
    game?: Game;

}
