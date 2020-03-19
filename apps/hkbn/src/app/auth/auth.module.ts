import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './containers/login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './containers/registration/registration.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ErrorHandlerModule } from '../ui/error-handler/error-handler.module';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { SmsValidationComponent } from './containers/sms-validation/sms-validation.component';
import { UtilsModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [
  LoginFormComponent,
  RegistrationFormComponent,
  SmsValidationComponent,
];

const CONTAINERS = [
  LoginComponent,
  RegistrationComponent,
  ForgotPasswordComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule,
    UtilsModule,
    ReactiveFormsModule,
    ErrorHandlerModule,
    TranslateModule,
    MatSelectModule,
    MatIconModule
  ],
  exports: [
    ...COMPONENTS,
    ...CONTAINERS
  ]
})
export class AuthModule {
}
