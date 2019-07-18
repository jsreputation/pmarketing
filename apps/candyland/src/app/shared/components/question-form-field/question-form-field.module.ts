import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormFieldComponent } from './question-form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenCloseDirective } from './shared/open-close.directive';
import { QuestionTypeModule } from '@cl-shared/components/question-type/question-type.module';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { QuestionRatingFieldModule } from '@cl-shared/components/question-rating-field/question-rating-field.module';
import { DynamicFieldDirective } from './shared/dynamic-field.directive';

@NgModule({
  declarations: [
    QuestionFormFieldComponent,
    OpenCloseDirective,
    DynamicFieldDirective
  ],
  exports: [
    QuestionFormFieldComponent,
    OpenCloseDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionTypeModule,
    QuestionRatingFieldModule,

    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  providers: [
    QuestionFormFieldService
  ]
})
export class QuestionFormFieldModule { }
