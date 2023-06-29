import { Buyer } from "./buyer";
import { Ticket } from "./ticket";

export interface TicketDetail {
    id:string,
    ticket:Ticket;
    buyer:Buyer;
}