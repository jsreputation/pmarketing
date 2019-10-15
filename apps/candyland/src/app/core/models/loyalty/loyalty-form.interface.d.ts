declare interface ILoyaltyForm {
  name: string;
}

declare interface IDetailsStep {
  pointsName: string;
  mainImage: string;
  joiningMethod: {
    transactionAmount?: number;
    signUp: boolean;
    byInvite: boolean;
    amount?: number;
  };
  pullId: string;
}
