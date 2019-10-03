import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { RewardsService } from '@cl-core-services';
import Utils from '@cl-helpers/utils';
import { IJsonApiItem, IJsonApiListPayload } from '@cl-core/http-services/jsonapi.payload';
import { IAssignedAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AudiencesVouchersService implements ITableService {
  constructor(
    private audiencesHttpsService: AudiencesHttpsService,
    private rewardsService: RewardsService
  ) { }

  public getTableData(params: HttpParamsOptions): Observable<any> {
    const httpParams = ClHttpParams.createHttpParams(params);
    let vouchers;
    return this.audiencesHttpsService.getAssignedVouchers(httpParams)
      .pipe(
        tap(response => vouchers = response),
        map(response => this.getUniqIds(response.data, 'source_id')),
        switchMap(idList => this.getRewardsMap(idList)),
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

  private getRewardsMap(idList: string[]): Observable<{ [rewardId: string]: IRewardEntity }> {
    const requests = idList.map(id => this.rewardsService.getReward(id));
    return requests.length === 0 ? of({}) : combineLatest(requests)
      .pipe(
        map(rewards => Utils.convertArrToObj(rewards, 'id')),
      );
  }

  private getUniqIds(data: any[], propKey: string): string[] {
    const idList = data.map(item => item.attributes[propKey]);
    return Utils.filterUniq(idList);
  }

  public voucherAssigned(source: string, assigned: string): Observable<IJsonApiListPayload<IAssignedAttributes>> {
    const sendData = AudiencesHttpAdapter.transformVoucherAssignedToApi(source, assigned);
    return this.audiencesHttpsService.voucherAssigned(sendData);
  }

  public updateVoucherExpiry(id: string, endData: string): Observable<IJsonApiItem<IAssignedAttributes>> {
    const sendData = AudiencesHttpAdapter.transformVoucherPatchToApi(id, endData);
    return this.audiencesHttpsService.updateVoucherExpiry(sendData);
  }
}
