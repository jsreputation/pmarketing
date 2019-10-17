import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepTiersConversionsComponent } from './loyalty-form-step-tiers-conversions.component';

describe('LoyaltyFormStepTwoComponent', () => {
  let component: LoyaltyFormStepTiersConversionsComponent;
  let fixture: ComponentFixture<LoyaltyFormStepTiersConversionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepTiersConversionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepTiersConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
