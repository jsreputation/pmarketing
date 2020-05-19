import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4StampService } from './v4-stamp.service';

import { IVoucherService } from '../vouchers/ivoucher.service';
import { ConfigModule } from '../config/config.module';
import { ICampaignService } from '../campaign/icampaign.service';

describe('V4StampService', () => {
  const vouchersServiceStub: Partial<IVoucherService> = {};
  const campaignServiceStub: Partial<ICampaignService> = {};
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: IVoucherService, useValue: vouchersServiceStub },
      { provide: ICampaignService, useValue: campaignServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: V4StampService = TestBed.get(V4StampService);
    expect(service).toBeTruthy();
  });
});
