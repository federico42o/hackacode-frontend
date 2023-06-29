import { TicketDetail } from "../detail";
import { Game } from "../game";

export interface SaleRequest {
    ticketsDetail: TicketDetail[],
    game: Game
}
