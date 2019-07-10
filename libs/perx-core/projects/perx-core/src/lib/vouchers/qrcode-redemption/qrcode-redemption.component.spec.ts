import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeRedemptionComponent } from './qrcode-redemption.component';

describe('QrcodeRedemptionComponent', () => {
  let component: QrcodeRedemptionComponent;
  let fixture: ComponentFixture<QrcodeRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeRedemptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
