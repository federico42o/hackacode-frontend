import { Ticket } from "./ticket";
import { TicketVip } from "./ticket-vip";

export interface SaleRequest {
    vipTickets?: TicketVip[],
    normalTickets?: Ticket[],
}
