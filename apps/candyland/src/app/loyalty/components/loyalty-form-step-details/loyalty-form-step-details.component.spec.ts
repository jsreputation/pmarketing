import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoyaltyFormStepDetailsComponent } from './loyalty-form-step-details.component';

describe('LoyaltyFormStepOneComponent', () => {
  let component: LoyaltyFormStepDetailsComponent;
  let fixture: ComponentFixture<LoyaltyFormStepDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltyFormStepDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
