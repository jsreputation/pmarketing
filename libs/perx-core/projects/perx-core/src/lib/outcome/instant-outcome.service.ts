import { IReward } from './../rewards/models/reward.model';
import { Observable } from 'rxjs';

import { IOutcome } from './models/outcome.model';

export abstract class InstantOutcomeService {
  // usage is to get return from pipe to call other functions
  public abstract getFromCampaign(campaignId: number): Observable<IOutcome>;

  // @ts-ignore
  public abstract claim(campaignId: number): Observable<IReward[]>;
  public abstract prePlay(campaignId: number): Observable<IReward[]>;
  public abstract prePlayConfirm(transactionId: number): Observable<void>;
}
