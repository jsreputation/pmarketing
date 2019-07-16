declare interface EngagementCreate {
  template: number;
  rewards: {
    list: Reward;
    totalScore: number;
  };
  campaignInfo: CampaignInfo;
  channel: string;
}

// interface Reward {
//   id: number;
//   image: string;
//   probability: number;
// }

interface Limits {
  user: string;
  duration: string;
}

interface CampaignInfo {
  goal: string;
  begin: Date;
  end: Date;
  label: string[];
}
