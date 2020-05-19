import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationModule, ConfigModule, UtilsModule } from '@perxtech/core';
import { SignIn2Component } from './sign-in-2.component';

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
    AuthenticationModule,
    UtilsModule,
  ],
  exports: [
    SignIn2Component
  ]
})
export class SignIn2Module { }
