import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyRuleCardComponent } from './loyalty-rule-card.component';

describe('LoyalyFormStepEarnRulesComponent', () => {
  let component: LoyaltyRuleCardComponent;
  let fixture: ComponentFixture<LoyaltyRuleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyRuleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyRuleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
