declare interface ICampaign {
  id?: string;
  name?: string;
  status?: string;
  audience?: {
    type: string;
    select: number;
    file: string;
  };
  engagement_type?: string;
  engagement_id?: string;
  campaignInfo?: {
    goal: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    disabledEndDate: boolean;
    labels?: string;
  };
  channel?: {
    type: string;
    message?: string;
    schedule?: {
      sendDate: Date;
      sendTime: string;
      enableRecurrence?: boolean;
      recurrence: {
        times: number;
        period: string;
        repeatOn: string;
      }
    }
  },
  template?: any;
  rewardsList?: {
    result_id?: number;
    result_type?: string;
    probability?: number;
  }[];
  rewardsOptions?: any;
}

declare interface ICampaignTableData {
  id: string;
  name: string;
  status: string;
  begin: Date;
  end: Date;
  audience: number;
  goal: string;
  engagementType: string;
}

declare interface ICampaignAPI {
  id?: string;
  type: string;
  links?: {
    self: string;
  }
  attributes: {
    name: string;
    created_at?: string;
    updated_at?: string;
    urn?: string;
    status?: string;
    start_date_time: string;
    end_date_time: string;
    pool_id: number;
    goal?: string;
    engagement_type: string;
    engagement_id: string;
    comm_channel: string;
    possible_outcomes?: any;
    comm?: any;
    labels?: string;
  }
}
