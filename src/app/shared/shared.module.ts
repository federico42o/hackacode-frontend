import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleThemeBtnComponent } from './components';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { HeaderComponent } from './components/header/header.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ClockComponent } from './components/clock/clock.component';
export function playerFactory(): any {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    ClockComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    ClockComponent,
  ]
})
export class SharedModule { }
