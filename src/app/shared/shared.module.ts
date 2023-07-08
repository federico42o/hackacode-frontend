import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HeaderComponent,NavbarComponent,ToggleThemeBtnComponent,BuscadorClienteComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../modules/auth/auth-routing.module';
import {DialogModule} from '@angular/cdk/dialog';
import { HomeComponent } from './components/home/home.component';
import { PasswordCheckComponent } from './components/password-check/password-check.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { NaturalTimePipe } from './pipe/natural-time.pipe';
import { ChartSkeletonComponent } from './components/chart-skeleton/chart-skeleton.component';
import { MatNativeDateModule } from '@angular/material/core';
export function playerFactory(): any {  
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
