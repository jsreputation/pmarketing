import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { MatCardModule } from '@angular/material';
import { Voucher, VoucherState, RedemptionType, VouchersModule, IVoucherService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;
  const mockVoucher: Partial<Voucher> = {
    id: 2,
    rewardId: 2,
    state: VoucherState.issued,
    name: 'sir',
    redemptionType: RedemptionType.offline,
    thumbnailImg: 'nil',
    rewardBanner: 'nil',
    merchantImg: 'nil',
    merchantName: 'nil',
    expiry:  null,
    description: []
  };

  const voucherServiceStub = {
    get: () => {
      return of('');
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionComponent],
      imports: [
        MatCardModule,
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule,
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub }
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
});
