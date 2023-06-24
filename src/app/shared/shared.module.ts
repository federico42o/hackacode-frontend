import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ClockComponent,HeaderComponent,NavbarComponent,ToggleThemeBtnComponent,BuscadorClienteComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../modules/auth/auth-routing.module';
import { TabComponent } from './components/navbar/tab/tab.component';
import {DialogModule} from '@angular/cdk/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HomeComponent } from './components/home/home.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { GeneralTicketComponent, VipTicketComponent } from '../components';
import { BarCodeComponent } from '../components/bar-code/bar-code.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
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
    HomeComponent,
    GeneralTicketComponent,
    VipTicketComponent,
    BarCodeComponent,
    InvoiceComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AuthRoutingModule,
    DialogModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    MatNativeDateModule,
    FormsModule,
    DialogModule,
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    ClockComponent,
    MatAutocompleteModule,
    BuscadorClienteComponent,
    MatDatepickerModule,
    GeneralTicketComponent,
    VipTicketComponent,
    BarCodeComponent,
    InvoiceComponent,
  ]
})
export class SharedModule { }
