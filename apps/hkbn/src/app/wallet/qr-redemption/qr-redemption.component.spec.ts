import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QrRedemptionComponent } from './qr-redemption.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersModule, VouchersService, Voucher, VoucherState } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockVoucher } from '../voucher.mock';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const NotificationWrapperServiceStud = {
  addPopup: () => { }
};

const vouchersServiceStub = {
  state: new BehaviorSubject(mockVoucher),
  get: (): Observable<Voucher> => of(mockVoucher),
  stateChangedForVoucher: (): Observable<Voucher> => vouchersServiceStub.state,
  redeemVoucher: (id): Observable<any> => of(id)
};

describe('QrRedemptionComponent', () => {
  let component: QrRedemptionComponent;
  let fixture: ComponentFixture<QrRedemptionComponent>;
  let location: Location;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'wallet',
          component: QrRedemptionComponent
        }]),
        HttpClientTestingModule,
        VouchersModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub },
        { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStud }
      ],
      declarations: [QrRedemptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrRedemptionComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect change status', fakeAsync(() => {
    vouchersServiceStub.state.next({ ...mockVoucher, state: VoucherState.issued });
    tick();
    expect(component.status).toBe(VoucherState.issued);
  }));

  it('should navigate to wallet', fakeAsync(() => {
    vouchersServiceStub.state.next({ ...mockVoucher, state: VoucherState.redeemed });
    tick();
    expect(location.path(false)).toBe('/wallet')
  }));  
});
