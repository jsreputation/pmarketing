import { ISchedule } from '../comm/schedule';
import { InformationCollectionSettingType } from './campaign.enum';
import { IOutcome } from '../outcome/outcome';
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
  enable
  rewardsListCollection?:  ICampaignRewardsList[];
  limits?: any;
  displayProperties?: any;
}


export interface ICampaignRewardsList {
  outcome?: IOutcome;
  slotInfo?: {
    enableProbability?: boolean
    slotNumber?: number | null;
  }
  rewardsOptions?: IRewardEntity | { probability: 0, outcomeId: '', limit: '', id: '' };
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
