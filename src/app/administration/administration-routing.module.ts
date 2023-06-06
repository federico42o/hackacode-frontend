import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBuyerComponent } from '../pages';

const routes: Routes = [
  {path:'add-buyer', component:AddBuyerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
