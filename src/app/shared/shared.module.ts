import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LottieModule } from 'ngx-lottie';
import { ToastrModule } from 'ngx-toastr';
import { AuthRoutingModule } from '../modules/auth/auth-routing.module';
import { BuscadorClienteComponent, HeaderComponent, NavbarComponent, ToggleThemeBtnComponent } from './components';
import { ChartSkeletonComponent } from './components/chart-skeleton/chart-skeleton.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PasswordCheckComponent } from './components/password-check/password-check.component';
import { NaturalTimePipe } from './pipe/natural-time.pipe';
export function playerFactory() {  
  return import('lottie-web');
}

@NgModule({
  declarations: [
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    BuscadorClienteComponent,
    HomeComponent,
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
    MatNativeDateModule,
    AuthRoutingModule,
    DialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    FormsModule,
    DialogModule,
    ToggleThemeBtnComponent,
    NavbarComponent,
    HeaderComponent,
    MatAutocompleteModule,
    BuscadorClienteComponent,
    PasswordCheckComponent,
    LoaderComponent,
    ForbiddenComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NaturalTimePipe,
    ChartSkeletonComponent,
    
  ]
})
export class SharedModule { }
