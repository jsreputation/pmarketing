import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegistrationPageComponent } from './containers/registration-page/registration-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoginPageComponent, RegistrationPageComponent
  ]
})
export class AuthModule { }
