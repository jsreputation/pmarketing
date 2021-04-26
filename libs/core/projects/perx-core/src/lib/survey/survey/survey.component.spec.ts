import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
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
import { PinchZoomModule } from 'ngx-pinch-zoom';

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
        PinchZoomModule,
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
