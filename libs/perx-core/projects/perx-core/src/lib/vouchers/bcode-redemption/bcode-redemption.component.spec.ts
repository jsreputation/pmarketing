import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BcodeRedemptionComponent } from './bcode-redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { of } from 'rxjs';
import { IVoucherService } from '../ivoucher.service';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { Type, SimpleChange } from '@angular/core';
import { oc } from 'ts-optchain';
import { RedemptionType } from '../../perx-core.models';

describe('BcodeRedemptionComponent', () => {
  let component: BcodeRedemptionComponent;
  let fixture: ComponentFixture<BcodeRedemptionComponent>;
  const mockVoucher: IVoucher = {
    id: 1,
    reward: {
      id: 1,
      name: 'reward name',
      description: 'reward description',
      subtitle: 'sub title',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: 'https://picsum.photos/50/50?random=1',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    code: 'GFY2019',
    expiry: new Date('2019-09-05T03:24:00'),
  };

  const voucherServiceStub = {
    get: () => of(mockVoucher)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VouchersModule,
        ConfigModule.forRoot({})
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reward name should be displayed', fakeAsync(() => {
    component.voucherId = 1;
    const voucherService: IVoucherService = fixture.debugElement.injector
      .get<IVoucherService>(IVoucherService as Type<IVoucherService>);
    const voucherServiceSpy = jest.spyOn(voucherService, 'get').mockReturnValue(
      of(mockVoucher)
    );
    component.ngOnChanges({
      voucherId: new SimpleChange(null, 1, true)
    });
    fixture.detectChanges();
    tick();
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(mockVoucher.reward).not.toBeNull();
    // @ts-ignore
    expect(fixture.nativeElement.querySelector('h1').textContent.trim()).toEqual(mockVoucher.reward.name);
    expect(fixture.nativeElement.querySelector('.bcode').textContent.trim()).toEqual(mockVoucher.code);
    expect(fixture.nativeElement.querySelector('.reward-image').src).toEqual(oc(mockVoucher).reward.rewardBanner());

  }));

  it('should use useMinimalStyle', fakeAsync(() => {
    component.useMinimalStyle = true;
    component.ngOnChanges({
      useMinimalStyle: new SimpleChange(null, 1, true)
    });
    fixture.detectChanges();
    tick();
    expect(component.useMinimalStyle).toBe(true);
    expect(component.showImage).toBe(false);
    expect(component.showVoucherName).toBe(false);
    expect(component.showTermsAndCondition).toBe(false);
    expect(component.showAfterInstruction).toBe(true);
  }));
});
