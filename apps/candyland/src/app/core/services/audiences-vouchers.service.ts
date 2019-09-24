import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { RewardsService } from '@cl-core-services';
import Utils from '@cl-helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class AudiencesVouchersService implements ITableService {
  constructor(private audiencesHttpsService: AudiencesHttpsService,
              private rewardsService: RewardsService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<any> {
    const httpParams = ClHttpParams.createHttpParams(params);
    let vouchers;
    return this.audiencesHttpsService.getVouchers(httpParams)
      .pipe(
        tap(data => vouchers = data),
        switchMap(data => {
          const rewardIds = data.data.map(item => item.attributes.source_id);
          const uniqRewardIds = Utils.filterUniq(rewardIds);
          const requests = uniqRewardIds.map(id => this.rewardsService.getReward(id));
          return combineLatest(requests).pipe(
            map(rewards => Utils.convertArrToObj(rewards, 'id')),
          );
        }),
        map(rewardsMap => {
          vouchers.data = vouchers.data.map(voucher => {
            const formattedVoucher = AudiencesHttpAdapter.transformAudiencesVoucher(voucher);
            formattedVoucher.reward = rewardsMap[formattedVoucher.rewardId];
            return formattedVoucher;
          });
          return vouchers;
        }),
      );
  }
}
