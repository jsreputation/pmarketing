import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeRedemptionComponent } from './barcode-redemption.component';

describe('BarcodeRedemptionComponent', () => {
  let component: BarcodeRedemptionComponent;
  let fixture: ComponentFixture<BarcodeRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeRedemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
