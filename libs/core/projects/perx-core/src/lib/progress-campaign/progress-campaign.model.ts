import { IQuest, IQuestTask } from '../quest/quest.model';
import { ICampaignOutcome } from '../stamp/models/stamp.model';

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
  displayProperties: null;
  outcomesIssued: boolean;
  name: string;
  outcomes: ICampaignOutcome[];
  points: number;
}
