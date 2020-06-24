import { Injectable, } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import {
  Observable,
  of,
} from 'rxjs';
import {
  concatAll,
  map,
  mergeMap,
  reduce
} from 'rxjs/operators';
import { oc } from 'ts-optchain';

import { LoyaltyService } from './loyalty.service';
import {
  ILoyalty,
  IPurchaseTransactionHistory,
  IRewardTransactionHistory,
  ITransaction,
  ITransactionHistory,
  ITransactionProperties,
  TransactionDetailType
} from './models/loyalty.model';

import {
  IV4Reward,
  IV4Tag
} from '../rewards/v4-rewards.service';
import { ICustomProperties } from '../profile/profile.model';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Cacheable } from 'ngx-cacheable';

const DEFAULT_PAGE_COUNT: number = 10;
type TenantTransactionProperties =
  IV4TransactionPropertiesAbenson
  | IV4TransactionPropertiesMerck
  | IV4TransactionPropertiesAllit
  | IV4TransactionPropertiesCashback;

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
  tags?: IV4Tag[];
  custom_fields?: ICustomProperties[];
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
  tiers: IV4LoyaltyTiers[]; // will do proper mapping later on
  points_history?: IV4PointHistory[];
  membership_expiry: Date;
  membership_state?: 'active' | 'pending' | 'inactive' | 'expire';
  images?: IV4Image[];
}

interface IV4GetLoyaltiesResponse {
  data: IV4Loyalty[];
  meta?: IV4Meta;
}

interface IV4GetLoyaltyResponse {
  data: IV4Loyalty;
  meta?: IV4Meta;
}

interface IV4PointHistory {
  id: number;
  identifier?: string;
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
  properties?: ICustomProperties | TenantTransactionProperties;
  transaction_reference: string;
}

interface IV4TransactionHistory {
  id: number;
  name: string;
  identifier: string;
  transacted_at: Date;
  amount: number;
  transacted_cents?: number; // property will probably be removed
  properties: ICustomProperties | TenantTransactionProperties;
  transaction_details: {
    type: TransactionDetailType;
    data: IV4PurchaseTransactionHistory | IV4RewardTransactionHistory;
  };
}

interface IV4TransactionHistoryResponse {
  data: IV4TransactionHistory[];
}

interface IV4TransactionPropertiesAbenson {
  tenant: 'abenson';
  qty: number;
  reg: number;
  sku: number;
  store: number;
  trxno: number;
  untprc: number;
  cashier: number;
  company: number;
  trxdate: number;
  trxtime: number;
  mobileno: string;
  store_name: string;
}

interface IV4TransactionPropertiesMerck {
  tenant: 'merck';
  product: string;
  pharmacy: string;
  merchant_username: string;
  merchant_account_id: number;
}

interface IV4TransactionPropertiesAllit {
  tenant: 'allit';
  amount: number;
  quantity: number;
  item_code: number;
  item_name: string;
  amount_net: number;
  amount_std: number;
  amount_txn: number;
  guid_store: string;
  amount_json: {};
  branch_code: string;
  guid_branch: string;
  amount_signum: number;
  reference_doc: string;
  amount_tax_gst: number;
  amount_tax_wht: number;
  invoice_number: number;
  amount_discount: number;
  category_level_0: string;
  category_level_1: string;
  amount_gst_balance: number;
  amount_wht_balance: number;
  amount_open_balance: number;
  transaction_item_guid: string;
  transaction_line_guid: string;
}

interface IV4TransactionPropertiesCashback {
  tenant: 'perx'; // temporary template tenant name?
  merchant_name: string;
  item_name: string;
  outlet_name: string;
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
    const thumbnailImage = loyalty.images && loyalty.images.find((image: IV4Image) => {
      return image.section === 'loyalty_thumbnail';
    });

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
      currency: loyalty.points_currency,
      nextTierPoints: nextTier ? nextTier.points_requirement : 0,
      nextTierPointsDiff: nextTier ? nextTier.points_difference : 0,
      nextTierName: nextTier ? nextTier.name : '',
      highestTier,
      expiringPoints: loyalty.aging_points && loyalty.aging_points.map(aging => ({
        expireDate: aging.expiring_on_date,
        points: aging.points_expiring
      })),
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

  public static v4PointHistoryToPointHistory(pointHistory: IV4PointHistory): ITransaction {
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
      properties: pointHistory.properties
    };
  }

  public static v4TransactionHistoryToTransactionHistory(transactionHistory: IV4TransactionHistory): ITransactionHistory {
    const transactionDetails = oc(transactionHistory).transaction_details.data();
    let data: IPurchaseTransactionHistory | IRewardTransactionHistory | undefined;

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
          data.properties = V4LoyaltyService.v4TransactionPropertiesToTransactionProperties(pthProps as TenantTransactionProperties);
          break;
      }
    // } else if (transactionHistory.name === 'POS Update') { // hard-coded reason code from backend for POS transactions
    } else if (Object.keys(transactionHistory.properties).length > 0) {
      // all-it transaction currently have no data in transaction_details assume it is a purchase.
      const thProps = transactionHistory.properties;
      data = {
        id: transactionHistory.id
      };

      data.properties = V4LoyaltyService.v4TransactionPropertiesToTransactionProperties(thProps as TenantTransactionProperties);
    } else {
      // assume it is a customer service action from dashboard
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
      identifier: transactionHistory.identifier,
      transactedAt: transactionHistory.transacted_at,
      pointsAmount: transactionHistory.amount,
      properties: transactionHistory.properties as ICustomProperties,
      transactionDetails: {
        type: oc(transactionHistory).transaction_details.type(),
        data
      }
    };
  }

  private static v4TransactionPropertiesToTransactionProperties(pthProps: TenantTransactionProperties): ITransactionProperties {
    let data: ITransactionProperties = {};

    if (pthProps && (pthProps as IV4TransactionPropertiesAbenson).sku) {
      const props = (pthProps as IV4TransactionPropertiesAbenson);
      data = {
        productCode: props.sku.toString(),
        // productName: undefined,
        quantity: props.qty,
        storeCode: props.store.toString(),
        storeName: props.store_name
      };
    }
    if (pthProps && (pthProps as IV4TransactionPropertiesAllit).guid_branch) {
      const props = (pthProps as IV4TransactionPropertiesAllit);
      data = {
        productCode: props.item_code.toString(),
        productName: props.item_name,
        quantity: props.quantity,
        storeCode: props.branch_code,
        // storeName: undefined
      };
    }
    if (pthProps && (pthProps as IV4TransactionPropertiesMerck).product) {
      const props = (pthProps as IV4TransactionPropertiesMerck);
      data = {
        // productCode: undefined,
        productName: props.product,
        // quantity: undefined,
        // storeCode: undefined,
        storeName: props.pharmacy
      };
    }
    if (pthProps && (pthProps as IV4TransactionPropertiesCashback).merchant_name) {
      const props = (pthProps as IV4TransactionPropertiesCashback);
      data = {
        productName: props.item_name,
        storeCode: props.merchant_name,
        storeName: props.outlet_name
      };
    }
    return data;
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
        map((loyalties: ILoyalty[]) => loyalties[0])
      );
  }

  public getAllTransactions(loyaltyId: number = 1, locale: string = 'en'): Observable<ITransaction[]> {
    const pageSize = 100;
    return this.getTransactions(loyaltyId, 1, pageSize, locale).pipe(
      mergeMap((histories: ITransaction[]) => {
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
      reduce((acc: ITransaction[], curr: ITransaction[]) => acc.concat(curr), [])
    );
  }

  public getTransactions(loyaltyId: number, page: number = 1, pageSize: number = 10, locale: string = 'en'): Observable<ITransaction[]> {
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
  ): Observable<ITransactionHistory[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4TransactionHistoryResponse>(
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
      map((res: IV4TransactionHistoryResponse) => res.data),
      map((transactionHistories: IV4TransactionHistory[]) => transactionHistories.map(
        (transactionHistory: IV4TransactionHistory) => V4LoyaltyService.v4TransactionHistoryToTransactionHistory(transactionHistory)
      ))
    );
  }
}
