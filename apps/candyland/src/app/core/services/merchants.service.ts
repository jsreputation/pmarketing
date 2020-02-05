import { Injectable } from '@angular/core';
import { MerchantHttpAdapter } from '@cl-core/http-adapters/merchant-http-adapter';
import { MerchantHttpService } from '@perx/whistler-services';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  IWMerchantAttributes,
  IWMerchantBranchAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload
} from '@perx/whistler';
import { JsonApiParser } from '@cl-helpers/json-api-parser';
import { ClHttpParams } from '@cl-helpers/http-params';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService implements ITableService<IMerchantForm> {

  constructor(private merchantHttpService: MerchantHttpService) { }

  public getTableData(params: HttpParamsOptions | any): Observable<ITableData<IMerchantForm>> {
    params.include = 'branches';
    return this.merchantHttpService.getMerchants(params)
      .pipe(map((data) => {
        const res = this.getTransformMerchant(data);
        return { data: res, meta: data.meta };
      }));
  }

  public getMerchant(id: string): Observable<IMerchantForm | null> {
    return id !== null
      ? this.merchantHttpService.getMerchant(
        ClHttpParams.createHttpParams({ include: 'branches' }),
        id)
        .pipe(
          map(
            (merchant => this.getTransformMerchant(merchant))))
      : of(null);
  }

  public createMerchant(data: IMerchantForm): Observable<number> {
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    let merchantId;
    let request: Observable<any> = this.merchantHttpService.createMerchant({ data: sendData }).pipe(
      tap((merchant) => merchantId = merchant.data.id)
    );
    if ('branches' in data && data.branches && data.branches.length > 0) {
      request = request.pipe(
        switchMap((merchant: IJsonApiItemPayload<IWMerchantAttributes>) => {
          const id = merchant.data.id;
          const branchRequests$ = data.branches.map(branch => this.createMerchantBranch(id, branch));
          return combineLatest(branchRequests$);
        })
      );
    }
    return request.pipe(map(() => merchantId));
  }

  public createMerchantBranch(merchantId: string, data: IBranch): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    const sendData = MerchantHttpAdapter.transformFromMerchantBranchForm(data, merchantId);
    return this.merchantHttpService.createMerchantBranch({ data: sendData });
  }

  public updateMerchantBranch(merchantId: string, data: IBranch): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    const sendData = { ...MerchantHttpAdapter.transformFromMerchantBranchForm(data, merchantId), id: data.id };
    return this.merchantHttpService.updateMerchantBranch(data.id, { data: sendData });
  }

  public deleteMerchantBranch(id: string): Observable<void> {
    return this.merchantHttpService.deleteMerchantBranch(id);
  }

  public updateMerchant(
    id: string,
    data: IMerchantForm
  ): Observable<IJsonApiItemPayload<IWMerchantAttributes>> {
    const sendData = { ...MerchantHttpAdapter.transformFromMerchantForm(data), id };
    return this.merchantHttpService.updateMerchant(id, { data: sendData });
  }

  public deleteMerchant(id: string): Observable<any> {
    return this.merchantHttpService.deleteMerchant(id);
  }

  public duplicateMerchant(merchant: IMerchantForm): Observable<number> {
    return this.createMerchant(merchant);
  }

  private getTransformMerchant(data:
  IJsonApiItemPayload<IWMerchantAttributes> | IJsonApiListPayload<IWMerchantAttributes>
  ): IMerchantForm[] {
    return JsonApiParser.parseDataWithIncludes(
      data,
      MerchantHttpAdapter.transformToMerchant, {
        branches: {
          fieldName: 'branches',
          adapterFunction: MerchantHttpAdapter.transformToBranch
        }
      });
  }
}
