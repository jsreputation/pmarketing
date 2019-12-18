import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
import { GroupComponent } from './group.component';
import { QuestionComponent } from './../question.component';
import { SelectComponent } from '../select/select.component';
import { RatingComponent } from '../rating/rating.component';
import { PictureSelectComponent } from '../picture-select/picture-select.component';
import { LongTextComponent } from '../long-text/long-text.component';
import { DateComponent } from '../date/date.component';
import { PhoneComponent } from '../phone/phone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordComponent} from '../password/password.component';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

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
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
