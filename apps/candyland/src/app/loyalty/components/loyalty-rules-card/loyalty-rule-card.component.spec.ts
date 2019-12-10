import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyRuleCardComponent } from './loyalty-rule-card.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoyaltyRuleCardComponent', () => {
  let component: LoyaltyRuleCardComponent;
  let fixture: ComponentFixture<LoyaltyRuleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltyRuleCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
