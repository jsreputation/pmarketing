import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ButtonModule } from '../shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { LogoModule } from '../shared/components/logo/logo.module';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
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
  ]
})
export class AuthModule { }
