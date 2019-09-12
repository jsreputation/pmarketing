declare interface ICampaign {
  id: string;
  name: string;
  status: string;
  begin: Date;
  end?: Date;
  audience?: number;
  goal: string;
  engagementType: string;
}
