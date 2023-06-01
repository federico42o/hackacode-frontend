import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleThemeBtnComponent } from './components';



@NgModule({
  declarations: [
    ToggleThemeBtnComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleThemeBtnComponent,
  ]
})
export class SharedModule { }
