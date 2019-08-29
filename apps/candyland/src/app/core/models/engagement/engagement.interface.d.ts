// tslint:disable
declare interface  IEngagement {
  id: number;
  current_type: string;
  urn: string;
  created_at: string;
  updated_at: string;
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  attributes_type: string;
  fontName: string;
  fontColor: string;
  headerColor: string;
  headerTitle: string;
  headlineText: string;
  mainShapeType: string;
  backgroundColor: string;
  headerLogoImage: string;
  subHeadlineText: string;
  callToActionText: string;
  loadingHeadlineText: string;
  loadingSubHeadlineText: string;
  background: string;
  cardBackground: string;
  buttonText?: string;
  nb_of_slots?: number;
  slots?: number[];

  // constructor(data: IEngagementApi) {
  //   this.id = data.id;
  //   this.current_type = data.type;
  //   this.urn = data.attributes.urn;
  //   this.created_at = data.attributes.created_at;
  //   this.updated_at = data.attributes.updated_at;
  //   this.title = data.attributes.title;
  //   this.game_type = data.attributes.game_type;
  //   this.description = data.attributes.description;
  //   this.image_url = data.attributes.image_url;
  //   this.attributes_type = data.attributes.type;
  //   this.fontName = data.attributes.display_properties.fontName;
  //   this.fontColor = data.attributes.display_properties.fontColor;
  //   this.headerColor = data.attributes.display_properties.headerColor;
  //   this.headerTitle = data.attributes.display_properties.headerTitle;
  //   this.headlineText = data.attributes.display_properties.headlineText;
  //   this.mainShapeType = data.attributes.display_properties.mainShapeType;
  //   this.backgroundColor = data.attributes.display_properties.backgroundColor;
  //   this.headerLogoImage = data.attributes.display_properties.headerLogoImage;
  //   this.subHeadlineText = data.attributes.display_properties.subHeadlineText;
  //   this.callToActionText = data.attributes.display_properties.callToActionText;
  //   this.loadingHeadlineText = data.attributes.display_properties.loadingHeadlineText;
  //   this.loadingSubHeadlineText = data.attributes.display_properties.loadingSubHeadlineText;
  //   this.background = data.attributes.display_properties.background;
  //   this.cardBackground = data.attributes.display_properties.cardBackground;
  //   this.buttonText = data.attributes.display_properties.buttonText;
  //   this.nb_of_slots = data.attributes.display_properties.nb_of_slots;
  //   this.slots = data.attributes.display_properties.slots;
  // }
}
