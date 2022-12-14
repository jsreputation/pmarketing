import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QrRedemptionComponent } from './qr-redemption.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VouchersModule, IVoucherService, Voucher, VoucherState } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { mockVoucher } from '../voucher.mock';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { NotificationWrapperService } from '../../services/notification-wrapper.service';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const NotificationWrapperServiceStub: Partial<NotificationWrapperService> = {
  addPopup: () => { }
};

const stateBvrSubj = new BehaviorSubject(mockVoucher);

const vouchersServiceStub: Partial<IVoucherService> = {
  get: (): Observable<Voucher> => of(mockVoucher),
  stateChangedForVoucher: (): Observable<Voucher> => stateBvrSubj,
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
        VouchersModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStub }
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
    stateBvrSubj.next({ ...mockVoucher, state: VoucherState.issued });
    tick();
    expect(component.status).toBe(VoucherState.issued);
  }));

  it('should navigate to wallet', fakeAsync(() => {
    stateBvrSubj.next({ ...mockVoucher, state: VoucherState.redeemed });
    tick();
    expect(location.path(false)).toBe('/wallet');
  }));
});
