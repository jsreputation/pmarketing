import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { MatCheckboxModule } from '@angular/material/checkbox';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignUpComponent,  data: {countryList: ['Hong Kong', 'Singapore']} },
  { path: '*', redirectTo: '' }
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatCheckboxModule, ]
})
export class SignUpModule { }
