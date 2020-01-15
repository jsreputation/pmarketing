import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { ButtonModule } from '../shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import { LogoModule } from '../shared/components/logo/logo.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpServicesModule } from '@perx/whistler-services';

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
    TranslateModule,
    HttpServicesModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule { }
