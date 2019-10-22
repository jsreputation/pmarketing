declare interface IRewardEntityForm {
  id?: string;
  name: string;
  currency?: string;
  loyalties?: any;
  displayProperties?: any;
  rewardInfo: {
    image: string;
    rewardType: string;
    category: string;
    redemptionType: string;
    cost: number;
    description: string;
    termsAndCondition: string;
    tags?: string[];
    merchantId: string | null;
  };
  vouchers?: {
    voucherCode?: {
      type?: string;
      singleCode?: {
        code?: string;
      };
      uniqueGeneratedCode?: {
        prefix?: string;
        codeFormat?: any;
        length?: number;
      };
    };
    voucherValidity: {
      type: string;
      period: {
        startDate?: string;
        startTime?: string;
        endDate?: string;
        endTime?: string;
      };
      issuanceDate: {
        times?: string;
        duration?: string;
      };
    };
  };
}
