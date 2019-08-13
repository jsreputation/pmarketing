import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';

import { VouchersService } from './vouchers.service';
import { VouchersModule } from './vouchers.module';
import { IVoucher, VoucherState, RedemptionType } from './models/voucher.model';

describe('VouchersService', () => {
  let httpTestingController: HttpTestingController;
  let service: VouchersService;

  const mockIVouchers: IVoucher[] = [
    {
      id: 21,
      rewardId: 5,
      state: VoucherState.issued,
      name: 'General Indoor Studio package @ $99',
      code: null,
      redemptionType: RedemptionType.pin,
      thumbnailImg: 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-2-c8aff1cc-d802-43d1-931a-a730616e360b.png',
      rewardBanner: 'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-20fba3c8-62be-4ef2-8684-47cd953d0eba.png',
      merchantImg: null,
      merchantName: 'Lumiere Photography',
      expiry: new Date('Fri Jan 31 2020 23:59:00 GMT+0800 (Philippine Standard Time)'),
      redemptionDate: null,
      description: [{
        title: 'Please visit',
        content: '',
        tag: []
      }],
      redemptionSuccessTxt: null,
      redemptionSuccessImg: null
    }
  ];
  const mockVoucherDetail = {
    id: 21,
    name: 'General Indoor Studio package @ $99',
    valid_to: '2020-01-31T15:59:00.000Z',
    valid_from: '2019-06-30T16:00:00.000Z',
    voucher_code: null,
    voucher_key: null,
    voucher_type: 'code',
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
      alt_merchant_name: null,
      alt_merchant_website: null,
      alt_merchant_text: null,
      ecommerce_only: false,
      brands: [],
      subtitle: null,
      valid_from: '2019-06-30T16:00:00.000Z',
      valid_to: '2020-01-31T15:59:00.000Z',
      selling_from: '2019-06-23T16:00:00.000Z',
      selling_to: '2020-01-31T15:59:00.000Z',
      eligible: true,
      distance: {
        value: null,
        unit_of_measure: 'meter'
      },
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
        minutes_per_period: null,
        period_start: null,
        reward_limit_per_period: null,
        reward_limit_per_period_balance: null,
        reward_limit_per_user: null,
        reward_limit_per_user_balance: null,
        minutes_per_user_per_period: null,
        per_user_period_start: null,
        reward_limit_per_user_per_period: null,
        reward_limit_per_user_period_balance: null
      },
      reward_price: [
        {
          reward_currency: 'MYR',
          reward_amount: '0.0'
        }
      ],
      custom_fields: {},
      terms_and_conditions: 'Up to 5 pax',
      loyalty: [],
      social_handlers: {
        facebook: null,
        twitter: null
      },
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        VouchersModule.forRoot({ env: { apiHost: 'https://api.perxtech.io' } }),
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(VouchersService);
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
        expect(updateVoucher.rewardId).toEqual(5);
        expect(updateVoucher.state).toEqual('issued');
        expect(updateVoucher.name).toEqual('General Indoor Studio package @ $99');
        expect(updateVoucher.code).toEqual(null);
        expect(updateVoucher.description[0].content).toEqual('Please visit');
        expect(updateVoucher.thumbnailImg).toEqual(
          'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-2-c8aff1cc-d802-43d1-931a-a730616e360b.png');
        expect(updateVoucher.rewardBanner).toEqual(
          'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-20fba3c8-62be-4ef2-8684-47cd953d0eba.png');
        expect(updateVoucher.redemptionDate).toEqual(null);
        expect(updateVoucher.merchantName).toEqual('Lumiere Photography');
        expect(updateVoucher.merchantImg).toEqual(null);
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

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers?redeemed_within=-1&expired_within=-1');

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

    httpTestingController.expectNone('https://api.perxtech.io/v4/vouchers?redeemed_within=-1&expired_within=-1');

    httpTestingController.verify();
  });

  it('should get the all vouchers detail for page with certain page number', (done: DoneFn) => {
    const page = 2;
    service.getAllFromPage(page)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers?redeemed_within=-1&expired_within=-1&page=2');

    expect(req.request.method).toEqual('GET');

    req.flush({});

    httpTestingController.verify();
  });

  it('should convert to IVoucher format', () => {
    const voucher = mockVouchers.data[0];
    const updateVoucher = VouchersService.voucherToVoucher(voucher);
    expect(updateVoucher.id).toEqual(21);
    expect(updateVoucher.rewardId).toEqual(5);
    expect(updateVoucher.state).toEqual('issued');
    expect(updateVoucher.name).toEqual('General Indoor Studio package @ $99');
    expect(updateVoucher.code).toEqual(null);
    expect(updateVoucher.description[0].content).toEqual('Please visit');
    expect(updateVoucher.thumbnailImg).toEqual(
      'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-2-c8aff1cc-d802-43d1-931a-a730616e360b.png');
    expect(updateVoucher.rewardBanner).toEqual(
      'https://perx-cdn-staging.s3.amazonaws.com/reward/item/images/5/mask-group-20fba3c8-62be-4ef2-8684-47cd953d0eba.png');
    expect(updateVoucher.redemptionDate).toEqual(null);
    expect(updateVoucher.merchantName).toEqual('Lumiere Photography');
    expect(updateVoucher.merchantImg).toEqual(null);
  });

});
