import { ISchedule } from '../comm/schedule';

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
    informationCollectionSetting?: InformationCollectionSettingType;
    campaignInfo?: {
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
    rewardsList?: {
        id?: string;
        result_id?: number;
        result_type?: string;
        probability?: number;
    }[];
    rewards?: any; // todo investigate difference with rewardsList
    rewardsOptions?: any;
    rewardsListCollection?: any;
    limits?: any;
    displayProperties?: any;
}

export enum InformationCollectionSettingType {
    notRequired = 'not_required',
    piRequired = 'pi_required',
    signupRequired = 'signup_required'

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
