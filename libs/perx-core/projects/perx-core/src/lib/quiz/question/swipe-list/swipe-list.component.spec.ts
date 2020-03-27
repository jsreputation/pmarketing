import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSwipeListComponent } from './swipe-list.component';
import {
  MatDividerModule, MatIconModule,
  MatListModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuizSwipeListComponent', () => {
  let component: QuizSwipeListComponent;
  let fixture: ComponentFixture<QuizSwipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSwipeListComponent],
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
    fixture = TestBed.createComponent(QuizSwipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
