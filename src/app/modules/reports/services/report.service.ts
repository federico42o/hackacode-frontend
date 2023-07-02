import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Dataset } from 'src/app/models/dataset';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  apiUrl:string = environment.apiUrl;

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



}
