import { Buyer } from "./buyer";
import { Game } from "./game";

export interface TicketRequest {
    game: Game,
    buyer : Buyer
}
