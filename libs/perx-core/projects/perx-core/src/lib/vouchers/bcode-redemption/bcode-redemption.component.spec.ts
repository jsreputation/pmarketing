import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcodeRedemptionComponent } from './bcode-redemption.component';

describe('BcodeRedemptionComponent', () => {
  let component: BcodeRedemptionComponent;
  let fixture: ComponentFixture<BcodeRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcodeRedemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
