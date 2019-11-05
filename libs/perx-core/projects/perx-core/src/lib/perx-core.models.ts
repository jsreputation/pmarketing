export interface IDisplayProperties {
  merchantPinText?: IProperties;
  rewardSuccessPopUp?: IProperties;
  noRewardsPopUp?: IProperties;
  codeInstructionsText?: IProperties;
  errorPopUp?: IProperties;
  CTAButtonTxt?: string;
}

export interface IProperties {
  headLine?: string;
  subHeadLine?: string;
  imageURL?: string;
  buttonTxt?: string;
}
