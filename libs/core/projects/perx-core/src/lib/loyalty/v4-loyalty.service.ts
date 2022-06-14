import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable, of, } from 'rxjs';
import { concatAll, map, mergeMap, reduce } from 'rxjs/operators';
import { oc } from 'ts-optchain';

import { LoyaltyService } from './loyalty.service';
import {
  ICampaignTransactionHistory,
  IExchangerate,
  ILeaderBoardTransactionHistory,
  ILoyalty,
  ILoyaltyTransaction,
  ILoyaltyTransactionHistory,
  IPointTransfer,
  IPurchaseTransactionHistory,
  IRewardTransactionHistory,
  IRuleTransactionHistory,
  TransactionDetailType
} from './models/loyalty.model';

import { IV4Reward } from '../rewards/v4-rewards.service';
import { ICustomProperties } from '../profile/profile.model';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Cacheable } from 'ngx-cacheable';
import {
  V4TenantTransactionProperties,
  V4TransactionsService
} from '../transactions/transaction-service/v4-transactions.service';
import { IV4Campaign, IV4PointsOutcome } from '../campaign/v4-campaign.service';
import { ITag } from '../merchants/models/merchants.model';
import { V4LeaderBoard } from '../rank/v4-rank.service';

const DEFAULT_PAGE_COUNT: number = 10;

interface IV4Image {
  type: string;
  url: string;
  section: string;
}

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4AgingPoints {
  expiring_on_date?: string;
  points_expiring?: number;
}

interface IV4LoyaltyTiers {
  id: number;
  name: string;
  attained: boolean;
  points_requirement: number;
  points_difference: number;
  points_difference_converted_to_currency?: number;
  multiplier_point?: number;
  multiplier_points_to_currency_rate?: number;
  images?: IV4Image[];
  tags?: ITag[];
  custom_fields?: ICustomProperties[];
}

export interface IV4Loyalty {
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
  aging_points?: IV4AgingPoints[]; // todo: deprecated in favour of points_expiry
  points_expiry?: IV4AgingPoints;
  tiers: IV4LoyaltyTiers[]; // will do proper mapping later on
  points_history?: IV4PointHistory[];
  membership_expiry: Date;
  membership_state?: 'active' | 'pending' | 'inactive' | 'expire';
  images?: IV4Image[];
  tier_points?: number;
}

interface IV4ExchangeRate {
  id: number;
  destination_amount: number;
  destination_stored_value_campaign_ends_at: Date;
  destination_stored_value_campaign_id: number;
  destination_stored_value_campaign_name: string;
  source_amount: number;
  source_stored_value_campaign_ends_at: Date;
  source_stored_value_campaign_id: number;
  source_stored_value_campaign_name: string;
}

export interface IV4GetLoyaltiesResponse {
  data: IV4Loyalty[];
  meta?: IV4Meta;
}

interface IV4GetExchangeRatesResponse {
  data: IV4ExchangeRate[];
  meta?: IV4Meta;
}

interface IV4GetLoyaltyResponse {
  data: IV4Loyalty;
  meta?: IV4Meta;
}

interface IV4PointHistory {
  id: number;
  identifier?: string;
  loyalty_name?: string;
  name?: string;
  points: number;
  points_balance: number;
  points_balance_converted_to_currency: number;
  points_date: string;
  properties: {
    descr?: string;
    sku?: string;
    qty?: string;
    untprc?: string;
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
  tags?: ITag[];
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
  properties?: ICustomProperties | V4TenantTransactionProperties;
  transaction_reference: string;
}

interface IV4CampaignTransactionHistory {
  id: number;
  campaign: IV4Campaign;
}

interface IV4LeaderboardTransactionHistory {
  id: number;
  leaderboard: V4LeaderBoard;
}

interface IV4RuleTransactionHistory {
  id: number;
  name: string;
}

interface IV4LoyaltyTransactionPropertiesHistory {
  id: number;
  name: string;
  identifier: string;
  loyalty_name?: string;
  transacted_at: Date;
  amount: number;
  transacted_cents?: number; // property will probably be removed
  properties: ICustomProperties | V4TenantTransactionProperties;
  transaction_details: {
    type: TransactionDetailType;
    data: IV4PurchaseTransactionHistory | IV4RewardTransactionHistory | IV4CampaignTransactionHistory
     | IV4LeaderboardTransactionHistory | IV4RuleTransactionHistory;
  };
}

interface IV4LoyaltyTransactionPropertiesHistoryResponse {
  data: IV4LoyaltyTransactionPropertiesHistory[];
}

interface IV4PointTransferResponse {
  data: IV4PointsOutcome;
  meta: IV4Meta;
}

@Injectable({
  providedIn: 'root'
})
export class V4LoyaltyService extends LoyaltyService {
  private apiHost: string;
  private historyMeta: IV4Meta = {};

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  public static v4LoyaltyToLoyalty(loyalty: IV4Loyalty): ILoyalty {
    const copiedLoyalty: IV4Loyalty = { ...loyalty };
    let nextTier;
    let highestTierData;
    let highestTier;
    let highestPoints;
    // they are in order, find the first one points_rqmt
    if (copiedLoyalty.tiers && copiedLoyalty.tiers.length > 0) { // sort for extra assurance
      nextTier = copiedLoyalty.tiers
        .sort((tier1, tier2) => tier1.points_difference - tier2.points_difference)
        .find(tier => tier.points_difference > 0);
      // will improve > later on , name diff var to avoid linting shadowed var
      highestPoints = Math.max(...copiedLoyalty.tiers.map(tier2 => tier2.points_requirement));
      highestTierData = copiedLoyalty.tiers.find(tier3 => tier3.points_requirement === highestPoints);
      highestTier = highestTierData ? highestTierData.name : undefined;
    }
    const thumbnailImage = loyalty.images &&
      loyalty.images.find((image: IV4Image) => image.section === 'loyalty_thumbnail');

    return {
      id: loyalty.id,
      name: loyalty.name,
      description: loyalty.description,
      beginDate: loyalty.begins_at,
      endDate: loyalty.ends_at,
      membershipTierName: loyalty.current_membership_tier_name,
      membershipIdentifier: loyalty.membership_number,
      pointsBalance: loyalty.points_balance,
      currencyBalance: loyalty.points_balance_converted_to_currency,
      pointsToCurrencyRate: loyalty.points_to_currency_rate,
      currency: loyalty.points_currency,
      nextTierPoints: nextTier ? nextTier.points_requirement : 0,
      nextTierPointsDiff: nextTier ? nextTier.points_difference : 0,
      nextTierName: nextTier ? nextTier.name : '',
      tierPoints: loyalty.tier_points,
      highestTier,
      expiringPoints: loyalty.aging_points ?
        loyalty.aging_points.map(aging => ({
          expireDate: aging.expiring_on_date,
          points: aging.points_expiring
        })) : loyalty.points_expiry ?
          [{
            expireDate: loyalty.points_expiry.expiring_on_date,
            points: loyalty.points_expiry.points_expiring
          }] : undefined,
      membershipExpiry: loyalty.membership_expiry,
      tiers: loyalty.tiers ? loyalty.tiers.map(tier => ({
        id: tier.id,
        name: tier.name,
        attained: tier.attained,
        pointsRequirement: tier.points_requirement,
        pointsDifference: tier.points_difference,
        images: tier.images
      })) : undefined,
      membershipState: loyalty.membership_state,
      images: {
        thumbnailUrl: oc(thumbnailImage).url()
      }
    };
  }

  public static v4ExchangeRateToExchangerate(exchangeRate: IV4ExchangeRate): IExchangerate {
    return {
      id: exchangeRate.id,
      destinationAmount: exchangeRate.destination_amount,
      destinationCampaignEndsAt: exchangeRate.destination_stored_value_campaign_ends_at,
      destinationCampaignId: exchangeRate.destination_stored_value_campaign_id,
      destinationCampaignName: exchangeRate.destination_stored_value_campaign_name,
      sourceAmount: exchangeRate.source_amount,
      sourceCampaignEndsAt: exchangeRate.source_stored_value_campaign_ends_at,
      sourceCampaignId: exchangeRate.source_stored_value_campaign_id,
      sourceCampaignName: exchangeRate.source_stored_value_campaign_name
    };
  }

  public static v4PointHistoryToPointHistory(pointHistory: IV4PointHistory): ILoyaltyTransaction {
    const properties = pointHistory.properties;
    return {
      id: pointHistory.id,
      name: pointHistory.name || properties.descr,
      sku: properties.sku,
      quantity: properties.qty,
      purchaseAmount: properties.untprc,
      points: pointHistory.points,
      pointsBalance: pointHistory.points_balance,
      currencyBalance: pointHistory.points_balance_converted_to_currency,
      earnedDate: pointHistory.points_date,
      properties: pointHistory.properties,
      loyaltyName: pointHistory.loyalty_name
    };
  }

  private static buildLoyaltyIdentifier(amount: number): string {
    // VS-6377: temp. get BE to investigate and pass identifier for point transfer transactions
    return amount > 0 ? 'Points Earned' : 'Points Spent';
  }

  public static v4TransactionHistoryToTransactionHistory(
    transactionHistory: IV4LoyaltyTransactionPropertiesHistory
  ): ILoyaltyTransactionHistory {
    const transactionDetails = oc(transactionHistory).transaction_details.data();
    let data: IPurchaseTransactionHistory | IRewardTransactionHistory | ICampaignTransactionHistory |
      ILeaderBoardTransactionHistory | IRuleTransactionHistory | undefined;

    if (transactionDetails) {
      switch (transactionHistory.transaction_details.type) {
        case TransactionDetailType.reward:
          const rthDetails = transactionDetails as IV4RewardTransactionHistory;
          data = {
            id: transactionDetails.id,
            state: rthDetails.state,
            voucherExpiry: rthDetails.voucher_expires_at,
            userAccount: rthDetails.user_account.identifier,
            rewardName: rthDetails.reward.name,
            redemptionLocation: rthDetails.redemption_location,
          };
          break;
        case TransactionDetailType.transaction:
          const pthDetails = transactionDetails as IV4PurchaseTransactionHistory;
          // todo: microsites will handling mapping tenant specific properties temporarily
          const pthProps = oc(pthDetails).properties() as {
            merchant_username: string;
            pharmacy: string;
            product: string;
          };
          data = {
            id: transactionDetails.id,
            productName: oc(pthProps).product(),
            pharmacyName: oc(pthProps).pharmacy(),
            issuerName: oc(pthProps).merchant_username(),
            transactionDate: pthDetails.transaction_date,
            transactionRef: pthDetails.transaction_reference,
            price: pthDetails.amount,
            currency: pthDetails.currency,
          };
          data.properties = V4TransactionsService.v4TransactionPropertiesToTransactionProperties(pthProps as V4TenantTransactionProperties);
          break;
        case TransactionDetailType.stamp:
        case TransactionDetailType.game:
        case TransactionDetailType.quest:
        case TransactionDetailType.progressCampaign:
        case TransactionDetailType.instantOutcomeCampaign:
          const campaignDetails = transactionDetails as IV4CampaignTransactionHistory;
          data = {
            id: transactionDetails.id,
            campaignName: campaignDetails.campaign?.name
          };
          break;
        case TransactionDetailType.dashboard:
          // assume it is a customer service action from dashboard
          data = {
            id: transactionHistory.id,
            properties: {
              productName: 'Customer Service Transaction'
            }
          };
          break;
        case TransactionDetailType.user:
          data = {
            id: transactionHistory.id,
            properties: {
              productName: 'Membership Extended' // todo: when more use-cases arise for user initiated txn's, identify using unique properties
            }
          };
          break;
        case TransactionDetailType.leaderboard:
          const leaderboardDetails = transactionDetails as IV4LeaderboardTransactionHistory;
          data = {
            id: transactionDetails.id,
            leaderboardName: leaderboardDetails.leaderboard?.name
          };
          break;
        case TransactionDetailType.rule:

          const ruleDetails = transactionDetails as IV4RuleTransactionHistory;
          data = {
            id: transactionHistory.id,
            ruleName: ruleDetails.name
          };
          break;
      }
      // } else if (transactionHistory.name === 'POS Update') { // hard-coded reason code from backend for POS transactions
    } else if (Object.keys(transactionHistory.properties).length > 0) {
      // all-it transaction currently have no data in transaction_details assume it is a purchase.
      const thProps = transactionHistory.properties;
      data = {
        id: transactionHistory.id
      };

      data.properties = V4TransactionsService.v4TransactionPropertiesToTransactionProperties(thProps as V4TenantTransactionProperties);
    } else {
      // make it the same as TransactionDetailType.dashboard
      data = {
        id: transactionHistory.id
      };

      // default blackcomb page is currently using productName as the default title
      data.properties = {
        productName: 'Customer Service Transaction'
      };
    }
    return {
      id: transactionHistory.id,
      name: transactionHistory.name,
      identifier: transactionHistory.identifier ?
        transactionHistory.identifier : V4LoyaltyService.buildLoyaltyIdentifier(transactionHistory.amount),
      transactedAt: transactionHistory.transacted_at,
      pointsAmount: transactionHistory.amount,
      properties: transactionHistory.properties as ICustomProperties,
      transactionDetails: {
        type: oc(transactionHistory).transaction_details.type(),
        data
      },
      loyaltyName: transactionHistory.loyalty_name
    };
  }

  @Cacheable({
    maxAge: 300000 // 5 minutes
  })
  public getLoyalties(page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT, locale: string = 'en'): Observable<ILoyalty[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4GetLoyaltiesResponse>(
      `${this.apiHost}/v4/loyalty`,
      {
        headers,
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetLoyaltiesResponse) => res.data),
      map((loyalties: IV4Loyalty[]) => loyalties.map(
        (loyalty: IV4Loyalty) => V4LoyaltyService.v4LoyaltyToLoyalty(loyalty)
      ))
    );
  }

  public getLoyaltyExchangerates(
    sourceLoyaltyId: number, page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT): Observable<IExchangerate[]> {
    return this.http.get<IV4GetExchangeRatesResponse>(
      `${this.apiHost}/v4/loyalty/${sourceLoyaltyId}/exchange_rates`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetExchangeRatesResponse) => res.data),
      map((loyalties: IV4ExchangeRate[]) => loyalties.map(
        (loyalty: IV4ExchangeRate) => V4LoyaltyService.v4ExchangeRateToExchangerate(loyalty)
      ))
    );
  }

  public getLoyalty(id?: number, locale: string = 'en'): Observable<ILoyalty> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    if (id !== undefined) {
      return this.http.get<IV4GetLoyaltyResponse>(
        `${this.apiHost}/v4/loyalty/${id}`,
        {
          headers
        }
      ).pipe(
        map((res: IV4GetLoyaltyResponse) => V4LoyaltyService.v4LoyaltyToLoyalty(res.data))
      );
    }
    return this.getLoyalties()
      .pipe(
        map((loyalties: ILoyalty[]) => loyalties.filter((loyalty) => loyalty.membershipState === 'active')[0])
      );
  }

  public getAllTransactions(loyaltyId: number = 1, locale: string = 'en'): Observable<ILoyaltyTransaction[]> {
    const pageSize = 100;
    return this.getTransactions(loyaltyId, 1, pageSize, locale).pipe(
      mergeMap((histories: ILoyaltyTransaction[]) => {
        const streams = [
          of(histories)
        ];
        for (let i = 2; i <= ((this.historyMeta && this.historyMeta.total_pages) ? this.historyMeta.total_pages : 0); i++) {
          const stream = this.getTransactions((loyaltyId), i, pageSize);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: ILoyaltyTransaction[], curr: ILoyaltyTransaction[]) => acc.concat(curr), [])
    );
  }

  public getTransactions(
    loyaltyId: number,
    page: number = 1,
    pageSize: number = 10,
    locale: string = 'en'
  ): Observable<ILoyaltyTransaction[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4GetLoyaltyResponse>(
      `${this.apiHost}/v4/loyalty/${loyaltyId}/transactions`,
      {
        headers,
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetLoyaltyResponse) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }
        return res.data;
      }),
      map((loyalty: IV4Loyalty) => oc(loyalty).points_history([]).map(
        (history: IV4PointHistory) => V4LoyaltyService.v4PointHistoryToPointHistory(history)
      ))
    );
  }

  /**
   * @param sortBy - ['transacted_at' | 'id']
   * @param orderBy - [ 'asc' | 'desc' ]
   */
  public getTransactionHistory(
    page: number = 1,
    pageSize: number = 10,
    locale: string = 'en',
    sortBy: string = 'transacted_at',
    orderBy: string = 'desc'
  ): Observable<ILoyaltyTransactionHistory[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4LoyaltyTransactionPropertiesHistoryResponse>(
      `${this.apiHost}/v4/loyalty/transactions_history`,
      {
        headers,
        params: {
          page: `${page}`,
          size: `${pageSize}`,
          sort_by: `${sortBy}`,
          order_by: `${orderBy}`
        }
      }
    ).pipe(
      map((res: IV4LoyaltyTransactionPropertiesHistoryResponse) => res.data),
      map((transactionHistories: IV4LoyaltyTransactionPropertiesHistory[]) => transactionHistories.map(
        (transactionHistory: IV4LoyaltyTransactionPropertiesHistory) =>
          V4LoyaltyService.v4TransactionHistoryToTransactionHistory(transactionHistory)
      ))
    );
  }

  public tansferPoints(pointTransfer: IPointTransfer): Observable<IV4PointsOutcome> {
    const payload = {
      amount: pointTransfer.amount,
      source_loyalty_id: pointTransfer.sourceId,
      destination_loyalty_id: pointTransfer.destinationId
    };
    return this.http.post<IV4PointTransferResponse>(`${this.apiHost}/v4/points_transfer`, payload).pipe(
      map((res: IV4PointTransferResponse) => res.data));
  }

}
