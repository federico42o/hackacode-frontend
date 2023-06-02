import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleThemeBtnComponent } from './components';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';



@NgModule({
  declarations: [
    ToggleThemeBtnComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
    ToggleThemeBtnComponent,
    NavbarComponent,
  ]
})
export class SharedModule { }
