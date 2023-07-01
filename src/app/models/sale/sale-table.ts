import { TicketDetail } from "../detail";
import { Game } from "../game";

export interface SaleTable {
    id:number,
    ticketsDetail: TicketDetail[],
    game: string,
    purchaseDate: Date,
    totalPrice: number,
}
