import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyReviewComponent } from './loyalty-review.component';

describe('LoyaltyReviewComponent', () => {
  let component: LoyaltyReviewComponent;
  let fixture: ComponentFixture<LoyaltyReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
