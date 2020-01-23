import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormFieldComponent } from 'src/app/shared/questions/question-form-field/question-form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenCloseDirective } from 'src/app/shared/questions/question-form-field/shared/open-close.directive';
import { QuestionTypeModule } from '@cl-shared/questions/question-type/question-type.module';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { QuestionFormFieldService } from '@cl-shared/questions/question-form-field/shared/services/question-form-field.service';
import { QuestionRatingFieldModule } from '@cl-shared/questions/question-rating-field/question-rating-field.module';
import { DynamicFieldDirective } from 'src/app/shared/questions/question-form-field/shared/dynamic-field.directive';
import { QuestionDateFieldModule } from '@cl-shared/questions/question-date-field/question-date-field.module';
import { QuestionCountryCodeFieldModule } from '@cl-shared/questions/question-country-code-field/question-country-code-field.module';
import { ButtonModule } from '@perx/candyshop';
import { QuestionGroupFieldComponent } from '@cl-shared/questions/question-group-field/question-group-field.component';
import { QuestionLongTextFieldModule } from '@cl-shared/questions/question-long-text-field/question-long-text-field.module';
import { QuestionPictureChoiceFieldModule } from '@cl-shared/questions/question-picture-choice-field/question-picture-choice-field.module';
import {
  QuestionMultipleChoiceFieldModule
} from '@cl-shared/questions/question-multiple-choice-field/question-multiple-choice-field.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';

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
    DragDropModule,
    TranslateModule,
  ],
  providers: [
    QuestionFormFieldService
  ]
})
export class QuestionFormFieldModule { }
