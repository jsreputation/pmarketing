import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IV4Voucher, V4VouchersService } from './v4-vouchers.service';
import { VouchersModule } from './vouchers.module';
import { IVoucher, VoucherState, RedemptionType } from './models/voucher.model';

import { ConfigModule } from '../../public-api';

describe('VouchersService', () => {
  let httpTestingController: HttpTestingController;
  let service: V4VouchersService;

  const mockIVouchers: IVoucher[] = [
    {
      id: 21,
      reward: {
        id: 21,
        name: '',
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
        redemptionType: null,
        categoryTags: [],
        inventory: null,
      },
      state: VoucherState.issued,
      code: null,
      expiry: new Date('Fri Jan 31 2020 23:59:00 GMT+0800 (Philippine Standard Time)'),
    }
  ];
  const mockVoucherDetail: IV4Voucher = {
    id: 21,
    name: 'General Indoor Studio package @ $99',
    valid_to: '2020-01-31T15:59:00.000Z',
    valid_from: '2019-06-30T16:00:00.000Z',
    voucher_code: null,
    voucher_key: null,
    voucher_type: RedemptionType.txtCode,
    state: VoucherState.issued,
    given_by: null,
    given_to: null,
    given_date: null,
    issued_date: '2019-06-27T03:47:53.315Z',
    redemption_date: null,
    reservation_expires_at: null,
    redemption_type: {
      call_to_action: null,
      timer: 0,
      type: RedemptionType.pin
    },
    reward: {
      id: 5,
      name: 'General Indoor Studio package @ $99',
      description: 'Please visit',
      favourite: false,
      merchant_id: 5,
      merchant_name: 'Lumiere Photography',
      merchant_website: 'https://www.lumierephotographysg.com',
      subtitle: null,
      valid_from: new Date('2019-06-30T16:00:00'),
      valid_to: new Date('2020-01-31T15:59:00'),
      selling_from: '2019-06-23T16:00:00.000Z',
      images: [
        {
          url: 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-20fba3c8-62be-4ef2-8684-47cd953d0eba.png',
          type: 'reward_banner'
        },
        {
          url: 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-2-c8aff1cc-d802-43d1-931a-a730616e360b.png',
          type: 'reward_thumbnail'
        }
      ],
      inventory: {
        reward_total_limit: null,
        reward_total_balance: null,
        reward_limit_per_user: null,
        reward_limit_per_user_balance: null,
      },
      reward_price: [],
      terms_and_conditions: 'Up to 5 pax',
      tags: [],
      category_tags: []
    },
    custom_fields: {}
  };
  const mockVoucher = {
    data: mockVoucherDetail
  };
  const mockVouchers = {
    data: [
      mockVoucherDetail
    ],
    meta: {
      count: 13,
      size: 10,
      page: 0,
      total_pages: 1,
      order: null,
      type: null
    }
  };

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        VouchersModule,
        ConfigModule.forRoot({...environment})
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(V4VouchersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redeem the voucher', (done: DoneFn) => {
    service.redeemVoucher(21)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers/21/redeem');

    expect(req.request.method).toEqual('POST');

    req.flush(null);

    httpTestingController.verify();
  });

  it('should get the voucher detail by voucher id', (done: DoneFn) => {
    service.get(21)
      .subscribe((updateVoucher: IVoucher) => {
        expect(updateVoucher.id).toEqual(21);
        expect(updateVoucher.state).toEqual('issued');
        expect(updateVoucher.code).toEqual(null);
        expect(updateVoucher.redemptionDate).toEqual(null);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers/21');

    expect(req.request.method).toEqual('GET');

    req.flush(mockVoucher);

    httpTestingController.verify();
  });

  it('should get the voucher detail by voucher id from existing cache', (done: DoneFn) => {
    service.reset(mockIVouchers);
    service.get(21)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    httpTestingController.expectNone('https://api.perxtech.io/v4/vouchers/21');

    httpTestingController.verify();
  });

  it('should get the all vouchers detail', (done: DoneFn) => {
    service.getAll()
      .subscribe((vouchers: IVoucher[]) => {
        expect(vouchers.length).toBe(1);
        done();
      });

    // tslint:disable-next-line:max-line-length
    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers?redeemed_within=-1&expired_within=-1&sort_by=id&order=desc');

    expect(req.request.method).toEqual('GET');

    req.flush(mockVouchers);

    httpTestingController.verify();
  });

  it('should get the all vouchers detail from existing cache', (done: DoneFn) => {
    service.reset(mockIVouchers);
    service.getAll()
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    httpTestingController.expectNone('https://api.perxtech.io/v4/vouchers?redeemed_within=-1&expired_within=-1&sort_by=id&order=desc');

    httpTestingController.verify();
  });

  it('should get the all vouchers detail for page with certain page number', (done: DoneFn) => {
    const page = 2;
    service.getAllFromPage(page)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController
      .expectOne('https://api.perxtech.io/v4/vouchers?redeemed_within=-1&expired_within=-1&page=2&sort_by=id&order=desc');

    expect(req.request.method).toEqual('GET');

    req.flush({});

    httpTestingController.verify();
  });

  it('should convert to IVoucher format', () => {
    const voucher: IV4Voucher = mockVouchers.data[0];
    const updateVoucher = V4VouchersService.v4VoucherToVoucher(voucher);
    expect(updateVoucher.id).toEqual(21);
    expect(updateVoucher.state).toEqual('issued');
    expect(updateVoucher.code).toEqual(null);
    expect(updateVoucher.redemptionDate).toEqual(null);
  });

});
