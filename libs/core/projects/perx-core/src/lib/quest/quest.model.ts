
import { ICampaign } from '../campaign/models/campaign.model';

export interface IQuestCampaign extends ICampaign {
    enrolled?: boolean;
    tasks?: IQuestTask[];
    questDisplayProperties?: {
      questCompletedImgUrl: string;
    };
  }
export interface IQuestTask {
        name: string;
        description: string;
        displayProperties: {
            position: number;
            imageUrl: string;
        };
        completedAt: Date | undefined;
}
