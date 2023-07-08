import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { Buyer } from 'src/app/models';
import { TopBuyer } from 'src/app/models/buyer/top-buyer';
import { Dataset, GameWithMoreTickets, HistoricSales } from 'src/app/models/dataset';
import { PaginationResponse } from 'src/app/models/pagination/pagination-response';
import { ReportSchema } from 'src/app/models/reports/report-schema';
import { Sale } from 'src/app/models/sale';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  apiUrl:string = environment.apiUrl;
  dataset:Dataset = {};
  getTicketsByDate(date:string):Observable<ReportSchema>{
    return this.http.get(`${this.apiUrl}informes/entradas/totales_vendidas_en?date=${date}`);
  }

  getTicketsByDateAndGame(date:string,game:string):Observable<GameWithMoreTickets>{
    return this.http.get<GameWithMoreTickets>(`${this.apiUrl}informes/entradas/vendidas_por_fecha_y_juego?date=${date}&game=${game}`);
  }

  getSalesByDate(date:string):Observable<ReportSchema>{
    return this.http.get(`${this.apiUrl}informes/ventas/totales_por_dia?date=${date}`);
  }

  getSalesByMonthAndYear(year:string,month:string):Observable<ReportSchema>{
    return this.http.get<ReportSchema>(`${this.apiUrl}informes/ventas/totales_por_mes?month=${month}&year=${year}`);
  }

  getBuyerWithMoreTickets(year:string,month:string):Observable<TopBuyer>{
    return this.http.get<TopBuyer>(`${this.apiUrl}informes/comprador/con_mas_entradas_vedidas_al_mes?month=${month}&year=${year}`);
  }
  getGameWithMoreTickets(date:string):Observable<GameWithMoreTickets>{
    return this.http.get<GameWithMoreTickets>(`${this.apiUrl}informes/juego/con_mas_entradas_vendidas_hasta?date=${date}`);
  }
  
  getHistoricSalesByDate(date:string):Observable<ReportSchema>{
    return this.http.get(`${this.apiUrl}informes/historico/ventas_monto?date=${date}`);
  }

  ticketsCountForGamesInDate(date:string):Observable<GameWithMoreTickets[]>{
    return this.http.get<GameWithMoreTickets[]>(`${this.apiUrl}informes/historico/juegos_monto?date=${date}`);
  }

  getAllBuyersCount() : Observable<PaginationResponse<Buyer>>{
    return this.http.get<PaginationResponse<Buyer>>(`${this.apiUrl}compradores`);
  }
  getAllSalesCount() : Observable<PaginationResponse<Sale>>{
    return this.http.get<PaginationResponse<Sale>>(`${this.apiUrl}ventas`);
  }


  fetchData(date:string,gameName:string| null = null):Observable<Dataset>{
    const [year, month] = date.split('-');
    const dataset: Dataset = {};
    if (date) {
      dataset.date = date;
      this.getTicketsByDate(date).subscribe({
        next: (data: ReportSchema) => {
          dataset.ticketsSoldInDate = data.totalTicketsSold ?? 0
          
        }
      });
      
      if(gameName !== null){
      this.getTicketsByDateAndGame(date, gameName).subscribe({
        next: (data: GameWithMoreTickets) => {
          dataset.ticketsByGame =  data
          
       
        }
      });
        }
  
      this.getSalesByDate(date).pipe(
        tap((data:ReportSchema) =>{
          dataset.earningsInDate= data.totalAmountSaleDay ?? 0
          }
 
      )).subscribe();
  
      this.getSalesByMonthAndYear(year, month).subscribe({
        next: (data: ReportSchema) => {
          dataset.earningsOnMonth= data.totalAmountSaleMonthAndYear ?? 0
          
        }
      });
  
      this.getBuyerWithMoreTickets(year, month).subscribe({
        next: (data: TopBuyer) => {
          dataset.topBuyer= data
          
        }
      });
  
      this.getGameWithMoreTickets(date).subscribe({
        next: (data: GameWithMoreTickets) => {
          dataset.topGame= data
          
        }
      });
      this.getAllBuyersCount().subscribe({
        next: (data: PaginationResponse<Buyer>) => {
          dataset.clientsCount = data.numberOfElements
        }
      })
      this.getAllSalesCount().subscribe({
        next: (data: PaginationResponse<Sale>) => {
          const dateString = new Date(date).toISOString().substring(0, 10);
          const filteredData = data.content.filter((item: Sale) => {
            const itemDate = new Date(item.purchaseDate);
            return itemDate.toISOString().startsWith(dateString);
          });
          dataset.salesToday = filteredData.length;
          dataset.salesCount = data.numberOfElements;
        }
      });
  
      this.getHistoricSalesByDate(date).subscribe({
        next: (data: ReportSchema) => {
          const historicSales : HistoricSales = {
            earnings: data.totalAmountSaleYear,
            ticketsSold:data.totalTicketsSold ?? 0
          }
          
          dataset.historicSales = historicSales
          dataset.ticketsCount = data.totalTicketsSold ?? 0
          
        }
      });
    }
   
    return new Observable<Dataset>(observer => {
      observer.next(dataset);
      observer.complete();
    });

    
  }

  
  fetchDataForAllMonths(year: string): Observable<SalesAllMonths[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
  
    const months = Array.from({ length: currentMonth }, (_, index) =>
      (index + 1 < 10 ? '0' : '') + (index + 1)
    );
  
    const requests = months.map(month => this.getSalesByMonthAndYear(year, month));
  
    return forkJoin(requests).pipe(
      map((data: ReportSchema[]) => {
        return data.map((monthData: ReportSchema, index: number) => {
          return {
            month: months[index],
            totalAmountSaleMonthAndYear: monthData.totalAmountSaleMonthAndYear,
            totalTicketsSold: monthData.totalTicketsSold
          };
        }) as SalesAllMonths[]; 
      })
    );
  }

}

export interface SalesAllMonths {
  month: string;
  totalAmountSaleMonthAndYear: number;
  totalTicketsSold: number;

}

export interface DataThisMonth {
  earningsOnMonth: number;
  ticketsCount: number;
  clientsCount: number;
  salesCount: number;
  earningsPastMonth: number;
  ticketsCountPastMonth: number;
  salesCountPastMonth: number;
  clientsCountPastMonth: number;
}

