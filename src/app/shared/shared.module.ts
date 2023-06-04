import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleThemeBtnComponent } from './components';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { HeaderComponent } from './components/header/header.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ClockComponent } from './components/clock/clock.component';
import { BuscadorClienteComponent } from './components/buscador-cliente/buscador-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    ClockComponent,
    BuscadorClienteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AuthRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    FormsModule,
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    ClockComponent,
    MatAutocompleteModule,
    BuscadorClienteComponent,
  ]
})
export class SharedModule { }
