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
import { QuestionDateFieldModule } from '@cl-shared/components/question-date-field/question-date-field.module';
import { QuestionCountryCodeFieldModule } from '@cl-shared/components/question-country-code-field/question-country-code-field.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { QuestionGroupFieldComponent } from '@cl-shared/components/question-group-field/question-group-field.component';
import { QuestionLongTextFieldModule } from '@cl-shared/components/question-long-text-field/question-long-text-field.module';
import { QuestionPictureChoiceFieldModule } from '@cl-shared/components/question-picture-choice-field/question-picture-choice-field.module';
import { QuestionMultipleChoiceFieldModule } from '@cl-shared/components/question-multiple-choice-field/question-multiple-choice-field.module';

@NgModule({
  declarations: [
    QuestionFormFieldComponent,
    QuestionGroupFieldComponent,
    OpenCloseDirective,
    DynamicFieldDirective
  ],
  exports: [
    QuestionFormFieldComponent,
    QuestionGroupFieldComponent,
    OpenCloseDirective
  ],
  entryComponents: [
    QuestionGroupFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionTypeModule,
    QuestionRatingFieldModule,
    QuestionDateFieldModule,
    QuestionCountryCodeFieldModule,
    QuestionLongTextFieldModule,
    QuestionPictureChoiceFieldModule,
    QuestionMultipleChoiceFieldModule,
    ButtonModule,

    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  providers: [
    QuestionFormFieldService
  ]
})
export class QuestionFormFieldModule { }
