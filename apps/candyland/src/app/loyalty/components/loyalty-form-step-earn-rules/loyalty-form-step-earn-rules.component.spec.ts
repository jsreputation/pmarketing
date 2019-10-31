import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepEarnRulesComponent } from './loyalty-form-step-earn-rules.component';

describe('LoyalyFormStepEarnRulesComponent', () => {
  let component: LoyaltyFormStepEarnRulesComponent;
  let fixture: ComponentFixture<LoyaltyFormStepEarnRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepEarnRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepEarnRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
