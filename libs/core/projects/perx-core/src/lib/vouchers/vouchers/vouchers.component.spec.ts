import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { VouchersModule } from '../vouchers.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { ConfigModule } from '../../config/config.module';
import { of } from 'rxjs';
import { IMerchantsService } from '../../merchants/imerchants.service';
import { IVoucherService } from '../ivoucher.service';
import { RewardsService } from '../../rewards/rewards.service';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { RedemptionType } from '../../perx-core.models';
import { TranslateModule } from '@ngx-translate/core';
import { IReward } from '../../rewards/models/reward.model';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const merchantsServiceStub: Partial<IMerchantsService> = {
    getMerchant: () => of()
  };

  const mockReward: IReward = {
    id: 21,
    name: '',
    favorite: false,
    description: '',
    subtitle: '',
    validFrom: new Date(),
    validTo: new Date(),
    sellingFrom: new Date(),
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: '',
    rewardPrice: [],
    merchantId: 1,
    merchantName: '',
    merchantWebsite: '',
    termsAndConditions: '',
    howToRedeem: '',
    categoryTags: [],
    loyalty: []
  };

  const mockRedeemedVoucherDetail: IVoucher = {
    id: 21,
    expiry: null,
    state: VoucherState.redeemed,
    redemptionType: RedemptionType.txtCode,
    reward: mockReward,
  };

  const mockIssuedVoucherDetail: IVoucher = {
    id: 21,
    expiry: null,
    state: VoucherState.issued,
    redemptionType: RedemptionType.txtCode,
    reward: mockReward,
  };

  const voucherServiceStub: Partial<IVoucherService> = {
    get: () => of(mockIssuedVoucherDetail),
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatRippleModule,
        RouterTestingModule,
        VouchersModule,
        ConfigModule.forRoot({}),
        TranslateModule.forRoot()
      ],
      providers: [
        DatePipe,
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IMerchantsService, useValue: merchantsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remain if voucher is redeemed', () => {
    // tslint:disable-next-line: deprecation
    jest.spyOn(component.route, 'emit').mockImplementation(() => { });
    component.onClick(mockRedeemedVoucherDetail);
    // tslint:disable-next-line: deprecation
    expect(component.route.emit).not.toHaveBeenCalled();
  });

  it('should emit with voucher id if voucher is issued', () => {
    // tslint:disable-next-line: deprecation
    jest.spyOn(component.route, 'emit').mockImplementation(() => { });
    component.onClick(mockIssuedVoucherDetail);
    // tslint:disable-next-line: deprecation
    expect(component.route.emit).toHaveBeenCalledWith(21);
  });

  it('If there are 2 vouchers in the list. The list should have 2 items.', () => {
    const vouchers: IVoucher[] = [
      {
        id: 1,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.txtCode,
        reward: { ...mockReward, id: 1 }
      },
      {
        id: 2,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.txtCode,
        reward: { ...mockReward, id: 2 }
      }
    ];
    component.vouchers = vouchers;
    fixture.detectChanges();
    const voucher = fixture.debugElement.queryAll(By.css('.voucher-content'));
    expect(voucher.length).toBe(2);
  });

  it('If the first voucher has a reward with a name, the name should be displayed.', () => {
    const vouchers: IVoucher[] = [
      {
        id: 1,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 1, name: 'First Voucher' }
      },
      {
        id: 2,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 2, name: 'Second Voucher' }
      }
    ];
    component.vouchers = vouchers;
    fixture.detectChanges();
    const voucher = fixture.debugElement.queryAll(By.css('.voucher-details'))[0];
    expect(voucher.query(By.css('h1')).nativeElement.textContent.trim()).toBe('First Voucher');
  });

  it('if the first voucher has a reward with a merchant name, the merchant should be displayed.', () => {
    const vouchers: IVoucher[] = [
      {
        id: 1,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 1, name: 'First Voucher', merchantName: 'Perx' }
      },
      {
        id: 2,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 2, name: 'Second Voucher' }
      }
    ];
    component.vouchers = vouchers;
    fixture.detectChanges();
    const voucher = fixture.debugElement.queryAll(By.css('.voucher-details'))[0];
    expect(voucher.queryAll(By.css('p'))[0].nativeElement.textContent.trim()).toBe('Perx');
  });

  it('If the first voucher has a reward with no merchant name but with a description, the description should be displayed.', () => {
    const vouchersMock: IVoucher[] = [
      {
        id: 1,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 1, name: 'First Voucher', description: 'Test description' }
      },
      {
        id: 2,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 2, name: 'Second Voucher' }
      }
    ];
    component.vouchers$ = of(vouchersMock);
    fixture.detectChanges();
    component.vouchers$.subscribe((vouchers: IVoucher[]) => {
      expect(vouchers.length).toBeGreaterThan(0);
      // @ts-ignore
      expect(vouchers[0].reward.merchantName).toBe('');
      // @ts-ignore
      expect(vouchers[0].reward.description).toBe('Test description');
    });
  });

  it('If there is mapping and showRedeemedIcon is true, the status of each voucher should be displayed.', () => {
    const vouchers: IVoucher[] = [
      {
        id: 1,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 1, name: 'First Voucher', description: 'Test description' }
      },
      {
        id: 2,
        expiry: null,
        state: VoucherState.issued,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 2, name: 'Second Voucher' }
      }
    ];
    component.vouchers = vouchers;
    component.mapping = {
      issued: 'Approved',
      redeemed: 'Redeemed',
      expired: 'Expired',
      reserved: 'Pending',
      released: 'Declined',
    };
    component.showRedeemedIcon = true;
    fixture.detectChanges();
    const voucherOne = fixture.debugElement.queryAll(By.css('.voucher-details'))[0];
    expect(voucherOne.query(By.css('.ribbon')).nativeElement.textContent.trim()).toBe('Redeemed');

    const voucherTwo = fixture.debugElement.queryAll(By.css('.voucher-details'))[1];
    expect(voucherTwo.query(By.css('.ribbon')).nativeElement.textContent.trim()).toBe('Approved');
  });

  it('If I click on a voucher in the list, an event should be emitted with the voucher as a parameter.', () => {
    const vouchers: IVoucher[] = [
      {
        id: 1,
        expiry: null,
        state: VoucherState.redeemed,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 1, name: 'First Voucher', description: 'Test description' }
      },
      {
        id: 2,
        expiry: null,
        state: VoucherState.issued,
        redemptionType: RedemptionType.none,
        reward: { ...mockReward, id: 2, name: 'Second Voucher' }
      }
    ];
    component.vouchers = vouchers;
    component.mapping = {
      issued: 'Approved',
      redeemed: 'Redeemed',
      expired: 'Expired',
      reserved: 'Pending',
      released: 'Declined',
    };
    const tappedSpy = jest.spyOn(component.tapped, 'emit');

    fixture.detectChanges();
    const voucherIssued = fixture.debugElement.queryAll(By.css('mat-card'))[1];
    voucherIssued.triggerEventHandler('click', null);
    expect(tappedSpy).toHaveBeenCalledWith(vouchers[1]);
  });
});
