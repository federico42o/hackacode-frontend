import { TicketDetail } from "../detail";
import { Game } from "../game";

export interface Sale {
    id:number,
    ticketsDetail: TicketDetail[],
    game: Game
}
