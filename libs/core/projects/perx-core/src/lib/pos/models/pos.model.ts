export interface IPosLoyaltyTransaction {
  id: number;
  loyaltyProgramId: number;
  points: number;
  properties: {
    itemName: string;
    merchantName: string;
    outletName: string;
  };
  transactedAt: Date;
}
