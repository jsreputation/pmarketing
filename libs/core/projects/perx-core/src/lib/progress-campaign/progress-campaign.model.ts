import { IQuest, IQuestTask } from '../quest/quest.model';
import { ICampaignOutcome } from '../campaign/models/campaign.model';

export interface IProgressCampaign extends IQuest {
  // Quest reference
  // id: number;
  // campaignId: number;
  // userAccountId: number;
  // state?: string;
  // completedAt?: Date;
  // completedTasks?: IQuestTask[];
  completedProgress?: number;
  unitBaseName?: string;
}

export interface IProgressLevel extends IQuestTask {
  // Quest reference
  // id: number;
  // campaignId?: number;
  // ordering?: number;
  // state?: string;
  // title?: string;
  // description?: string;
  // imageUrl?: string;
  completedProgress?: number;
  levelTarget?: number;
}

export interface IMilestone {
  id: number;
  displayProperties?: {
    icon: {
      value: {
        image_url: string;
      }
    };
  } | null;
  outcomesIssued: boolean;
  name: string;
  outcomes: ICampaignOutcome[];
  pointsRequired: number;
}

export interface IProgressTotal {
  userTotalAccumulatedCampaignPoints: number;
}

export interface IProgressTransaction {
  id: number;
  amount: number;
  campaignId: number;
  userAccountid: number;
}
