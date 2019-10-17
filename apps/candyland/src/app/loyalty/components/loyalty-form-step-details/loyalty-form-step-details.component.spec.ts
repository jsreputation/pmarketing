import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepDetailsComponent } from './loyalty-form-step-details.component';

describe('LoyaltyFormStepOneComponent', () => {
  let component: LoyaltyFormStepDetailsComponent;
  let fixture: ComponentFixture<LoyaltyFormStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
