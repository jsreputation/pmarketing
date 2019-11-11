export interface IWInstantOutcomeDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  banner: string;
  background_img_url: string;
  card_background_img_url: string;
  displayProperties?: {
    noRewardsPopUp?: {
      headLine?: string;
      subHeadLine?: string;
      imageURL?: string;
      buttonTxt?: string;
    };
    successPopUp?: {
      headLine?: string;
      subHeadLine?: string;
      imageURL?: string;
      buttonTxt?: string;
    };
  };
}
