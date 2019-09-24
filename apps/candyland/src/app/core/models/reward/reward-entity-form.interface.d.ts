declare interface IRewardEntityForm {
  id?: string;
  name: string;
  currency?: string;
  rewardInfo: {
    image: string;
    rewardType: string;
    category: string;
    redemptionType: string;
    cost: number;
    description: string;
    termsAndCondition: string;
  };
  vouchers: {
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
      startDate: string;
      startTime: string;
      endDate?: string;
      endTime?: string;
      times?: string;
      duration?: string;
    };
  };
}
