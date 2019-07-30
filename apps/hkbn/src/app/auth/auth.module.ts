import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './containers/login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SmsValidationComponent } from './containers/sms-validation/sms-validation.component';
import { UtilsModule } from '@perx/core/dist/perx-core';

@NgModule({
  declarations: [LoginFormComponent, LoginComponent, SmsValidationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  exports: [
    LoginFormComponent,
    LoginComponent
  ]
})
export class AuthModule { }
