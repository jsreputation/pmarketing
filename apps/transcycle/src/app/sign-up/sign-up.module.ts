import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  AuthenticationModule,
  ConfigModule,
  GameModule,
  SettingsModule,
  SurveyModule,
  UtilsModule
} from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignUpComponent },
  { path: '*', redirectTo: '' }
];


@NgModule({
  declarations: [SignUpComponent],
  exports: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
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
    MatIconModule,
  ]
})
export class SignUpModule { }
