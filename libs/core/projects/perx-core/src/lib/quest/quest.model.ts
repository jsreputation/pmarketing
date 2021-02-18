import { IReward } from '../rewards/models/reward.model';

export interface IQuest  {
    id: number;
    campaignId: number;
    campaignName: string;
    campaignDescription?: string;
    campaignBannerUrl?: string;
    enrolled: boolean;
    termsAndCondtions?: string;
    beginsAt?: Date;
    endsAt?: Date;
    tasks?: IQuestTask[];
    questDisplayProperties?: {
      questCompletedImgUrl: string;
    };
    rewards?: IReward[];
  }
export interface IQuestTask {
        id: number;
        name: string;
        description: string;
        displayProperties: {
            imageUrl: string;
        };
        state: string;
}
