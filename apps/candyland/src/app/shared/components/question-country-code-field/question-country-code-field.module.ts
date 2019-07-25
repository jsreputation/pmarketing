import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCountryCodeFieldComponent } from './question-country-code-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    QuestionCountryCodeFieldComponent
  ],
  exports: [
    QuestionCountryCodeFieldComponent
  ],
  entryComponents: [
    QuestionCountryCodeFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class QuestionCountryCodeFieldModule { }
