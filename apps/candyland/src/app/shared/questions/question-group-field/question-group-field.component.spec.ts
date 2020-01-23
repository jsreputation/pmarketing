import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupFieldComponent } from './question-group-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionTypeModule } from '@cl-shared/questions/question-type/question-type.module';
import { QuestionRatingFieldModule } from '@cl-shared/questions/question-rating-field/question-rating-field.module';
import { QuestionDateFieldModule } from '@cl-shared/questions/question-date-field/question-date-field.module';
import { QuestionCountryCodeFieldModule } from '@cl-shared/questions/question-country-code-field/question-country-code-field.module';
import { QuestionLongTextFieldModule } from '@cl-shared/questions/question-long-text-field/question-long-text-field.module';
import { QuestionPictureChoiceFieldModule } from '@cl-shared/questions/question-picture-choice-field/question-picture-choice-field.module';
import {
  QuestionMultipleChoiceFieldModule
} from '@cl-shared/questions/question-multiple-choice-field/question-multiple-choice-field.module';
import { ButtonModule } from '@perx/candyshop';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionFormFieldComponent } from '@cl-shared/questions/question-form-field/question-form-field.component';
import { OpenCloseDirective } from '@cl-shared/questions/question-form-field/shared/open-close.directive';
import { DynamicFieldDirective } from '@cl-shared/questions/question-form-field/shared/dynamic-field.directive';
import { QuestionFormFieldService } from '@cl-shared/questions/question-form-field/shared/services/question-form-field.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('QuestionGroupFieldComponent', () => {
  let component: QuestionGroupFieldComponent;
  let fixture: ComponentFixture<QuestionGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        HttpClientTestingModule,

        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        DragDropModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        QuestionGroupFieldComponent,
        QuestionFormFieldComponent,
        QuestionGroupFieldComponent,
        OpenCloseDirective,
        DynamicFieldDirective
      ],
      providers: [
        {
          provide: QuestionFormFieldService, useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
