import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDateFieldComponent } from './question-date-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';

describe('QuestionDateFieldComponent', () => {
  let component: QuestionDateFieldComponent;
  let fixture: ComponentFixture<QuestionDateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        DatePickerModule,
        MatCheckboxModule,
      ],
      declarations: [ QuestionDateFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
