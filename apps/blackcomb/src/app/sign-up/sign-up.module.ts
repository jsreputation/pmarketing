import { MatSnackBarModule } from '@angular/material';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule, SurveyModule } from '@perx/core';
import { SignUpComponent } from '@perx/blackcomb-pages';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    AuthenticationModule,
    CommonModule,
    SurveyModule,
    SignUpRoutingModule,
    MatSnackBarModule
  ]
})
export class SignUpModule { }
