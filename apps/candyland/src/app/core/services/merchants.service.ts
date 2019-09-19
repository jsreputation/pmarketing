import { Injectable } from '@angular/core';
import { DataStore } from '@cl-core/http-adapters/datastore';
import { MerchantHttpAdapter } from '@cl-core/http-adapters/mercahant-http-adapter';
import { Merchant, MerchantBranch } from '@cl-core/http-adapters/merchant';
import { MerchantHttpService } from '@cl-core/http-services/merchant-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService implements ITableService {

  constructor(private merchantHttpService: MerchantHttpService,
              private datastore: DataStore) {
  }

  public getTableData(params: any): Observable<ITableData<Merchant>> {
    params.include = 'branches';
    console.log(params);
    return this.datastore.findAll<Merchant>(Merchant, params)
      .pipe(
        tap(data => console.log('merchant', data)),
        map(response => ({data: response.getModels(), meta: response.getMeta().meta})),
        tap(data => console.log('formatMerchant', data))
      );
  }

  public getMerchant(): Observable<IMerchant[]> {
    return this.merchantHttpService.getMerchants()
      .pipe(
        map((res: IMerchant[]) => res)
      );
  }

  public createMerchant(data: any): Observable<any> {
    // version: 1;
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    const request = this.merchantHttpService.createMerchant({data: sendData});
    debugger;
    if ('branches' in data && data.branches) {
      return request.pipe(
        switchMap((merchant: any) => {
          console.log('switchMap', merchant, this.merchantHttpService);
          const id = merchant.data.id;
          const branchRequests$ = data.branches.map(branch => this.createMerchantBranch(id, branch));
          console.log('branchRequests$', branchRequests$);
          return combineLatest(branchRequests$);
        })
      );
    }
    return request;

    // version: 2
    //   const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    //   const request = this.datastore.createRecord(Merchant, sendData).save();
    //   debugger;
    //   if ('branches' in data && data.branches) {
    //     return request.pipe(
    //       tap((merchant: any) => {
    //         console.log('switchMap', merchant, this.merchantHttpService);
    //         let m = this.datastore.peekRecord(Merchant, merchant.id);
    //         // const id = merchant.data.id;
    //         data.branches.forEach(branch =>
    //         this.datastore.createRecord(MerchantBranch, {
    //           ...MerchantHttpAdapter.transformFromMerchantBranchForm('1', branch),
    //           org: m
    //         }).save().subscribe()
    //         );
    //         // );
    //         // console.log('branchRequests$', branchRequests$);
    //         // return combineLatest(branchRequests$);
    //       })
    //     );
    //   }
    //   return request;
    //
  }

  public createMerchantBranch(id: string, data: any): Observable<any> {
    console.log('branch', data);
    const sendData = MerchantHttpAdapter.transformFromMerchantBranchForm(id, data);
    return this.merchantHttpService.createMerchantBranch({data: sendData});
  }

  public updateMerchant(id: string, data: any): Observable<any> {
    const sendData = MerchantHttpAdapter.transformFromMerchantForm(data);
    sendData.id = id;
    return this.merchantHttpService.updateMerchant(id, {data: sendData});
  }

  public deleteMerchant(id: string): Observable<any> {
    return this.datastore.deleteRecord(Merchant, id);
  }

  public duplicateMerchant(merchant: Merchant): Observable<any> {
    console.log('duplicateMerchant', merchant);
    // console.log('duplicateMerchant 111111', this.datastore.findRecord(Merchant, merchant.id));
    // return this.merchantHttpService.createMerchant(merchant);
    const post = this.datastore.createRecord(Merchant, merchant);
    return post.save();  // => POST to '/posts'
    // const newDuplicate = this.datastore.createRecord(Merchant, merchant);
    // console.log(newDuplicate);
    // return this.datastore.saveRecord(merchant, Merchant);
    // let comment = this.datastore.createRecord(Merchant, {
    //   'name': 'Prudential',
    //   'description': 'we do this',
    //   'properties': {
    //     'something': 'good'
    //   }
    // });
    // return comment.save();
  }

  public getMerchantList(): Observable<IMerchant[]> {
    return this.merchantHttpService.getMerchantList()
      .pipe(
        map((res: IMerchant[]) => res)
      );
  }
}
