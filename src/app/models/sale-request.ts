import { Game } from "./game";
import { Ticket } from "./ticket";
import { TicketDetail } from "./ticket-detail";
import { TicketVip } from "./ticket-vip";

export interface SaleRequest {
    ticketsDetail: TicketDetail[],
    game: Game
}
