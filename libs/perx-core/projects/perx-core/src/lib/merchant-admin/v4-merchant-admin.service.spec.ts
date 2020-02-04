import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { V4MerchantAdminService } from './v4-merchant-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { RedemptionType } from '../perx-core.models';
import { IV4Reward } from '../rewards/v4-rewards.service';
import { VoucherState } from '../vouchers/models/voucher.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

interface IV4MerchantAdminTransaction {
  id: number;
  user_account_id: number;
  updated_at: string;
  transaction_type: string;
  amount: number;
  transaction_date: string;
  currency: string;
  workflow_id?: number | null;
  created_at: string;
  properties?: string | null;
  transaction_reference: string;
}

interface IV4MerchantAdminVoucher {
  custom_fields: any;
  given_by: any;
  given_date: any;
  given_to: any;
  id: number;
  issued_date: string;
  name: string;
  redemption_date: any;
  redemption_type: RedemptionType | {
    call_to_action: any;
    timer: any;
    type: RedemptionType | null;
  };
  reservation_expires_at: any;
  reward?: IV4Reward;
  state: VoucherState;
  valid_from: string;
  valid_to: string;
  voucher_code: any;
  voucher_key: any;
  voucher_type: RedemptionType;
  redemption_image?: any;
  redemption_text?: any;
}
interface IV4MerchantProfile {
  id: number;
  email: string;
  username: string;
  mobile: string;
  location_id: number;
  merchant_account_id: number;
  merchant_account: {
    id: number;
    customer_id: number | null;
    name: string;
    state: string;
    logo: string | null;
    url: string | null;
    type: string | null;
    favourite: string | null;
    is_featured: boolean;
    tags: IV4MerchantTag[];
  };
  created_at: Date;
  updated_at: Date;
  password_changed_at: Date;
  state: string;
}
interface IV4MerchantTag {
  id: number;
  name: string;
}
const adminTransactionRaw: IV4MerchantAdminTransaction = {
  id: 1,
  user_account_id: 2,
  updated_at: '22.02.12',
  transaction_type: 'test',
  amount: 23,
  transaction_date: '23.02.12',
  created_at: 'test',
  currency: 'test',
  transaction_reference: 'test'
};
const merchantAdminVoucherRaw: IV4MerchantAdminVoucher = {
  custom_fields: 'test',
  given_by: 'test',
  given_date: 'test',
  given_to: 'test',
  id: 1,
  issued_date: 'test',
  name: 'test',
  redemption_date: 'test',
  redemption_type: RedemptionType.txtCode,
  reservation_expires_at: 'test',
  state: VoucherState.issued,
  valid_from: 'test',
  valid_to: 'test',
  voucher_code: 'test',
  voucher_key: 'test',
  voucher_type: RedemptionType.txtCode
};
const profileRaw: IV4MerchantProfile = {
  id: 1,
  email: 'test',
  username: 'test',
  mobile: 'test',
  location_id: 1,
  merchant_account_id: 1,
  merchant_account: {
    id: 1,
    customer_id: 1,
    name: 'test',
    state: 'test',
    logo: 'test',
    url: 'test',
    type: 'test',
    favourite: 'test',
    is_featured: true,
    tags: [{
      id: 1,
      name: 'test'
    }]
  },
  created_at: new Date(),
  updated_at: new Date(),
  password_changed_at: new Date(),
  state: 'test'
};

const reward: IV4Reward = {
  id: 1,
  name: 'test',
  description: 'test',
  subtitle: 'test',
  valid_from: new Date(),
  valid_to: new Date(),
  favourite: false,
  reward_price: [],
  images: [],
  merchant_id: 2,
  merchant_name: 'test',
  merchant_website: 'test',
  terms_and_conditions: 'test',
  how_to_redeem: 'test',
  tags: [],
  category_tags: [],
  inventory: { reward_limit_per_user: 1, reward_limit_per_user_balance: null },
  selling_from: 'test',
  merchant_logo_url: 'test',
  display_properties: undefined,
};

describe('V4MerchantsService', () => {
  let service: V4MerchantAdminService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));
  beforeEach(() => {
    service = TestBed.get(V4MerchantAdminService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle static method', () => {
    expect(V4MerchantAdminService.v4TransactionToTransaction(adminTransactionRaw)).toBeTruthy();
    expect(V4MerchantAdminService.v4VoucherToVoucher(merchantAdminVoucherRaw)).toBeTruthy();
    expect(V4MerchantAdminService.v4MerchantProfileToMerchantProfile(profileRaw)).toBeTruthy();
    expect(V4MerchantAdminService.v4VoucherToVoucher({
      ...merchantAdminVoucherRaw,
      reward,
      redemption_date: null
    })).toBeTruthy();
  });

  it('createTransaction', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    jest.spyOn(http, 'post').mockReturnValue(of({ data: adminTransactionRaw }));
    service.createTransaction(1, 'test', 2, 'test', 'test', 'test', 'test', 'test')
      .subscribe((val) => expect(val.id).toBe(1));
    tick();
  })));

  it('redeemVoucher', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    const spy = jest.spyOn(V4MerchantAdminService, 'v4VoucherToVoucher');
    jest.spyOn(http, 'put').mockReturnValue(of({ data: merchantAdminVoucherRaw }));
    service.redeemVoucher(1).subscribe(() => { });
    tick();
    expect(spy).toHaveBeenCalled();
  })));

  it('issueVoucher', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    jest.spyOn(http, 'post').mockReturnValue(of({ data: merchantAdminVoucherRaw }));
    service.issueVoucher(1).subscribe((voucher) => expect(voucher.id).toBe(1));
    tick();
  })));

  it('validateInvite', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    jest.spyOn(http, 'get').mockReturnValue(of({ data: profileRaw }));
    service.validateInvite('token', 'test').subscribe((val) =>
      expect(val.locationId).toBe(1)
    );
    tick();
  })));

  it('setupNewMerchantsPassword', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    jest.spyOn(http, 'put').mockReturnValue(of({ message: 'ok' }));
    service.setupNewMerchantsPassword('token', '1', 'test')
      .subscribe((val) => expect(val).toBe('ok'));
    tick();
  })));

  it('getMerchantProfile', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    jest.spyOn(http, 'get').mockReturnValue(of({ data: profileRaw }));
    service.getMerchantProfile().subscribe((val) =>
      expect(val.locationId).toBe(1)
    );
    tick();
  })));
});
