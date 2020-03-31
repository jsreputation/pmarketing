import { ILoyalty, ITransaction, ITransactionHistory, TransactionDetailType } from '@perxtech/core';

export const mockLoyalty: ILoyalty = {
  id: 1,
  name: 'Abenson PLUS Card Program Demo',
  description: 'test',
  beginDate: '2018-11-16T11:24:51.000Z',
  endDate: '',
  membershipTierName: 'Y',
  membershipIdentifier: '1',
  pointsBalance: 91000772,
  currencyBalance: 910007720,
  currency: 'PHP',
  expiringPoints: [
    {
      expireDate: '',
      points: 0
    }
  ]
};

interface ITransactionWithDescription extends ITransaction {
  description?: string;
}

export const mockTransactions: ITransactionWithDescription[] = [
  {
    id: 92213,
    name: 'Purchase Name',
    description: 'Purchase Description',
    earnedDate: '2019-05-30T10:24:01.738Z',
    points: -10,
    pointsBalance: 10,
    currencyBalance: 100,
    properties: {}
  },
  {
    id: 92188,
    name: 'Reward Name',
    description: 'Reward Description',
    earnedDate: '2019-04-24T07:53:28.310Z',
    points: 100000000,
    pointsBalance: 100000000,
    currencyBalance: 1000000000,
    properties: {}
  },
  {
    id: 92187,
    name: 'Purchase Name',
    description: 'Purchase Description',
    earnedDate: '2019-04-24T07:53:18.047Z',
    points: -1000,
    pointsBalance: 1000,
    currencyBalance: 10000,
    properties: {}
  },
  {
    id: 92186,
    name: 'Purchase Name',
    description: 'Purchase Description',
    earnedDate: '2019-04-22T10:43:44.642Z',
    points: -260,
    pointsBalance: -260,
    currencyBalance: 2600,
    properties: {}
  },
  {
    id: 92185,
    name: 'Reward Name',
    earnedDate: '2019-04-22T10:43:07.455Z',
    points: 200,
    pointsBalance: 200,
    currencyBalance: 2000,
    properties: {}
  },
  {
    id: 92184,
    name: 'Reward Name',
    earnedDate: '2019-04-22T10:42:43.539Z',
    points: 100,
    pointsBalance: 100,
    currencyBalance: 1000,
    properties: {}
  }
];
export const mockTransactionsHistory: ITransactionHistory[] = [
  {
    id: 749,
    name: 'Trigger',
    identifier: 'Awarded Points',
    transactedAt: new Date('2019-10-09T14:46:11.961Z'),
    pointsAmount: 500,
    properties: undefined,
    transactionDetails: {}
  },
  {
    id: 751,
    name: 'Loyalty Earn Rule',
    identifier: 'Awarded Points',
    transactedAt: new Date('2019-10-09T16:43:33.649Z'),
    pointsAmount: 100,
    properties: {},
    transactionDetails: {
      type: TransactionDetailType.transaction,
      data: {
        id: 50,
        productName: 'Le test Product',
        pharmacyName: 'Ryane\'s Pharmacy',
        transactionDate: new Date('2019-10-09T16:43:33.590Z'),
        transactionRef: '10102019-108',
        price: 0,
        currency: 'HKD'
      }
    }
  },
  {
    id: 752,
    name: undefined,
    identifier: undefined,
    transactedAt: new Date('2019-10-09T16:50:57.530Z'),
    pointsAmount: -300,
    properties: {},
    transactionDetails: {
      type: TransactionDetailType.reward,
      data: {
        id: 43,
        state: 'redeemed',
        voucherExpiry: new Date('2020-09-22T16:00:00.000Z'),
        userAccount: '10888905-1570617174',
        rewardName: 'Clemens Diabetes Compact Wallet',
        redemptionLocation: undefined
      }
    }
  }
];
