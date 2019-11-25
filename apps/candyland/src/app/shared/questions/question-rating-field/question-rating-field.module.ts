import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionRatingFieldComponent } from './question-rating-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QuestionRatingFieldComponent
  ],
  exports: [
    QuestionRatingFieldComponent
  ],
  entryComponents: [
    QuestionRatingFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
  ]
})
export class QuestionRatingFieldModule { }
