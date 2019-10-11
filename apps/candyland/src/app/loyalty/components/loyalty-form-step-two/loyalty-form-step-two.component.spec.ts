import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepTwoComponent } from './loyalty-form-step-two.component';

describe('LoyaltyFormStepTwoComponent', () => {
  let component: LoyaltyFormStepTwoComponent;
  let fixture: ComponentFixture<LoyaltyFormStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
