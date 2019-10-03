import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDateFieldComponent } from './question-date-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';

describe('QuestionDateFieldComponent', () => {
  let component: QuestionDateFieldComponent;
  let fixture: ComponentFixture<QuestionDateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSlideToggleModule
      ],
      declarations: [QuestionDateFieldComponent]
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
