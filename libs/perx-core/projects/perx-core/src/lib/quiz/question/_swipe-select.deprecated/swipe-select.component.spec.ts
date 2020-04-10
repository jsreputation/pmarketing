import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizSwipeSelectComponent } from './swipe-select.component';
import {
  MatDividerModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizSwipeSelectComponent', () => {
  let component: QuizSwipeSelectComponent;
  let fixture: ComponentFixture<QuizSwipeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSwipeSelectComponent],
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
    fixture = TestBed.createComponent(QuizSwipeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
