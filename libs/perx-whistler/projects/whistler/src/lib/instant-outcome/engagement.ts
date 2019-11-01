export interface IWInstantOutcomeEngagementAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  properties?: {};
  display_properties?: IWOutcomeDisplayProperties;
}

export interface IWOutcomeDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  banner: string;
  background_img_url: string;
  card_background_img_url: string;
  display_properties?: {
    noRewardsPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageURL?: string,
    };
    merchantPinText?: {
      headLine?: string,
      subHeadLine?: string,
    };
    rewardSuccessPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageURL?: string,
    };
    codeInstructionsText?: {
      headLine?: string,
    };
    errorPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageURL?: string,
    };
  };
}
