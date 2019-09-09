import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionLongTextFieldComponent } from './question-long-text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    QuestionLongTextFieldComponent
  ],
  exports: [
    QuestionLongTextFieldComponent
  ],
  entryComponents: [
    QuestionLongTextFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class QuestionLongTextFieldModule { }
