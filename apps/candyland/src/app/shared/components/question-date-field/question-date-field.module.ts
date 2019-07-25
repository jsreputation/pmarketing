import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDateFieldComponent } from './question-date-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';

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

    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    DatePickerModule,
    MatCheckboxModule,
  ]
})
export class QuestionDateFieldModule { }
