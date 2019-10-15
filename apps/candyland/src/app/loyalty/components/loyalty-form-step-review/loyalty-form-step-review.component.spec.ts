import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepReviewComponent } from './loyalty-form-step-review.component';

describe('LoyaltyFormStepFourComponent', () => {
  let component: LoyaltyFormStepReviewComponent;
  let fixture: ComponentFixture<LoyaltyFormStepReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
