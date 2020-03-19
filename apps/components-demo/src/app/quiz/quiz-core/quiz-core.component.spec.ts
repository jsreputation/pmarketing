import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizModule } from '@perxtech/core';
import { QuizCoreComponent } from './quiz-core.component';

describe('QuizCoreComponent', () => {
  let component: QuizCoreComponent;
  let fixture: ComponentFixture<QuizCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizCoreComponent],
      imports: [QuizModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
