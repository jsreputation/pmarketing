import { Observable } from 'rxjs';
import {
  CampaignType,
  IBDOCampaignEnrolment,
  ICampaign,
  ICampaignOutcome,
  ICampaignRule,
  IReferral
} from './models/campaign.model';
import { GameType } from '../game/game.model';
import { ITabConfigExtended } from '../rewards/rewards-list-tabbed/rewards-list-tabbed.component';

export interface ICampaignFilterOptions {
  type?: CampaignType;
  page?: number;
  gameType?: GameType;
  size?: number;
  tags?: string[];
  categories?: string[];
  categoryIds?: string[];
  sortBy?: string;
}

export abstract class ICampaignService {
  public abstract getCampaigns(options?: ICampaignFilterOptions): Observable<ICampaign[]>;
  public abstract getCampaign(id: number, lang?: string): Observable<ICampaign>;
  public abstract getVoucherLeftCount(id: number): Observable<{ count: number; campaignId: number }>;
  public abstract applyReferral(referralCode: string): Observable<IReferral>; // response WIP
  public abstract clearCampaignCache(): void;
  public abstract getCampaignOutcomes(id: number): Observable<ICampaignOutcome[]>;
  public abstract enrolIntoCampaign(campaignId: number): Observable<boolean>;
  public abstract getCampaignsRules(campaignId: number): Observable<ICampaignRule[]>;
  public abstract bdoCampaignEnrol(id: number, promoID: string, captchaToken: string): Observable<IBDOCampaignEnrolment>;
  public abstract searchCampaigns(text: string, page?: number, pageSize?: number, locale?: string): Observable<ICampaign[]>;
  public abstract getCampaignsById(ids: number[], pageSize?: number, locale?: string): Observable<ICampaign[]>;
  public abstract getCategories(): Observable<ITabConfigExtended[]>;
}
