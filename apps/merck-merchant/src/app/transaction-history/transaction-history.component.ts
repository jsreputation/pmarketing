import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TransactionPipe } from '@perx/core';

const enum MerchantTransactionDetailType {
  'transaction' = 'Transaction',
  'reward' = 'Reward::Transaction'
}

interface IMerchantCustomProperties {
  [key: string]: string | number | boolean;
}

interface IMerchantPurchaseTransactionHistory {
  id: number;
  productName?: string;
  pharmacyName?: string;
  issuerName?: string;
  transactionDate?: Date;
  transactionRef?: string;
  price?: number;
  currency?: string;
}

interface IMerchantRewardTransactionHistory {
  id: number;
  state: string;
  voucherExpiry: Date;
  userAccount: string;
  rewardName: string;
  redemptionLocation?: string;
}

interface IMerchantTransactionHistory {
  id: number;
  name?: string;
  identifier?: string;
  transactedAt?: Date;
  pointsAmount?: number;
  properties?: IMerchantCustomProperties;
  transactionDetails?: {
    type?: MerchantTransactionDetailType,
    data?: IMerchantPurchaseTransactionHistory | IMerchantRewardTransactionHistory
  };
}

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  public transactions: Observable<IMerchantTransactionHistory[]> = of([
    {
      id: 793,
      name: 'Glucophage XR Tab',
      identifier: 'Awarded Points',
      transactedAt: new Date('2019-10-24T11:37:07.532Z'),
      pointsAmount: 100,
      properties: {},
      transactionDetails: {
        type: MerchantTransactionDetailType.transaction,
        data: {
          id: 100,
          productName: 'Glucophage XR Tab',
          pharmacyName: 'BEST PHARMA LIMITED',
          issuerName: 'salman',
          transactionDate: new Date('2019-10-24T11:37:07.436Z'),
          transactionRef: '24102019-67',
          price: 0,
          currency: 'HKD'
        }
      }
    },
    {
      id: 794,
      name: 'Loyalty Earn Rule',
      identifier: 'Awarded Points',
      transactedAt: new Date('2019-10-24T12:08:58.824Z'),
      pointsAmount: 100,
      properties: {},
      transactionDetails: {
        type: MerchantTransactionDetailType.transaction,
        data: {
          id: 101,
          productName: 'Glucophage XR Tab',
          pharmacyName: 'BEST PHARMA LIMITED',
          issuerName: 'salman',
          transactionDate: new Date('2019-10-24T12:08:58.773Z'),
          transactionRef: '24102019-67',
          price: 0,
          currency: 'HKD'
        }
      }
    },
    {
      id: 862,
      name: undefined,
      identifier: undefined,
      transactedAt: new Date('2019-12-03T03:21:43.251Z'),
      pointsAmount: -100,
      properties: {},
      transactionDetails: {
        type: MerchantTransactionDetailType.reward,
        data: {
          id: 110,
          state: 'redeemed',
          voucherExpiry: new Date('2020-09-22T16:00:00.000Z'),
          userAccount: '381072-1569210652',
          rewardName: 'Fitness Tracker',
          redemptionLocation: undefined
        }
      }
    },
    {
      id: 874,
      name: undefined,
      identifier: undefined,
      transactedAt: new Date('2019-12-03T07:46:16.558Z'),
      pointsAmount: -300,
      properties: {},
      transactionDetails: {
        type: MerchantTransactionDetailType.reward,
        data: {
          id: 112,
          state: 'redeemed',
          voucherExpiry: new Date('2020-09-22T16:00:00.000Z'),
          userAccount: '381072-1569210652',
          rewardName: 'Clemens Diabetes Compact Wallet',
          redemptionLocation: undefined
        }
      }
    }
  ]);
  public purchasesTitleFn: (tr: IMerchantTransactionHistory) => string;
  public redemptionsTitleFn: (tr: IMerchantTransactionHistory) => string;
  public descFn: (tr: IMerchantTransactionHistory) => string;
  public subTitleFn: (tr: IMerchantTransactionHistory) => string;
  public priceLabelFn: (tr: IMerchantTransactionHistory) => string;

  constructor(
    private location: Location,
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe
  ) { }

  public ngOnInit(): void {
    this.purchasesTitleFn = (tr: IMerchantTransactionHistory) =>
    `${tr.transactionDetails && (tr.transactionDetails.data as IMerchantPurchaseTransactionHistory).pharmacyName}`;

    this.redemptionsTitleFn = (tr: IMerchantTransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IMerchantRewardTransactionHistory).rewardName}`;

    this.descFn = (tr: IMerchantTransactionHistory) =>
      `${tr.transactionDetails && (tr.transactionDetails.data as IMerchantPurchaseTransactionHistory).productName}`;

    this.subTitleFn = (tr: IMerchantTransactionHistory) => `${this.datePipe.transform(tr.transactedAt, 'dd/MM/yyyy')}`;
    this.priceLabelFn = (tr: IMerchantTransactionHistory) => `${this.transactionPipe.transform(tr.pointsAmount || 0)}`;
  }

  public onLeftActionClick(): void {
    this.location.back();
  }
}
