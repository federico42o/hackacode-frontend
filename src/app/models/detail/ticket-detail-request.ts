import { Buyer } from "../buyer";
import { Ticket } from "../ticket";

export interface TicketDetailRequest {
    ticket:Ticket;
    buyer:Buyer;
}