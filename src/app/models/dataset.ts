import { Buyer } from "./buyer";
import { TopBuyer } from "./buyer/top-buyer";

export interface Dataset {
    date?: string 
    ticketsSoldInDate?: number 
    ticketsByGame?: GameWithMoreTickets 
    earningsInDate?: number 
    earningsOnMonth?: number 
    topBuyer?: TopBuyer 
    topGame?: GameWithMoreTickets 
    historicSales?: HistoricSales 
    clientsCount?: number 
    ticketsCount?:number 
    salesCount?:number 
    salesToday?:number 
}
export interface GameWithMoreTickets{
    gameName?: string | null;
    totalTicketsSold?: number | null;
}

export interface HistoricSales {
    earnings?: number | null;
    ticketsSold: number | null;
}