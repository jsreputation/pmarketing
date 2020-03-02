import { MatSnackBarModule } from '@angular/material';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule, SurveyModule, GameModule } from '@perx/core';
import { PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    AuthenticationModule,
    PerxBlackcombPagesModule,
    CommonModule,
    SurveyModule,
    SignUpRoutingModule,
    MatSnackBarModule,
    MatButtonModule,
    GameModule
  ]
})
export class SignUpModule { }
