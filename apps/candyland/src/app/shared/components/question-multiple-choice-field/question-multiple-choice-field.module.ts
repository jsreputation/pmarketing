import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionMultipleChoiceFieldComponent } from './question-multiple-choice-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    QuestionMultipleChoiceFieldComponent
  ],
  exports: [
    QuestionMultipleChoiceFieldComponent
  ],
  entryComponents: [
    QuestionMultipleChoiceFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class QuestionMultipleChoiceFieldModule { }
