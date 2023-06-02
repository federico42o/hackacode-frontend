import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketSelectorComponent } from './pages/ticket-selector/ticket-selector.component';

const routes: Routes = [
  {path:'', redirectTo: '/', pathMatch: 'full'},
  {path:'new-ticket', component: TicketSelectorComponent},
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
