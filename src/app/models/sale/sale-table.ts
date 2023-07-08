import { TicketDetail } from "../detail";

export interface SaleTable {
    id:number,
    ticketsDetail: TicketDetail[],
    game: string,
    purchaseDate: Date,
    totalPrice: number,
}
