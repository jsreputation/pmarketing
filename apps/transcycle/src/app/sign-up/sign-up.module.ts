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
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

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
    MatMomentDateModule,
    MatDatepickerModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {
        useUtc: true,
        strict: true
      }
    }
  ]
})
export class SignUpModule { }
