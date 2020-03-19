import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBcComponent } from './quiz-bc.component';

describe('QuizBcComponent', () => {
  let component: QuizBcComponent;
  let fixture: ComponentFixture<QuizBcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizBcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
