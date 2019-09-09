import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RedemptionComponent } from './redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatDividerModule } from '@angular/material';
import { VouchersModule, VouchersService, VoucherState, UtilsModule } from '@perx/core';
import { RewardDetailComponent } from '../reward/reward-detail/reward-detail.component';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { ExpireTimerComponent } from '../reward/expire-timer/expire-timer.component';
import { of } from 'rxjs';
import { vouchers } from '../vouchers.mock';
import { Type } from '@angular/core';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;
  const vouchersServiceStub = { redeemVoucher: () => {}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RedemptionComponent,
        RewardDetailComponent,
        LocationShortFormatComponent,
        ExpireTimerComponent
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatDividerModule,
        VouchersModule,
        UtilsModule
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redeemVoucher', fakeAsync(() => {
    const voucherService: VouchersService = fixture.debugElement.injector.get<VouchersService>(VouchersService as Type<VouchersService>);
    const voucherServiceSpy = spyOn(voucherService, 'redeemVoucher').and.returnValue(of(vouchers[0]));
    component.voucher = vouchers[0];
    component.full('2222');
    tick(3500);
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(component.voucher.state).toBe(VoucherState.redeemed);
  }));

  it('should show pin ', () => {
    component.showPinComponent();
    expect(component.showEnterPinComponent).toBeTruthy();
  });
});
