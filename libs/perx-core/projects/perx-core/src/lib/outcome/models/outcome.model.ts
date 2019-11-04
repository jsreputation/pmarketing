export interface IOutcome {
  title: string;
  button: string;
  sub_title: string;
  banner: string;
  background_img_url: string;
  card_background_img_url: string;
  displayProperties?: IDisplayProperties;
}

export interface IDisplayProperties {
  noRewardsPopUp?: {
    headLine?: string,
    subHeadLine?: string,
    imageURL?: string,
    buttonTxt?: string,
  };
}
