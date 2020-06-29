export interface ITransaction {
  id: number;
  transactionType: string;
  transactionDate: Date;
  amount: number;
  currency?: string;
  properties: ITransactionProperties;
  transactionReference: string;
  pointsEarned: number;
}

export interface ITransactionProperties {
  productCode?: string;
  productName?: string;
  quantity?: number;
  storeCode?: string;
  storeName?: string;
}
