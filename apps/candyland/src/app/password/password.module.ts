import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {ForgetPasswordComponent} from './containers/forget-password/forget-password.component';
import {UpdateUserComponent} from './containers/update-user/update-user.component';
import {CommonModule} from '@angular/common';
import {PasswordRoutingModule} from './password-routing.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    ButtonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
})
export class PasswordModule {}
