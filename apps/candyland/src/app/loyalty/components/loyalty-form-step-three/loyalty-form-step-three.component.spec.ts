import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepThreeComponent } from './loyalty-form-step-three.component';

describe('LoyaltyFormStepThreeComponent', () => {
  let component: LoyaltyFormStepThreeComponent;
  let fixture: ComponentFixture<LoyaltyFormStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
