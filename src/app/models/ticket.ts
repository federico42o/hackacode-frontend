import { Buyer } from "./buyer";
import { Game } from "./game";

export interface Ticket {
    id: string,
    game: Game,
    buyer : Buyer
}
