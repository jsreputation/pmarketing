import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRatingFieldComponent } from './question-rating-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionRatingFieldComponent', () => {
  let component: QuestionRatingFieldComponent;
  let fixture: ComponentFixture<QuestionRatingFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,

        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [ QuestionRatingFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRatingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
