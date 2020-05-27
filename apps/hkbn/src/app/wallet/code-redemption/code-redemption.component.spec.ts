import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CodeRedemptionComponent } from './code-redemption.component';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule, IVoucherService, Voucher } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { mockVoucher } from '../voucher.mock';
import { NotificationWrapperService } from '../../services/notification-wrapper.service';
import { VoucherState } from '@perxtech/core';
import { Location } from '@angular/common';

const NotificationWrapperServiceStub: Partial<NotificationWrapperService> = {
  addPopup: () => { }
};

const stateSubj = new BehaviorSubject(mockVoucher);

const vouchersServiceStub: Partial<IVoucherService> = {
  get: (): Observable<Voucher> => of(mockVoucher),
  stateChangedForVoucher: (): Observable<Voucher> => stateSubj,
  redeemVoucher: (): Observable<any> => of({})
};

describe('CodeRedemptionComponent', () => {
  let component: CodeRedemptionComponent;
  let fixture: ComponentFixture<CodeRedemptionComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule.withRoutes([{
          path: 'wallet',
          component: CodeRedemptionComponent
        }]),
        TranslateModule.forRoot(),
        VouchersModule,
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStub }
      ],
      declarations: [CodeRedemptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRedemptionComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect change status', fakeAsync(() => {
    stateSubj.next({ ...mockVoucher, state: VoucherState.issued });
    tick();
    expect(component.previousStatus).toBe(VoucherState.issued);
  }));

  it('should navigate to wallet', fakeAsync(() => {
    stateSubj.next({ ...mockVoucher, state: VoucherState.redeemed });
    tick();
    expect(location.path(false)).toBe('/wallet');
  }));

  it('should call location back', fakeAsync(() => {
    const spy = spyOn(location, 'back');
    component.redeem();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
