import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4LoyaltyService } from './v4-loyalty.service';

import { ConfigModule } from '../config/config.module';
import { TransactionDetailType } from './models/loyalty.model';
import { IV4Reward } from '../rewards/v4-rewards.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
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
interface IV4GetLoyaltyResponse {
  data: IV4Loyalty;
  meta?: IV4Meta;
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
    expect(V4LoyaltyService.v4LoyaltyToLoyalty({
      id: 1,
      name: 'test',
      description: 'test',
      begins_at: '',
      current_membership_tier_id: 4,
      current_membership_tier_name: '',
      membership_number: '',
      points_balance: 3,
      points_balance_converted_to_currency: 1,
      points_currency: '10',
      points_to_currency_rate: 33,
      aging_points: [{ expiring_on_date: '1.1.1', points_expiring: 33 }]
    })).toBeTruthy();
    expect(V4LoyaltyService.v4PointHistoryToPointHistory({
      id: 1,
      points: 23,
      points_balance: 33,
      points_balance_converted_to_currency: 21,
      points_date: '1.1.1',
      properties: 3
    })).toBeTruthy();
    expect(V4LoyaltyService.v4TransactionHistoryToTransactionHistory({
      id: 1,
      name: 'test',
      identifier: 'test',
      transacted_at: new Date(),
      transaction_details: {
        type: TransactionDetailType.reward, data: {
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
    })).toBeTruthy();
    expect(V4LoyaltyService.v4TransactionHistoryToTransactionHistory({
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
    })).toBeTruthy();
  });

  it('getLoyalties', fakeAsync(inject([V4LoyaltyService, HttpClient],
    (loyaltyService: V4LoyaltyService, http: HttpClient) => {
      const spy = spyOn(V4LoyaltyService, 'v4LoyaltyToLoyalty');
      spyOn(http, 'get').and.returnValue(of({
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
      const spy = spyOn(V4LoyaltyService, 'v4LoyaltyToLoyalty');
      spyOn(http, 'get').and.returnValue(of({ data: { id: 1 } } as IV4GetLoyaltyResponse));
      loyaltyService.getLoyalty().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
