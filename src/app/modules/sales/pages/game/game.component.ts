import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { Game } from 'src/app/models';
import { GameFormComponent } from '../../components/game-form/game-form.component';
import { DialogComponent } from 'src/app/modules/administration/components/dialog/dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  games$! : Subscription;
  currentPage: number = 1;

  constructor(private service : GameService,public dialog: Dialog){}

  games : Game[] = [];
  pageableGames: Game[] = [];
  isHidden:boolean = false;
  editMode:boolean = false;
  selectedGame!: Game;
  ngOnInit(): void {
    this._updateGames()

    
  }
  array: any[] = []; 
  itemsPerPage = 5; 
  currentTab:string = 'form';

  // Calcula el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.array.length / this.itemsPerPage);
  }

  // Obtiene los elementos para la página actual
  getItemsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.array.slice(startIndex, endIndex);
  }



  openDialog(mode:string,id :number) : void{
    
    const dialogRef = this.dialog.open(GameFormComponent,{
      width: '60%',
      height: '50%',
      data: {mode,id}
    });
    dialogRef.closed.subscribe(result => {
      this._updateGames()
    });
  }


  handleEdit(data:Game) {
    this.selectedGame = data;
    this.changeTab('form')
    
  }

  handleDelete(data:any){
   
    
  }
  onGameAdded():void{

  }
private _updateGames() : void{
    this.games$ = this.service.getAll().subscribe(
      {
        next:(data:any) => {
          this.games = data.content
          this.array = this.games;
        }
      })
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  changeTab(tab:string):void{
    this.currentTab = tab;

  }

  ngOnDestroy(): void {
    this.games$.unsubscribe();
  }
}
