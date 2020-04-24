import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatProgressSpinnerModule, MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SignIn2Component } from './sign-in-2.component';

@NgModule({
  declarations: [
    SignIn2Component
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    SignIn2Component
  ]
})
export class SignIn2Module { }
