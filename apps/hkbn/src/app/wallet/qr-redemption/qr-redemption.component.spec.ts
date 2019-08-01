import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRedemptionComponent } from './qr-redemption.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QrRedemptionComponent', () => {
  let component: QrRedemptionComponent;
  let fixture: ComponentFixture<QrRedemptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        VouchersModule.forRoot({env: {apiHost: ''}}),
      ],
      declarations: [QrRedemptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
