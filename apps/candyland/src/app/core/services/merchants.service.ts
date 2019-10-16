import { Injectable } from '@angular/core';
import { DataStore } from '@cl-core/http-adapters/datastore';
import { MerchantHttpAdapter } from '@cl-core/http-adapters/merchant-http-adapter';
import { Merchant, MerchantBranch } from '@cl-core/http-adapters/merchant';
import { MerchantHttpService } from '@cl-core/http-services/merchant-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService implements ITableService {

  constructor(
    private merchantHttpService: MerchantHttpService,
    private datastore: DataStore
  ) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<Merchant>> {
    params.include = 'branches';
    return this.datastore.findAll<Merchant>(Merchant, params)
      .pipe(
        map(response => ({data: response.getModels(), meta: response.getMeta().meta}))
      );
  }

  public getMerchant(id: string): Observable<Merchant | null> {
    return id !== null ? this.datastore.findRecord<Merchant>(Merchant, id, {include: 'branches'}) : of(null);
  }

  public createMerchant(data: IMerchantForm): Observable<number> {
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    let merchantId;
    let request = this.merchantHttpService.createMerchant({data: sendData}).pipe(
      tap((merchant) => merchantId = merchant.data.id)
    );
    if ('branches' in data && data.branches && data.branches.length > 0) {
      request = request.pipe(
        switchMap((merchant: any) => {
          const id = merchant.data.id;
          const branchRequests$ = data.branches.map(branch => this.createMerchantBranch(id, branch));
          return combineLatest(branchRequests$);
        })
      );
    }
    return request.pipe(map(() => merchantId));
  }

  public createMerchantBranch(merchantId: string, data: MerchantBranch): Observable<any> {
    const sendData = MerchantHttpAdapter.transformFromMerchantBranchForm(data, merchantId);
    return this.merchantHttpService.createMerchantBranch({data: sendData});
  }

  public updateMerchantBranch(id: string, data: MerchantBranch): Observable<any> {
    const sendData = MerchantHttpAdapter.transformFromMerchantBranchForm(data, id);
    sendData.id = data.id;
    return this.merchantHttpService.updateMerchantBranch(data.id, {data: sendData});
  }

  public updateMerchant(id: string, data: IMerchantForm): Observable<any> {
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    sendData.id = id;
    let request$ = this.merchantHttpService.updateMerchant(id, {data: sendData});
    if ('branches' in data && data.branches && data.branches.length > 0) {
      request$ = request$.pipe(
        switchMap((merchant: any) => {
          const merchantId = merchant.data.id;
          const branchRequests$ = data.branches.map(branch => {
            if (branch.id) {
              return this.updateMerchantBranch(merchantId, branch);
            }
            return this.createMerchantBranch(merchantId, branch);
          });
          return combineLatest(branchRequests$);
        })
      );
    }
    if ('deletedBranches' in data && data.deletedBranches && data.deletedBranches.length > 0) {
      request$ = request$.pipe(
        switchMap(() => {
          const branchRequests$ = data.deletedBranches.map((branchId: string) => {
            return this.merchantHttpService.deleteMerchantBranch(branchId);
          });
          return combineLatest(branchRequests$);
        })
      );
    }
    return request$;
  }

  public deleteMerchant(id: string): Observable<any> {
    return this.datastore.deleteRecord(Merchant, id);
  }

  public duplicateMerchant(merchant: Merchant): Observable<Merchant> {
    return this.datastore
      .createRecord(Merchant, merchant)
      .save();
  }
}
