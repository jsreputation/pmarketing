import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormFieldComponent } from 'src/app/shared/questions/question-form-field/question-form-field.component';
import { QuestionGroupFieldComponent } from '@cl-shared/questions/question-group-field/question-group-field.component';
import { OpenCloseDirective } from '@cl-shared/questions/question-form-field/shared/open-close.directive';
import { DynamicFieldDirective } from '@cl-shared/questions/question-form-field/shared/dynamic-field.directive';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionTypeModule } from '@cl-shared/questions/question-type/question-type.module';
import { QuestionRatingFieldModule } from '@cl-shared/questions/question-rating-field/question-rating-field.module';
import { QuestionDateFieldModule } from '@cl-shared/questions/question-date-field/question-date-field.module';
import { QuestionCountryCodeFieldModule } from '@cl-shared/questions/question-country-code-field/question-country-code-field.module';
import { QuestionLongTextFieldModule } from '@cl-shared/questions/question-long-text-field/question-long-text-field.module';
import { QuestionPictureChoiceFieldModule } from '@cl-shared/questions/question-picture-choice-field/question-picture-choice-field.module';
import {
  QuestionMultipleChoiceFieldModule
} from '@cl-shared/questions/question-multiple-choice-field/question-multiple-choice-field.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionFormFieldService } from '@cl-shared/questions/question-form-field/shared/services/question-form-field.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '@cl-environments/environment';
import { HttpServicesModule } from '@perx/whistler-services';

describe('QuestionFormFieldComponent', () => {
  let component: QuestionFormFieldComponent;
  let fixture: ComponentFixture<QuestionFormFieldComponent>;

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
        BrowserAnimationsModule,

        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        DragDropModule,
        TranslateModule.forRoot(),
        HttpServicesModule.forRoot(
          environment.apiHost,
          environment.apiCdn
        ),
      ],
      declarations: [
        QuestionFormFieldComponent,
        QuestionGroupFieldComponent,
        OpenCloseDirective,
        DynamicFieldDirective
      ],
      providers: [
        {
          provide: QuestionFormFieldService, useValue: {getFocusedElem: (a: any) => a + ''}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormFieldComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      id:  new FormControl(null),
      selectedType: new FormControl(null),
      question: new FormControl(null),
      scale: new FormControl(null),
      shape: new FormControl(null),
      color: new FormControl(null),
      left: new FormControl(null),
      right: new FormControl(null),
      required: new FormControl(null),
      description: new FormControl(null),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
