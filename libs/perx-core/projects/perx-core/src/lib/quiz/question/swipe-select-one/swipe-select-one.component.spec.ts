import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizSwipeOneComponent } from './swipe-select-one.component';
import {
  MatDividerModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizSwipeOneComponent', () => {
  let component: QuizSwipeOneComponent;
  let fixture: ComponentFixture<QuizSwipeOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSwipeOneComponent],
      imports: [
        MatListModule,
        MatDividerModule,
        NoopAnimationsModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSwipeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
