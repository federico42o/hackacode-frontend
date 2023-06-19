import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ClockComponent,HeaderComponent,NavbarComponent,ToggleThemeBtnComponent,BuscadorClienteComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../modules/auth/auth-routing.module';
import { TabComponent } from './components/navbar/tab/tab.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AdministrationModule } from '../modules';
import { AdministrationRoutingModule } from '../modules/administration/administration-routing.module';
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
    TabComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AuthRoutingModule,
    MatDialogModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    FormsModule,
    MatDialogModule,
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    ClockComponent,
    MatAutocompleteModule,
    BuscadorClienteComponent,
  ]
})
export class SharedModule { }
