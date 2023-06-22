import { Ticket } from "./ticket";
import { TicketVip } from "./ticket-vip";

export interface Sale {
    id:number,
    vipTickets?: TicketVip[],
    normalTickets?: Ticket[],
}
