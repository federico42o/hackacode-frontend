import { Buyer } from "./buyer";
import { Employee } from "./employee";

export interface Dataset {
    date?: string | null;
    ticketsSold?: number | null;
    ticketsByGame?: GameWithMoreTickets | null;
    earningsInDate?: number | null;
    earningsOnMonth?: number | null;
    topBuyer?: Buyer | null;
    topGame?: GameWithMoreTickets | null;
    historicSales?: historicSales | null;
}
export interface GameWithMoreTickets{
    gameName?: string | null;
    totalTicketsSold?: number | null;
}

export interface historicSales {
    earnings?: number | null;
    ticketsSold: number | null;
}