import { Observable } from 'rxjs';
import { ICampaign, CampaignType, IReferral, ICampaignOutcome } from './models/campaign.model';
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
  public abstract clearCampaignCache(): void ;
  public abstract getCampaignOutcomes(id: number): Observable<ICampaignOutcome[]>;
}
