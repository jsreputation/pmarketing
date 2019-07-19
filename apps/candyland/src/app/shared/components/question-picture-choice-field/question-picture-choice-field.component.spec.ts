import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPictureChoiceFieldComponent } from './question-picture-choice-field.component';

describe('QuestionPictureChoiceFieldComponent', () => {
  let component: QuestionPictureChoiceFieldComponent;
  let fixture: ComponentFixture<QuestionPictureChoiceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPictureChoiceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPictureChoiceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
