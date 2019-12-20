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
  outcomes?: ICampaignOutcome[];
  limits?: any;
  displayProperties?: any;
  notification?: IChannel;
}

export interface ICampaignOutcome {
  outcome?: IOutcome;
  enableProbability?: boolean;
  reward?: IRewardEntity;
}

export interface ICampaignTableData {
  id: string;
  name: string;
  status: string;
  begin: Date;
  end: Date;
  audience: string;
  goal: string;
  engagementType: string;
}
