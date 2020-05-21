import { Observable } from 'rxjs';
import { ICampaign, CampaignType, IReferral } from './models/campaign.model';
import { GameType } from '../game/game.model';

export interface ICampaignFilterOptions {
  type?: CampaignType;
  page?: number;
  gameType?: GameType;
}

export abstract class ICampaignService {
  public abstract getCampaigns(options?: ICampaignFilterOptions): Observable<ICampaign[]>;
  public abstract getCampaign(id: number): Observable<ICampaign>;
  public abstract getVoucherLeftCount(id: number): Observable<{ count: number; campaignId: number }>;
  public abstract applyReferral(referralCode: string): Observable<IReferral>; // response WIP
}