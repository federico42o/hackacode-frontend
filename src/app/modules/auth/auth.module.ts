import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guard/auth.guard';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [
    LoginComponent,
    PasswordRecoveryComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule

  ],
  exports: [
    LoginComponent,
    PasswordRecoveryComponent,
    ChangePasswordComponent
  ]
})
export class AuthModule { }
