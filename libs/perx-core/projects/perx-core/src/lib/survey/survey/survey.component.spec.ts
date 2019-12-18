import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatButtonModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule
} from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { GroupComponent } from './../question/group/group.component';
import { QuestionComponent } from './../question/question.component';
import { SelectComponent } from './../question/select/select.component';
import { RatingComponent } from './../question/rating/rating.component';
import { PictureSelectComponent } from './../question/picture-select/picture-select.component';
import { LongTextComponent } from './../question/long-text/long-text.component';
import { DateComponent } from './../question/date/date.component';
import { PhoneComponent } from './../question/phone/phone.component';
import { PasswordComponent } from '../question/password/password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

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
        PhoneComponent
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
        ReactiveFormsModule,
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
