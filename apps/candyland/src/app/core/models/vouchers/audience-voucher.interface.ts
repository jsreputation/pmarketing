export interface IAudienceVoucher {
  id: string;
  batchId?: string;
  endDate: string;
  rewardId: string;
  issuedDate: Date | null;
  expiryDate: Date | null;
  status: string;
  reward?: any;
}
