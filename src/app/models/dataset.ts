import { Buyer } from "./buyer";

export interface Dataset {
    date?: string | null;
    ticketsSold?: number | null;
    ticketsByGame?: GameWithMoreTickets | null;
    earningsInDate?: number | null;
    earningsOnMonth?: number | null;
    topBuyer?: Buyer | null;
    topGame?: GameWithMoreTickets | null;
    historicSales?: HistoricSales | null;
}
export interface GameWithMoreTickets{
    gameName?: string | null;
    totalTicketsSold?: number | null;
}

export interface HistoricSales {
    earnings?: number | null;
    ticketsSold: number | null;
}