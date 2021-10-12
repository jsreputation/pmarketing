import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QrcodeRedemptionComponent } from './qrcode-redemption.component';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { IVoucherService } from '../ivoucher.service';
import { of } from 'rxjs';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { Type, SimpleChange } from '@angular/core';
import { oc } from 'ts-optchain';
import { RedemptionType } from '../../perx-core.models';
import { ProfileService } from '../../profile/profile.service';
import { SettingsService } from '../../settings/settings.service';

describe('QrcodeRedemptionComponent', () => {
  let component: QrcodeRedemptionComponent;
  let fixture: ComponentFixture<QrcodeRedemptionComponent>;
  const mockVoucher: IVoucher = {
    id: 1,
    reward: {
      id: 1,
      favorite: false,
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
      loyalty: []
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    code: 'GFY2019',
    expiry: new Date('2019-09-05T03:24:00'),
  };

  const voucherServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher)
  };

  const settingServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        VouchersModule,
        ConfigModule.forRoot({})
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub },
        {
          provide: ProfileService,
          useValue: { whoAmI: () => of({}) }
        },
        { provide: SettingsService, useValue: settingServiceStub },
      ]
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

  it('reward name should be displayed', fakeAsync(() => {
    component.voucherId = 1;
    const voucherService: IVoucherService = fixture.debugElement.injector
      .get<IVoucherService>(IVoucherService as Type<IVoucherService>);
    const settingService: SettingsService = fixture.debugElement.injector
      .get<SettingsService>(SettingsService as Type<SettingsService>);
    const voucherServiceSpy = jest.spyOn(voucherService, 'get').mockReturnValue(of(mockVoucher));
    const settingServiceSpy = jest.spyOn(settingService, 'getRemoteFlagsSettings').mockReturnValue(of({}));

    component.ngOnChanges({
      voucherId: new SimpleChange(null, 1, true)
    });
    fixture.detectChanges();
    tick();
    expect(settingServiceSpy).toHaveBeenCalled();
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.voucher-name').textContent.trim()).toEqual(oc(mockVoucher).reward.name());
  }));
});
