export interface ITransaction {
  id: number;
  transactionType: string;
  transactedAt: Date;
  amount: number;
  currency?: string;
  properties: ITransactionProperties;
  transactionReference: string;
  pointsEarned: number;
  razerStampsCount: number;
}

export interface ITransactionProperties {
  productCode?: string;
  productName?: string;
  quantity?: number;
  storeCode?: string;
  storeName?: string;
  invoiceNumber?: number;
}

export enum TransactionState {
  issued = 'issued',
  redeemed = 'redeemed',
  expired = 'expired',
  reserved = 'reserved',
  released = 'released',
  pending = 'pending',
  processed = 'processed'
}
