import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4StampService } from './v4-stamp.service';

import { IVoucherService } from '../vouchers/ivoucher.service';
import { ConfigModule } from '../config/config.module';

describe('StampService', () => {
  const vouchersServiceStub: Partial<IVoucherService> = {};
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: IVoucherService, useValue: vouchersServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: V4StampService = TestBed.get(V4StampService);
    expect(service).toBeTruthy();
  });
});
