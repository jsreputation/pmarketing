import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, LogoModule } from '@perxtech/candyshop';
import { LoginComponent } from './containers/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

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
    MatIconModule,
    MatToolbarModule,
    TranslateModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule { }
