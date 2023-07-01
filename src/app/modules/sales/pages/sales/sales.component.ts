import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Sale } from 'src/app/models/sale';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Game } from 'src/app/models';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  
  sales!:Sale[];
  currentGame!:Game;
  constructor(private service:SaleService,private authService:AuthService) { }
  ngOnInit(): void {
    this.authService.getCurrentGame().pipe(
      switchMap((game: Game) => {
        this.currentGame = game;
        console.log(this.currentGame);
        return this.service.getByGame(this.currentGame.id);
      })
    ).subscribe((data: any) => {
      this.sales = data.content;
    });
  }




}
