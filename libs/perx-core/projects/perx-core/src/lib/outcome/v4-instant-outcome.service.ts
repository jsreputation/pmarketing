import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstantOutcomeService } from './instant-outcome.service';
import { IVoucher } from '../vouchers/models/voucher.model';
import { map } from 'rxjs/operators';
import { IV4Voucher, V4VouchersService } from '../vouchers/v4-vouchers.service';
import { Observable, of } from 'rxjs';

import { IOutcome } from './models/outcome.model';
import { IEngagementTransaction } from '../game/game.model';
import { ICampaignService } from '../campaign/icampaign.service';
import { oc } from 'ts-optchain';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';

interface IV4IssueCampaignResponse {
  data: IV4Voucher[];
}

@Injectable({
  providedIn: 'root'
})
export class V4InstantOutcomeService implements InstantOutcomeService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private campaignSvc: ICampaignService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  public getFromCampaign(campaignId: number): Observable<IOutcome> {
    return this.campaignSvc.getCampaign(campaignId).pipe(
      map(c =>
        // @todo currently campaign does not have any data to populate here
        ({
          title: 'Thanks for being with us!',
          subTitle: '',
          button: 'claim',
          banner: oc(c).campaignBannerUrl(''),
          backgroundImgUrl: oc(c).campaignBannerUrl(''),
          cardBackgroundImgUrl: '',
          results: {}
        })
      )
    );
  }

  public claim(campaignId: number): Observable<IVoucher[]> {
    return this.http
      .post<IV4IssueCampaignResponse>(
        `${this.apiHost}/v4/campaigns/${campaignId}/issue_all`,
        null
      )
      .pipe(
        map(resp => resp.data),
        map((vouchers: IV4Voucher[]) =>
          vouchers.map(voucher => V4VouchersService.v4VoucherToVoucher(voucher))
        )
      );
  }

  public prePlay(campaignId: number): Observable<IEngagementTransaction> {
    return this.claim(campaignId).pipe(
      map((vs: IVoucher[]) => {
        const rewardIds: number[] = vs
          .map(v => oc(v).reward.id(-1))
          .filter((id: number) => id !== -1);
        return {
          id: 0,
          voucherIds: vs.map(v => v.id),
          rewardIds
        };
      })
    );
  }

  // @ts-ignore
  public prePlayConfirm(transactionId: number): Observable<void> {
    // v* does not have yet this concept of preplay, playconfirm.
    // so this, does not do anything.
    return of(void 0);
  }
}
