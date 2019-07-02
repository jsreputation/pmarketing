import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';

import { VouchersService } from './vouchers.service';
import { HttpClientModule } from '@angular/common/http';
import { VouchersModule } from './vouchers.module';
import { IVoucher } from './models/voucher.model';

describe('VouchersService', () => {
  let httpTestingController: HttpTestingController;
  let service: VouchersService;
  let mockVouchers = {
    data: [
      {
        id: 21,
        name: 'General Indoor Studio package @ $99',
        valid_to: '2020-01-31T15:59:00.000Z',
        valid_from: '2019-06-30T16:00:00.000Z',
        voucher_code: null,
        voucher_key: null,
        voucher_type: 'code',
        state: 'issued',
        given_by: null,
        given_to: null,
        given_date: null,
        issued_date: '2019-06-27T03:47:53.315Z',
        redemption_date: null,
        reservation_expires_at: null,
        redemption_type: {
          call_to_action: null,
          timer: 0,
          type: 'offline'
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
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
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

  it('should reddem the voucher', (done: DoneFn) => {
    service.redeemVoucher(1)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers/1/redeem');

    expect(req.request.method).toEqual('POST');

    req.flush(null);

    httpTestingController.verify();
  });

  it('should get the voucher detail by voucher id', (done: DoneFn) => {
    service.get(1)
      .subscribe((voucher: IVoucher) => {
        expect(voucher.id).toBe(1);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/vouchers/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockVouchers);

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

  it('should convert to IVoucher format', () => {
    const voucher = {

    };

    expect(VouchersService.voucherToVoucher(voucher)).toEqual({});
  });


});
