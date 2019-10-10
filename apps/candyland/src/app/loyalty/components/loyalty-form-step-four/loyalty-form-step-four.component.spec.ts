import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepFourComponent } from './loyalty-form-step-four.component';

describe('LoyaltyFormStepFourComponent', () => {
  let component: LoyaltyFormStepFourComponent;
  let fixture: ComponentFixture<LoyaltyFormStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
