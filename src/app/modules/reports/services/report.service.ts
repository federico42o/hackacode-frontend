import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
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


  fetchData(date:string,gameName:string):Observable<Dataset>{
    const [year, month] = date.split('-');
    
    if (date) {
      // this.dataset.date = date;
      this.getTicketsByDate(date).subscribe({
        next: (data: any) => {
          // console.log({"tickets por dia:":data.totalTicketsSold})
          this.dataset.ticketsSold = data.totalTicketsSold
          
        }
      });
  
      this.getTicketsByDateAndGame(date, gameName).subscribe({
        next: (data: any) => {
          // console.log({"tickets por juego": {"game":data.gameName,"tickets":data.totalTicketsSold}})
          const ticketsSold: GameWithMoreTickets = {
            gameName: data.gameName,
            totalTicketsSold: data.totalTicketsSold
          }
          this.dataset.ticketsByGame =  ticketsSold
          
          console.log(this.dataset)
        }
      });
  
      this.getSalesByDate(date).subscribe({
        next: (data: any) => {
          // console.log({"ventas por dia":data.totalAmountSaleDay})
          this.dataset.earningsInDate= data.totalAmountSaleDay
          

        }
      });
  
      this.getSalesByMonthAndYear(year, month).subscribe({
        next: (data: any) => {
          // console.log({"ventas en un mes":data.totalAmountSaleMonthAndYear})
          this.dataset.earningsOnMonth= data.totalAmountSaleMonthAndYear
          
        }
      });
  
      this.getBuyerWithMoreTickets(year, month).subscribe({
        next: (data: any) => {
          // console.log({"comprador con mas entradas compradas en un mes":data})
          this.dataset.topBuyer= data
          
        }
      });
  
      this.getGameWithMoreTickets(date).subscribe({
        next: (data: any) => {
          // console.log({"juego con mas entradas vendidas":{game:data.gameName,"tickets":data.totalTicketsSold}})
          const topGame: GameWithMoreTickets = {
            gameName: data.gameName,
            totalTicketsSold: data.totalTicketsSold
          }
          this.dataset.topGame= topGame
          
        }
      });
  
      this.getHistoricSalesByDate(date).subscribe({
        next: (data: any) => {
          // console.log({"historico de ventas":{"$":data.totalAmountSaleYear,"tickets":data.totalTicketsSold}})
          const historicSales : HistoricSales = {
            earnings: data.totalAmountSaleYear,
            ticketsSold:data.totalTicketsSold
          }
          
          this.dataset.historicSales = historicSales
          
        }
      });
    }
    return new Observable<Dataset>(observer => {
      observer.next(this.dataset);
      observer.complete();
    });

    
  }



}
