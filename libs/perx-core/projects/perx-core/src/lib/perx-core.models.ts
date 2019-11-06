export interface IRewardDisplayProperties {
  merchantPinText?: IProperties;
  rewardSuccessPopUp?: IProperties;
  codeInstructionsText?: IProperties;
  errorPopUp?: IProperties;
  CTAButtonTxt?: string;
}

export interface ICampaignDisplayProperties {
  noRewardsPopUp?: IProperties;
  successPopUp?: IProperties;
}

export interface IProperties {
  headLine?: string;
  subHeadLine?: string;
  imageURL?: string;
  buttonTxt?: string;
}
