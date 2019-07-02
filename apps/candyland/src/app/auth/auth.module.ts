import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ButtonModule } from '../shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { LogoModule } from '../shared/components/logo/logo.module';
import { RegistrationPageComponent } from './containers/registration-page/registration-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    LogoModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    LoginComponent,
    RegistrationPageComponent
  ]
})
export class AuthModule { }
