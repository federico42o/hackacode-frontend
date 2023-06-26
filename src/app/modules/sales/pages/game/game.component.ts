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
  constructor(private service : GameService,public dialog: Dialog){}

  headers : string[] = ["Juego", "Price", "Edad Requerida", "Horario"];
  columns : string[] = ["name", "price", "requiredAge", "schedule"];
  games : Game[] = [];
  ngOnInit(): void {
    this._updateTable()
    
  }

  openDialog(mode:string,id :number) : void{
    const dialogRef = this.dialog.open(GameFormComponent,{
      width: '60%',
      height: '50%',
      data: {mode,id}
    });
    dialogRef.closed.subscribe(result => {
      this._updateTable()
    });
  }




  handleEdit(id: number): void {
    this.openDialog('update',id);
  }

  handleDelete(id:number): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '30%',
      height: '10%',
      data: {
        message: "¿Desea borrar este Juego?",
        id,
      }
      });
      dialogRef.componentInstance?.accept.subscribe({
        next: () => {
          
          this.service.delete(id).subscribe({
            next: (data:any) => {
             
            },
            complete: () => {
              this._updateTable();
            }

          });
          
        },
        error: (err:any) => {
          console.log(err);
        },
        complete: () => {
          this._updateTable();
        }
      });  
  }
  private _updateTable() : void{
    this.games$ = this.service.getAll().subscribe(
      {
        next:(data:any) => {
          this.games = data.content
        }
      })
  }

  ngOnDestroy(): void {
    this.games$.unsubscribe();
  }
}
