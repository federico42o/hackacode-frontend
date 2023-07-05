import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ClockComponent,HeaderComponent,NavbarComponent,ToggleThemeBtnComponent,BuscadorClienteComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../modules/auth/auth-routing.module';
import {DialogModule} from '@angular/cdk/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HomeComponent } from './components/home/home.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { BarCodeComponent } from '../components/bar-code/bar-code.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PasswordCheckComponent } from './components/password-check/password-check.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import { ToastrModule } from 'ngx-toastr';
import { NaturalTimePipe } from './pipe/natural-time.pipe';
import { ChartSkeletonComponent } from './components/chart-skeleton/chart-skeleton.component';
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
    HomeComponent,
    BarCodeComponent,
    InvoiceComponent,
    PasswordCheckComponent,
    LoaderComponent,
    ForbiddenComponent,
    NaturalTimePipe,
    ChartSkeletonComponent,

    
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
    ToastrModule.forRoot(),
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
    BarCodeComponent,
    InvoiceComponent,
    PasswordCheckComponent,
    LoaderComponent,
    ForbiddenComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    NaturalTimePipe,
    ChartSkeletonComponent,
    
  ]
})
export class SharedModule { }
