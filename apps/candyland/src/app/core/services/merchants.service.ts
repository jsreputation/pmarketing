import { Injectable } from '@angular/core';
import { DataStore } from '@cl-core/http-adapters/datastore';
import { MerchantHttpAdapter } from '@cl-core/http-adapters/mercahant-http-adapter';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MerchantHttpService } from '@cl-core/http-services/merchant-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService implements ITableService {

  constructor(private merchantHttpService: MerchantHttpService,
              private datastore: DataStore) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<Merchant>> {
    params.include = 'branches';
    return this.datastore.findAll<Merchant>(Merchant, params)
      .pipe(
        map(response => ({data: response.getModels(), meta: response.getMeta().meta})),
      );
  }

  public getMerchant(id: string): Observable<Merchant> {
    return this.datastore.findRecord<Merchant>(Merchant, id, {include: 'branches'});
  }

  public createMerchant(data: Merchant): Observable<number> {
    // version: 1;
    let id;
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    let request = this.merchantHttpService.createMerchant({data: sendData});
    if ('branches' in data && data.branches && data.branches.length > 0) {
      request = request.pipe(
        switchMap((merchant: any) => {
          id = merchant.data.id;
          const branchRequests$ = data.branches.map(branch => this.createMerchantBranch(id, branch));
          return combineLatest(branchRequests$);
        })
      );
    }
    return request.pipe(map(() => id));
  }

  public createMerchantBranch(merchantId: string, data: any): Observable<any> {
    const sendData = MerchantHttpAdapter.transformFromMerchantBranchForm(data, merchantId);
    return this.merchantHttpService.createMerchantBranch({data: sendData});
  }

  public updateMerchantBranch(id: string, data: any): Observable<any> {
    console.log('updateMerchantBranch', data);
    const sendData = MerchantHttpAdapter.transformFromMerchantBranchForm(data, id);
    sendData.id = data.id;
    return this.merchantHttpService.updateMerchantBranch(data.id, {data: sendData});
  }

  public updateMerchant(id: string, data: any): Observable<any> {
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    sendData.id = id;
    let request$ = this.merchantHttpService.updateMerchant(id, {data: sendData});
    if ('branches' in data && data.branches) {
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
    if ('deletedBranches' in data && data.branches) {
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

  public duplicateMerchant(merchant: Merchant): Observable<any> {
    const post = this.datastore.createRecord(Merchant, merchant);
    return post.save();
  }

  public getMerchantList(): Observable<IMerchant[]> {
    return this.merchantHttpService.getMerchantList()
      .pipe(
        map((res: IMerchant[]) => res)
      );
  }
}
