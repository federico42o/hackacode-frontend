import { Buyer } from "../buyer";
import { Employee } from "../employee";

export interface ReportSchema {
    totalTicketsSold?: number | null;
    totalAmountSaleDay?: number | null;
    totalAmountSaleMonthAndYear?: number | null;
    totalAmountSaleYear?: number | null;
    employees?: Employee[] | null ;
    buyer?: Buyer | null ;
    gameName?: string | null;

}
