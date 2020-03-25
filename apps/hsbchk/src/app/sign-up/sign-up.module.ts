import { MatSnackBarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule, SurveyModule, GameModule } from '@perxtech/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { MatButtonModule } from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    AuthenticationModule,
    PerxBlackcombPagesModule,
    CommonModule,
    SurveyModule,
    SignUpRoutingModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    GameModule,
    TranslateModule
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
