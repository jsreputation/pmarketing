import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { InstantOutcomeService } from './instant-outcome.service';
import { IVoucher } from '../vouchers/models/voucher.model';
import { map } from 'rxjs/operators';
import { IV4Voucher, V4VouchersService } from '../vouchers/v4-vouchers.service';

interface IV4IssueCampaignResponse {
  data: IV4Voucher[];
}

@Injectable({
  providedIn: 'root'
})
export class V4InstantOutcomeService implements InstantOutcomeService {

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  // @ts-ignore
  public getFromCampaign(campaignId: number): Observable<IOutcome>{
    throw new Error('Method not implemented');
  }

  // @ts-ignore
  public claim(campaignId: number): Observable<IVoucher[]>{
    return this.http.post<IV4IssueCampaignResponse>(`${this.config.apiHost}/v4/campaigns/${campaignId}/issue_all`, null)
      .pipe(
        map(resp => resp.data),
        map((vouchers: IV4Voucher[]) => vouchers.map(voucher => V4VouchersService.v4VoucherToVoucher(voucher)))
      );
  }

  // @ts-ignore
  public prePlay(campaignId: number): Observable<IEngagementTransaction>{
    throw new Error('Method not implemented');
  }

  // @ts-ignore
  public prePlayConfirm(transactionId: number): Observable<void>{
    throw new Error('Method not implemented');
  }
}
