import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDateFieldComponent } from './question-date-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  declarations: [
    QuestionDateFieldComponent
  ],
  exports: [
    QuestionDateFieldComponent
  ],
  entryComponents: [
    QuestionDateFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ]
})
export class QuestionDateFieldModule { }
