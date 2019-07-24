import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormFieldComponent } from './question-form-field.component';
import { QuestionGroupFieldComponent } from '@cl-shared/components/question-group-field/question-group-field.component';
import { OpenCloseDirective } from '@cl-shared/components/question-form-field/shared/open-close.directive';
import { DynamicFieldDirective } from '@cl-shared/components/question-form-field/shared/dynamic-field.directive';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionTypeModule } from '@cl-shared/components/question-type/question-type.module';
import { QuestionRatingFieldModule } from '@cl-shared/components/question-rating-field/question-rating-field.module';
import { QuestionDateFieldModule } from '@cl-shared/components/question-date-field/question-date-field.module';
import { QuestionCountryCodeFieldModule } from '@cl-shared/components/question-country-code-field/question-country-code-field.module';
import { QuestionLongTextFieldModule } from '@cl-shared/components/question-long-text-field/question-long-text-field.module';
import { QuestionPictureChoiceFieldModule } from '@cl-shared/components/question-picture-choice-field/question-picture-choice-field.module';
import { QuestionMultipleChoiceFieldModule } from '@cl-shared/components/question-multiple-choice-field/question-multiple-choice-field.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      selectedType: new FormControl(null),
      name: new FormControl(null),
      scale: new FormControl(null),
      selectShape: new FormControl(null),
      selectColor: new FormControl(null),
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
