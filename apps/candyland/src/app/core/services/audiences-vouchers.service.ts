import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { RewardsService } from '@cl-core-services';
import Utils from '@cl-helpers/utils';
import { IWAssignedAttributes } from '@perx/whistler';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

@Injectable({
  providedIn: 'root'
})
export class AudiencesVouchersService implements ITableService {
  constructor(
    private audiencesHttpsService: AudiencesHttpsService,
    private rewardsService: RewardsService
  ) { }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudienceVoucher>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    let vouchers;
    return this.audiencesHttpsService.getAssignedVouchers(httpParams)
      .pipe(
        tap(response => vouchers = response),
        map(response => this.getUniqIds(response.data, 'source_id')),
        switchMap(idList => this.getRewardsMap(idList)),
        map((rewardsMap: { [rewardId: string]: IRewardEntity }) => {
          vouchers.data = vouchers.data.map(voucher => {
            const formattedVoucher = AudiencesHttpAdapter.transformAudiencesVoucher(voucher);
            formattedVoucher.reward = rewardsMap[formattedVoucher.rewardId];
            return formattedVoucher as IAudienceVoucher;
          });
          return vouchers;
        })
      );
  }

  private getRewardsMap(idList: string[]): Observable<{ [rewardId: string]: IRewardEntity }> {
    const requests = idList.map(id => this.rewardsService.getReward(id));
    return requests.length === 0 ? of({}) : combineLatest(requests)
      .pipe(
        map(rewards => Utils.convertArrToObj(rewards, 'id'))
      );
  }

  private getUniqIds(data: any[], propKey: string): string[] {
    const idList = data.map(item => item.attributes[propKey]);
    return Utils.filterUniq(idList);
  }

  public voucherAssigned(source: string, assigned: string): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    const sendData = AudiencesHttpAdapter.transformVoucherAssignedToApi(source, assigned);
    return this.audiencesHttpsService.voucherAssigned(sendData);
  }

  public updateVoucherExpiry(id: string, endData: string): Observable<IJsonApiItem<IWAssignedAttributes>> {
    const sendData = AudiencesHttpAdapter.transformVoucherPatchToApi(id, endData);
    return this.audiencesHttpsService.updateVoucherExpiry(sendData);
  }
}
