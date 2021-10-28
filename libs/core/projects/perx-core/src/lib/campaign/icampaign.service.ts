import { Observable } from 'rxjs';
import { CampaignType, ICampaign, ICampaignOutcome, ICampaignRule, IReferral } from './models/campaign.model';
import { GameType } from '../game/game.model';

export interface ICampaignFilterOptions {
  type?: CampaignType;
  page?: number;
  gameType?: GameType;
  tagged_with?: string;
  size?: number;
}

export abstract class ICampaignService {
  public abstract getCampaigns(options?: ICampaignFilterOptions): Observable<ICampaign[]>;
  public abstract getCampaign(id: number): Observable<ICampaign>;
  public abstract getVoucherLeftCount(id: number): Observable<{ count: number; campaignId: number }>;
  public abstract applyReferral(referralCode: string): Observable<IReferral>; // response WIP
  public abstract clearCampaignCache(): void;
  public abstract getCampaignOutcomes(id: number): Observable<ICampaignOutcome[]>;
  public abstract enrolIntoCampaign(campaignId: number): Observable<boolean>;
  public abstract getCampaignsRules(campaignId: number): Observable<ICampaignRule[]>;
  public abstract bdoCampaignEnrol(id:number,promoID:string): Observable<boolean>;
}
