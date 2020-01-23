import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultipleChoiceFieldComponent } from './question-multiple-choice-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('QuestionMultipleChoiceFieldComponent', () => {
  let component: QuestionMultipleChoiceFieldComponent;
  let fixture: ComponentFixture<QuestionMultipleChoiceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSlideToggleModule,
        TranslateModule.forRoot()
      ],
      declarations: [QuestionMultipleChoiceFieldComponent],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultipleChoiceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
