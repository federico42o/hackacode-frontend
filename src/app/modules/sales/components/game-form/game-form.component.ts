import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, GameRequest, Schedule } from 'src/app/models';
import { ScheduleService } from '../../services/schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit{
  
  gameForm!:FormGroup;
  schedules!:Schedule[];
  @Input() game!: Game | null;
  constructor(private service:GameService,private scheduleService:ScheduleService,private fb:FormBuilder,private toastr:ToastrService){}
  
  ngOnInit(): void {

    this.gameForm = this.fb.group({
      name:["", [Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern("[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]*")]],
      requiredAge: [0,[Validators.required,Validators.min(0),Validators.max(140)]],
      schedule:['',Validators.required],
    })
    this.scheduleService.getAll().subscribe(
      {next:(data:any) => {
        this.schedules = data.content;
      }
    })
    if(this.game){
      this.gameForm.patchValue({
        name:this.game.name,
        requiredAge:this.game.requiredAge,
        schedule:this.game.schedule
      })
    }
    
  }

  onSubmit():void{
    const game : GameRequest = {
      name:this.gameForm.value.name,
      requiredAge:this.gameForm.value.requiredAge,
      schedule:this.gameForm.value.schedule
    }
    if(this.gameForm.invalid){
      return
    }
    if(this.game){
      const game: Game = {
        id:this.game.id,
        name:this.gameForm.value.name,
        requiredAge:this.gameForm.value.requiredAge,
        schedule:this.gameForm.value.schedule

      }
      this.service.update(game).subscribe(
        {next:(data:any) => {
    
        },
        error:(err:any) => {
          this.toastr.error("Error al actualizar el juego")
      },
      complete:() => {
        this.toastr.success("Juego actualizado con éxito")
        this.gameForm.reset()
        location.reload()
      }
    })}
    else{

    
    this.service.create(game).subscribe(
      {next:(data:any) => {
   
      },
      error:(err:any) => {
        this.toastr.error("Error al crear el juego")
    },
    complete:() => {
      this.toastr.success("Juego creado con éxito")
      this.gameForm.reset()
      location.reload()
    }
  })
    }
   
  }

}
