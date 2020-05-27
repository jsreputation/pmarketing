import {
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule, SurveyModule, GameModule } from '@perxtech/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { MatButtonModule } from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpComponent as SignUpStagingComponent } from './sign-up/sign-up.component.staging';
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
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    GameModule,
    TranslateModule
  ],
  declarations: [SignUpComponent, SignUpStagingComponent]
})
export class SignUpModule { }
