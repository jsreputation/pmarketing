import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoyaltyFormStepTiersConversionsComponent } from './loyalty-form-step-tiers-conversions.component';

describe('LoyaltyFormStepTwoComponent', () => {
  let component: LoyaltyFormStepTiersConversionsComponent;
  let fixture: ComponentFixture<LoyaltyFormStepTiersConversionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepTiersConversionsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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
