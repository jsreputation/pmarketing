import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { QrcodeRedemptionComponent } from './qrcode-redemption.component';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from './../../config/config.module';
import { IVoucherService } from '../ivoucher.service';
import { of } from 'rxjs';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { Type, SimpleChange } from '@angular/core';
import { oc } from 'ts-optchain';
import { RedemptionType } from '../../perx-core.models';

describe('QrcodeRedemptionComponent', () => {
  let component: QrcodeRedemptionComponent;
  let fixture: ComponentFixture<QrcodeRedemptionComponent>;
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
    const voucherServiceSpy = spyOn(voucherService, 'get').and.returnValue(of(mockVoucher));
    component.ngOnChanges({
      voucherId: new SimpleChange(null, 1, true)
    });
    fixture.detectChanges();
    tick();
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.voucher-name').textContent.trim()).toEqual(oc(mockVoucher).reward.name());
  }));
});
