// tslint:disable
export interface IEngagementForm {
  id: string;
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
}

