import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepOneComponent } from './loyalty-form-step-one.component';

describe('LoyaltyFormStepOneComponent', () => {
  let component: LoyaltyFormStepOneComponent;
  let fixture: ComponentFixture<LoyaltyFormStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
