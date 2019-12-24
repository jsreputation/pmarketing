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
    filters?: IAudienceFilter;
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
    type: string;
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

export interface IDateRange {
  from: number | null;
  to: number | null;
}

export interface IAudienceFilter {
  agesEnabled: boolean;
  genderEnabled: boolean;
  gender: string | null;
  ages: IDateRange[] | null;
}
