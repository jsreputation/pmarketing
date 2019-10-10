export interface ICampaign {
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
      labels?: string[];
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
  };
  template?: any;
  rewardsList?: {
      result_id?: number;
      result_type?: string;
      probability?: number;
  }[];
  rewardsOptions?: any;
  rewardsListCollection?: any;
}
