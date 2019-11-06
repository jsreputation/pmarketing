export enum WEngagementType {
  games = 'game',
  survey = 'survey',
  instantOutcome = 'instant_outcome',
  loyalty = 'loyalty',
}

export interface ICampaignAttributes {
  id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  urn?: string;
  status?: string;
  start_date_time: string;
  end_date_time: string;
  goal?: string;
  engagement_type: WEngagementType;
  engagement_id: number;
  possible_outcomes?: any;
  comm?: any;
  labels?: string[];
  display_properties?: {
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
    };
  };
}
