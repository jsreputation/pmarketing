import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationModule, ConfigModule, UtilsModule } from '@perxtech/core';
import { SignIn2Component } from './sign-in-2.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    SignIn2Component
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ConfigModule.forChild(),
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatCardModule,
    AuthenticationModule,
    UtilsModule,
  ],
  exports: [
    SignIn2Component
  ]
})
export class SignIn2Module { }
