import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4LoyaltyService } from './v4-loyalty.service';

import { ConfigModule } from '../config/config.module';
import { TransactionDetailType } from './models/loyalty.model';
import { IV4Reward, IV4Tag } from '../rewards/v4-rewards.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ICustomProperties } from '../profile/profile.model';
interface IV4PointHistory {
  id: number;
  identifier?: string;
  name?: string;
  points: number;
  points_balance: number;
  points_balance_converted_to_currency: number;
  points_date: string;
  properties: {};
}

interface IV4TransactionHistory {
  id: number;
  name: string;
  identifier: string;
  transacted_at: Date;
  amount: number;
  transacted_cents?: number; // property will probably be removed
  properties: ICustomProperties;
  transaction_details: {
    type: TransactionDetailType;
    data: IV4PurchaseTransactionHistory | IV4RewardTransactionHistory;
  };
}
interface IV4RewardTransactionHistory {
  id: number;
  state: string;
  voucher_code?: string;
  reserved_expires_at?: Date;
  voucher_key?: string;
  voucher_expires_at: Date;
  user_account: {
    identifier: string;
  };
  reward: IV4Reward;
  redemption_location?: string;
  tags?: IV4Tag[];
}
interface IV4PurchaseTransactionHistory {
  id: number;
  user_account_id: number;
  updated_at: Date;
  transaction_type: string;
  amount: number;
  transaction_date: Date;
  currency: string;
  workflow_id?: number;
  created_at: Date;
  properties?: ICustomProperties;
  transaction_reference: string;
}
interface IV4AgingPoints {
  expiring_on_date?: string;
  points_expiring?: number;
}
interface IV4Loyalty {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at?: string;
  current_membership_tier_id: number;
  current_membership_tier_name: string;
  membership_number: string;
  points_balance: number;
  points_balance_converted_to_currency: number;
  points_currency: string;
  points_to_currency_rate: number;
  aging_points?: IV4AgingPoints[];
  tiers: any[];
  points_history?: IV4PointHistory[];
}

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}
interface IV4GetLoyaltiesResponse {
  data: IV4Loyalty[];
  meta?: IV4Meta;
}

const transactionRaw: IV4TransactionHistory = {
  id: 1,
  name: 'test',
  identifier: 'test',
  transacted_at: new Date(),
  transaction_details: {
    type: TransactionDetailType.transaction, data: {
      id: 1,
      state: '2',
      voucher_expires_at: new Date(),
      reward: {
        id: 1,
        name: 'test',
        description: 'test',
        subtitle: 'test',
        valid_from: new Date(),
        valid_to: new Date(),
        favourite: false
      } as IV4Reward,
      user_account: { identifier: '3' },
      user_account_id: 33
    }
  },
  amount: 30,
  properties: {}
};
const historyRaw: IV4PointHistory = {
  id: 1,
  points: 23,
  points_balance: 33,
  points_balance_converted_to_currency: 21,
  points_date: '1.1.1',
  properties: 3
};

const loyaltyRaw: IV4Loyalty = {
  id: 2,
  name: 'test',
  description: 'test',
  begins_at: 'test',
  ends_at: 'test',
  current_membership_tier_id: 21,
  current_membership_tier_name: 'test',
  membership_number: 'test',
  points_balance: 34,
  points_balance_converted_to_currency: 44,
  points_currency: 'test',
  points_to_currency_rate: 55,
  points_history: [{
    id: 1, points: 3,
    points_balance: 3,
    points_balance_converted_to_currency: 6,
    points_date: 'test',
    properties: {}
  }],
  tiers: [
    {
      id: 1,
      name: 'Bronze',
      attained: false,
      points_requirement: 0,
      points_difference: 0,
      points_difference_converted_to_currency: 0,
      multiplier_point: null,
      multiplier_points_to_currency_rate: null,
      images: [
        {
          url: 'https://perx-cdn.s3.amazonaws.com/merchant/membership_type/images/1/bronze-e19b0160-a4a3-4e10-ae3f-c6809b4e68b7.png',
          type: ''
        }
      ],
      tags: [],
      custom_fields: null
    },
    {
      id: 36,
      name: 'random',
      attained: false,
      points_requirement: 500,
      points_difference: 0,
      points_difference_converted_to_currency: 0,
      multiplier_point: null,
      multiplier_points_to_currency_rate: null,
      images: [],
      tags: [],
      custom_fields: null
    },
    {
      id: 37,
      name: 'Platinum',
      attained: true,
      points_requirement: 1000,
      points_difference: 0,
      points_difference_converted_to_currency: 0,
      multiplier_point: null,
      multiplier_points_to_currency_rate: null,
      images: [],
      tags: [],
      custom_fields: null
    },
    {
      id: 2,
      name: 'Silver',
      attained: false,
      points_requirement: 20000,
      points_difference: 10200,
      points_difference_converted_to_currency: 10200,
      multiplier_point: null,
      multiplier_points_to_currency_rate: null,
      images: [
        {
          url: 'https://perx-cdn.s3.amazonaws.com/merchant/membership_type/images/2/silver-e0cac38f-6dba-4dd2-af92-47b1b7891b1a.png',
          type: ''
        }
      ],
      tags: [],
      custom_fields: null
    },
    {
      id: 3,
      name: 'Gold',
      attained: false,
      points_requirement: 50000,
      points_difference: 40200,
      points_difference_converted_to_currency: 40200,
      multiplier_point: null,
      multiplier_points_to_currency_rate: null,
      images: [
        {
          url: 'https://perx-cdn.s3.amazonaws.com/merchant/membership_type/images/3/gold-8c758cfb-e318-4129-a28f-35c02d0d9b09.png',
          type: ''
        }
      ],
      tags: [],
      custom_fields: null
    }
  ]
};
describe('LoyaltyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4LoyaltyService = TestBed.get(V4LoyaltyService);
    expect(service).toBeTruthy();
  });

  it('should work with static method', () => {
    expect(V4LoyaltyService.v4LoyaltyToLoyalty(loyaltyRaw)).toBeTruthy();
    expect(V4LoyaltyService.v4PointHistoryToPointHistory(historyRaw)).toBeTruthy();
    const rewardTransaction = {
      ...transactionRaw,
      transaction_details: {
        ...transactionRaw.transaction_details,
        type: TransactionDetailType.reward
      }
    };
    expect(V4LoyaltyService.v4TransactionHistoryToTransactionHistory(rewardTransaction)).toBeTruthy();
    expect(V4LoyaltyService.v4TransactionHistoryToTransactionHistory(transactionRaw)).toBeTruthy();
    const voidTransaction = {
      ...transactionRaw,
      transaction_details: {
        type: TransactionDetailType.transaction, data: undefined
      }
    };
    // @ts-ignore
    expect(V4LoyaltyService.v4TransactionHistoryToTransactionHistory(voidTransaction)).toBeTruthy();
  });

  it('getLoyalties', fakeAsync(inject([V4LoyaltyService, HttpClient],
    (loyaltyService: V4LoyaltyService, http: HttpClient) => {
      const spy = jest.spyOn(V4LoyaltyService, 'v4LoyaltyToLoyalty');
      jest.spyOn(http, 'get').mockReturnValue(of({
        data: [{
          id: 1
        }]
      } as IV4GetLoyaltiesResponse));
      loyaltyService.getLoyalties().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('getLoyalty', fakeAsync(inject([V4LoyaltyService, HttpClient],
    (loyaltyService: V4LoyaltyService, http: HttpClient) => {
      const spy = jest.spyOn(V4LoyaltyService, 'v4LoyaltyToLoyalty');
      jest.spyOn(http, 'get').mockReturnValue(of({
        data: [{
          id: 1
        }]
      } as IV4GetLoyaltiesResponse));
      // called without args
      loyaltyService.getLoyalty().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should get all transactions', fakeAsync(inject([V4LoyaltyService, HttpClient],
    (loyaltyService: V4LoyaltyService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({ data: loyaltyRaw }));
      loyaltyService.getAllTransactions().subscribe(() => { });
      tick();
      loyaltyService.getTransactions(1).subscribe(() => { });
      tick();
      spy.mockReturnValue(of({ data: loyaltyRaw, meta: { historyMeta: 'test', total_pages: 3 } }));
      loyaltyService.getAllTransactions().subscribe((val) => expect(val[0].id).toBe(1));
      tick();
    })));

  it('should get transaction history', fakeAsync(inject([V4LoyaltyService, HttpClient],
    (loyaltyService: V4LoyaltyService, http: HttpClient) => {
      jest.spyOn(http, 'get').mockReturnValue(of({ data: [transactionRaw] }));
      loyaltyService.getTransactionHistory().subscribe((val) => expect(val[0].id));
      tick();
    })));
});
