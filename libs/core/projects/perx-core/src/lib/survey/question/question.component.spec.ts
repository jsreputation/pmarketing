import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { QuestionComponent } from './question.component';
import { GroupComponent } from './group/group.component';
import { SelectComponent } from './select/select.component';
import { PictureSelectComponent } from './picture-select/picture-select.component';
import { RatingComponent } from './rating/rating.component';
import { LongTextComponent } from './long-text/long-text.component';
import { DateComponent } from './date/date.component';
import { PhoneComponent } from './phone/phone.component';
import { PasswordComponent } from './password/password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestionComponent,
        GroupComponent,
        SelectComponent,
        RatingComponent,
        PictureSelectComponent,
        LongTextComponent,
        DateComponent,
        PhoneComponent,
        PasswordComponent
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
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
