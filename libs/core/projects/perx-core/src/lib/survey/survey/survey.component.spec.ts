import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatButtonModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule, MatProgressBarModule, MatStepperModule
} from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { GroupComponent } from '../question/group/group.component';
import { QuestionComponent } from '../question/question.component';
import { SelectComponent } from '../question/select/select.component';
import { RatingComponent } from '../question/rating/rating.component';
import { PictureSelectComponent } from '../question/picture-select/picture-select.component';
import { LongTextComponent } from '../question/long-text/long-text.component';
import { DateComponent } from '../question/date/date.component';
import { PhoneComponent } from '../question/phone/phone.component';
import { PasswordComponent } from '../question/password/password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldStepperComponent } from '../formly-stepper/formly-stepper';
import { SurveyService } from '@perxtech/core';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;
  const surveyServiceStub: Partial<SurveyService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SurveyComponent,
        QuestionComponent,
        GroupComponent,
        SelectComponent,
        RatingComponent,
        PictureSelectComponent,
        LongTextComponent,
        DateComponent,
        PasswordComponent,
        PhoneComponent,
        FormlyFieldStepperComponent
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatRadioModule,
        FormsModule,
        MatProgressBarModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'stepper',
              component: FormlyFieldStepperComponent
            }
          ]
        })
      ],
      providers: [
        { provide: SurveyService, useValue: surveyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
