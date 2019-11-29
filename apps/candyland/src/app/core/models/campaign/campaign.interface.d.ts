import { ISchedule } from '../comm/schedule';
import { InformationCollectionSettingType } from './campaign.enum';
import { IRewardEntity } from '../reward/reward-entity.interface';

export interface ICampaign {
  id?: string;
  name?: string;
  status?: string;
  audience?: {
    // type: string;
    select: string;
    // file: string;
  };
  engagement_type?: string;
  engagement_id?: string;
  campaignInfo?: {
    informationCollectionSetting?: InformationCollectionSettingType;
    goal: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    disabledEndDate: boolean;
    labels?: string[];
  };
  channel?: {
    eventId?: string;
    templateId?: string;
    type: string;
    message?: string;
    schedule?: ISchedule;
  };
  template?: any;
  rewardsListCollection?: ICampaignOutcomeRewardOptions[];
  limits?: any;
  displayProperties?: any;
}

export interface ICampaignOutcome {
  id?: string;
  resultId?: number;
  resultType?: string;
  probability?: number;
  limit?: number;
  stampSlotNumber?: number;
  rewardsOptions?: ICampaignOutcomeRewardOptions;
}

export interface ICampaignOutcomeRewardOptions {
  probability?: number;
  limit?: number;
  value?: IRewardEntity | { probability: 0, outcomeId: '' }
}

export interface ICampaignTableData {
  id: string;
  name: string;
  status: string;
  begin: Date;
  end: Date;
  audience: number;
  goal: string;
  engagementType: string;
}
