import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, tap } from 'rxjs';
import { Dataset, GameWithMoreTickets, HistoricSales } from 'src/app/models/dataset';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  apiUrl:string = environment.apiUrl;
  dataset:Dataset = {};
  getTicketsByDate(date:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/entradas/totales_vendidas_en?date=${date}`);
  }

  getTicketsByDateAndGame(date:string,game:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/entradas/vendidas_por_fecha_y_juego?date=${date}&game=${game}`);
  }

  getSalesByDate(date:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/ventas/totales_por_dia?date=${date}`);
  }

  getSalesByMonthAndYear(year:string,month:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/ventas/totales_por_mes?month=${month}&year=${year}`);
  }

  getBuyerWithMoreTickets(year:string,month:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/comprador/con_mas_entradas_vedidas_al_mes?month=${month}&year=${year}`);
  }
  getGameWithMoreTickets(date:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/juego/con_mas_entradas_vendidas_hasta?date=${date}`);
  }
  
  getHistoricSalesByDate(date:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/historico/ventas_monto?date=${date}`);
  }

  ticketsCountForGamesInDate(date:string):Observable<any>{
    return this.http.get(`${this.apiUrl}informes/historico/juegos_monto?date=${date}`);
  }

  getAllBuyersCount() : Observable<any>{
    return this.http.get(`${this.apiUrl}compradores`);
  }
  getAllSalesCount() : Observable<any>{
    return this.http.get(`${this.apiUrl}ventas`);
  }


  fetchData(date:string,gameName:string| null = null):Observable<Dataset>{
    const [year, month] = date.split('-');
    const dataset: Dataset = {};
    if (date) {
      dataset.date = date;
      // dataset.date = date;
      this.getTicketsByDate(date).subscribe({
        next: (data: any) => {
          // console.log({"tickets por dia:":data.totalTicketsSold})
          dataset.ticketsSoldInDate = data.totalTicketsSold
          
        }
      });
      
      if(gameName !== null){
      this.getTicketsByDateAndGame(date, gameName).subscribe({
        next: (data: any) => {
          // console.log({"tickets por juego": {"game":data.gameName,"tickets":data.totalTicketsSold}})
          const ticketsSold: GameWithMoreTickets = {
            gameName: data.gameName,
            totalTicketsSold: data.totalTicketsSold
          }
          dataset.ticketsByGame =  ticketsSold
          
          console.log(dataset)
        }
      });
        }
  
      this.getSalesByDate(date).subscribe({
        next: (data: any) => {
          // console.log({"ventas por dia":data.totalAmountSaleDay})
          dataset.earningsInDate= data.totalAmountSaleDay
          

        }
      });
  
      this.getSalesByMonthAndYear(year, month).subscribe({
        next: (data: any) => {
          // console.log({"ventas en un mes":data.totalAmountSaleMonthAndYear})
          dataset.earningsOnMonth= data.totalAmountSaleMonthAndYear
          
        }
      });
  
      this.getBuyerWithMoreTickets(year, month).subscribe({
        next: (data: any) => {
          // console.log({"comprador con mas entradas compradas en un mes":data})
          dataset.topBuyer= data
          
        }
      });
  
      this.getGameWithMoreTickets(date).subscribe({
        next: (data: any) => {
          // console.log({"juego con mas entradas vendidas":{game:data.gameName,"tickets":data.totalTicketsSold}})
          const topGame: GameWithMoreTickets = {
            gameName: data.game,
            totalTicketsSold: data.totalTicketsSold
          }
          dataset.topGame= topGame
          
        }
      });
      this.getAllBuyersCount().subscribe({
        next: (data: any) => {
          dataset.clientsCount = data.numberOfElements
        }
      })
      this.getAllSalesCount().subscribe({
        next: (data: any) => {
          dataset.salesCount = data.numberOfElements
        }
      })
  
      this.getHistoricSalesByDate(date).subscribe({
        next: (data: any) => {
          // console.log({"historico de ventas":{"$":data.totalAmountSaleYear,"tickets":data.totalTicketsSold}})
          const historicSales : HistoricSales = {
            earnings: data.totalAmountSaleYear,
            ticketsSold:data.totalTicketsSold
          }
          
          dataset.historicSales = historicSales
          dataset.ticketsCount = data.totalTicketsSold
          
        }
      });
    }
    return new Observable<Dataset>(observer => {
      observer.next(dataset);
      observer.complete();
    });

    
  }

  
  fetchDataForAllMonths(year: string): Observable<salesAllMonths[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
  
    const months = Array.from({ length: currentMonth }, (_, index) =>
      (index + 1 < 10 ? '0' : '') + (index + 1)
    );
  
    const requests = months.map(month => this.getSalesByMonthAndYear(year, month));
  
    return forkJoin(requests).pipe(
      map((data: any[]) => {
        return data.map((monthData, index) => {
          return {
            month: months[index],
            totalAmountSaleMonthAndYear: monthData.totalAmountSaleMonthAndYear,
            totalTicketsSold: monthData.totalTicketsSold
          };
        });
      })
    );
  }


}

export interface salesAllMonths {
  month: string;
  totalAmountSaleMonthAndYear: number;
  totalTicketsSold: number;

}

