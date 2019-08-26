import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRedemptionComponent } from './qr-redemption.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersModule, VouchersService, Voucher } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { mockVoucher } from '../voucher.mock';
import { Observable, of } from 'rxjs';

describe('QrRedemptionComponent', () => {
  let component: QrRedemptionComponent;
  let fixture: ComponentFixture<QrRedemptionComponent>;
  const vouchersServiceStub = {
    get: (): Observable<Voucher> => of(mockVoucher)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        VouchersModule,
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub }
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
