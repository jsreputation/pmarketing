export type MerchantData = {
  merchantId: number;
  name: string;
  logo: string;
  description: string;
  imgUrl: string;
  rebateAmount: string;
  price?: string; // if have price means onboarded
};

export type TransactionReceipt = {
  rebateGained: string,
  transactionAmount: string,
  actualCharged: string,
  rebateBurned: string,
  name: string,
  logo: string,
  dateNow?: string
};

