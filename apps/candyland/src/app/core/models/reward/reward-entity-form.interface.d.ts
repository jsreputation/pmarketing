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
}
