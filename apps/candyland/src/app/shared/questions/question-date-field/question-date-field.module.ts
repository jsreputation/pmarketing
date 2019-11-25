import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDateFieldComponent } from './question-date-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

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
    MatSlideToggleModule,
    TranslateModule
  ]
})
export class QuestionDateFieldModule { }
