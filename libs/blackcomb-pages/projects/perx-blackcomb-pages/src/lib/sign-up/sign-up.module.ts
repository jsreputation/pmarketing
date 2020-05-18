import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatSnackBarModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationModule, GameModule, SurveyModule, UtilsModule, ConfigModule, SettingsModule } from '@perxtech/core';
import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignUpComponent],
  exports: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild(),

    AuthenticationModule,
    SurveyModule,
    GameModule,
    UtilsModule,
    ConfigModule.forChild(),
    SettingsModule,

    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ]
})
export class SignUpModule { }
