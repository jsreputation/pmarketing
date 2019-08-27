import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './containers/account/account.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { UpdateEmailComponent } from './containers/update-email/update-email.component';
import { UpdatePhoneComponent } from './containers/update-phone/update-phone.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { ErrorHandlerModule } from '../ui/error-handler/error-handler.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    AccountComponent,
    AccountSummaryComponent,
    UpdateEmailComponent,
    UpdatePhoneComponent,
    ChangePasswordComponent,
    ChangePasswordFormComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    TextMaskModule,
    MatButtonModule,
    MatIconModule,
    ErrorHandlerModule,
    TranslateModule,
  ]
})
export class AccountModule {
}
