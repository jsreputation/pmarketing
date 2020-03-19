import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '@perxtech/candyshop';
import { ForgetPasswordComponent } from './containers/forget-password/forget-password.component';
import { UpdateUserComponent } from './containers/update-user/update-user.component';
import { CommonModule } from '@angular/common';
import { PasswordRoutingModule } from './password-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class PasswordModule { }
