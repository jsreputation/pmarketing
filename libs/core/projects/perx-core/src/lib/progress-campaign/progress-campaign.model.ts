import { ICampaignOutcome } from '../stamp/models/stamp.model';

export interface IMilestone {
  id: number;
  displayProperties: null;
  outcomesIssued: boolean;
  name: string;
  outcomes: ICampaignOutcome[];
  points: number;
}
